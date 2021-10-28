const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message");

router.post("/", messageCtrl.addMessage);
router.get("/", messageCtrl.getAllMessage);
router.delete("/:id", messageCtrl.deleteMessage);

module.exports = router;
