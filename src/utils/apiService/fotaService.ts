import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import APIBuilder from "@/utils/apiService/APIBuilder";
// import { faker } from "@faker-js/faker";

type Response<T> = { data: T };

type FotaResult = {
  code: string;
  message: string;
};

type FirmwaresListResponse = {
  data?: {
    filename?: string; // 펌풰어 파일명
    type?: string; // 펌웨어 유형
    version: string; // 펌웨어 버전
    lastVerYn: string; // 펌웨어 버전 최신여부
    downloadUrl: string; // 펌웨어 다운로드 URL
    modelIds: string[]; // 배터리 모델 리스트
    inverters: string[]; // 인버터 브랜드 리스트
    releaseNote?: string; // 릴리즈 노트
    description?: string; // 설명
  };
} & FotaResult;

function resultFirmwaresList(): FirmwaresListResponse {
  return {
    code: "200",
    message: "success",
    data: {
      filename: "펌웨어 파일명",
      type: "펌웨어 유형",
      version: "펌웨어 버전",
      lastVerYn: "펌웨어 버전 최신여부",
      downloadUrl: "펌웨어 다운로드 URL",
      modelIds: ["배터리 모델 리스트"],
      inverters: ["인버터 브랜드 리스트"],
      releaseNote: "릴리즈 노트",
      description: "설명",
    },
  };
}

type FirmwareDetailResponse = {
  data?: {
    type: string; // 펌웨어 유형
    version: string; // 펌웨어 버전
    lastVerYn: string; // 펌웨어 버전 최신여부
    downloadUrl: string; // 펌웨어 다운로드 URL
    model: string; // 배터리 모델 ID
    inverter: string; // 인버터 브랜드
    releaseNote?: string; // 릴리즈 노트
    description?: string; // 설명
  };
} & FotaResult;

function resultFirmwareDetail(): FirmwareDetailResponse {
  return {
    code: "200",
    message: "success",
    data: {
      type: "펌웨어 유형",
      version: "펌웨어 버전",
      lastVerYn: "펌웨어 버전 최신여부",
      downloadUrl: "펌웨어 다운로드 URL",
      model: "배터리 모델 ID",
      inverter: "인버터 브랜드",
      releaseNote: "릴리즈 노트",
      description: "설명",
    },
  };
}

type FirmwareResponse = {
  data?: object;
} & FotaResult;

function resultFirmware(): FirmwareResponse {
  return {
    code: "200",
    message: "success",
    data: {},
  };
}

type FirmwareInfoAddRequest = {
  filename: string; // 펌웨어 파일명
  type: string; // 펌웨어 유형
  version: string; // 펌웨어 버전
  modelIds: string[]; // 배터리 모델 리스트
  inverters: string[]; // 인버터 브랜드 리스트
  releaseNote?: string; // 릴리즈 노트
  description?: string; // 설명
};

type FirmwareInfoFixRequest = {
  filenameFile: string; // 펌웨어 파일명
  type?: string; // 펌웨어 유형
  version: string; // 펌웨어 버전
  modelIds?: string[]; // 배터리 모델 리스트
  inverters?: string[]; // 인버터 브랜드 리스트
  releaseNote: string; // 릴리즈 노트
  description?: string; // 설명
};

type FirmwarePathParameter = {
  [key: string]: string;
  lastDate: string; // 펌웨어 배포일자
  type: string; // 펌웨어 유형
  version: string; // 펌웨어 버전
  model: string; // 배터리 모델 ID
  inverter: string; // 인버터 브랜드
};

const mock = new AxiosMockAdapter(axios);

mock.onGet(/^\/api\/v1\.0\/auth\/.*/).reply((config) => {
  try {
    // console.log("get");
    // console.log(config.url);
    let results;
    if (config.url !== undefined) {
      if (config.url.includes("/api/v1.0/fota/firmwares")) {
        // console.log("duplicate");
        results = resultFirmwaresList();
      } else if (config.url.includes("/api/v1.0/fota/firmware")) {
        // console.log("/api/v1.0/auth/terms/latest");
        results = resultFirmwareDetail();
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
      if (config.url.includes("/api/v1.0/fota/firmware")) {
        results = resultFirmware();
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
      if (config.url.includes("/api/v1.0/fota/firmware")) {
        // console.log("/api/v1.0/auth/otp/validate");
        results = resultFirmware();
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
      if (config.url.includes("/api/v1.0/fota/firmware")) {
        // console.log("/api/v1.0/auth/signout");
        results = resultFirmware();
      }
    }
    return [200, results];
  } catch (error) {
    // console.error(error);
    return [500, { message: "Internal server error" }];
  }
});
mock.onAny().passThrough();

const baseUri = "/api/v1.0/fota";

// IF-FOTA-001 펌웨어 목록 조회  Path 확인
export const firmwaresList = async (path: FirmwarePathParameter) => {
  let RequiredPath: string = "";
  Object.keys(path).forEach((key) => {
    if (path[key].length > 0) {
      RequiredPath += `/${path[key]}`;
    }
  });
  const api = APIBuilder.get(`${baseUri}/firmwares${RequiredPath}`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<FirmwaresListResponse>>();

  return data;
};

// IF-FOTA-002 펌웨어 상세 조회
export const firmwaresDetail = async (firmwareid: string) => {
  const api = APIBuilder.get(`${baseUri}/firmware/${firmwareid}`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<FirmwareDetailResponse>>();

  return data;
};

// IF-FOTA-003 펌웨어 정보 추가
export const firmwareInfoAdd = async (param: FirmwareInfoAddRequest) => {
  const api = APIBuilder.post(`${baseUri}/firmware`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<FirmwareResponse>>();

  return data;
};

// IF-FOTA-004 펌웨어 정보 수정
export const firmwareInfoFix = async (
  firmwareid: string,
  param: FirmwareInfoFixRequest
) => {
  const api = APIBuilder.put(`${baseUri}/firmware/${firmwareid}`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<FirmwareResponse>>();

  return data;
};

// IF-FOTA-005 펌웨어 정보 삭제
export const firmwareInfoDelete = async (firmwareid: string) => {
  const api = APIBuilder.delete(`${baseUri}/firmware/${firmwareid}`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<FirmwareResponse>>();

  return data;
};
