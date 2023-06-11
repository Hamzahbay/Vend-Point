const { Sequelize, DataTypes } = require('sequelize')
const dateTimeNow = require('../dateTimeNow')
const date = new Date()

module.exports = (path, callback) => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path,
        logging: false
    })

    const ExpensesInvoice = sequelize.define('expensesInvoice', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        expensesId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        detail: {
            type: DataTypes.JSON,
            allowNull: false
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            defaultValue: dateTimeNow.format()
        }
    }, { tableName: 'expensesInvoice', freezeTableName: true, timestamps: false })

    // ExpensesInvoice.sync({ force: true }).then(() => callback(null, ExpensesInvoice)).catch(err => console.log(err))
    return ExpensesInvoice
}