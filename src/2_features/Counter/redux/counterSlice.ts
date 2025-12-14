import type { PayloadAction } from '@reduxjs/toolkit';

import type { AppThunk } from '@/0_app/redux/types';
import { fetchCount } from '@/2_features/Counter/redux/counterAPI';
import { createAppSlice } from '@/4_shared/redux/createAppSlice';

export interface CounterSliceState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterSliceState = {
  value: 0,
  status: 'idle',
};

export const counterSlice = createAppSlice({
  name: 'counter',
  initialState,
  reducers: create => ({
    increment: create.reducer(state => {
      state.value += 1;
    }),
    decrement: create.reducer(state => {
      state.value -= 1;
    }),
    incrementByAmount: create.reducer((state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }),
    incrementAsync: create.asyncThunk(async (amount: number) => (await fetchCount(amount)).data, {
      pending: state => {
        state.status = 'loading';
      },
      fulfilled: (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      },
      rejected: state => {
        state.status = 'failed';
      },
    }),
  }),
  selectors: {
    selectCounter: counter => counter,
    selectCount: counter => counter.value,
    selectStatus: counter => counter.status,
  },
});

export const { decrement, increment, incrementByAmount, incrementAsync } = counterSlice.actions;

export const { selectCounter, selectCount, selectStatus } = counterSlice.selectors;

export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());

    if (currentValue % 2 === 1 || currentValue % 2 === -1) {
      dispatch(incrementByAmount(amount));
    }
  };
