import express from "express";
import UserController from "./user.controller";
import friendController from "./friend.controller";
import chatController from "./chat.controller";
const router = express.Router();
router.use("/users", UserController);
router.use("/friends", friendController);
router.use("/chats", chatController);
export default router;
