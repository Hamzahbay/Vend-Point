class Inclusion {
    constructor() {
        this.page = (req, res) => {
            res.render('inclusion/index')
        }
        this.type = (req, res) => {
            res.render('inclusion/type/index')
        }
        this.invoice = (req, res) => {
            res.render('inclusion/invoice/index')
        }
        this.detail = (req, res) => {
            res.render('inclusion/detail/index')
        }
    }
}

module.exports = Inclusion