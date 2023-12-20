import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { faker } from "@faker-js/faker";
import APIBuilder from "@/utils/apiService/APIBuilder";

type Response<T> = { data: T };
export type DashboardResult = {
  code: string; // 결과코드
  message: string; // 결과 메시지
  data?: unknown; // 결과 데이터
};

export type InstalledModel = {
  model: string; // 모델 명
  install: number; // 설치 수
  region: string; // 지역
};

export type InstalledMonth = {
  month: string;
  install: number;
  region: string;
};

export type InProgressSystem = {
  basic: number;
  device: number;
  region: string;
};

export type CompanyBranchNum = {
  company: number;
  branch: number;
  region: string;
};

export type SystemType = {
  total: number;
  normal: number;
  disconnect: number;
  alert: number;
};

export type AlarmType = {
  warning: number;
  error: number;
  fault: number;
  open: number;
  closed: number;
};
export type GroupInfoType = {
  groupname: string;
  groupid: string;
  systems: {
    name: string;
    code: string;
    model: string;
    status: string;
    connection: string;
  }[];
};

const mock = new AxiosMockAdapter(axios);
function randomRegion(): string {
  const regions: Array<"eu" | "us" | "au"> = ["eu", "us", "au"];
  return regions[Math.floor(Math.random() * regions.length)];
}
function randomMonth(): string {
  const months: Array<string> = ["Jul", "Aug", "Sep", "Dec", "Otc"];
  return months[Math.floor(Math.random() * months.length)];
}
function randomModelName(): string {
  const modelNames: Array<string> = [
    "ENBLOCK E",
    "ENBLOCK S",
    "FLEX",
    "PRIME(10H/16H)",
    "Gen LV",
    "Gen 2 Plus",
  ];
  return modelNames[Math.floor(Math.random() * modelNames.length)];
}
const createModel = (): InstalledModel => ({
  model: randomModelName(),
  install: faker.number.int(100),
  region: randomRegion(),
});
const createMonth = (): InstalledMonth => ({
  install: faker.number.int(100),
  month: randomMonth(),
  region: randomRegion(),
});

const createInProgress = (): InProgressSystem[] => [
  {
    basic: faker.number.int(100),
    device: faker.number.int(100),
    region: "eu",
  },
  {
    basic: faker.number.int(100),
    device: faker.number.int(100),
    region: "us",
  },
  {
    basic: faker.number.int(100),
    device: faker.number.int(100),
    region: "au",
  },
];
const createCompanyBranch = (): CompanyBranchNum[] => [
  {
    company: faker.number.int(100),
    branch: faker.number.int(100),
    region: "eu",
  },
  {
    company: faker.number.int(100),
    branch: faker.number.int(100),
    region: "us",
  },
  {
    company: faker.number.int(100),
    branch: faker.number.int(100),
    region: "au",
  },
];

const randomInstallModelList = (): InstalledModel[] =>
  Array.from({ length: 23 }, () => createModel());
const randomInstallMonthList = (): InstalledMonth[] =>
  Array.from({ length: 23 }, () => createMonth());
const randomInProgressList = (): InProgressSystem[] => createInProgress();
const randomCompanyBranchList = (): CompanyBranchNum[] => createCompanyBranch();

// IF-DASH-001 시스템 요약 정보 조회
export const getSystemInfo = async () => {
  const api = APIBuilder.get(`/api/v1.0/dashboard/system`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<DashboardResult>>();
  return data;
};
mock.onGet(`/api/v1.0/dashboard/system`).reply(() => {
  try {
    const data: SystemType = {
      total: faker.number.int(100),
      normal: faker.number.int(100),
      disconnect: faker.number.int(100),
      alert: faker.number.int(100),
    };
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-DASH-002 회사 & 지점 요약 정보 조회
export const getNumCompanyBranch = async () => {
  const api = APIBuilder.get(`/api/v1.0/dashboard/company`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<DashboardResult>>();
  return data;
};
mock.onGet(`/api/v1.0/dashboard/company`).reply(() => {
  try {
    const data = randomCompanyBranchList();
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-DASH-003 알람 요약 정보 조회
export const getAlarmInfo = async () => {
  const api = APIBuilder.get(`/api/v1.0/dashboard/alarm`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<DashboardResult>>();
  return data;
};
mock.onGet(`/api/v1.0/dashboard/alarm`).reply(() => {
  try {
    const data: AlarmType = {
      warning: faker.number.int(100),
      error: faker.number.int(100),
      fault: faker.number.int(100),
      open: faker.number.int(100),
      closed: faker.number.int(100),
    };
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-DASH-004 설치 중 시스템 요약 정보 조회
export const getInProgressDashboard = async () => {
  const api = APIBuilder.get(`/api/v1.0/dashboard/inprogess`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<DashboardResult>>();
  return data;
};
mock.onGet(`/api/v1.0/dashboard/inprogess`).reply(() => {
  try {
    const data = randomInProgressList();
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-DASH-005 월별 설치 시스템 요약 정보 조회
export const getInstallNumByMonth = async () => {
  const api = APIBuilder.get(`/api/v1.0/dashboard/install/bymonth`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<DashboardResult>>();
  return data;
};
mock.onGet(`/api/v1.0/dashboard/install/bymonth`).reply(() => {
  try {
    const data = randomInstallMonthList();
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-DASH-006 모델별 설치 시스템 요약 정보 조회
export const getInstallNumByModel = async () => {
  const api = APIBuilder.get(`/api/v1.0/dashboard/install/bymodel`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<DashboardResult>>();
  return data;
};
mock.onGet(`/api/v1.0/dashboard/install/bymodel`).reply(() => {
  try {
    const data = randomInstallModelList();
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-DASH-007 그룹별 알람 요약 정보 조회
export const getInfoByGroup = async () => {
  const api = APIBuilder.get(`/api/v1.0/dashboard/event/bygroup`)
    .withCredentials(false)
    .build();
  const { data } = await api.call<Response<DashboardResult>>();
  return data;
};
mock.onGet(`/api/v1.0/dashboard/event/bygroup`).reply(() => {
  try {
    const data: GroupInfoType = {
      groupname: faker.company.name(),
      groupid: faker.number.int(20).toString(),
      systems: Array.from({ length: 5 }, () => ({
        name: faker.system.commonFileName(),
        code: faker.system.fileName(),
        model: faker.system.commonFileName(),
        status: "good",
        connection: "good",
      })),
    };
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});
