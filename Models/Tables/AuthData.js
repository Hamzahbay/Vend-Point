const { Sequelize, DataTypes } = require('sequelize')
const dateTimeNow = require('../dateTimeNow')
const date = new Date()

module.exports = (path, callback) => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path,
        logging: false
    })

    const AuthData = sequelize.define('authData', {
        data: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        user: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'authenticated'
        },
        date: {
            type: DataTypes.STRING,
            defaultValue: dateTimeNow.format()
        }
    }, { tableName: 'authData', freezeTableName: true, timestamps: false })

    return AuthData
}