const express = require('express');
const router = express.Router();
const controller = require("../controller/userController");


router.get("/getAllusers",controller.getAllUsers);
// PUT update profile name
router.put("/profile/:email",controller.updateProfile);
router.put("/update/:id",controller.updateUser);

//Create User By Admin
router.post("/addUser", controller.createUser);
router.delete("/delete/:id", controller.deleteUser);

module.exports = router;