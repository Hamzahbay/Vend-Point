const { Sequelize, DataTypes } = require('sequelize')
const dateTimeNow = require('../dateTimeNow')
const date = new Date()

module.exports = (path, callback) => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path,
        logging: false
    })

    const Purchase = sequelize.define('purchase', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        supplierId: {
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
    }, { tableName: 'purchase', freezeTableName: true, timestamps: false })

    // Purchase.sync({ force: true }).then(() => callback(null, Purchase)).catch(err => console.log(err))
    return Purchase
}