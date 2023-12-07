import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { faker } from "@faker-js/faker";
import APIBuilder from "@/utils/apiService/APIBuilder";
import { API_PREFIX } from "./config/apiConfig.ts";

type Response<T> = { data: T };
export type AccountResult = {
  code: string; // 결과코드
  message: string; // 결과 메시지
  data?: unknown; // 결과 데이터
  page?: number; // 페이지 위치
  size?: number; // 페이지 당 갯수
  totalPages?: number; // 전체 페이지 수
  totalElements?: number; // 전체 아이템 수
};

export type Company = {
  name: string; // 회사명
  code?: string; // 회사 ID
  logoFile?: string; // 회사 로고 파일명
  branchCnt?: number; // 지점 갯수
  foundedYear: string; // 설립 연도
  url?: string; // 대표 url
  description?: string; // 회사 설명
  street: string; // 주소
  street2?: string; // 상세주소
  city: string; // 시
  state: string; // 도/주
  country: string; // 국가
  zipCd: string; // 우편번호
  latitude?: number; // 위도
  longitude?: number; // 경도
  suppTel?: string; // cs 전화번호
  busiTel?: string; // lges 전화번호
  suppEmail?: string; // cs 이메일
  busiEmail?: string; // cs 전화번호
  adminFirstName: string; // 마스터 어드민 이름
  adminLastName: string; // 마스터 어드민 성
  adminTel?: string; // 어드민 전화번호
  adminEmail: string; // 어드민 이메일
  purpose?: string; // 설치 타입 선택 리스트
  modDate?: string; // 생성/수정 시간
  region?: string;
};
export type Branch = {
  compName: string;
  compCode: string;
  activeYn: number;
} & Company;

type TransferCode = {
  fromCode: string; // 이관 회사 ID
  toCode: string; // 목표 회사 ID
} & Branch;

export type User = {
  id: string; // 사용자 ID
  name: string; // 사용자 이름
  email: string; // 사용자 이메일
  roleCode: string; // 권한 코드
  roleName: string; // 권한 명
  viewRoleYn: string; // View Only 권한 여부
  compName: string; // 회사 명
  compCode: string; // 회사 ID
  activeYn: string; // 활성화 여부
  firstName: string; // 이름
  lastName: string; // 성
  description: string; // 설명
  region: string; // 리전
  country: string; // 국가
  brchName: string; // 지점 명
  brchCode: string; // 지점 ID
};

type Terms = {
  userType: string; // 사용자구분
  type: string; // 약관 구분
  version: string; // 약관 버전
  requiredYn: string; // 필수 동의 여부
  lang: string; // 약관 언어
  title: string; // 약관 제목
  contents: string; // 약관 내용
};

const mock = new AxiosMockAdapter(axios);

function randomRegion(): string {
  const regions: Array<"kr" | "eu" | "us" | "au"> = ["kr", "eu", "us", "au"];
  return regions[Math.floor(Math.random() * regions.length)];
}
const createBranch = (): Branch => ({
  name: faker.company.name(),
  code: "",
  compName: faker.company.name(),
  compCode: "",
  activeYn: 0,
  foundedYear: "",
  city: faker.location.city(),
  state: faker.location.state(),
  country: faker.location.country(),
  zipCd: faker.location.zipCode(),
  street: faker.location.street(),
  adminFirstName: faker.person.firstName(),
  adminLastName: faker.person.lastName(),
  adminEmail: "emailsample",
  modDate: faker.date.anytime().toString(),
  branchCnt: faker.number.int(100),
  region: randomRegion(),
});
const createComp = (): Company => ({
  name: faker.company.name(),
  foundedYear: "",
  city: faker.location.city(),
  state: faker.location.state(),
  country: faker.location.country(),
  zipCd: faker.location.zipCode(),
  street: faker.location.street(),
  adminFirstName: faker.person.firstName(),
  adminLastName: faker.person.lastName(),
  adminEmail: "emailsample",
  modDate: faker.date.anytime().toString(),
  branchCnt: faker.number.int(100),
  region: randomRegion(),
});

const createUser = (): User => ({
  id: "",
  name: faker.person.fullName(),
  email: "emailSample",
  roleCode: "",
  roleName: "",
  viewRoleYn: "",
  compName: faker.company.name(),
  compCode: "",
  activeYn: "Y",
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  description: "",
  region: randomRegion(),
  country: faker.location.country(),
  brchName: faker.company.name(),
  brchCode: "",
});

const createTerms = (): Terms => ({
  userType: "",
  type: "",
  version: "",
  requiredYn: "",
  lang: "",
  title: "",
  contents: "",
});

const createRandomCompanies = (): Company[] =>
  Array.from({ length: 23 }, () => createComp());
const createRandomBranches = (): Branch[] =>
  Array.from({ length: 10 }, () => createBranch());
const createRandomUsers = (): User[] =>
  Array.from({ length: 10 }, () => createUser());
const createRandomTerms = (): Terms[] =>
  Array.from({ length: 10 }, () => createTerms());

// IF-AUTH-001 회사 목록 조회
export const getCompaniesList = async () => {
  const api = APIBuilder.get(`${API_PREFIX}/account/companies`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onGet(`${API_PREFIX}/account/companies`).reply(() => {
  try {
    const data = createRandomCompanies();
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
      page: 1, // 페이지 위치
      size: 10, // 페이지 당 갯수
      totalPages: 30, // 전체 페이지 수
      totalElements: 24, // 전체 아이템 수
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-ACCT-002 회사 코드 정보 조회
export const getCompaniesCode = async () => {
  const api = APIBuilder.get(`${API_PREFIX}/account/companycodes`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onGet(`${API_PREFIX}/account/companycodes`).reply(() => {
  try {
    const data = createRandomCompanies();
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
      page: 1, // 페이지 위치
      size: 10, // 페이지 당 갯수
      totalPages: 30, // 전체 페이지 수
      totalElements: 24, // 전체 아이템 수
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});
// IF-ACCT-003 회사 상세 조회
export const getCompaniesDetail = async (companyid: string) => {
  const api = APIBuilder.get(`${API_PREFIX}/account/company/${companyid}`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onGet(/^\/api\/v1.0\/account\/company\/?.*/).reply(() => {
  try {
    const data = createComp();
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

// IF-ACCT-004 회사 추가
export const addCompanie = async (param: Company) => {
  const api = APIBuilder.post(`${API_PREFIX}/account/company`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onPost(`${API_PREFIX}/account/company`, createComp()).reply(() => {
  try {
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});
// IF-ACCT-005 회사 수정
export const reviseCompanie = async (companyid: string, param: Company) => {
  const api = APIBuilder.put(
    `${API_PREFIX}/account/company/${companyid}`,
    param,
  )
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

mock.onPut(/^\/api\/v1.0\/account\/company\/?.*/, createComp()).reply(() => {
  try {
    return [200, { code: 200, message: "success" }];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-ACCT-006 회사 이관
export const transferCompanie = async (param: TransferCode) => {
  const api = APIBuilder.post(`${API_PREFIX}/account/company/transfer`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock
  .onPost(`${API_PREFIX}/account/company/transfer`, createComp())
  .reply(() => {
    try {
      return [200, { code: 200, message: "success" }];
    } catch (error) {
      return [500, { code: 500, message: "Internal server error" }];
    }
  });

// IF-ACCT-007 지점 목록 조회
export const getBranchesList = async () => {
  const api = APIBuilder.get(`${API_PREFIX}/account/branches`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onGet(`${API_PREFIX}/account/branches`).reply(() => {
  try {
    const data = createRandomBranches();
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
      page: 1, // 페이지 위치
      size: 10, // 페이지 당 갯수
      totalPages: 30, // 전체 페이지 수
      totalElements: 24, // 전체 아이템 수
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-ACCT-008 지점 코드 목록 조회
export const getBranchesCodeList = async () => {
  const api = APIBuilder.get(`${API_PREFIX}/account/branchcodes`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onGet(`${API_PREFIX}/account/branchcodes`).reply(() => {
  try {
    const data = createRandomBranches();
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
      page: 1, // 페이지 위치
      size: 10, // 페이지 당 갯수
      totalPages: 30, // 전체 페이지 수
      totalElements: 24, // 전체 아이템 수
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-ACCT-009 지점 상세 조회
export const getBrancheDetail = async (branchid: string) => {
  const api = APIBuilder.get(`${API_PREFIX}/account/branch/${branchid}`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onGet(/^\/api\/v1.0\/account\/branch\/?.*/).reply(() => {
  try {
    const data = createBranch();
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
      page: 1, // 페이지 위치
      size: 10, // 페이지 당 갯수
      totalPages: 30, // 전체 페이지 수
      totalElements: 24, // 전체 아이템 수
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-ACCT-010 지점 추가
export const addBranche = async (param: Branch) => {
  const api = APIBuilder.post(`${API_PREFIX}/account/branch`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onPost(`${API_PREFIX}/account/branch`, createBranch()).reply(() => {
  try {
    return [200, { code: 200, message: "success" }];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-ACCT-011 지점 수정
export const reviseBranche = async (branchid: string, param: Branch) => {
  const api = APIBuilder.put(`${API_PREFIX}/account/branch/${branchid}`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onPut(/^\/api\/v1.0\/account\/branch\/?.*/, createBranch()).reply(() => {
  try {
    return [200, { code: 200, message: "success" }];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-ACCT-012 지점 이관
export const transferBranche = async (param: Branch) => {
  const api = APIBuilder.put(`${API_PREFIX}/account/branch/transfer`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock
  .onPut(`${API_PREFIX}/account/branch/transfer`, createBranch())
  .reply(() => {
    try {
      return [200, { code: 200, message: "success" }];
    } catch (error) {
      return [500, { code: 500, message: "Internal server error" }];
    }
  });

// IF-ACCT-013 사용자 목록 조회
export const getUserList = async () => {
  const api = APIBuilder.get(`${API_PREFIX}/account/users`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onGet(`${API_PREFIX}/account/users`).reply(() => {
  try {
    const data = createRandomUsers();
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
      page: 1, // 페이지 위치
      size: 10, // 페이지 당 갯수
      totalPages: 30, // 전체 페이지 수
      totalElements: 24, // 전체 아이템 수
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-ACCT-014 사용자 상세 조회
export const getUserDetail = async (userid: string) => {
  const api = APIBuilder.get(`${API_PREFIX}/account/user/${userid}`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onGet(/^\/api\/v1.0\/account\/user\/?.*/).reply(() => {
  try {
    const data = createUser();
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
      page: 1, // 페이지 위치
      size: 10, // 페이지 당 갯수
      totalPages: 30, // 전체 페이지 수
      totalElements: 24, // 전체 아이템 수
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-ACCT-015 사용자 추가
export const addUser = async (param: User) => {
  const api = APIBuilder.post(`${API_PREFIX}/account/user`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onPost(`${API_PREFIX}/account/user`, createUser()).reply(() => {
  try {
    return [200, { code: 200, message: "success" }];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-ACCT-016 사용자 수정
export const reviseUser = async (userid: string, param: User) => {
  const api = APIBuilder.put(`${API_PREFIX}/account/user/${userid}`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onPut(/^\/api\/v1.0\/account\/user\/?.*/, createUser()).reply(() => {
  try {
    return [200, { code: 200, message: "success" }];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-ACCT-017 약관 목록 조회
export const getTermsList = async () => {
  const api = APIBuilder.get(`${API_PREFIX}/account/termslist`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onGet(`${API_PREFIX}/account/termslist`).reply(() => {
  try {
    const data = createRandomTerms();
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
      page: 1, // 페이지 위치
      size: 10, // 페이지 당 갯수
      totalPages: 30, // 전체 페이지 수
      totalElements: 24, // 전체 아이템 수
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-ACCT-018 약관 상세 조회
export const getTermsDeteil = async (termsid: string) => {
  const api = APIBuilder.get(`${API_PREFIX}/account/terms/${termsid}`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onGet(/^\/api\/v1.0\/account\/terms\/?.*/).reply(() => {
  try {
    const data = createTerms();
    const results = {
      code: 200, // 결과코드
      message: "success", // 결과 메시지
      data, // 결과 데이터
      page: 1, // 페이지 위치
      size: 10, // 페이지 당 갯수
      totalPages: 30, // 전체 페이지 수
      totalElements: 24, // 전체 아이템 수
    };
    return [200, results];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-ACCT-019 약관 추가
export const addTerms = async (param: Terms) => {
  const api = APIBuilder.post(`${API_PREFIX}/account/terms`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onPost(`${API_PREFIX}/account/terms`, createTerms()).reply(() => {
  try {
    return [200, { code: 200, message: "success" }];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-ACCT-020 약관 수정
export const reviseTerms = async (termsid: string, param: Terms) => {
  const api = APIBuilder.put(`${API_PREFIX}/account/terms/${termsid}`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onPut(/^\/api\/v1.0\/account\/terms\/?.*/, createTerms()).reply(() => {
  try {
    return [200, { code: 200, message: "success" }];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});

// IF-ACCT-021 약관 삭제
export const deleteTerms = async (termsid: string) => {
  const api = APIBuilder.delete(`${API_PREFIX}/account/terms/${termsid}`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
mock.onDelete(/^\/api\/v1.0\/account\/terms\/?.*/).reply(() => {
  try {
    return [200, { code: 200, message: "success" }];
  } catch (error) {
    return [500, { code: 500, message: "Internal server error" }];
  }
});
mock.onAny().passThrough();
