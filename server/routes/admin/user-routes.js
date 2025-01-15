const express = require("express");

const {
  addNewUser,
  getAllUsers,
  getUserDetailsForAdmin,
  editUserRole,
  deleteUser,
} = require("../../controllers/admin/user-controller");

const router = express.Router();

router.post("/add", addNewUser)
router.get("/get", getAllUsers);
router.get("/details/:id", getUserDetailsForAdmin);
router.put("/edit/:id", editUserRole);
router.delete("/delete/:id", deleteUser);

module.exports = router;
