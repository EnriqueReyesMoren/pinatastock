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
    userById,
    readUser,
    purchaseHistory
} = require('../controllers/users');


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

const {
    create,
    categoryById,
    read,
    update,
    remove,
    list
} = require('../controllers/categories');

const {
    createOrder,
    listOrders,
    getStatusValues,
    orderById,
    updateOrderStatus
} = require("../controllers/orders");

const checkBusiness = checkRoles('business');
const checkAdmin = checkRoles('admin');
const checkCreator = checkRoles('creator');



router.get('/', (req, res, next) => {
    res.status(200).json({ msg: 'Working' });
});


//===========Params================

router.param("userId", userById);
router.param("orderId", orderById);
router.param('categoryId', categoryById);

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
router.get("/promos/end/:promoId", setPromoWinner)
router.put("/assets/:assetsId", checkBusiness, catchErrors(updatePromo))
router.delete("/promos/:assetsId", checkAdmin, catchErrors(deletePromo))


//=====================Categories =========================

router.get('/category/:categoryId', catchErrors(read));
router.post('/category/create/:userId', checkAdmin, catchErrors(create));
router.put('/category/:categoryId/:userId', checkAdmin, catchErrors(update));

router.delete('/category/:categoryId/:userId', checkAdmin, catchErrors(remove));
router.get('/categories', list);




//=====================Orders=========================

router.post("/order/create/:userId", isAuth, catchErrors(createOrder));

router.get("/order/list/:userId", checkAdmin, listOrders);
router.get("/order/status-values/:userId", isAuth, checkAdmin, getStatusValues);
router.put("/order/:orderId/status/:userId", checkAdmin, updateOrderStatus);



//=====================Users action=========================

router.get('/user/:userId', isAuth, readUser);
router.get('/orders/by/user/:userId', isAuth, purchaseHistory);

module.exports = router;