class Expenses {
    constructor() {
        this.page = (req, res) => {
            res.render('expenses/index')
        }
        this.type = (req, res) => {
            res.render('expenses/type/index')
        }
        this.invoice = (req, res) => {
            res.render('expenses/invoice/index')
        }
        this.detail = (req, res) => {
            res.render('expenses/detail/index')
        }
    }
}

module.exports = Expenses