module.exports = (db, DataTypes) => {
    const Response = db.define('Response', {
        response: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Response;
}