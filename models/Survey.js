module.exports = (db, DataTypes) => {
    const Survey = db.define('Survey', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Survey;
}