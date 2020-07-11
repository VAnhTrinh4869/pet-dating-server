const jwt = require('jsonwebtoken');

const db = require('../db');

const buildInsertSql = (body, tbl) => {
    let sql = `INSERT INTO ${tbl} (`;
    let values = ` VALUES (`;
    for (let property in body) {
        sql += `${property},`;
        values += `:${property},`;
    }
    return sql.slice(0, -1) + ')' + values.slice(0, -1) + ')';
}
module.exports.insertNewUser = async (req, res) => {
    let beforeInsert = 'SELECT COUNT(1) as count FROM user WHERE email = :email';
    let result = await db.query(beforeInsert, { replacements: { email: req.body.email }, type: db.QueryTypes.SELECT });
    if (result[0].count == 0) {// login not yet
        let sql = buildInsertSql(req.body, 'user');
        db.query(sql, { replacements: { ...req.body } })
            .then(result => {
                res.json({
                    result: 'ok',
                    data: {
                        user_id: result[0],
                        ...req.body
                    },
                    pd_token: jwt.sign({ userId: result[0] }, process.env.JWT_KEY),
                    message: 'login successfully!'
                })
            }).catch(error => {
                res.json({
                    result: 'failed',
                    data: {},
                    message: `Error is ${error}`
                })
            });
    } else {
        let sql = 'SELECT * FROM user WHERE email = :email';
        db.query(sql, { replacements: { email: req.body.email }, type: db.QueryTypes.SELECT })
            .then(user => {
                res.json({
                    result: 'ok',
                    data: {
                        ...user[0]
                    },
                    pd_token: jwt.sign({ userId: user[0].user_id }, process.env.JWT_KEY),
                    message: 'login successfully!'
                })
            })
            .catch(error => res.status(422).send(error));
    }
}