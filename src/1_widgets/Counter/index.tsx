'use client';

import { useState } from 'react';

import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
  selectCounter,
} from '@/2_features/Counter/redux/counterSlice';
import { useAppDispatch, useAppSelector } from '@/4_shared/redux/hooks';

export const Counter = () => {
  const dispatch = useAppDispatch();
  const { value: count, status } = useAppSelector(selectCounter);
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className="flex items-center justify-center">
        <button
          className="mr-2 ml-1 cursor-pointer appearance-none rounded border-2 border-transparent bg-purple-100 bg-none px-3 py-1 text-3xl text-purple-600 transition-all duration-150 outline-none hover:border-purple-400 focus:border-purple-400 active:bg-purple-200"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span aria-label="Count" className="mt-0.5 px-4 font-mono text-6xl">
          {count}
        </span>
        <button
          className="mr-2 ml-1 cursor-pointer appearance-none rounded border-2 border-transparent bg-purple-100 bg-none px-3 py-1 text-3xl text-purple-600 transition-all duration-150 outline-none hover:border-purple-400 focus:border-purple-400 active:bg-purple-200"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className="mb-4 flex items-center justify-center">
        <input
          className="mr-1 w-16 p-0.5 text-center text-3xl"
          aria-label="Set increment amount"
          value={incrementAmount}
          type="number"
          onChange={e => {
            setIncrementAmount(e.target.value);
          }}
        />
        <button
          className="mr-2 ml-1 cursor-pointer appearance-none rounded border-2 border-transparent bg-purple-100 bg-none px-3 py-1 text-3xl text-purple-600 transition-all duration-150 outline-none hover:border-purple-400 focus:border-purple-400 active:bg-purple-200"
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className="relative mr-2 ml-1 cursor-pointer appearance-none rounded border-2 border-transparent bg-purple-100 bg-none px-3 py-1 text-3xl text-purple-600 transition-all duration-150 outline-none hover:border-purple-400 focus:border-purple-400 active:bg-purple-200 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={status !== 'idle'}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className="mr-2 ml-1 cursor-pointer appearance-none rounded border-2 border-transparent bg-purple-100 bg-none px-3 py-1 text-3xl text-purple-600 transition-all duration-150 outline-none hover:border-purple-400 focus:border-purple-400 active:bg-purple-200"
          onClick={() => {
            dispatch(incrementIfOdd(incrementValue));
          }}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
};
