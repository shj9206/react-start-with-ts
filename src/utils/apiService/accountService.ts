import axios from "axios";
import APIBuilder from "@/utils/apiService/APIBuilder";
import AxiosMockAdapter from "axios-mock-adapter";
import { faker } from "@faker-js/faker";

type Response<T> = { data: T };
type AccountResult = {
  code: string; // 결과코드
  message: string; // 결과 메시지
  data?: unknown; // 결과 데이터
  page?: number; // 페이지 위치
  size?: number; // 페이지 당 갯수
  totalPages?: number; // 전체 페이지 수
  totalElements?: number; // 전체 아이템 수
};

type Companie = {
  name: string; // 회사명
  code?: string; //회사 ID
  logoFile?: string; //회사 로고 파일명
  branchCnt?: number; //지점 갯수
  foundedYear: string; //설립 연도
  url?: string; //대표 url
  description?: string; //회사 설명
  street: string; //주소
  street2?: string; //상세주소
  city: string; //시
  state: string; //도/주
  country: string; // 국가
  zipCd: string; //우편번호
  latitude?: number; //위도
  longitude?: number; //경도
  suppTel?: string; //cs 전화번호
  busiTel?: string; //lges 전화번호
  suppEmail?: string; //cs 이메일
  busiEmail?: string; //cs 전화번호
  adminFirstName: string; // 마스터 어드민 이름
  adminLastName: string; // 마스터 어드민 성
  adminTel?: string; //어드민 전화번호
  adminEmail: string; //어드민 이메일
  purpose?: string; //설치 타입 선택 리스트
  modDate?: string; // 생성/수정 시간
};
type Branch = {
  compName: string;
  compCode: string;
  activeYn: number;
} & Companie;

type TransferCode = {
  fromCode: string; //이관 회사 ID
  toCode: string; //목표 회사 ID
} & Branch;

type User = {
  id: string; //사용자 ID
  name: string; //사용자 이름
  email: string; //사용자 이메일
  roleCode: string; //권한 코드
  roleName: string; //권한 명
  viewRoleYn: string; //View Only 권한 여부
  compName: string; //회사 명
  compCode: string; //회사 ID
  activeYn: string; //활성화 여부
  firstName: string; //이름
  lastName: string; //성
  description: string; //설명
  region: string; //리전
  country: string; //국가
  brchName: string; //지점 명
  brchCode: string; //지점 ID
};

const mock = new AxiosMockAdapter(axios);

const createCompanie = (): Companie => {
  return {
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
  };
};
const createRandomCompanies = (): Companie[] => {
  return Array.from({ length: 23 }, () => createCompanie());
};
mock
  .onGet(`/api/v1.0/account/companies`)
  .reply(() => {
    try {
      const data = createRandomCompanies();
      const results = {
        code: 200, // 결과코드
        message: "success", // 결과 메시지
        data: data, // 결과 데이터
        page: 1, // 페이지 위치
        size: 10, // 페이지 당 갯수
        totalPages: 30, // 전체 페이지 수
        totalElements: 24, // 전체 아이템 수
      };
      return [200, results];
    } catch (error) {
      console.error(error);
      return [500, { code: 500, message: "Internal server error" }];
    }
  })
  .onGet(`/api/v1.0/account/companycodes`)
  .reply(() => {
    try {
      const data = createRandomCompanies();
      const results = {
        code: 200, // 결과코드
        message: "success", // 결과 메시지
        data: data, // 결과 데이터
        page: 1, // 페이지 위치
        size: 10, // 페이지 당 갯수
        totalPages: 30, // 전체 페이지 수
        totalElements: 24, // 전체 아이템 수
      };
      return [200, results];
    } catch (error) {
      console.error(error);
      return [500, { code: 500, message: "Internal server error" }];
    }
  })
  .onGet(/^\/api\/v1.0\/account\/company\/?.*/)
  .reply(() => {
    try {
      const data = createCompanie();
      const results = {
        code: 200, // 결과코드
        message: "success", // 결과 메시지
        data: data, // 결과 데이터
      };
      return [200, results];
    } catch (error) {
      console.error(error);
      return [500, { code: 500, message: "Internal server error" }];
    }
  });
mock.onAny().passThrough();

//IF-AUTH-001 회사 목록 조회
export const getCompaniesList = async () => {
  const api = APIBuilder.get(`/api/v1.0/account/companies`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
//IF-ACCT-002 회사 코드 정보 조회
export const getCompaniesCode = async () => {
  const api = APIBuilder.get(`/api/v1.0/account/companycodes`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

//IF-ACCT-003 회사 상세 조회
export const getCompaniesDetail = async (companyid: string) => {
  const api = APIBuilder.get(`/api/v1.0/account/company/${companyid}`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

//IF-ACCT-004 회사 추가
export const addCompanie = async (param: Companie) => {
  const api = APIBuilder.post(`/api/v1.0/account/company`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

//IF-ACCT-005 회사 수정
export const reviseCompanie = async (companyid: string, param: Companie) => {
  const api = APIBuilder.put(`/api/v1.0/account/company/${companyid}`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

//IF-ACCT-006 회사 이관
export const transferCompanie = async (param: TransferCode) => {
  const api = APIBuilder.post(`/api/v1.0/account/company/transfer`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

//IF-ACCT-007 지점 목록 조회
export const getBranchesList = async () => {
  const api = APIBuilder.get(`/api/v1.0/account/branches`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

//IF-ACCT-008 지점 코드 목록 조회
export const getBranchesCodeList = async () => {
  const api = APIBuilder.get(`/api/v1.0/account/branchcodes`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

//IF-ACCT-009 지점 상세 조회
export const getBrancheDetail = async (branchid: string) => {
  const api = APIBuilder.get(`/api/v1.0/account/branch/${branchid}`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

//IF-ACCT-010 지점 추가
export const addBranche = async (param: Branch) => {
  const api = APIBuilder.post(`/api/v1.0/account/branch`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

//IF-ACCT-011 지점 수정
export const reviseBranche = async (branchid: string, param: Branch) => {
  const api = APIBuilder.put(`/api/v1.0/account/branch/${branchid}`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

//IF-ACCT-012 지점 이관
export const transferBranche = async (param: Branch) => {
  const api = APIBuilder.put(`/api/v1.0/account/branch/transfer`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

//IF-ACCT-013 사용자 목록 조회
export const getUserList = async () => {
  const api = APIBuilder.get(`/api/v1.0/account/users`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

//IF-ACCT-014 사용자 상세 조회
export const getUserDetail = async (userid: string) => {
  const api = APIBuilder.get(`/api/v1.0/account/user/${userid}`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

//IF-ACCT-015 사용자 추가
export const addUser = async (param: User) => {
  const api = APIBuilder.post(`/api/v1.0/account/user`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

//IF-ACCT-016 사용자 수정
export const reviseUser = async (userid: string, param: User) => {
  const api = APIBuilder.put(`/api/v1.0/account/user/${userid}`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};

//IF-ACCT-017 약관 목록 조회
export const getTermsList = async () => {
  const api = APIBuilder.get(`/api/v1.0/account/termslist`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<AccountResult>>();
  return data;
};
