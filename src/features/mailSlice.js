import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inbox: 0,
  starred: 0,
  important: 0,
  sent: 0,
  drafts: 0,
  selectedMail: null,
  status: "idle",
};

export const mailSlice = createSlice({
  name: "mail",
  initialState,

  reducers: {
    countInbox: (state, action) => {
      state.inbox = action.payload;
    },
    countStarred: (state, action) => {
      state.starred = action.payload;
    },
    countImportant: (state, action) => {
      state.important = action.payload;
    },
    countSent: (state, action) => {
      state.sent = action.payload;
    },
    countDrafts: (state, action) => {
      state.drafts = action.payload;
    },
    selectAMail: (state, action) => {
      state.selectedMail = action.payload;
    },
  },
});

export const {
  selectAMail,
  countInbox,
  countStarred,
  countImportant,
  countSent,
  countDrafts,
} = mailSlice.actions;

// export const selectMail = (state) => state.mail.value;

export default mailSlice.reducer;
