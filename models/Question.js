module.exports = (db, DataTypes) => {
    const Question = db.define('Question', {
        question: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Question;
}