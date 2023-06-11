class Report {
    constructor() {
        this.page = (req, res) => {
            res.render('report/index')
        }
    }
}

module.exports = Report