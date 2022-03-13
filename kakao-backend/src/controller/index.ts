import express from "express";
import schoolController from "./school.controller";
import todoController from "./todo.controller";
const router = express.Router();
router.use("/schools", schoolController); // /schools/ 이 구존데, 라우터 거치면서 /schools 지워지고 남은거 /하나.

export default router;
