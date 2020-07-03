const db = require('../db');

module.exports.getAll = (req, res) => {
    let sql = 'SELECT * FROM user';
    db.query(sql, { type: db.QueryTypes.SELECT })
        .then(users => res.send(users))
        .catch(error => console.log(error));
}

module.exports.insertNewUser = (req, res) => {
    let sql = 'INSERT INTO user (name, phone, access_token) VALUES (:name, :phone, :access_token)';
    db.query(sql, { replacements: { ...req.body } })
        .then(result => console.log('result: ' + result))
        .catch(error => console.log(error));
}