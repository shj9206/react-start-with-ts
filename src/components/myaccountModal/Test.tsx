import * as React from "react";
import * as ReactDOM from "react-dom";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function App() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };
  return (
    <div>
      <button
        type="button"
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
        onClick={toggleDialog}
      >
        Open Dialog
      </button>
      {visible && (
        <Dialog title="Please confirm" onClose={toggleDialog}>
          <p
            style={{
              margin: "25px",
              textAlign: "center",
            }}
          >
            Are you sure you want to continue?
          </p>
          <DialogActionsBar>
            <button
              type="button"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={toggleDialog}
            >
              No
            </button>
            <button
              type="button"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={toggleDialog}
            >
              Yes
            </button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
}
// ReactDOM.render(<App />, document.querySelector("my-app"));
