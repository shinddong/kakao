import { Box, Typography, Chip } from "@mui/material";
type ChatLatestStatusType = {
  message: string;
  count?: number;
};
const ChatLatestStatus = (props: ChatLatestStatusType): JSX.Element => {
  const { message, count } = props;
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography>{message}</Typography>
      {count && <Chip color="error" label={count} />}
    </Box>
  );
};
export default ChatLatestStatus;
