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
      const check = state.onGoing.findIndex((el) => el.id === payload.id);

      if (check >= 0) {
        state.onGoing[check].QTY += 1;
      } else {
        const file = { ...payload, QTY: 1 };
        state.onGoing.push(file);
      }
    },
    remove: (state, { payload }) => {
      state.task = state.task.filter((el) => el.id !== payload.id);
    },
  },
});

export const { addTask, addOnGoing, remove } = taskState.actions;
export default taskState.reducer;
