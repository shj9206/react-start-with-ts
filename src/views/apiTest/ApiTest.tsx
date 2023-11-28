import APIBuilder from "@/utils/APIBuilder";
import { useState, ChangeEvent } from "react";
export default function ApiTest() {
  // ex
  type Response<T> = { data: T };
  type BookListResponse = unknown;

  const [inputValue, setInputValue] = useState("");

  const searchBookList = async (name?: string, size?: number) => {
    const api = APIBuilder.get(
      `/api/v1/search/book.json?query=${name}&display=10&start=1`
    )
      .withCredentials(true) // 이제 401 에러가 나는 경우, 자동으로 에러를 탐지하는 인터셉터를 사용하게 된다
      .params({ name, size }) // body가 없는 axios 객체도 빌더 패턴으로 쉽게 만들 수 있다
      .build();
    const { data } = await api.call<Response<BookListResponse>>();
    return data;
  };
  const onChangeFunc = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <p>
        <span>APITEST</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          onChange={(e) => onChangeFunc(e)}
          value={inputValue}
        />
      </p>
      <p>
        <button type="submit" onClick={() => searchBookList(inputValue)}>
          call
        </button>
      </p>
    </>
  );
}
