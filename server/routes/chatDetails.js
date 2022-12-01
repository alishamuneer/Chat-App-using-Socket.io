const express = require('express');
const router = express();
const {  postChatDetails, 
    getFirendsChatDetails, 
    getFamilyChatDetails , 
    getColleaguesChatDetails , 
    getCousinsChatDetails } = require('../controllers/chatDetailsController');

router.post('/chatDetails', postChatDetails)
router.get('/Friends/chatDetails', getFirendsChatDetails)
router.get('/Family/chatDetails', getFamilyChatDetails)
router.get('/Cousisn/chatDetails', getCousinsChatDetails)
router.get('/Colleagues/chatDetails', getColleaguesChatDetails)

module.exports = router