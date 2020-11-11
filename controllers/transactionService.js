const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const getAll = async (req, res) => {
    const period = (req.query.period) ? req.query.period.split('-') : null;
    
    if (!period || period.length<2) res.status(400).json({message: 'É necessário informar o período no formato YYYY-MM!'})
    
    const year = period[0];
    const month = period[1];
    
    const ts = await TransactionModel.find({year, month});
    
    res.send(ts);
}

module.exports=  {getAll};