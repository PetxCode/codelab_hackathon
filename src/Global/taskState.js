import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: [],
  onGoing: [],
};

const taskState = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      state.task = payload;
    },
    addOnGoing: (state, { payload }) => {
      const file = { ...payload, QTY: 1 };
      state.onGoing.push(file);
    },
    remove: (state, { payload }) => {
      state.task = state.task.filter((el) => el.id !== payload.id);
    },
  },
});

export const { addTask, addOnGoing, remove } = taskState.actions;
export default taskState.reducer;
