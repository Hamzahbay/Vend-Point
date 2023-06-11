const { Sequelize, DataTypes } = require('sequelize')
const dateTimeNow = require('../dateTimeNow')
const date = new Date()

module.exports = (path, callback) => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path,
        logging: false
    })

    const SellingInvoice = sequelize.define('sellingInvoice', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        sellingId: {
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
    }, { tableName: 'sellingInvoice', freezeTableName: true, timestamps: false })

    // SellingInvoice.sync({ force: true }).then(() => callback(null, SellingInvoice)).catch(err => console.log(err))
    return SellingInvoice
}