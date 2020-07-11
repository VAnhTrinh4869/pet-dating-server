const db = require('../db');

module.exports.getAll = (req, res) => {
    let sql = 'SELECT * FROM user';
    db.query(sql, { type: db.QueryTypes.SELECT })
        .then(users => res.json(users))
        .catch(error => console.log(error));
}

module.exports.get = (req, res) => {
    let sql = 'SELECT * FROM user WHERE user_id = :id';
    db.query(sql, { replacements: { id: req.params.id }, type: db.QueryTypes.SELECT })
        .then(user => {
            res.json(user)
        })
        .catch(error => console.log(error));
}