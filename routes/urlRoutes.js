const express = require("express");
const {urlShorterner , urlRedirector} = require('../controllers/routerController.js');




const router = express.Router();



router.post('/' , urlShorterner)
router.get('/:shortenedUrl' , urlRedirector);

module.exports = router;