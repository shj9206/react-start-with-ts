import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import APIBuilder from "@/utils/apiService/APIBuilder";
// import { faker } from "@faker-js/faker";

type Response<T> = { data: T };

type SettingsResult = {
  code: string; // 결과 코드
  message: string; // 결과 메세지
};

type SettingsListResponse = {
  data?: {
    seq?: number; // 코드 ID
    groupCode?: string; // 그룹 코드
    code?: string; // 코드
    ordinal?: string; // 순서
    name?: string; // 코드 명
    resv1?: string; // 임시 필드1
    resv2?: string; // 임시 필드2
    description?: string; // 설명
  };
  page?: number; // 페이지 위치
  size?: number; // 페이지 당 갯수
  totalPages?: number; // 전체 페이지 수
  totalElements?: number; // 전체 아이템 수
} & SettingsResult;

function resultSettingsList(): SettingsListResponse {
  return {
    code: "200",
    message: "success",
    data: {
      seq: 0,
      groupCode: "그룹 코드",
      code: "코드",
      ordinal: "순서",
      name: "코드 명",
      resv1: "임시 필드1",
      resv2: "임시 필드2",
      description: "설명",
    },
    page: 2,
    size: 2,
    totalPages: 2,
    totalElements: 2,
  };
}

type SettingsResponse = {
  data?: object;
} & SettingsResult;

function resultSettings(): SettingsResponse {
  return {
    code: "200",
    message: "success",
    data: {},
  };
}

type SettingsCodeAddFixRequest = {
  groupCode?: string; // 그룹 코드
  code?: string; // 코드
  ordinal?: []; // 순서
  name?: string; // 코드 명
  resv1?: string; // 임시 필드 1
  resv2?: string; // 임시 필드 2
  description?: string; // 설명
};

const mock = new AxiosMockAdapter(axios);

mock.onGet(/^\/api\/v1\.0\/auth\/.*/).reply((config) => {
  try {
    // console.log("get");
    // console.log(config.url);
    let results;
    if (config.url !== undefined) {
      if (config.url.includes("/api/v1.0/settings/codes")) {
        // console.log("duplicate");
        results = resultSettingsList();
      }
    }
    return [200, results];
  } catch (error) {
    // console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

mock.onPost(/^\/api\/v1\.0\/auth\/.*/).reply((config) => {
  try {
    let results;
    // console.log("post");
    // console.log(config.url);
    if (config.url !== undefined) {
      if (config.url.includes("/api/v1.0/settings/code")) {
        results = resultSettings();
        // console.log("/api/v1.0/auth/signup");
      }
    }
    return [200, results];
  } catch (error) {
    // console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

mock.onPut(/^\/api\/v1\.0\/auth\/.*/).reply((config) => {
  try {
    // console.log("put");
    // console.log(config.url);
    let results;
    if (config.url !== undefined) {
      if (config.url.includes("/api/v1.0/settings/code")) {
        // console.log("/api/v1.0/auth/otp/validate");
        results = resultSettings();
      }
    }
    return [200, results];
  } catch (error) {
    // console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

mock.onDelete(/^\/api\/v1\.0\/auth\/.*/).reply((config) => {
  try {
    // console.log("delete");
    // console.log(config.url);
    let results;
    if (config.url !== undefined) {
      if (config.url.includes("/api/v1.0/settings/code")) {
        // console.log("/api/v1.0/auth/signout");
        results = resultSettings();
      }
    }
    return [200, results];
  } catch (error) {
    // console.error(error);
    return [500, { message: "Internal server error" }];
  }
});
mock.onAny().passThrough();

const baseUri = "/api/v1.0/settings";

// IF-SETT-001 공통코드 목록 조회  Query 있음
export const settingsCodeList = async () => {
  const api = APIBuilder.get(`${baseUri}/codes`).withCredentials(true).build();
  const { data } = await api.call<Response<SettingsListResponse>>();

  return data;
};

// IF-SETT-002 공통코드 추가
export const settingsCodeAdd = async (param: SettingsCodeAddFixRequest) => {
  const api = APIBuilder.post(`${baseUri}/code`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<SettingsResponse>>();

  return data;
};

// IF-SETT-003 공통코드 추가
export const settingsCodeFix = async (
  codeid: string,
  param: SettingsCodeAddFixRequest
) => {
  const api = APIBuilder.put(`${baseUri}/code/${codeid}`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<SettingsResponse>>();

  return data;
};

// IF-SETT-004 공통코드 삭제
export const settingsCodeDelete = async (codeid: string) => {
  const api = APIBuilder.delete(`${baseUri}/code/${codeid}`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<SettingsResponse>>();

  return data;
};
