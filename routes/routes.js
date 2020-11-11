const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../controllers/transactionService');

transactionRouter.get('/', transactionService.getAll)

module.exports = transactionRouter;
