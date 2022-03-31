import express from "express";
import UserController from "./user.controller";
import friendController from "./friend.controller";
const router = express.Router();
router.use("/users", UserController);
router.use("/friends", friendController);
export default router;
