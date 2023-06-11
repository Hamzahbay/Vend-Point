const { Sequelize, DataTypes } = require('sequelize')
const dateTimeNow = require('../dateTimeNow')
const date = new Date()

module.exports = (path, callback) => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path,
        logging: false
    })

    const Data = sequelize.define('data', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        path: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        permission: {
            type: DataTypes.STRING,
            allowNull: false
        },
        setPassword: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            defaultValue: dateTimeNow.format()
        }
    }, { tableName: 'data', freezeTableName: true, timestamps: false })

    // Data.sync({ force: true }).then(() => callback(null, Data)).catch(err => console.log(err))
    return Data
}