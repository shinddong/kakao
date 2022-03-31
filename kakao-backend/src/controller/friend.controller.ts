import express from "express";
import { where } from "sequelize/types";
import Friend from "../model/friend.model";
import User from "../model/user.model";

const router = express.Router();
router.post("/", async (req, res) => {
  const { userId, phone } = req.body;

  if (!userId || !phone) {
    return res.status(400).json();
  }
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(400).json();
  }

  const friendUser = await User.findOne({
    where: {
      phone,
    },
  });
  if (!friendUser) {
    return res.status(404).json();
  }
  const existFriend = await Friend.findOne({
    where: {
      userId: user.id,
      friendId: friendUser.id,
    },
  });

  if (existFriend) {
    return res.status(400).json();
  }
  await Friend.create({
    userId: user.id,
    friendId: friendUser.id,
  });
  return res.status(201).json();
});
type FriendSearchType = {
  phone: string;
};
router.get("/search", async (req, res) => {
  const { phone } = req.query as FriendSearchType;
  if (!phone) {
    return res.status(400).json();
  }
  const searchFriend = await User.findOne({
    where: { phone },
  });
  if (!User) {
    return res.status(404).json();
  }

  return res.status(200).json(searchFriend);
});
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json();
  }

  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(400).json();
  }
  const friends = await user.$get("MyFriends", {
    include: [
      {
        model: User,
      },
    ],
  });

  const friendList = friends.map((friend) => {
    return friend.getDataValue("friendUser");
  });

  return res.status(200).json(friendList);
});

export default router;
