const User = require("../models/User")
const Asset = require("../models/Asset")
const Participant = require("../models/Participant")
const Promo = require("../models/Promo")

exports.getPromos = async(req, res) => {
    const promos = await Promo.find()
    res.status(200).json({ promos })
}

exports.getPromo = async(req, res) => {
    const promo = await Promo.findById(
        req.params.promoId)
    res.status(200).json({ promo })
}


exports.createPromo = async(req, res) => {
    // 1. extraer la informacion
    const { name, description, photo, price } = req.body
        /*  const { path: image } = req.file */
        /*   const { id: creator } = req.user */
        // 2. creamos el producto en base al usuario en sesion
    const newPromo = await Promo.create({
        name,
        description,
        photo,
        price,
        status: "active",
        business: req.user.id
            /*  image, */
            /*  creator, */
    })
    await User.findByIdAndUpdate(req.user.id, {
            $push: {
                promos: newPromo._id
            }
        })
        .then((newPromo) => res.status(200).json({ newPromo }))
        .catch((err) => res.status(400).json({ message: "No fue posible crear la promo" }));
}

exports.updatePromo = async(req, res) => {
    const { name, description, price, status, photo } = req.body
        /* const promo = await Promo.findById(
            req.params.promoId) */
    const promo = await Promo.findByIdAndUpdate(
        req.params.promoId, {
            name,
            description,
            price,
            status,
            photo
        }
    )
    res.status(200).json({ promo })
}

// Añadir contendientes a la Rifa 

exports.addParticipants = async(req, res) => {
    const { promoId } = req.params
    const promo = await Promo.findOne({ _id: promoId })

    if (promo.status === "finished") {
        //check latter
        return res.redirect("/promos")
    }
    // 1. Generar el contendiente
    const participant = await Participant.create({
        creative: req.user.id,
        promo: promoId
    })

    // 3. Agregar el ticket a los tickets vendidos de la rifa


    promo.participants.push(participant._id)

    await promo.save()
        // 4. Agregamos la participación al creativo
    await User.findByIdAndUpdate(req.user.id, { $push: { contender: participant._id } })
        //check latter
    res.status(200).json({ message: "Participación registrada" })
    res.redirect("/profile")
}


exports.setPromoWinner = async(req, res) => {
    const { promoId } = req.params
    const promo = await Promo.findById(promoId).populate("participants")

    //falta resolver la manera en la que se seleccionara al ganador mediante su id 

    // 1. obtener a un ganador aleatorio de los soldTickets de la rifa
    const winnerId = await Participant.findById(req.params.participantId)

    const promoWinner = promo.participants[winnerId]

    console.log("winner:", promoWinner)
        // 2. cambiar la propiedad winner del participante seleccionado de forma aleatoria por true
    await Participant.findByIdAndUpdate(promoWinner, { winner: true })

    // 4. cambiar la propiedad finished de la promoción por finished
    await Promo.findByIdAndUpdate(promoId, { status: "finished" })
        // 5. redirigir a la misma vista de end raffles
    res.status(200).json({ message: "Promoción con ganador definido" })
}

exports.deletePromo = async(req, res) => {
    const { promoId } = req.params
    await Promo.findOneAndRemove(promoId)
    res.status(200).json({ message: "Promoción eliminada" })
}

exports.promoDetail = async(req, res) => {
    const promo = await Promo.findById(req.params.promoId)
        .populate("participants")
        .populate({
            path: "participants",
            populate: {
                path: "creative",
                model: "Participant"
            }
        })

    console.log(promo)

    res.status(200).json({ promo })
}