import express from "express";
import SchoolModel from "../model/school.model";
type School = {
  name: string;
}; //데이터가 뭐가 들어올 지 모르겠을 때는 type을 만들어주는 게 도움이 됨.

const router = express.Router();

router.get("/", async (req, res) => {
  const schools: SchoolModel[] = await SchoolModel.findAll();
  res.status(200).json(schools); // 함수 축약시켜놓은 것.
});
router.get("/:schoolId", async (req, res) => {
  const { schoolId } = req.params;
  if (!schoolId) {
    return res.status(400).json();
  }

  const schoolIdNumber: number = parseInt(schoolId, 10);
  const school: SchoolModel | null = await SchoolModel.findByPk(schoolIdNumber);
  if (!school) {
    return res.status(404).json();
  }

  return res.status(200).json(school);
});

router.post("/", (req, res) => {
  const school: School = req.body as School;
  if (!school) {
    return res.status(400).json();
  }

  SchoolModel.create({
    name: school.name,
  });

  return res.status(201).json();
});

export default router;
