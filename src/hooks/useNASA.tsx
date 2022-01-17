import axios from "axios";
import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";

const API_KEY = "f3aMcXXfdfcXZpchC6OsOu0CWFD3siBzVfw31PEW";

const apiState = atom({
  key: "apiState",
  default: {
    loading: false,
    data: null as IDailyImageData[],
    error: null,
    lastFetchDate: null as Date | null,
  },
});

export default function useNASA() {
  const [{ loading, data, error, lastFetchDate }, setApiState] = useRecoilState(apiState);

  const fetchData = async (fromDate: Date) => {
    setApiState((state) => ({ ...state, loading: true }));

    const from = fromDate.toISOString().slice(0, 10);
    const toDate = new Date(fromDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    const to = toDate.toISOString().slice(0, 10);

    try {
      const { data } = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${to}&end_date=${from}`
      );

      setApiState((state) => ({
        ...state,
        loading: false,
        data: state.data ? [...state.data, ...data] : [...data],
        lastFetchDate: toDate,
      }));
    } catch (error) {
      setApiState((state) => ({ ...state, loading: false, error: error.message }));
    }
  };

  useEffect(() => {
    try {
      if (!loading && (!data || data?.length === 0))  fetchMoreData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchMoreData = async () => {
    if (!lastFetchDate) fetchData(new Date());
    else fetchData(lastFetchDate);
  };

  return { loading, data, error, fetchMoreData };
}
