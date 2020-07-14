const db = require('../db');
const common = require('../common');

module.exports.getAll = (req, res) => {
    let sql = 'SELECT * FROM user WHERE user_id = :user_id';
    db.query(sql, { replacements: { user_id: req.userId }, type: db.QueryTypes.SELECT })
        .then(users => res.json(users))
        .catch(error => res.json({ error: error }));
}

module.exports.get = (req, res) => {
    let sql = 'SELECT * FROM user WHERE user_id = :id';
    db.query(sql, { replacements: { id: req.params.id }, type: db.QueryTypes.SELECT })
        .then(user => {
            res.json(user)
        })
        .catch(error => res.json({ error: error }));
}

module.exports.updateUser = (req, res) => {
    let sql = common.buildUpdateUserSQL(req, 'user');
    db.query(sql, { replacements: { ...req.body, user_id: req.userId }, type: db.QueryTypes.UPDATE })
        .then(rows => {
            res.json({
                result: 'ok',
                message: `${rows[1]} row(s) affected`
            })
        })
        .catch(error => res.json({ error: error }));
}