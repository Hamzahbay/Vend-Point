const { Sequelize, DataTypes } = require('sequelize')
const dateTimeNow = require('../dateTimeNow')
const date = new Date()

module.exports = (path, callback) => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path,
        logging: false
    })

    const PurchaseInvoice = sequelize.define('purchaseInvoice', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        purchaseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        detail: {
            type: DataTypes.JSON,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            defaultValue: dateTimeNow.format()
        }
    }, { tableName: 'purchaseInvoice', freezeTableName: true, timestamps: false })

    // PurchaseInvoice.sync({ force: true }).then(() => callback(null, PurchaseInvoice)).catch(err => console.log(err))
    return PurchaseInvoice
}