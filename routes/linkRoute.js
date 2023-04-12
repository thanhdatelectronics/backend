const express = require('express');
const router = express.Router();
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware')
const {
createLink,
updateLink,
detelelink,
getAllLink,
getaLink
} = require('../controller/linkCtrl');


router.post('/',authMiddleware,isAdmin,createLink);
router.put('/:id',authMiddleware,isAdmin,updateLink);
router.delete('/:id',authMiddleware,isAdmin,detelelink);
router.get('/:id',getaLink);
router.get('/',getAllLink);

module.exports = router