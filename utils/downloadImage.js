const fs = require('fs');
const axios = require('axios');

module.exports = async(url, image_path) => {
    const response = await axios({ url, responseType: 'stream' })
    return new Promise((resolve, reject) => {
        response.data
            .pipe(fs.createWriteStream(image_path))
            .on('finish', () => resolve())
            .on('error', e => reject(e));
    });
}