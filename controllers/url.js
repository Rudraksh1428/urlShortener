const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function smallURL(req, res) {

    console.log("REQUEST BODY:", req.body);

    if (!req.body) {
        return res.status(400).json({
            error: "Request body is missing"
        });
    }

    if (!req.body.url) {
        return res.status(400).json({
            error: "url is required"
        });
    }

    const shortID = nanoid(8);

    await URL.create({
        shortId: shortID,
        redirectURL: req.body.url,
        visitHistory: []
    });

    return res.json({
        id: shortID
    });
}

async function handleGetAnalytics(req,res)
{
    const shortId = req.params.shortId;
   const result = await URL.findOne({shortId})
   return res.json({totalClicks:result.visitHistory.length, analytics: result.visitHistory,})
}
module.exports = {
    smallURL , 
    handleGetAnalytics
};