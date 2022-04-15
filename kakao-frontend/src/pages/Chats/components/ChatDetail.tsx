import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { WebSocketContext } from "../../../config/WebSocketProvider";
import { useState, useEffect, useContext, ChangeEvent } from "react";
import axios from "axios";

type ChatMessageType = {
  id: number;
  time: Date;
  message: string;
  isMe: boolean;
};
type ChatDetailType = {
  chatId: number;
};
type ReceiveMessageType = {
  chatId: number;
  senderId: number;
  id: number;
  message: string;
  isRead: boolean;
  time: Date;
};
const ChatDetail = (props: ChatDetailType): JSX.Element => {
  const { chatId } = props;
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState<ChatMessageType>();
  const ws = useContext(WebSocketContext);
  const changeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    const inputText = event.currentTarget.value;
    setMessage(inputText);
  };
  const sendMessage = () => {
    console.log(ws.current);
    ws.current.emit("sendMessage", {
      chatId,
      senderId: 1,
      message,
    });
  };
  const loadMessage = async () => {
    const { data } = await axios.get<ChatMessageType[]>(
      `http://localhost:5000/chats/${chatId}/messages`,
      {
        params: {
          userId: 1,
        },
      }
    );
    setChatMessages(data);
  };

  const receiveMessage = (received: ReceiveMessageType) => {
    const { id, time, message, senderId } = received;
    const isMe = senderId === 1;
    const chatMessage: ChatMessageType = {
      id,
      isMe,
      message,
      time,
    };

    setNewMessage(chatMessage);
  };
  useEffect(() => {
    loadMessage();
    ws.current.emit("joinRoom", { chatId });
    ws.current.on("receiveMessage", (data: ReceiveMessageType) => {
      receiveMessage(data);
    });
  }, []);

  useEffect(() => {
    if (newMessage) {
      setChatMessages([...chatMessages, newMessage]);
    }
  }, [newMessage]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "calc(100vh - 80px)",
      }}
    >
      <Stack
        spacing={1}
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "calc(100vh - 160px)",
        }}
      >
        {chatMessages.map((message) => {
          return (
            <>
              {message.isMe ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    pl: "5px",
                    pr: "5px",
                  }}
                >
                  <Box>
                    <Typography variant="caption">
                      {message.time.toLocaleString()}
                    </Typography>
                    <Paper
                      elevation={1}
                      sx={{
                        display: "inline-block",
                        padding: "10px",
                        maxWidth: "60%",
                        backgroundColor: "#fff712",
                        borderRadius: "20px",
                      }}
                    >
                      <Typography variant="body2">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: message.message,
                          }}
                        ></span>
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justufyContend: "flex-start",
                    pl: "5px",
                    pr: "5px",
                  }}
                >
                  <Box>
                    <Paper
                      elevation={1}
                      sx={{
                        display: "inline-block",
                        padding: "10px",
                        maxWidth: "60%",
                        backgroundColor: "#e8e8e8",
                        borderRadius: "20px",
                      }}
                    >
                      <Typography variant="body2">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: message.message,
                          }}
                        ></span>
                      </Typography>
                    </Paper>
                    <Typography variant="caption">
                      {message.time.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              )}
            </>
          );
        })}
      </Stack>
      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          position: "fixed",
          bottom: "80px",
          left: 0,
          right: 0,
        }}
      >
        <Box sx={{ width: "85%" }}>
          <TextField fullWidth onChange={changeMessage} />
        </Box>
        <Box sx={{ width: "15 %", p: 1 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={sendMessage}
          >
            전송
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default ChatDetail;
