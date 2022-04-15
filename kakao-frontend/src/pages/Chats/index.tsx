import ChatDetail from "./components/ChatDetail";
import ChatList from "./components/ChatList";
import { Container } from "@mui/material";
import { useState, useEffect } from "react";
type ChatType = {
  chatId: number | null;
};
const Chats = (props: ChatType): JSX.Element => {
  const { chatId } = props;
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const joinChat = (chatId: number) => {
    setSelectedChat(chatId);
  };
  useEffect(() => {
    setSelectedChat(chatId);
  }, [chatId]);

  return (
    <Container>
      {selectedChat && <ChatDetail chatId={selectedChat} />}
      {!selectedChat && <ChatList joinChat={joinChat} />}
    </Container>
  );
};
export default Chats;
