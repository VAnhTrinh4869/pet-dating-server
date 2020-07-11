const db = require('../db');
const common = require('../common');

module.exports.getAll = (req, res) => {
    let sql = 'SELECT * FROM pet WHERE user_id = :user_id';
    db.query(sql, { replacements: { user_id: req.userId }, type: db.QueryTypes.SELECT })
        .then(pets => res.json(pets))
        .catch(error => res.json({ error: error }));
}

module.exports.getAllPetBreeds = (req, res) => {
    let sql = 'SELECT * FROM pet_breed';
    db.query(sql, { type: db.QueryTypes.SELECT })
        .then(results => res.json(results))
        .catch(error => res.json({ error: error }));
}

module.exports.get = (req, res) => {
    let sql = 'SELECT * FROM pet WHERE pet_id = :id';
    db.query(sql, { replacements: { pet_id: req.params.id }, type: db.QueryTypes.SELECT })
        .then(pet => {
            res.json(pet)
        })
        .catch(error => res.json({ error: error }));
}

module.exports.updatePet = (req, res) => {
    let sql = common.buildUpdatePetSQL(req, 'pet');
    db.query(sql, { replacements: { ...req.body }, type: db.QueryTypes.UPDATE })
        .then(rows => {
            res.json({
                result: 'ok',
                message: `${rows[1]} row(s) affected`
            })
        })
        .catch(error => res.json({ error: error }));
}

module.exports.createNewPet = (req, res) => {
    req.body.user_id = req.userId;
    let sql = common.buildInsertSql(req, 'pet');
    db.query(sql, { replacements: { ...req.body } })
        .then(results => {
            res.json({
                result: 'ok',
                data: {
                    pet_id: results[0],
                    ...req.body
                },
                message: 'insert new pet successfull'
            })
        })
        .catch(error => {
            res.json({
                result: 'failed',
                data: {},
                message: 'error: ' + error.message
            })
        });
}