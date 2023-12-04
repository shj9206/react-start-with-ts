import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import APIBuilder from "@/utils/apiService/APIBuilder";
// import { faker } from "@faker-js/faker";

type Response<T> = { data: T };

type BoardResult = {
  code: string;
  message: string;
};

type NoticesResponse = {
  data?: {
    seq?: string; // 번호
    region?: string; // 공지권역
    topYn?: string; // 상단고정유무
    title?: string; // 제목
    status?: string; // 상태
    modDate?: string; // 날짜
    contents?: string; // 내용
    pageable?: Page[]; // 페이지 정보
  };
} & BoardResult;

type Page = {
  page?: number; // 페이지 위치
  size?: number; // 페이지당 갯수
  totalPages?: number; // 전체 페이지 수
  totalElements?: number; // 전체 아이템 수
};

function resultNoticesList(): NoticesResponse {
  return {
    code: "200",
    message: "success",
    data: {
      seq: "번호",
      region: "공지권역",
      topYn: "상단고정유무",
      title: "제목",
      status: "상태",
      modDate: "날짜",
      pageable: [
        {
          page: 1,
          size: 1,
          totalPages: 1,
          totalElements: 1,
        },
      ],
    },
  };
}

function resultNoticesPopup(): NoticesResponse {
  return {
    code: "200",
    message: "success",
    data: {
      seq: "번호",
      title: "제목",
      contents: "내용",
      modDate: "날짜",
    },
  };
}

type NoticeDetailResponse = {
  data?: {
    seq?: string; // 번호
    region?: string; // 공지권역
    topYn?: string; // 상단고정유무
    topStartDate?: string; // 상단고정시작일
    topEndDate?: string; // 상단고정종료일
    title?: string; // 제목
    status?: string; // 상태
    contents?: string; // 내용
    modDate: string; // 날짜
    fileList: string[]; // 첨부파일 리스트
  } & Page;
} & BoardResult;

function resultNoticeDetail(): NoticeDetailResponse {
  return {
    code: "200",
    message: "success",
    data: {
      seq: "번호",
      region: "공지권역",
      topYn: "상단고정유무",
      topStartDate: "상단고정시작일",
      topEndDate: "상단고정종료일",
      title: "제목",
      status: "상태",
      contents: "내용",
      modDate: "날짜",
      fileList: [""],
      page: 1,
      size: 1,
      totalPages: 1,
      totalElements: 1,
    },
  };
}
type NoticeResponse = {
  data?: object;
} & BoardResult;

function resultNotice(): NoticeResponse {
  return {
    code: "200",
    message: "success",
    data: {},
  };
}

type NoticeAddFixRequest = {
  region?: string;
  topYn?: string;
  topStartDate?: string;
  topEndDate?: string;
  title?: string;
  status?: string;
  contents?: string;
};

const mock = new AxiosMockAdapter(axios);

mock.onGet(/^\/api\/v1\.0\/auth\/.*/).reply((config) => {
  try {
    // console.log("get");
    // console.log(config.url);
    let results;
    if (config.url !== undefined) {
      if (config.url.includes("/api/v1.0/board/notices")) {
        // console.log("duplicate");
        results = resultNoticesList();
      } else if (config.url.includes("/api/v1.0/board/notice/latest")) {
        // console.log("/api/v1.0/auth/terms/latest");
        results = resultNoticesPopup();
      } else if (config.url.includes("/api/v1.0/board/notice")) {
        // console.log("/api/v1.0/auth/refresh");
        results = resultNoticeDetail();
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
      if (config.url.includes("/api/v1.0/board/notice")) {
        results = resultNotice();
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
      if (config.url.includes("/api/v1.0/board/notice")) {
        // console.log("/api/v1.0/auth/otp/validate");
        results = resultNotice();
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
      if (config.url.includes("/api/v1.0/board/notice")) {
        // console.log("/api/v1.0/auth/signout");
        results = resultNotice();
      }
    }
    return [200, results];
  } catch (error) {
    // console.error(error);
    return [500, { message: "Internal server error" }];
  }
});
mock.onAny().passThrough();

const baseUri = "/api/v1.0/board";

// IF-BORD-001 공지사항 목록 조회  Query 있음
export const noticeList = async () => {
  const api = APIBuilder.get(`${baseUri}/notices`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<NoticesResponse>>();

  return data;
};

// IF-BORD-002 팝업 공지사항 조회
export const noticePopup = async () => {
  const api = APIBuilder.get(`${baseUri}/notice/latest`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<NoticesResponse>>();

  return data;
};

// IF-BORD-003 공지사항 상세 조회
export const noticeDetail = async (noticeid: number) => {
  const api = APIBuilder.get(`${baseUri}/notice/${noticeid}`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<NoticeDetailResponse>>();

  return data;
};

// IF-BORD-004 공지사항 추가
export const noticeAdd = async (param: NoticeAddFixRequest) => {
  const api = APIBuilder.post(`${baseUri}/notice`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<NoticeResponse>>();

  return data;
};

// IF-BORD-004 공지사항 수정
export const noticeFix = async (
  noticeid: string,
  param: NoticeAddFixRequest
) => {
  const api = APIBuilder.put(`${baseUri}/notice/${noticeid}`, param)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<NoticeResponse>>();

  return data;
};

// IF-BORD-005 공지사항 삭제
export const noticeDelete = async (noticeid: string) => {
  const api = APIBuilder.delete(`${baseUri}/notice/${noticeid}`)
    .withCredentials(true)
    .build();
  const { data } = await api.call<Response<NoticeResponse>>();

  return data;
};
