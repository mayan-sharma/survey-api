const path = require('path');
const sharp = require('sharp');

const errorHandler = require('../utils/errorHandler');
const downloadImage = require('../utils/downloadImage');

/**
 * @method GET
 * @route /api/image?url=''
 * @Authorization None
 */
exports.resize = async(req, res) => {
    try {
        // get image url from query
        const url = req.query.url;

        // validation
        if (!url) return res.status(400).json({
            message: 'Image url required!'
        });

        // download image (this overwrites previously downloaded images)
        // only works for png images
        await downloadImage(url, 'thumbnails/image.png');

        // resize and save image
        const resizedImg = `thumbnails/edited-${Date.now()}.png`;
        await sharp('thumbnails/image.png').png().resize(50, 50).toFile(resizedImg);

        // send resized image in response
        return res.status(200).sendFile(resizedImg, { root: path.join(__dirname, '../') });

    } catch (err) {
        errorHandler(err, res);
    }
}