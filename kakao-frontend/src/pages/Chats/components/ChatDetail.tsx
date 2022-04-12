import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { messages } from "../data";

const ChatDetail = (): JSX.Element => {
  const [ChatMessages, setChatMessages] = useState(messages);
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
        {ChatMessages.map((message) => {
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
          <TextField fullWidth />
        </Box>
        <Box sx={{ width: "15 %", p: 1 }}>
          <Button variant="contained" color="primary" fullWidth>
            전송
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default ChatDetail;
