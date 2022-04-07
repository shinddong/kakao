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
import { chats } from "../data";
import { useState } from "react";

type ChatType = {
  id: number;
  name: string;
  message: string;
  count?: number;
  date: Date;
};

const ChatList = (): JSX.Element => {
  const [chatData, setChatData] = useState<ChatType[]>(chats);
  return (
    <List>
      {chatData.map((friend) => {
        return (
          <ListItemButton key={friend.id}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<ChatTitle name={friend.name} date={friend.date} />}
              secondary={
                <ChatLatestStatus
                  message={friend.message}
                  count={friend.count}
                />
              }
            />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default ChatList;
