class Selling {
    constructor() {
        this.page = (req, res) => {
            res.render('selling/index')
        }
        this.invoice = (req, res) => {
            res.render('selling/invoice/index')
        }
        this.debt = (req, res) => {
            res.render('selling/debt/index')
        }
        this.returns = (req, res) => {
            res.render('selling/returns/index')
        }
    }
}

module.exports = Selling