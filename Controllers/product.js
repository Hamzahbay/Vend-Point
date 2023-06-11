class Product {
    constructor() {
        this.page = (req, res) => {
            res.render('product/index')
        }
        this.addStock = (req, res) => {
            res.render('product/addStock/index')
        }
        this.editStock = (req, res) => {
            res.render('product/editStock/index')
        }
        this.checkStock = (req, res) => {
            res.render('product/checkStock/index')
        }
        this.wareHouse = (req, res) => {
            res.render('product/wareHouse/index')
        }
    }
}

module.exports = Product