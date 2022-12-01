const ChatDetail = require('../models/chatDetailsModel')

const postChatDetails = async (req, res) => {
    console.log(req.body)
    try {
        const details = await ChatDetail.create({ 
            // save to db
            senderName : req.body.senderName,
            message : req.body.message,
            room : req.body.room,
            time : req.body.time
            
        })
        res.status(201).send('Details saved Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getFirendsChatDetails = async (req, res) => {
    try {
        const details = await ChatDetail.find({room : 'Friends'});
        res.status(201).send(details);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getFamilyChatDetails = async (req, res) => {
    try {
        const details = await ChatDetail.find({room : 'Family'});
        res.status(201).send(details);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getColleaguesChatDetails = async (req, res) => {
    try {
        const details = await ChatDetail.find({room : 'Colleagues'});
        res.status(201).send(details);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCousinsChatDetails = async (req, res) => {
    try {
        const details = await ChatDetail.find({room : 'Cousins'});
        res.status(201).send(details);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = { 
    postChatDetails, 
    getFirendsChatDetails, 
    getFamilyChatDetails , 
    getColleaguesChatDetails , 
    getCousinsChatDetails
}