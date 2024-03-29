const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
// const max = require("../middleware/limit");
// const auth = require("../middleware/auth");
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", userCtrl.getAllUser);
router.get("/:id", userCtrl.getOneUser);
router.put("/:id", userCtrl.modifyUser)
router.delete("/:id", userCtrl.deleteUser);
module.exports = router;
// console.log(module.exports);
