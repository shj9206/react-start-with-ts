import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import APIBuilder from "@/utils/apiService/APIBuilder";
// import { faker } from "@faker-js/faker";

type Response<T> = { data: T };

type RmdResult = {
  code: string;
  message: string;
};

type RmdEndpointResponse = {
  data: {
    deviceId: string; // AWS DeviceID
    url: string; // AWS Endpoint URL
  };
} & RmdResult;

function resultRmdEndpoint(): RmdEndpointResponse {
  return {
    code: "200",
    message: "success",
    data: {
      deviceId: "AWS DeviceID",
      url: "AWS Endpoint URL",
    },
  };
}

type RmdEndpointRequest = {
  ResuDeviceId: string;
};

const mock = new AxiosMockAdapter(axios);

mock.onPost(/^\/api\/v1\.0\/auth\/.*/).reply((config) => {
  try {
    let results;
    // console.log("post");
    // console.log(config.url);
    if (config.url !== undefined) {
      if (config.url.includes("/api/v1.0/rmd/endpoint")) {
        results = resultRmdEndpoint();
        // console.log("/api/v1.0/auth/signup");
      }
    }
    return [200, results];
  } catch (error) {
    // console.error(error);
    return [500, { message: "Internal server error" }];
  }
});

mock.onAny().passThrough();

const baseUri = "/api/v1.0/rmd";

// IF-RMD-001 Region 별 Endpoint URL 조회
const rmdEndpointUrl = async (param: RmdEndpointRequest) => {
  const api = APIBuilder.post(`${baseUri}/endpoint`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<RmdEndpointResponse>>();

  return data;
};

export default rmdEndpointUrl;
