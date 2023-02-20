import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );
  return [runThunk, isLoading, error];
}

// by default dispatch returns a promise which doesn't follow the conventional rules
// this promise.then() gets called whether the request succeeds OR FAILS (instead of promise.catch())

// promise.unwrap() returns a brand new promise which follows the conventional rules
// promise.then() - if request succeeds
// promise.catch()  - if request fails
// promise.finally() - is called regardless of whether the request was successful or not
