import { atom, useRecoilState } from "recoil";

const likedState = atom({
  key: "likedState",
  default: [],
});

export default function useDB() {
  const [liked, setLiked] = useRecoilState(likedState);

  const addLiked = (item: any) => {
    setLiked((state) => [...state, item]);
  };

  const removeLiked = (item: any) => {
    setLiked((state) => state.filter((el) => el !== item));
  };

  const isLiked = (item: any) => {
    return liked.find((el) => el === item);
  };

  return { liked, addLiked, removeLiked, isLiked };
}
