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
    updateAsset
} = require("../controllers/assets")

const {
    isAuth,
    checkRoles,
} = require(`../controllers/auth`)

const {
    checkValidAssets,
    getInvalidProducts
} = require(`../controllers/admin`)

const {
    promoParticipate
} = require(`../controllers/creative`)


const {
    createOrder,
    listOrders,
    getStatusValues,
    findOrderById,
    updateOrderStatus

} = require("../controllers/orders");

const {
    addOrderToUserHistory,
    purchaseHistory
} = require("../controllers/users")

const {
    generateToken,
    processPayment
} = require("../controllers/braintree");

const checkBusiness = checkRoles('business');
const checkAdmin = checkRoles('admin');
const checkCreator = checkRoles('creator');



router.get('/', (req, res, next) => {
    res.status(200).json({ msg: 'Working' });
});



//=========================Assets =================

router.get("/assets/", catchErrors(getAssets))
router.get("/assets/:assetsId", catchErrors(getAsset))
router.post("/assets/create", /* checkCreator,  */ catchErrors(createAsset))
router.put("/assets/:assetsId", checkAdmin, catchErrors(updateAsset))
router.delete("/assets/:assetsId", checkAdmin, catchErrors(deleteAsset))

//==========Promo===============

router.post("/promos/new/", checkBusiness, catchErrors(createPromo))
router.get("/promos/:promoId", catchErrors(getPromo))
router.get("/promos/", catchErrors(getPromos))
router.get("/promos/detail/:promoId", promoDetail)
router.post("/promos/participant/:promoId", addParticipants)
router.get("/promos/end/:promoId", setPromoWinner)
router.put("/promos/:promoId", checkBusiness, catchErrors(updatePromo))
router.delete("/promos/:promoId", checkBusiness, catchErrors(deletePromo))

//=========================Admin tasks==============================

router.get("/admin/validate", checkAdmin, catchErrors(getInvalidProducts))
router.put("/admin/validate/:assetId", checkAdmin, catchErrors(checkValidAssets))


//===================================Creative====================================

router.post("/participant/:promoId", checkCreator, promoParticipate)


//======================================Ordenes=============================

router.post("/order/create/:userId", isAuth, addOrderToUserHistory, createOrder);
router.get("/order/list/:userId", checkAdmin, listOrders);
router.get("/order/status-values/:userId", checkAdmin, getStatusValues);
router.put("/order/:orderId/status/:userId", checkAdmin, updateOrderStatus);

router.get('/orders/by/user/:userId', isAuth, purchaseHistory);


//==========================================Pagos ================================

router.get("/braintree/getToken/:userId", isAuth, generateToken);
router.post("/braintree/payment/:userId", isAuth, processPayment);


module.exports = router;