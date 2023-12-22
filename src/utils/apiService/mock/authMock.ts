import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";
import { API_PREFIX } from "@/utils/apiService/config/apiConfig.ts";
import {
  DataObjectResponse,
  EmailChangeResponse,
  EmailDuplicateResponse,
  LatestTermsResponse,
  MenuListResponse,
  RefreshResponse,
  SigninResponse,
  SignupfordiyResponse,
  SignupResponse,
} from "@/utils/apiService/authService.ts";
import MOCK_MENU_LIST from "@/utils/apiService/tempData/userMenuList.json";

const baseAuthUri = `${API_PREFIX}/auth`;
function resultEmailDuplicate(): EmailDuplicateResponse {
  return {
    code: "200",
    message: "success",
    data: { region: "US" },
  };
}

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

function resultRefresh(): RefreshResponse {
  return {
    code: "200",
    message: "success",
    data: { accessToken: "" },
  };
}

function resultUserMenuList(): MenuListResponse {
  return {
    code: "200",
    message: "success",
    data: MOCK_MENU_LIST,
  };
}

function resultSignup(): SignupResponse {
  return {
    code: "200",
    message: "success",
    data: { ticket: "인증티켓" },
  };
}

function resultSignupfordiy(): SignupfordiyResponse {
  return {
    code: "200",
    message: "success",
    data: { ticket: "인증티켓" },
  };
}

function generateRandomToken(length) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);

  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

function resultSignin(): SigninResponse {
  const accessTokenData = generateRandomToken(16);
  const refrashTokenData = generateRandomToken(16);
  return {
    code: "200",
    message: "success",
    data: { accessToken: accessTokenData, refrashToken: refrashTokenData },
  };
}

function resultDataObject(): DataObjectResponse {
  return {
    code: "200",
    message: "success",
    data: {},
  };
}

function resultEmailChange(): EmailChangeResponse {
  return {
    code: "200",
    message: "success",
    data: { ticket: "" },
  };
}

export default function setupAuthMocks() {
  const mock = new AxiosMockAdapter(axios);

  mock.onGet(/^\/api\/v1\.0\/auth\/.*/).reply((config) => {
    try {
      let results;
      if (config.url !== undefined) {
        if (config.url.includes("duplicate")) {
          results = resultEmailDuplicate();
        } else if (config.url.includes(`${baseAuthUri}/terms/latest`)) {
          results = resultLatestTerms();
        } else if (config.url.includes(`${baseAuthUri}/refresh`)) {
          results = resultRefresh();
        } else if (config.url.includes(`${baseAuthUri}/menu/list`)) {
          results = resultUserMenuList();
        }
      }
      return [200, results];
    } catch (error) {
      return [500, { message: "Internal server error" }];
    }
  });

  mock.onPost(/^\/api\/v1\.0\/auth\/.*/).reply((config) => {
    try {
      let results;
      if (config.url !== undefined) {
        if (config.url.includes(`${baseAuthUri}/signup`)) {
          results = resultSignup();
        } else if (config.url.includes(`${baseAuthUri}/signupfordiy`)) {
          results = resultSignupfordiy();
        } else if (config.url.includes(`${baseAuthUri}/signin`)) {
          results = resultSignin();
        } else if (config.url.includes(`${baseAuthUri}/password/reset`)) {
          results = resultDataObject();
        } else if (config.url.includes(`${baseAuthUri}/email/change`)) {
          results = resultEmailChange();
        } else if (config.url.includes(`${baseAuthUri}/otp/resend`)) {
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
      let results;
      if (config.url !== undefined) {
        if (config.url.includes(`${baseAuthUri}/otp/validate`)) {
          results = resultDataObject();
        } else if (config.url.includes(`${baseAuthUri}/invate/validate`)) {
          results = resultDataObject();
        } else if (config.url.includes(`${baseAuthUri}/password/validate`)) {
          results = resultDataObject();
        } else if (config.url.includes(`${baseAuthUri}/terms/latest`)) {
          results = resultDataObject();
        } else if (config.url.includes(`${baseAuthUri}/email/validate`)) {
          results = resultDataObject();
        }
      }
      return [200, results];
    } catch (error) {
      return [500, { message: "Internal server error" }];
    }
  });

  mock.onDelete(/^\/api\/v1\.0\/auth\/.*/).reply((config) => {
    try {
      let results;
      if (config.url !== undefined) {
        if (config.url.includes(`${baseAuthUri}/signout`)) {
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
}
