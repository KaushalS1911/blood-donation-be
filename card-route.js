const Card = require('./card-model');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const {uploadFiles} = require('./helpers/Image')

router.post('/',upload.single("image"),async (req, res) => {
    try {
        const {
            name,
            contact
        } = req.body;

        if(!name || !contact || !req.file){
            return res.status(404).json({ status: 404, message: "Name , contact and image are required" });
        }

        const imageUrls = await uploadFiles([req.file.buffer]);
        const createdCard = await Card.create({
            name,
            image : imageUrls[0],
            contact
        });

        return res.status(201).json(createdCard);
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", error: error.message});
    }
});

router.get('/',async (req, res) => {
    const card = await Card.find();
    return res.json(card);
});

module.exports = router;
