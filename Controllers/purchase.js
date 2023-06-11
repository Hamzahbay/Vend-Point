class Purchase {
    constructor() {
        this.page = (req, res) => {
            res.render('purchase/index')
        }
        this.invoice = (req, res) => {
            res.render('purchase/invoice/index')
        }
        this.debt = (req, res) => {
            res.render('purchase/debt/index')
        }
        this.returns = (req, res) => {
            res.render('purchase/returns/index')
        }
    }
}

module.exports = Purchase