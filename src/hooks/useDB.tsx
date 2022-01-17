import { atom, useRecoilState } from "recoil";
import useLocalStorage from "hooks/useLocalStorage";
import { useEffect } from "react";

const likedState = atom({
  key: "likedState",
  default: [],
});

export default function useDB() {
  const [liked, setLiked] = useRecoilState(likedState);
  const [localLiked, setLocalLiked] = useLocalStorage("liked", []);

  const addLiked = (item: any) => {
    setLiked((state) => [...state, item]);
  };

  const removeLiked = (item: any) => {
    setLiked((state) => state.filter((el) => el !== item));
  };

  useEffect(() => {
    setLocalLiked(liked);
  }, [liked]);

  useEffect(() => {
    setLiked(localLiked);
  }, []);

  const isLiked = (item: any) => {
    return liked.find((el) => el === item);
  };

  return { liked, addLiked, removeLiked, isLiked };
}
