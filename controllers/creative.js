const User = require("../models/User")
const Asset = require("../models/Asset")
const Participant = require("../models/Participant")
const Promo = require("../models/Promo")

exports.promoParticipate = async (req, res) => {
    const { promoId } = req.params
    const participant = await Participant.create({
    creative: req.user.id,
    promo: promoId
  })
  
    const contender = await User.findByIdAndUpdate(req.user.id, {
        $push:{
            contender: req.user.id
        }
    },
    
   )

    const contenderPromo = await Promo.findByIdAndUpdate(promoId , {
        $push:{
            participants: req.user.id
        }
    }, )
   
    .then((participant) => res.status(200).json({ participant}))
    .catch((err) => res.status(400).json({ message: "No fue posible ingresar a este concurso" }));
}


