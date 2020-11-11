const express = require('express');
const transactionRouter = express.Router();
const Transaction = require('../models/TransactionModel')

transactionRouter.get('/', async (req, res) => {
    const period = (req.query.period) ? req.query.period.split('-') : null;

    if (!period || period.length<2) res.status(400).json({message: 'É necessário informar o período no formato YYYY-MM!'})

    const year = period[0];
    const month = period[1];

    const ts = await Transaction.find({year, month});

    res.send(ts);
})

module.exports = transactionRouter;
