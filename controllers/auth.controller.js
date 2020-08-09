const jwt = require('jsonwebtoken');

const db = require('../db');
const common = require('../common');

module.exports.insertNewUser = async (req, res) => {
    // if (!req.body.email) {
    //     res.send(res.status(422).send('you must be logged in'));
    // }

    let beforeInsert = 'SELECT COUNT(1) as count FROM user WHERE uid = :uid';
    let result = await db.query(beforeInsert, { replacements: { uid: req.body.uid }, type: db.QueryTypes.SELECT });
    if (result[0].count == 0) {// login not yet
        let sql = common.buildInsertSql(req, 'user');
        db.query(sql, { replacements: { ...req.body } })
            .then(result => {
                res.json({
                    result: 'ok',
                    data: {
                        id: result[0],
                        ...req.body
                    },
                    pd_token: jwt.sign({ userId: req.body.uid }, process.env.JWT_KEY),
                    message: 'login successfully!'
                })
            }).catch(error => {
                res.status(422).send(error)
            });
    } else {
        try {
            let sql = 'SELECT * FROM user WHERE uid = :uid';
            const user = await db.query(sql, { replacements: { uid: req.body.uid }, type: db.QueryTypes.SELECT });
            if (user[0].is_block == 1) {
                const block_deadline = user[0].block_deadline;
                // const TIME_ZONE = new Date().getTimezoneOffset();
                const ms = new Date(block_deadline).getTime() - new Date().getTime();
                const second = Math.floor(ms / 1000);
                const h = Math.floor(second / 3600);
                const m = Math.floor((second - 3600 * h) / 60);
                const s = Math.floor(second - 3600 * h - 60 * m);
                res.json({
                    data: {
                        is_block: 1,
                        remainTime: `${h}h ${m}m ${s}s`,
                        ms: ms,
                        now: new Date()
                    }
                })
            } else {
                res.json({
                    result: 'ok',
                    data: {
                        ...user[0]
                    },
                    pd_token: jwt.sign({ userId: user[0].uid }, process.env.JWT_KEY),
                    message: 'login successfully!'
                })
            }

        } catch (error) {
            res.status(422).send(error)
        }
    }
}