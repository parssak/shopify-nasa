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
  },
});

export default function useNASA() {
  const [{ loading, data, error }, setApiState] = useRecoilState(apiState);

  useEffect(() => {
    const fetchData = async () => {
      setApiState((state) => ({ ...state, loading: true }));
      // get astronomy picture of the day
      try {
        // get 30 days ago
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        const startDateStr = startDate.toISOString().split("T")[0];
        // get today
        const endDate = new Date();
        const endDateStr = endDate.toISOString().split("T")[0];
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDateStr}&end_date=${endDateStr}`
        );
        const data: IDailyImageData[] = response.data;
        setApiState((state) => ({ ...state, loading: false, data }));
      } catch (error) {
        setApiState((state) => ({ ...state, loading: false, error }));
      }
    };
    try {
      if (!loading && (!data || data?.length === 0)) fetchData();
    } catch (error) {
      console.error(error)
    }
  }, []);

  return { loading, data, error };
}
