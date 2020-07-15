const db = require('../db');
const common = require('../common');

module.exports.getCurrentUser = (req, res) => {
    let sql = 'SELECT * FROM user WHERE id = :id';
    db.query(sql, { replacements: { id: req.userId }, type: db.QueryTypes.SELECT })
        .then(users => res.json(users))
        .catch(error => res.json({ error: error }));
}

module.exports.get = (req, res) => {
    let sql = 'SELECT * FROM user WHERE id = :id';
    db.query(sql, { replacements: { id: req.params.id }, type: db.QueryTypes.SELECT })
        .then(user => {
            res.json(user)
        })
        .catch(error => res.json({ error: error }));
}

module.exports.updateUser = (req, res) => {
    let sql = common.buildUpdateSQL(req.body, 'user');
    db.query(sql, { replacements: { ...req.body.updateFields, id: req.userId }, type: db.QueryTypes.UPDATE })
        .then(rows => {
            res.json({
                result: 'ok',
                message: `${rows[1]} row(s) affected`,
                data: {
                    ...req.body.updateFields
                }
            })
        })
        .catch(error => res.json({ error: error }));
}