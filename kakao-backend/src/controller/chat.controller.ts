import express from "express";
import { Op } from "sequelize";
import Chat from "../model/chat.model";
import Message from "../model/message.model";
import User from "../model/user.model";
import { where } from "sequelize";
const router = express.Router();

router.get("/:chatId/messages", async (req, res) => {
  const { chatId } = req.params;
  const { userId } = req.query as ChatUSerType;

  if (!chatId || !userId) {
    return res.status(400).json();
  }
  const messages = await Message.findAll({
    where: {
      chatId,
    },
  });

  const messageList = messages.map((message) => {
    return {
      id: message.id,
      time: message.createdAt,
      message: message.message,
      isMe: BigInt(userId) == message.senderId,
    };
  });
  return res.status(200).json(messageList);
});
type ChatUSerType = {
  userId: string;
};

router.get("/", async (req, res) => {
  const { userId } = req.query as ChatUSerType;

  if (!userId) {
    return res.status(400).json();
  }
  const chats = await Chat.findAll({
    where: {
      [Op.or]: [
        {
          userId,
        },
        {
          friendId: userId,
        },
      ],
    },
    include: [
      {
        model: User,
        required: true,
      },
      {
        model: Message,
        order: [["createdAt", "desc"]], //메세지가 생성된 역순으로. 즉 가장 마지막에 온 메세지부터 보여주게.
        required: false,
        limit: 1, //제일 마지막에 보낸거 하나만 limit 정해놓음
      },
    ],
  });
  const chatList = chats.map(async (chat) => {
    const friend = chat.getDataValue("friend") as User;
    const message = chat.getDataValue("messages") as Message[];
    const unreadMessage = await Message.count({
      where: {
        chatId: chat.id,
        senderId: {
          [Op.not]: userId,
        },
        isRead: false,
      },
    });
    return {
      id: chat.id,
      name: friend.name,
      message: message.length > 0 ? message[0].message : "",
      date: message.length > 0 ? message[0].createdAt : null,
      count: unreadMessage > 0 ? unreadMessage : null,
    };
  });
  const chatRooms = await Promise.all(chatList); //Promise:js에서 비동기 처리를 의미. 이게 언젠간 처리될거야 라는 의미. 여러개를 실행해야될 경우에 기다려줘서 전부다 끝날때까지 기다려줌.
  return res.status(200).json(chatRooms);
});
type NewChatType = {
  userId: string;
  friendId: string;
};

router.post("/", async (req, res) => {
  const { userId, friendId } = req.body as NewChatType;
  if (!userId || !friendId) {
    return res.status(400).json();
  }

  const existChat = await Chat.findOne({
    where: { userId, friendId },
  });

  if (existChat) {
    return res.status(201).json({
      chatId: existChat.id,
    });
  }

  const chat = await Chat.create({
    userId,
    friendId,
  });
  return res.status(201).json({
    chatId: chat.id,
  });
});
export default router;
