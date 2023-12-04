import axios from "axios";
import APIBuilder from "@/utils/apiService/APIBuilder";
import AxiosMockAdapter from "axios-mock-adapter";
import type {SexType} from "@faker-js/faker";
import {faker} from "@faker-js/faker";

type Response<T> = { data: T };
type BookListResponse = unknown;

interface User {
  _id: string;
  avatar: string;
  birthday: Date;
  email: string;
  firstName: string;
  lastName: string;
  sex: SexType;
  subscriptionTier: string;
}

function createRandomUser(): User[] {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = "email@sample.com";

  const results = [...Array(23)].map(() => {
    return {
      _id: faker.string.uuid(),
      avatar: faker.image.avatar(),
      birthday: faker.date.birthdate(),
      email,
      firstName,
      lastName,
      sex,
      subscriptionTier: faker.helpers.arrayElement([
        "free",
        "basic",
        "business",
      ]),
    };
  });
  return results;
}

const mock = new AxiosMockAdapter(axios);

mock.onGet("/posts").reply(() => {
  try {
    const results = createRandomUser();
    return [200, results];
  } catch (error) {
    console.error(error);
    return [500, { message: "Internal server error" }];
  }
});
mock.onAny().passThrough();

export const testPost = async () => {
  const api = APIBuilder.get("/posts").withCredentials(true).build();
  const { data } = await api.call<Response<BookListResponse>>();
  return data;
};

export const searchBookList = async (name?: string, size?: number) => {
  const api = APIBuilder.get(
    `/api/v1/search/book.json?query=${name}&display=10&start=1`
  )
    .withCredentials(true) // 이제 401 에러가 나는 경우, 자동으로 에러를 탐지하는 인터셉터를 사용하게 된다
    .params({ name, size }) // body가 없는 axios 객체도 빌더 패턴으로 쉽게 만들 수 있다
    .build();
  const { data } = await api.call<Response<BookListResponse>>();
  return data;
};
