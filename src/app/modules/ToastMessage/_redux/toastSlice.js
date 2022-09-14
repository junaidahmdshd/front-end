import { createSlice } from "@reduxjs/toolkit";

const initialToastState = {
  showToast: false,
  message: "",
  messageText: "",
  messageType: "",
  timeOut: 2000,
  autoClose: true,
  archive: false,
  archiveId: "",
  loadAPI: false,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const toastSlice = createSlice({
  name: "toastMessages",
  initialState: initialToastState,
  reducers: {
    showResponseMessage: (state, action) => {
      state.message = `${action.payload.type}${action.payload.type && ": "} ${action.payload.message}`;
      state.messageText = action.payload.messageText; //payload.messageText;
      state.showToast = true;
      state.messageType = action.payload.messageType;
      state.autoClose =
        typeof action.payload.autoClose === "boolean"
          ? action.payload.autoClose
          : true;
      state.archive =
        typeof action.payload.archive === "boolean"
          ? action.payload.archive
          : false;
      state.archiveId = action.payload.archiveId || "";
      state.loadAPI =
        typeof action.payload.loadAPI === "boolean"
          ? action.payload.loadAPI
          : false;
          state.timeOut = typeof action.payload.timeOut !== "undefined" ? action.payload.timeOut : state.timeOut
    },
    closeToast: (state) => {
      state.showToast = false;
      state.message = "";
      state.messageText = "";
      state.messageType = "";
      state.timeOut = 2000;
      state.autoClose = true;
      state.archive = false;
      state.archiveId = "";
      state.loadAPI = false;
    },
  },
});
