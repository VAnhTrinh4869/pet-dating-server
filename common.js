module.exports.buildInsertSql = (req, tbl) => {
    let sql = `INSERT INTO ${tbl} (`;
    let values = ` VALUES (`;
    for (let property in req.body) {
        sql += `${property},`;
        values += `:${property},`;
    }
    return sql.slice(0, -1) + ')' + values.slice(0, -1) + ')';
}

module.exports.buildUpdateSQL = (data, tbl) => {
    let sql = `UPDATE ${tbl} SET `;
    for (let property in data.updateFields) {
        sql += `${property} = :${property},`;
    }
    return sql.slice(0, -1) + ' WHERE id = :id';
}
module.exports.buildUpdateUserSQL = (data, tbl) => {
    let sql = `UPDATE ${tbl} SET `;
    for (let property in data.updateFields) {
        sql += `${property} = :${property},`;
    }
    return sql.slice(0, -1) + ' WHERE uid = :uid';
}