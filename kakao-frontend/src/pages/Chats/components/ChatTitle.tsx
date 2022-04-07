import { Box, Typography } from "@mui/material";
type ChatTitleType = {
  name: string;
  date: Date;
};

const ChatTitle = (props: ChatTitleType): JSX.Element => {
  const { name, date } = props;
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography>{name}</Typography>
      <Typography>{date.toLocaleString()}</Typography>
    </Box>
  );
};

export default ChatTitle;
