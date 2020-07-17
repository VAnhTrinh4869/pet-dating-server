const db = require('../db');
const common = require('../common');

module.exports.getAll = (req, res) => {
    let sql = 'SELECT * FROM pet WHERE user_id = :user_id';
    db.query(sql, { replacements: { user_id: req.userId }, type: db.QueryTypes.SELECT })
        .then(pets => res.json(pets))
        .catch(error => res.json({ error: error }));
}

module.exports.getOthersPet = (req, res) => {
    let sql = 'SELECT * FROM pet WHERE user_id != :user_id';
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
    let sql = 'SELECT * FROM pet WHERE id = :id';
    db.query(sql, { replacements: { id: req.params.id }, type: db.QueryTypes.SELECT })
        .then(pet => {
            res.json(pet)
        })
        .catch(error => res.json({ error: error }));
}

module.exports.get = (req, res) => {
    let sql = 'SELECT * FROM pet WHERE id = :id';
    db.query(sql, { replacements: { id: req.params.id }, type: db.QueryTypes.SELECT })
        .then(pet => {
            res.json(pet)
        })
        .catch(error => res.json({ error: error }));
}

module.exports.updatePet = (req, res) => {
    let sql = common.buildUpdateSQL(req.body, 'pet');
    db.query(sql, { replacements: { ...req.body.updateFields, id: req.params.id }, type: db.QueryTypes.UPDATE })
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

module.exports.createNewPet = (req, res) => {
    req.body.user_id = req.userId;
    let sql = common.buildInsertSql(req, 'pet');
    db.query(sql, { replacements: { ...req.body } })
        .then(results => {
            res.json({
                result: 'ok',
                data: {
                    id: results[0],
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

module.exports.deletePet = (req, res) => {
    let sql = 'DELETE FROM pet where id = :pet_id AND user_id = :user_id';
    db.query(sql, { replacements: { pet_id: req.params.id, user_id: req.userId }, type: db.QueryTypes.UPDATE })
        .then(result => {
            res.json({
                result: 'ok',
                message: `${result[1]} row(s) affected`
            })
        }).catch(error => res.json({ error: error }));
}