module.exports.buildInsertSql = (req, tbl) => {
    let sql = `INSERT INTO ${tbl} (`;
    let values = ` VALUES (`;
    for (let property in req.body) {
        sql += `${property},`;
        values += `:${property},`;
    }
    return sql.slice(0, -1) + ')' + values.slice(0, -1) + ')';
}

module.exports.buildUpdateUserSQL = (req, tbl) => {
    let sql = `UPDATE ${tbl} SET `;
    for (let property in req.body) {
        sql += `${property} = :${property},`;
    }
    return sql.slice(0, -1) + ' WHERE user_id = :user_id';
}

module.exports.buildUpdatePetSQL = (req, tbl) => {
    let sql = `UPDATE ${tbl} SET `;
    for (let property in req.body) {
        if (property != 'pet_id') {
            sql += `${property} = :${property},`;
        }
    }
    return sql.slice(0, -1) + ' WHERE pet_id = :pet_id';
}