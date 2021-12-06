const EmployeeModel = require("../models/EmployeeModel.js");
const express = require('express');
const { networkInterfaces } = require('os');
const router = express.Router();

router.get('/employees', async (req, res) => {
    EmployeeModel.find({}, (err, employees) => {
        if (err) res.send({ "error": err.toString() })
        res.send(employees)
    })
})

router.post('/employees', async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            error: "Employee content cannot be empty"
        })
    }

    let newEmployee = new EmployeeModel(req.body)
    try {
        await newEmployee.save()
        res.status(200).send(newEmployee)
    } catch (err) {
        res.status(500).send({ error: err.toString() })
    }
})

router.get('/employees/:id', (req, res) => {
    EmployeeModel.findById(req.params.id, (err, employee) => {
        if (err) res.send({ error: err.toString() })
        res.send(employee)
    })
})

router.put('/employees/:id', (req, res) => {
    EmployeeModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, employee) => {
        if (err) res.send({ error: err.toString() })
        res.send(employee)
    })
})

router.delete('/employees/:id', async (req, res) => {
    try {
        const employee = await EmployeeModel.findByIdAndDelete(req.params.id)
        if (!employee) res.status(404).send({ error: "Employee not found" })
        res.status(200).send({ "message": "Employee deleted" })
    } catch (err) {
        res.status(500).send({ error: err.toString() })
    }
})

module.exports = router