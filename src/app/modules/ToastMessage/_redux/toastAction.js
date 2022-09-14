import { toastSlice } from "./toastSlice";
const { actions } = toastSlice;
export const showResponseMessage = (messages) => {
  return (dispatch) => {
    dispatch(actions.showResponseMessage(messages));
  };
};
export const closeToast = () => {
  return (dispatch) => {
    dispatch(actions.closeToast());
  };
};
