import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CommonGrid from "@/components/kendo/grid/CommonGrid.tsx";
import { CommonGridProps } from "@/components/kendo/grid/interface/gridInterfaces.ts";
import type {
  AccountResult,
  Company,
} from "@/utils/apiService/accountService.ts";
import { getCompaniesList } from "@/utils/apiService/accountService.ts";
import useAlert from "@/hooks/useAlert.tsx";
import ModalComponent from "@/components/kendo/modal/ModalComponent.tsx";
import { Popup } from "@progress/kendo-react-popup";
import StyledButton from "@/components/common/StyledButton.tsx";
import useNotification from "@/hooks/useNotification.tsx";

export default function Index() {
  const column = [
    {
      field: "name",
      title: "name",
      width: 200,
      align: "center",
      cellType: "link",
    },
    {
      field: "foundedYear",
      title: "foundedYear",
      width: 200,
      align: "center",
    },
    {
      field: "city",
      title: "city",
      width: 200,
      filterable: true,
      filterType: "select",
    },
    {
      field: "state",
      title: "state",
      width: 200,
      align: "left",
      filterable: true,
      filterType: "checkbox",
    },
    {
      field: "country",
      title: "country",
      width: 200,
      align: "left",
    },
    {
      field: "zipCd",
      title: "zipCd",
      width: 200,
      align: "left",
    },
    {
      field: "street",
      title: "street",
      width: 200,
      align: "left",
    },
    {
      field: "adminFirstName",
      title: "adminFirstName",
      width: 200,
      align: "left",
    },
    {
      field: "adminLastName",
      title: "adminLastName",
      width: 200,
      align: "left",
    },
    {
      field: "adminEmail",
      title: "adminEmail",
      width: 200,
      align: "left",
    },
    {
      field: "modDate",
      title: "modDate",
      width: 200,
      align: "left",
    },
    {
      field: "branchCnt",
      title: "branchCnt",
      width: 200,
    },
  ];
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cellClick = (event: React.MouseEvent) => {
    setPopupPosition({ left: event.clientX, top: event.clientY });
    setShowPopup((currentShowPopup) => !currentShowPopup);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPopup]);

  const addButton = (props: Company[]) => {
    alert("add Button Click Page Move");
    console.log(props);
  };

  const deleteButton = (props: Company[]) => {
    alert("delete Button Click ");
    console.log(props);
    // return props;
  };

  const [commonGridProps, setCommonGridProps] = useState<
    CommonGridProps<Company>
  >({
    gridHeight: 200,
    columnHeader: column,
  });

  const [commonGridProps2, setCommonGridProps2] = useState<
    CommonGridProps<Company>
  >({
    gridHeight: 200,
    columnHeader: column,
    check: true,
    girdToolBar: true,
    addButton,
    deleteButton,
  });

  const [commonGridProps3, setCommonGridProps3] = useState<
    CommonGridProps<Company>
  >({
    gridHeight: 200,
    columnHeader: column,
    defaultFilter: true,
  });

  const [commonGridProps4, setCommonGridProps4] = useState<
    CommonGridProps<Company>
  >({
    gridHeight: 200,
    columnHeader: column,
    defaultFilter: true,
    sortableGrid: true,
    unsorted: true,
    reorder: true,
    resizable: true,
    girdToolBar: true,
  });

  const [commonGridProps5, setCommonGridProps5] = useState<
    CommonGridProps<Company>
  >({
    gridHeight: 200,
    columnHeader: column,
    defaultFilter: true,
    sortableGrid: true,
    unsorted: true,
    reorder: true,
    resizable: true,
    girdToolBar: true,
    cellClick: cellClick,
  });

  const companyListQuery = () => ({
    queryKey: ["company"],
    queryFn: async () => {
      const result = await getCompaniesList();
      return result as AccountResult;
    },
  });

  const { data: company } = useQuery<AccountResult, Error>(companyListQuery());

  useEffect(() => {
    if (company && company.data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setCommonGridProps((prevState) => ({
        ...prevState,
        gridData: company.data as Company[],
      }));

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setCommonGridProps2((prevState) => ({
        ...prevState,
        gridData: company.data as Company[],
      }));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setCommonGridProps3((prevState) => ({
        ...prevState,
        gridData: company.data as Company[],
      }));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setCommonGridProps4((prevState) => ({
        ...prevState,
        gridData: company.data as Company[],
      }));
      setCommonGridProps5((prevState) => ({
        ...prevState,
        gridData: company.data as Company[],
      }));
    }
  }, [company]);

  const showAlert = useAlert();
  const showNotification = useNotification();

  const handleClick = () => {
    showAlert({ message: "이것은 경고 메시지입니다!" });
  };

  const handleNotificationClick = () => {
    showNotification({ message: "이것은 Notification 입니다!" });
  };

  const [openModal, setOpenModal] = useState(false);

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const [popupPosition, setPopupPosition] = useState({ left: 50, top: 50 });
  const buttonRef = useRef(null);
  const [anchorAlign, setAnchorAlign] = useState({
    horizontal: "right",
    vertical: "bottom",
  });
  const [popupAlign, setPopupAlign] = useState({
    horizontal: "left",
    vertical: "top",
  });

  const handleButtonClick = () => {
    if (buttonRef.current) {
      const { left, top, height } = buttonRef.current.getBoundingClientRect();
      setPopupPosition({ left, top: top + height });
    }
    setShowPopup(true);
  };

  return (
    <div>
      <StyledButton onClick={handleClick} cssType="main_01">
        {" "}
        alert Test Button
      </StyledButton>
      <StyledButton onClick={handleNotificationClick} cssType="main_01">
        {" "}
        Notification Test Button
      </StyledButton>
      <StyledButton
        ref={buttonRef}
        onClick={() => {
          setOpenModal(!openModal);
        }}
      >
        {" "}
        모달
      </StyledButton>
      {openModal && (
        <ModalComponent
          onClose={handleModalClose}
          title={"공지사항"}
          buttons={["cancel", "confirm"]}
          showCloseButton={false}
        >
          여기에 모달 컨텐츠만 넣으세요.
        </ModalComponent>
      )}
      {showPopup && (
        <div ref={popupRef}>
          <Popup offset={popupPosition} show={showPopup}>
            <p style={{ width: 200, height: 150 }}>지도!!!!!!!!!</p>
          </Popup>
        </div>
      )}
      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <span>1. 기본 그리드</span>
        </div>
        <CommonGrid {...commonGridProps} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <span>2. checkbox 그리드 + add 버튼, delete 버튼</span>
        </div>
        <CommonGrid {...commonGridProps2} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <span>3. 기본 필터 그리드</span>
        </div>
        <CommonGrid {...commonGridProps3} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <span>
            4. 컬럼이동, 컬럼사이즈 조정 그리드 + 필터 초기화, 그리드 사이즈 및
            순서 초기화
          </span>
        </div>
        <CommonGrid {...commonGridProps4} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <span>5. 필터 종류 ( 기본, 드랍다운, 체크박스)</span>
        </div>
        <CommonGrid {...commonGridProps5} />
      </div>
    </div>
  );
}
