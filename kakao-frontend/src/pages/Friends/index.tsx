import {
  Avatar,
  Container,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

const Friends = (): JSX.Element => {
  return (
    <Container>
      <List>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="친구1" secondary="상태 메시지" />
        </ListItemButton>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="친구2" secondary="상태 메시지" />
        </ListItemButton>
      </List>
    </Container>
  );
};
export default Friends;
