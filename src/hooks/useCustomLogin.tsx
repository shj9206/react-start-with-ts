import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { useAppSelector } from "@/store/hooks.ts";

interface ErrorResponse {
  error: string;
  // 다른 필요한 필드들...
}
const useCustomLogin = () => {
  const navigate = useNavigate();

  const auth = useAppSelector((state) => state.auth);
  // const dispatch = useAppDispatch();

  const exceptionHandle = (ex: AxiosError) => {
    console.log("Exception------------------------");
    console.log(ex);
    if (typeof ex.response?.data === "object" && ex.response.data !== null) {
      const errorData = ex.response.data as ErrorResponse;
      const errorStr = errorData.error;
      if (errorStr === "REQUIRE_LOGIN") {
        alert("로그인 해야만 합니다.");
        navigate({ pathname: "/member/login", search: errorStr });
        return;
      }
      if (errorStr === "ERROR_ACCESSDENIED") {
        alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.");
        navigate({ pathname: "/member/login", search: errorStr });
      }
    }
  };

  const isLogin = !!auth.email; // ----------로그인 여부

  // const doLogin = async (loginParam) => {
  //   // ----------로그인 함수
  //
  //   const action = await dispatch(loginPostAsync(loginParam));
  //
  //   return action.payload;
  // };

  // const doLogout = () => {
  //   //---------------로그아웃 함수
  //
  //   dispatch(logout());
  // };

  // const moveToPath = (path) => {
  //   //----------------페이지 이동
  //   navigate({ pathname: path }, { replace: true });
  // };

  // const moveToLogin = () => {
  //   // ----------------------로그인 페이지로 이동
  //   navigate({ pathname: "/member/login" }, { replace: true });
  // };

  return {
    isLogin,
    exceptionHandle,
  };
};

export default useCustomLogin;
