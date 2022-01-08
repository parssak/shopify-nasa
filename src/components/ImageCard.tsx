import React, { ReactElement, useMemo } from "react";

import { ThumbUpIcon as ThumbOutline } from "@heroicons/react/outline";
import { ThumbUpIcon as ThumbSolid } from "@heroicons/react/solid";
import useDB from "hooks/useDB";

interface Props {
  data: IDailyImageData;
}

export default function ImageCard({ data }: Props): ReactElement {
  const { addLiked, removeLiked, isLiked } = useDB();

  const liked = useMemo(() => isLiked(data.url), [data.url, isLiked]);

  return (
    <article className="rounded-xl bg-white dark:bg-zinc-900 block max-w-3xl overflow-hidden">
      <img
        className="w-full max-h-96 max-w-3xl overflow-hidden   object-cover"
        src={data.url}
        alt={data.title}
        loading="lazy"
      />
      <div className="p-4">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-2xl mt-2 font-semibold">{data.title}</h1>
          <p className="text-gray-600 text-sm dark:text-gray-400 font-mono">{data.date}</p>
        </div>
        <br />
        <p className="text-gray-600 dark:text-gray-400">{data.explanation}</p>
        <br />
        {/* like button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              console.debug('clicked');
              if (liked) {
                removeLiked(data.url);
              } else {
                addLiked(data.url);
              }
            }}
            className={`font-semibold cursor-pointer py-2 px-4 rounded-xl flex items-center space-x-1 transition ${liked ? 'bg-green-500 hover:bg-green-400 text-white outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500' : 'bg-gray-200 hover:bg-gray-100 text-gray-800 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'}`}
          >
            <span>Like{liked && "d"}</span>
            {liked ? <ThumbSolid className="w-4 h-4" /> : <ThumbOutline className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </article>
  );
}
