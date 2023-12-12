export type SubMenuType = {
  id: number;
  text: string;
  selected: boolean;
  value: string;
};
export type MainMenuType = {
  id: number;
  name: string;
  value: string;
  subMenu: SubMenuType[];
};

export const mainMenu: MainMenuType[] = [
  {
    id: 1,
    name: "Dash Board",
    value: "dashboard",
    subMenu: [
      { id: 11, text: "Dash Board", selected: false, value: "dashboard" },
    ],
  },
  {
    id: 2,
    name: "User Management",
    value: "userManage",
    subMenu: [
      { id: 21, text: "User Management", selected: false, value: "userManage" },
    ],
  },
  {
    id: 3,
    name: "FOTA",
    value: "fota",
    subMenu: [
      {
        id: 31,
        text: "Firmware Registration",
        selected: false,
        value: "firmRegist",
      },
      { id: 32, text: "Firmware List", selected: false, value: "firmList" },
      {
        id: 33,
        text: "Firmware Management",
        selected: false,
        value: "firmManage",
      },
      { id: 34, text: "Firmware Update", selected: false, value: "firmUpdate" },
      { id: 35, text: "FOTA Status", selected: false, value: "fotaStat" },
      { id: 36, text: "FOTA History", selected: false, value: "fotaHis" },
      { id: 37, text: "Create Package", selected: false, value: "createPack" },
    ],
  },
  {
    id: 4,
    name: "Devise",
    value: "devise",
    subMenu: [{ id: 41, text: "Devise", selected: false, value: "devise" }],
  },
  {
    id: 5,
    name: "Setting",
    value: "setting",
    subMenu: [{ id: 51, text: "Setting", selected: false, value: "setting" }],
  },
];
