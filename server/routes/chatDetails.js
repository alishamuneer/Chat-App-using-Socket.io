const express = require('express');
const router = express();
const {  postChatDetails, 
    getChatDetails, 
    } = require('../controllers/chatDetailsController');

router.post('/', postChatDetails)
router.get('/:room', getChatDetails)

module.exports = router