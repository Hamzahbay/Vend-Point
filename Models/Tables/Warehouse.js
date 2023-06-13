const { Sequelize, DataTypes } = require('sequelize')
const dateTimeNow = require('../dateTimeNow')
const date = new Date()

module.exports = (path, callback) => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path,
        logging: false
    })

    const Warehouse = sequelize.define('warehouse', {
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
        note: {
            type: DataTypes.TEXT
        },
        date: {
            type: DataTypes.STRING,
            defaultValue: dateTimeNow.format()
        }
    }, { tableName: 'warehouse', freezeTableName: true, timestamps: false })

    // Warehouse.sync({ force: true }).then(() => callback(null, Warehouse)).catch(err => console.log(err))
    return Warehouse
}