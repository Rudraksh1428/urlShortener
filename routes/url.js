const express = require('express');

const {
    smallURL,
    handleGetAnalytics
} = require('../controllers/url');

const router = express.Router();

router.post('/', smallURL);

router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;