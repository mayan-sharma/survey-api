module.exports = (err, res) => {
    console.error(err);
    return res.status(500).json({
        message: 'Internal Server Error!'
    });
}