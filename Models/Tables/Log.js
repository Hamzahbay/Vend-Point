const { Sequelize, DataTypes } = require('sequelize')
const dateTimeNow = require('../dateTimeNow')
const date = new Date()

module.exports = (path, callback) => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path,
        logging: false
    })

    const Log = sequelize.define('log', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        targetId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            defaultValue: dateTimeNow.format()
        }
    }, { tableName: 'log', freezeTableName: true, timestamps: false })

    // Log.sync({ force: true }).then(() => callback(null, Log)).catch(err => console.log(err))
    return Log
}