type ChatType = {
  id: number;
  name: string;
  message: string;
  count?: number;
  date: Date;
};
type ChatMesssageType = {
  time: Date;
  message: string;
  isMe: boolean;
};
export const messages: ChatMesssageType[] = [
  {
    time: new Date(),
    message: "머해",
    isMe: false,
  },
  {
    time: new Date(),
    message: "집",
    isMe: true,
  },
  {
    time: new Date(),
    message: "밥먹자",
    isMe: true,
  },
  {
    time: new Date(),
    message: "ㅇㅋ",
    isMe: false,
  },
  {
    time: new Date(),
    message: "5분 이따 감",
    isMe: false,
  },
  {
    time: new Date(),
    message: "오키",
    isMe: true,
  },
];
export const chats: ChatType[] = [
  {
    id: 1,
    name: "kim",
    message: "머해",
    count: 1,
    date: new Date(),
  },
  {
    id: 2,
    name: "짱구",
    message: "ㅂㅇ",
    date: new Date(),
  },
  {
    id: 4,
    name: "맹구",
    message: "ㅎㅇ",
    count: 4,
    date: new Date(),
  },
  {
    id: 5,
    name: "훈이",
    message: "ㄱㄱ",
    date: new Date(),
  },
  {
    id: 3,
    name: "수지",
    message: "배고파",
    count: 2,
    date: new Date(),
  },
  {
    id: 6,
    name: "철수",
    message: "몰라",
    date: new Date(),
  },
  {
    id: 7,
    name: "신형만",
    message: "gg",
    date: new Date(),
  },
];
