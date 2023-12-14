import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { hideAlert } from "@/store/alertSlice.ts";
import { RootState } from "@/store";

function AlertComponent() {
  const dispatch = useDispatch();
  const { open, message, title } = useSelector(
    (state: RootState) => state.alert,
  );

  const handleClose = () => {
    dispatch(hideAlert());
  };

  return (
    <div>
      {open && (
        <Dialog title={title} onClose={handleClose}>
          <p>{message}</p>
          <Button type="button" onClick={handleClose}>
            Close
          </Button>
        </Dialog>
      )}
    </div>
  );
}

export default AlertComponent;
