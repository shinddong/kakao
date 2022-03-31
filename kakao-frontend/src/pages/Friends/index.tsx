import {
  Avatar,
  Container,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ImageIcon from "@mui/icons-material/Image";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { friends } from "./data";
import { useState, ChangeEvent } from "react";
import FriendAdd from "./components/FriendAdd";

const Friends = (): JSX.Element => {
  const [friendList, setFriendList] = useState(friends);
  const [open, setOpen] = useState(false);
  const changeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    const inputText = event.currentTarget.value;
    if (inputText.length === 0) {
      setFriendList(friends);
    } else {
      const filteredFriends = friends.filter((friend) =>
        friend.name.includes(inputText)
      );
      setFriendList(filteredFriends);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <Modal open={open} onClose={handleClose}>
        <FriendAdd />
      </Modal>
      <Grid container>
        <Grid item xs={10.5}>
          <TextField
            label="친구 검색"
            variant="outlined"
            fullWidth
            margin="dense"
            onChange={changeSearchText}
          />
        </Grid>
        <Grid item xs={1.5}>
          <Box sx={{ p: "8px" }}>
            <IconButton color="primary" size="large" onClick={handleOpen}>
              <PersonAddIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <List>
        {friendList.map((friend) => {
          return (
            <ListItemButton key={friend.id}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={friend.name}
                secondary={friend.statusMessage}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Container>
  );
};

export default Friends;
