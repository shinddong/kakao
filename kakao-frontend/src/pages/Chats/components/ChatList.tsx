import {
  ListItemButton,
  ListItemText,
  List,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ChatTitle from "./ChatTitle";
import ChatLatestStatus from "./ChatLatestStatus";
import { useEffect, useState } from "react";
import axios from "axios";

type ChatType = {
  id: number;
  name: string;
  message: string;
  count?: number;
  date: Date;
};
type ChatSelectType = {
  joinChat: (chatId: number) => void;
};

const ChatList = (props: ChatSelectType): JSX.Element => {
  const { joinChat } = props;
  const [chatList, setChatList] = useState<ChatType[]>([]);

  const loadChatList = async () => {
    const { data } = await axios.get<ChatType[]>(
      "http://localhost:5000/chats",
      {
        params: {
          userId: 1,
        },
      }
    );
    setChatList(data);
  };
  useEffect(() => {
    loadChatList();
  }, []);

  return (
    <List>
      {chatList.map((chat) => {
        return (
          //클릭할때만 실행할 수 있게 onclick 함수로 감싸주기.
          <ListItemButton key={chat.id} onClick={() => joinChat(chat.id)}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<ChatTitle name={chat.name} date={chat.date} />}
              secondary={
                <ChatLatestStatus message={chat.message} count={chat.count} />
              }
            />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default ChatList;
