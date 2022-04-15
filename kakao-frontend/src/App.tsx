import { useState } from "react";
import { Paper, Tab, Tabs, Box } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import Friends from "./pages/Friends";
import Chats from "./pages/Chats";

const App = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<string>("friends");
  const [chatId, setChatId] = useState<number | null>(null);
  const changeTab = (changedValue: string) => {
    setCurrentTab(changedValue);
    setChatId(null);
  };

  const moveToChat = (chatId: number) => {
    setCurrentTab("chats");
    setChatId(chatId);
  };
  return (
    <section>
      <Box sx={{ pb: 7 }}>
        {currentTab === "friends" && <Friends changeTab={moveToChat} />}
        {currentTab == "chats" && <Chats chatId={chatId} />}
      </Box>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "80px" }}
        elevation={3}
      >
        <Tabs centered variant="fullWidth" value={currentTab}>
          <Tab
            icon={<PeopleIcon />}
            label="친구"
            value="friends"
            onClick={() => changeTab("friends")}
          />
          <Tab
            icon={<ChatIcon />}
            label="채팅"
            value="chats"
            onClick={() => changeTab("chats")}
          />
        </Tabs>
      </Paper>
    </section>
  );
};

export default App;
