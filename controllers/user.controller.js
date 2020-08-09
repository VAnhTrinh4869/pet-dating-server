const db = require('../db');
const common = require('../common');

module.exports.getCurrentUser = (req, res) => {
    let sql = 'SELECT * FROM user WHERE uid = :uid';
    db.query(sql, { replacements: { uid: req.userId }, type: db.QueryTypes.SELECT })
        .then(user => {
            if (user[0].is_block == 1) {
                const block_deadline = user[0].block_deadline;
                // const TIME_ZONE = new Date().getTimezoneOffset();
                const ms = new Date(block_deadline).getTime() - new Date().getTime();
                const second = Math.floor(ms / 1000);
                const h = Math.floor(second / 3600);
                const m = Math.floor((second - 3600 * h) / 60);
                const s = Math.floor(second - 3600 * h - 60 * m);
                res.json({
                    is_block: 1,
                    remainTime: `${h}h ${m}m ${s}s`
                })
            } else {
                res.json({
                    ...user[0]
                })
            }
        })
        .catch(error => res.json({ error: error }));
}

module.exports.get = (req, res) => {
    let sql = 'SELECT * FROM user WHERE uid = :uid';
    db.query(sql, { replacements: { uid: req.params.uid }, type: db.QueryTypes.SELECT })
        .then(user => {
            res.json(user)
        })
        .catch(error => res.json({ error: error }));
}

module.exports.updateUser = (req, res) => {
    let sql = common.buildUpdateUserSQL(req.body, 'user');
    db.query(sql, { replacements: { ...req.body.updateFields, uid: req.userId }, type: db.QueryTypes.UPDATE })
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

module.exports.getDrawer = (req, res) => {
    let sql = `SELECT u.name, u.email, COUNT(DISTINCT(p.id)) AS pets, COUNT(pm.pet_id1) AS matches 
                FROM user u
                INNER JOIN pet p ON u.id = p.user_id
                INNER JOIN pet_match pm ON p.id = pm.pet_id1
                WHERE u.id = :id
                GROUP BY u.id `;
    db.query(sql, { replacements: { id: req.userId }, type: db.QueryTypes.SELECT })
        .then(results => {
            res.json(results)
        })
        .catch(error => res.json({ error: error }));
}