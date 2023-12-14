import { useDispatch } from "react-redux";
import { showAlert } from "@/store/alertSlice.ts";

interface AlertType {
  title?: string;
  message?: string;
}

const useAlert = () => {
  const dispatch = useDispatch();

  return ({ title, message }: AlertType) => {
    dispatch(showAlert({ title, message }));
  };
};

export default useAlert;
