const { Sequelize, DataTypes } = require('sequelize')
const dateTimeNow = require('../dateTimeNow')
const date = new Date()

module.exports = (path, callback) => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path,
        logging: false
    })

    const Product = sequelize.define('product', {
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
        qty: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        date: {
            type: DataTypes.STRING,
            defaultValue: dateTimeNow.format()
        }
    }, { tableName: 'product', freezeTableName: true, timestamps: false })

    // Product.sync({ force: true }).then(() => callback(null, Product)).catch(err => console.log(err))
    return Product
}