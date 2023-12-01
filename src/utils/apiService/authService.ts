import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import APIBuilder from "@/utils/apiService/APIBuilder";
// import { faker } from "@faker-js/faker";

type Response<T> = { data: T };

type AuthResult = {
  code: string;
  message: string;
};

type EmailDuplicateResponse = {
  data?: {
    region?: string; //  중복리전 위치
  };
} & AuthResult;

function resultEmailDuplicate(): EmailDuplicateResponse {
  return {
    code: "200",
    message: "success",
    data: { region: "US" },
  };
}

type LatestTermsResponse = {
  data: [
    {
      type: string; //  약관 구분
      version: string; //  약관 버전
      requiredYn: string; //  필수 동의 여부
      lang: string; //  약관 언어
      title: string; //  약관 제목
      contents: string; //  약관 내용
    }
  ];
} & AuthResult;

function resultLatestTerms(): LatestTermsResponse {
  return {
    code: "200",
    message: "success",
    data: [
      {
        type: "약관 구분",
        version: "약관 버전",
        requiredYn: "필수 동의 여부",
        lang: "약관 언어",
        title: "약관 제목",
        contents: "약관 내용",
      },
    ],
  };
}

type SignupResponse = {
  data: {
    ticket: string; // 인증티켓
  };
} & AuthResult;

function resultSignup(): SignupResponse {
  return {
    code: "200",
    message: "success",
    data: { ticket: "인증티켓" },
  };
}

type SignupRequest = {
  name: string; //  회사 명
  logoFile?: number; //  로고 이미지 파일
  foundedYear: string; //  설립연도
  url?: string; //  회사 대표 URL
  description?: string; //  회사 설명
  street: string; // 회사 주소
  street2?: string; // 회사 상세 주소
  city: string; // 회사 도시명
  state: string; // 회사 주/도 명
  country: string; // 회사 국가
  zipCd: string; // 회사 우편번호
  latitude?: number; // 위도
  longitude?: number; // 경도
  suppTel?: string; // CS용 전화번호
  suppEmail?: string; // CS 용 이메일
  busiTel?: string; // LGES 용 전화번호
  busiEmail?: string; // LGES 용 이메일
  adminFirstName: string; // 관리자 이름
  adminLastName: string; // 관리자 성
  adminTel?: string; // 관리자 전화번호
  adminEmail: string; // 관리자 이메일
  purpose?: string; // 설치 타입 선택 리스트
  terms?: Terms[]; // 약관동의정보
};

type Terms = {
  type?: string; // 약관 타입
  version?: string; // 약관 버전
  agreeYn?: string; // 약관 동의 여부
};

type SignupfordiyResponse = {
  data?: {
    ticket?: string; // 인증티켓
  };
} & AuthResult;

function resultSignupfordiy(): SignupfordiyResponse {
  return {
    code: "200",
    message: "success",
    data: { ticket: "인증티켓" },
  };
}

type SignupfordiyRequest = {
  firstName?: string; // 이름
  lastName?: string; // 성
  tel?: string; // 전화번호
  email?: string; // 이메일
  country?: string; // 국가
  terms?: Terms[]; // 약관동의정보
};

type DataObjectResponse = {
  data?: object;
} & AuthResult;

function resultDataObject(): DataObjectResponse {
  return {
    code: "200",
    message: "success",
    data: {},
  };
}

type OtpValidateRequest = {
  authCode: string; // 일회용코드
  pwd: string; // 비밀번호
};

type InvateValidateRequest = {
  pwd: string; // 비밀번호
  terms: Terms[]; // 약관동의정보
};

type SigninResponse = {
  data?: Token;
} & AuthResult;

type Token = {
  accessToken?: string;
  refrashToken?: string;
};

function resultSignin(): SigninResponse {
  return {
    code: "200",
    message: "success",
    data: {},
  };
}

type SigninRequest = {
  email: string; // 이메일
  pushToken: string; // 푸시용 토큰
  pwd: string; // 비밀번호
};

type PasswordResetRequest = {
  email: string; // 이메일
};

type PasswordValidateRequest = {
  pwd: string; // 비밀번호
};

type EmailChangeResponse = {
  data: {
    ticket: string; //  인증티켓
  };
} & AuthResult;

function resultEmailChange(): EmailChangeResponse {
  return {
    code: "200",
    message: "success",
    data: { ticket: "" },
  };
}

type EmailChangeRequest = {
  email: string; // 이메일
};

type EmailValidateRequest = {
  pwd: string; // 비밀번호
};

type RefreshResponse = {
  data?: {
    accessToken?: string;
  };
} & AuthResult;

function resultRefresh(): RefreshResponse {
  return {
    code: "200",
    message: "success",
    data: { accessToken: "" },
  };
}

type OtpResendRequest = {
  ticket: string; // 인증티켓
};

const mock = new AxiosMockAdapter(axios);

mock.onGet(/^\/api\/v1\.0\/auth\/.*/).reply((config) => {
  try {
    // console.log("get");
    // console.log(config.url);
    let results;
    if (config.url !== undefined) {
      if (config.url.includes("duplicate")) {
        // console.log("duplicate");
        results = resultEmailDuplicate();
      } else if (config.url.includes("/api/v1.0/auth/terms/latest")) {
        // console.log("/api/v1.0/auth/terms/latest");
        results = resultLatestTerms();
      } else if (config.url.includes("/api/v1.0/auth/refresh")) {
        // console.log("/api/v1.0/auth/refresh");
        results = resultRefresh();
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
      if (config.url.includes("/api/v1.0/auth/signup")) {
        results = resultSignup();
        // console.log("/api/v1.0/auth/signup");
      } else if (config.url.includes("/api/v1.0/auth/signupfordiy")) {
        // console.log("/api/v1.0/auth/signupfordiy");
        results = resultSignupfordiy();
      } else if (config.url.includes("/api/v1.0/auth/signin")) {
        // console.log("/api/v1.0/auth/signin");
        results = resultSignin();
      } else if (config.url.includes("/api/v1.0/auth/password/reset")) {
        // console.log("/api/v1.0/auth/password/reset");
        results = resultDataObject();
      } else if (config.url.includes("/api/v1.0/auth/email/change")) {
        // console.log("/api/v1.0/auth/email/change");
        results = resultEmailChange();
      } else if (config.url.includes("/api/v1.0/auth/otp/resend")) {
        // console.log("/api/v1.0/auth/otp/resend");
        results = resultDataObject();
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
      if (config.url.includes("/api/v1.0/auth/otp/validate")) {
        // console.log("/api/v1.0/auth/otp/validate");
        results = resultDataObject();
      } else if (config.url.includes("/api/v1.0/auth/invate/validate")) {
        // console.log("/api/v1.0/auth/invate/validate");
        results = resultDataObject();
      } else if (config.url.includes("/api/v1.0/auth/password/validate")) {
        // console.log("/api/v1.0/auth/password/validate");
        results = resultDataObject();
      } else if (config.url.includes("/api/v1.0/auth/terms/latest")) {
        // console.log("/api/v1.0/auth/terms/latest");
        results = resultDataObject();
      } else if (config.url.includes("/api/v1.0/auth/email/validate")) {
        // console.log("/api/v1.0/auth/email/validate");
        results = resultDataObject();
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
      if (config.url.includes("/api/v1.0/auth/signout")) {
        // console.log("/api/v1.0/auth/signout");
        results = resultDataObject();
      }
    }
    return [200, results];
  } catch (error) {
    // console.error(error);
    return [500, { message: "Internal server error" }];
  }
});
mock.onAny().passThrough();

//  베이스 url
const baseUri = "/api/v1.0/auth";

//  IF-AUTH-001 이메일 중복체크
export const emailDuplicateCheck = async (email: string) => {
  const api = APIBuilder.get(`${baseUri}/duplicate/${email}`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<EmailDuplicateResponse>>();

  return data;
};

//  IF-AUTH-002 최신 약관 조회   Query 있음
export const latestTermsCheck = async () => {
  const api = APIBuilder.get(`${baseUri}/terms/latest`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<LatestTermsResponse>>();
  return data;
};

//  IF-AUTH-003 회원 가입
export const signup = async (param: SignupRequest) => {
  const api = APIBuilder.post(`${baseUri}/signup`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<SignupResponse>>();
  return data;
};

//  IF-AUTH-004 개인 회원 가입
export const signupfordiy = async (param: SignupfordiyRequest) => {
  const api = APIBuilder.post(`${baseUri}/signupfordiy`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<SignupfordiyResponse>>();
  return data;
};

//  IF-AUTH-005 가입 확인   Query 있음
export const otpValidate = async (param: OtpValidateRequest) => {
  const api = APIBuilder.put(`${baseUri}/otp/validate`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<DataObjectResponse>>();
  return data;
};

//  IF-AUTH-006 가입 확인   Query 있음
export const invateValidate = async (param: InvateValidateRequest) => {
  const api = APIBuilder.put(`${baseUri}/invate/validate`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<DataObjectResponse>>();
  return data;
};

//  IF-AUTH-007 로그인
export const signin = async (param: SigninRequest) => {
  const api = APIBuilder.post(`${baseUri}/signin`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<SigninResponse>>();
  return data;
};

//  IF-AUTH-008 로그아웃
export const signout = async () => {
  const api = APIBuilder.delete(`${baseUri}/signout`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<DataObjectResponse>>();
  return data;
};

//  IF-AUTH-009 비밀번호 재설정 요청
export const passwordReset = async (param: PasswordResetRequest) => {
  const api = APIBuilder.post(`${baseUri}/password/reset`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<DataObjectResponse>>();
  return data;
};

//  IF-AUTH-010 비밀번호 재설정 Query 있음
export const passwordValidate = async (param: PasswordValidateRequest) => {
  const api = APIBuilder.put(`${baseUri}/password/validate`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<DataObjectResponse>>();
  return data;
};

//  IF-AUTH-011 최신 약관 동의
export const latestTerms = async (param: Terms[]) => {
  const api = APIBuilder.put(`${baseUri}/terms/lastest`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<DataObjectResponse>>();
  return data;
};

//  IF-AUTH-012 이메일 변경
export const emailChange = async (param: EmailChangeRequest) => {
  const api = APIBuilder.post(`${baseUri}/email/change`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<EmailChangeResponse>>();
  return data;
};

//  IF-AUTH-013 이메일 변경 확인 Query 있음
export const emailValidate = async (param: EmailValidateRequest) => {
  const api = APIBuilder.put(`${baseUri}/email/validate`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<DataObjectResponse>>();
  return data;
};

//  IF-AUTH-014 토큰 갱신
export const refresh = async () => {
  const api = APIBuilder.get(`${baseUri}/refresh`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<RefreshResponse>>();
  return data;
};

//  IF-AUTH-015 OTP 재발송 요청
export const otpResend = async (param: OtpResendRequest) => {
  const api = APIBuilder.post(`${baseUri}/otp/resend`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<DataObjectResponse>>();
  return data;
};

//  ------------------------------------------------------
