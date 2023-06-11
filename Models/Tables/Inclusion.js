const { Sequelize, DataTypes } = require('sequelize')
const dateTimeNow = require('../dateTimeNow')
const date = new Date()

module.exports = (path, callback) => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path,
        logging: false
    })

    const Inclusion = sequelize.define('inclusion', {
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
        description: {
            type: DataTypes.TEXT,
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
    }, { tableName: 'inclusion', freezeTableName: true, timestamps: false })

    // Inclusion.sync({ force: true }).then(() => callback(null, Inclusion)).catch(err => console.log(err))
    return Inclusion
}