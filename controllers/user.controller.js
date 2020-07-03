const db = require('../db');

module.exports.insertNewUser = (req, res) => {
    let sql = 'INSERT INTO user (name, phone, access_token) VALUES (:name, :phone, :access_token)';
    db.query(sql, { replacements: { ...req.body } })
        .then(user => console.log('result: ' + user))
        .catch(error => console.log(error));
}