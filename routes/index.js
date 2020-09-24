const express = require('express');
const router = require('express').Router();
const { catchErrors } = require("../middlewares");

const {
    addParticipants,
    createPromo,
    deletePromo,
    getPromo,
    getPromos,
    setPromoWinner,
    updatePromo,
    promoDetail
} = require("../controllers/promos")




const {
    createAsset,
    getAssets,
    getAsset,
    deleteAsset,
    updateAssets

} = require("../controllers/assets")

const {
    isAuth,
    checkRoles
} = require(`../controllers/auth`)

const checkBusiness = checkRoles('business');
const checkAdmin = checkRoles('admin');
const checkCreator = checkRoles('creator');



router.get('/', (req, res, next) => {
    res.status(200).json({ msg: 'Working' });
});


//===========Assets================

router.get("/assets/", catchErrors(getAssets))
router.get("/assets/:assetsId", catchErrors(getAsset))
router.post("/assets/create", checkCreator, catchErrors(createAsset))
router.put("/assets/:assetsId", checkAdmin, catchErrors(updateAssets))
router.delete("/assets/:assetsId", checkAdmin, catchErrors(deleteAsset))

//==========Promo===============

router.post("/promos/new/:productId", checkBusiness, catchErrors(createPromo))
router.get("/promos/:promoId", catchErrors(getPromos))
router.get("/promos/", catchErrors(getPromo))
router.get("/promos/:promoId/detail", promoDetail)
router.post("/promos-participant/:promoId", addParticipants)
router.get("/promos/end", endPromo)
router.get("/promos/end/:promoId", setPromoWinner)
router.put("/assets/:assetsId", checkBusiness, catchErrors(updatePromo))
router.delete("/promos/:assetsId", checkAdmin, catchErrors(deletePromo))

module.exports = router;