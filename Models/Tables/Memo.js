const dateTimeNow = require('../dateTimeNow')
const { Sequelize, DataTypes } = require('sequelize')
const date = new Date()

module.exports = (path, callback) => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path,
        logging: false
    })

    const Memo = sequelize.define('memo', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
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
    }, { tableName: 'memo', freezeTableName: true, timestamps: false })

    // Memo.sync({ force: true }).then(() => callback(null, Memo)).catch(err => console.log(err))
    return Memo
}