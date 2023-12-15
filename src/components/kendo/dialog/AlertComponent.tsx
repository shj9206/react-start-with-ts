import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
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
          <p
            style={{
              margin: "25px",
              textAlign: "center",
            }}
          >
            {message}
          </p>
          <DialogActionsBar>
            <Button style={{ width: 100 }} type="button" onClick={handleClose}>
              OK
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
}

export default AlertComponent;
