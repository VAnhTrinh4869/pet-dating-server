const db = require('../db');

module.exports.getAll = (req, res) => {
    let sql = 'SELECT * FROM user';
    db.query(sql, { type: db.QueryTypes.SELECT })
        .then(users => res.json(users))
        .catch(error => console.log(error));
}

module.exports.insertNewUser = (req, res) => {
    let sql = 'INSERT INTO user (name, email, access_token) VALUES (:name, :email, :access_token)';
    db.query(sql, { replacements: { ...req.body } })
        .then(result => {
            res.json({
                result: 'ok',
                data: {
                    id: result[0],
                    ...req.body
                },
                message: 'Insert new user successfully!'
            })
        }).catch(error => {
            res.json({
                result: 'failed',
                data: {},
                message: `Error is ${error}`
            })
        });
}