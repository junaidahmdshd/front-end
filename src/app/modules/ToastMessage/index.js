import React, { shallowEqual } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeToast } from "./_redux/toastAction";
import { unArchiveProducts } from "../Products/_redux/productsActions";
import MessageToast from "../../components/Toast/MessageToast";

const ToastMessage = () => {
  const dispatch = useDispatch();
  const {
    message,
    messageType,
    messageText,
    showToast,
    timeOut,
    autoClose,
    archive,
    archiveId,
  } = useSelector(
    ({ toastMessages }) => ({
      message: toastMessages.message,
      messageType: toastMessages.messageType,
      messageText: toastMessages.messageText,
      showToast: toastMessages.showToast,
      timeOut: toastMessages.timeOut,
      autoClose: toastMessages.autoClose,
      archive: toastMessages.archive,
      archiveId: toastMessages.archiveId,
    }),
    shallowEqual
  );
  const closeToaster = () => {
    dispatch(closeToast());
  };
  const buttonClick = () => {
    dispatch(unArchiveProducts(archiveId));
  };
  return showToast ? (
    <MessageToast
      closeToaster={closeToaster}
      messageType={messageType}
      message={message}
      messageText={messageText}
      timeOut={timeOut}
      autoClose={autoClose}
      archive={archive}
      buttonClick={buttonClick}
    />
  ) : null;
};
export default ToastMessage;
