import axios from "axios";
import APIBuilder from "@/utils/apiService/APIBuilder";
import AxiosMockAdapter from "axios-mock-adapter";
import { faker } from "@faker-js/faker";

type Response<T> = { data: T };
type AccountResult = {
  code: string; // 결과코드
  message: string; // 결과 메시지
  data?: Companie[]; // 결과 데이터
  page?: number; // 페이지 위치
  size?: number; // 페이지 당 갯수
  totalPages?: number; // 전체 페이지 수
  totalElements?: number; // 전체 아이템 수
};

type Companie = {
  name: string; // 회사명
  code: string; //회사 ID
  logoFile?: string;
  branchCnt?: number; //지점 갯수
  foundedYear?: string;
  url?: string;
  description?: string;
  country?: string; // 국가
  adminFirstName?: string; // 마스터 어드민 이름
  adminLastName?: string; // 마스터 어드민 성
  modDate?: string; // 생성/수정 시간
};

const mock = new AxiosMockAdapter(axios);

const createRandomCompanis = (): Companie[] => {
  const results = [...Array(23)].map((_, index) => {
    return {
      name: faker.company.name(),
      code: `conpanyCode${index}`,
      country: faker.location.country(),
      adminFirstName: faker.person.firstName(),
      adminLastName: faker.person.lastName(),
      modDate: faker.date.anytime().toString(),
      branchCnt: faker.number.int(100),
    };
  });
  return results;
};

mock
  .onGet(`/api/v1.0/account/companies`)
  .reply(() => {
    try {
      const data = createRandomCompanis();
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
      const data = createRandomCompanis();
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
