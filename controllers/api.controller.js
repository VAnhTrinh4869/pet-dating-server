const db = require('../db');
const common = require('../common');

module.exports.getProfile = (req, res) => {
    let sql = `SELECT u.name, u.email, COUNT(DISTINCT(p.id)) AS pets, COUNT(pm.pet_id1) AS matches 
                FROM user u
                LEFT JOIN pet p ON u.id = p.user_id
                LEFT JOIN pet_match pm ON p.id = pm.pet_id1
                WHERE u.id = :id
                GROUP BY u.id `;
    db.query(sql, { replacements: { id: req.userId }, type: db.QueryTypes.SELECT })
        .then(results => {
            res.json(results)
        })
        .catch(error => res.json({ error: error }));
}

module.exports.upload = (req, res) => {
    res.json({
        success: 'ok',
        img_url: `${req.get('host')}/images/${req.file.filename}`
    })
}

module.exports.react = (req, res) => {
    let sql = 'INSERT INTO pet_reaction(user_id, pet_id, reaction) VALUES (:user_id, :pet_id, :reaction)';
    db.query(sql, { replacements: { user_id: req.userId, pet_id: req.body.pet_id, reaction: req.body.reaction } })
        .then(result => {
            res.json({
                result: 'ok',
                data: {
                    id: result[0],
                    user_id: req.userId,
                    pet_id: req.body.pet_id,
                    reaction: req.body.reaction
                }
            })
        })
        .catch(error => res.status(422).json({ error: error }))
}
module.exports.match = (req, res) => {
    let sql = 'INSERT INTO pet_match(user1, pet_id1, user2, pet_id2) VALUES (:user1, :pet_id1, :user2, :pet_id2)';
    db.query(sql, { replacements: { user1: req.userId, ...req.body } })
        .then(result => {
            res.json({
                result: 'ok',
                data: {
                    id: result[0],
                    user1: req.userId,
                    ...req.body
                }
            })
        })
        .catch(error => res.status(422).json({ error: error }))
}