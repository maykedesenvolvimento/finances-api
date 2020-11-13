const express = require('express')
const transactionRouter = express.Router()
const transactionService = require('../controllers/transactionService')

transactionRouter.get('/:id', transactionService.getOne)
transactionRouter.get('/', transactionService.getAll)
transactionRouter.post('/', transactionService.createOne)
transactionRouter.put('/:id', transactionService.updateOne)
transactionRouter.delete('/:id', transactionService.deleteOne)

module.exports = transactionRouter
