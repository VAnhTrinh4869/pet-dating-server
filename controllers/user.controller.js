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
    let beforeInsert = 'SELECT COUNT(1) as count FROM user WHERE token = :token';
    let isLogin;
    let result = await db.query(beforeInsert, { replacements: { token: req.body.token }, type: db.QueryTypes.SELECT });
    isLogin = result[0].count > 0;
    if (!isLogin) {
        let sql = buildInsertSql(req.body, 'user');
        db.query(sql, { replacements: { ...req.body } })
            .then(result => {
                res.json({
                    result: 'ok',
                    data: {
                        user_id: result[0],
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
    } else {
        let sql = 'SELECT * FROM user WHERE token = :token';
        db.query(sql, { replacements: { token: req.body.token }, type: db.QueryTypes.SELECT })
            .then(user => {
                res.json({
                    result: 'ok',
                    data: {
                        ...user[0]
                    },
                    message: 'Insert new user successfully!'
                })
            })
            .catch(error => console.log(error));
    }
}