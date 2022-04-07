import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const ChatDetail = (): JSX.Element => {
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            pl: "5px",
            pr: "5px",
          }}
        >
          <Box>
            <Typography variant="caption">2022-04-01 18:00:00</Typography>
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
                    __html: "헬로asfasf<br />ㄴㅇㄴㄹ",
                  }}
                ></span>
              </Typography>
            </Paper>
          </Box>
        </Box>

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
                    __html: "헬로asfasf<br />ㄴㅇㄴㄹ",
                  }}
                ></span>
              </Typography>
            </Paper>
            <Typography variant="caption">2022-04-01 18:00:00</Typography>
          </Box>
        </Box>
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
