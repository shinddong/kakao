import {
  Avatar,
  Container,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Grid,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/system";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ImageIcon from "@mui/icons-material/Image";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { friends } from "./data";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import FriendAdd from "./components/FriendAdd";
import axios from "axios";

type FriendType = {
  id: number;
  name: string;
  statusMessage: string;
};
const Friends = (): JSX.Element => {
  const [friendList, setFriendList] = useState<FriendType[]>([]);
  const [OriginalFriends, setOriginalFriends] = useState<FriendType[]>([]);
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const changeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    const inputText = event.currentTarget.value;
    if (inputText.length === 0) {
      setFriendList(OriginalFriends);
    } else {
      const filteredFriends = OriginalFriends.filter((friend) =>
        friend.name.includes(inputText)
      );
      setFriendList(filteredFriends);
    }
  };

  const getFriendList = async () => {
    const { data } = await axios.get<FriendType[]>(
      "http://localhost:5000/friends/1"
    );
    setOriginalFriends(data);
    setFriendList(data);
  };

  const OpenModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const finishAddFriend = async () => {
    await getFriendList();
    closeModal();
  };
  const openMenu = (event: MouseEvent<HTMLDivElement>) => {
    setAnchor(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchor(null);
  };
  useEffect(() => {
    getFriendList();
  }, []);
  return (
    <Container>
      <Modal open={open} onClose={closeModal}>
        <FriendAdd callback={finishAddFriend} />
      </Modal>
      <Menu
        open={anchor !== null}
        anchorEl={anchor}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <MenuItem>채팅하기</MenuItem>
      </Menu>
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
            <IconButton color="primary" size="large" onClick={OpenModal}>
              <PersonAddIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <List>
        {friendList.map((friend) => {
          return (
            <ListItemButton key={friend.id} onClick={openMenu}>
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
