import ImageCard from "components/ImageCard";
import useNASA from "hooks/useNASA";
import { useState } from "react";

export default function Home() {
  const { loading, data, error } = useNASA();
  const [query, setQuery] = useState("");

  return (
    <>
      <main className="container min-h-screen pt-24 grid place-items-center">
        <h1 className="text-5xl font-bold text-left">NASA Daily Image Data</h1>
        <h2 className="text-2xl font-medium text-left mb-12">
          Made by Parssa Kyanzadeh, for Shopify
        </h2>
        {loading && <>Loading...</>}
        {error && <p>{error}</p>}
        {data && (
          <div className="space-y-8 pb-8">
            {data?.map((item) => (
              <ImageCard data={item} key={item.url} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
