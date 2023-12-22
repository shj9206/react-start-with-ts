import AxiosMockAdapter from "axios-mock-adapter";
import { faker } from "@faker-js/faker";
import axios from "axios";
import { API_PREFIX } from "@/utils/apiService/config/apiConfig.ts";
import {
  Branch,
  Company,
  Terms,
  User,
} from "@/utils/apiService/accountService.ts";

const baseAccountUri = `${API_PREFIX}/account`;

const createRandomCompanies = (): Company[] =>
  Array.from({ length: 23 }, () => createComp());
const createRandomBranches = (): Branch[] =>
  Array.from({ length: 10 }, () => createBranch());
const createRandomUsers = (): User[] =>
  Array.from({ length: 10 }, () => createUser());
const createRandomTerms = (): Terms[] =>
  Array.from({ length: 10 }, () => createTerms());

function randomRegion(): string {
  const regions: Array<"kr" | "eu" | "us" | "au"> = ["kr", "eu", "us", "au"];
  return regions[Math.floor(Math.random() * regions.length)];
}

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

export default function setupAccountMocks() {
  const mock = new AxiosMockAdapter(axios);

  mock.onGet(`${baseAccountUri}/account/companies`).reply(() => {
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

  mock.onPut(/^\/api\/v1.0\/account\/company\/?.*/, createComp()).reply(() => {
    try {
      return [200, { code: 200, message: "success" }];
    } catch (error) {
      return [500, { code: 500, message: "Internal server error" }];
    }
  });

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

  mock.onPost(`${API_PREFIX}/account/branch`, createBranch()).reply(() => {
    try {
      return [200, { code: 200, message: "success" }];
    } catch (error) {
      return [500, { code: 500, message: "Internal server error" }];
    }
  });

  mock.onPut(/^\/api\/v1.0\/account\/branch\/?.*/, createBranch()).reply(() => {
    try {
      return [200, { code: 200, message: "success" }];
    } catch (error) {
      return [500, { code: 500, message: "Internal server error" }];
    }
  });

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

  mock.onPost(`${API_PREFIX}/account/user`, createUser()).reply(() => {
    try {
      return [200, { code: 200, message: "success" }];
    } catch (error) {
      return [500, { code: 500, message: "Internal server error" }];
    }
  });

  mock.onPut(/^\/api\/v1.0\/account\/user\/?.*/, createUser()).reply(() => {
    try {
      return [200, { code: 200, message: "success" }];
    } catch (error) {
      return [500, { code: 500, message: "Internal server error" }];
    }
  });

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

  mock.onPost(`${API_PREFIX}/account/terms`, createTerms()).reply(() => {
    try {
      return [200, { code: 200, message: "success" }];
    } catch (error) {
      return [500, { code: 500, message: "Internal server error" }];
    }
  });

  mock.onPut(/^\/api\/v1.0\/account\/terms\/?.*/, createTerms()).reply(() => {
    try {
      return [200, { code: 200, message: "success" }];
    } catch (error) {
      return [500, { code: 500, message: "Internal server error" }];
    }
  });

  mock.onDelete(/^\/api\/v1.0\/account\/terms\/?.*/).reply(() => {
    try {
      return [200, { code: 200, message: "success" }];
    } catch (error) {
      return [500, { code: 500, message: "Internal server error" }];
    }
  });

  mock
    .onPost(`${API_PREFIX}/account/company/transfer`, createComp())
    .reply(() => {
      try {
        return [200, { code: 200, message: "success" }];
      } catch (error) {
        return [500, { code: 500, message: "Internal server error" }];
      }
    });

  mock
    .onPut(`${API_PREFIX}/account/branch/transfer`, createBranch())
    .reply(() => {
      try {
        return [200, { code: 200, message: "success" }];
      } catch (error) {
        return [500, { code: 500, message: "Internal server error" }];
      }
    });

  mock.onAny().passThrough();
}
