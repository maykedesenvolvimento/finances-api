const mongoose = require('mongoose')
const Transaction = require('../models/TransactionModel')

const getOne = async (req, res) => {
    const { id } = req.params

    const t = await Transaction.findById(id)

    res.send(t)
}

const getAll = async (req, res) => {
    const period = (req.query.period) ? req.query.period.split('-') : null

    if (!period || period.length < 2) res.status(400).json({ message: 'É necessário informar o período no formato YYYY-MM!' })

    const year = period[0]
    const month = period[1]

    const ts = await Transaction.find({ year, month })
    res.send(ts)
}

const createOne = async (req, res) => {
    const { type, description, category, value } = req.body

    const t = { type, description, category, value }
    t.yearMonthDay = req.body.date

    const date = t.yearMonthDay.split('-')
    t.year = date[0]
    t.month = date[1]
    t.day = date[2]
    t.yarMonth = `${t.year}-${t.month}`

    const result = await Transaction.create(t)
    res.send(result)
}

const updateOne = async (req, res) => {
    try {
        const { id } = req.params
        const t = await Transaction.findById(id)
        t.category = req.body.category || t.category
        t.description = req.body.description || t.description
        t.value = req.body.value || t.value
        if (req.body.date) {
            t.yearMonthDay = req.body.date

            const date = t.yearMonthDay.split('-')

            t.year = date[0]
            t.month = date[1]
            t.day = date[2]
            t.yarMonth = `${t.year}-${t.month}`
        }
        await t.save()

        res.send(t)
    }
    catch (error) {
        console.log(error)
    }
}

const deleteOne = async (req, res) => {
    try {
        const { id } = req.params
        const t = await Transaction.findByIdAndDelete(id)
        res.send(t)
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { getOne, getAll, createOne, updateOne, deleteOne }