const { Sequelize, DataTypes } = require('sequelize')
const dateTimeNow = require('../dateTimeNow')
const date = new Date()

module.exports = (path, callback) => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path,
        logging: false
    })

    const Selling = sequelize.define('selling', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        buyerId: {
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
    }, { tableName: 'selling', freezeTableName: true, timestamps: false })

    // Selling.sync({ force: true }).then(() => callback(null, Selling)).catch(err => console.log(err))
    return Selling
}