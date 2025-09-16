const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/project_description", (req, res, next) => {
    const filePath = path.join(__dirname, "../../public", "project_description.doc");

    res.download(filePath, "project_description.doc", (err) => {
        if (err) {
            next(err);
        }
    });
});

module.exports = router;