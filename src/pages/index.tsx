import ImageCard from "components/ImageCard";
import useNASA from "hooks/useNASA";
import { ExternalLinkIcon } from "@heroicons/react/outline";

export default function Home() {
  const { loading, data, error } = useNASA();

  return (
    <>
      <main className="container min-h-screen pt-24 grid place-items-center relative">
        <div className="fixed right-12 top-12">
          <a
            href="
            https://github.com/parssak/shopify-nasa/
            "
            target="_blank"
            rel="noopener noreferrer"
            className="transition flex items-center font-semibold cursor-pointer py-2 px-4 rounded-xl bg-white hover:bg-green-500 dark:bg-zinc-900 hover:text-white"
          >
            <span>Source Code on Github</span>
            <ExternalLinkIcon className="ml-2 w-4 h-4" />
          </a>
        </div>
        <h1 className="text-5xl font-bold text-left">NASA Daily Image Data</h1>
        <h2 className="text-2xl font-medium text-left mb-12">
          Made by Parssa Kyanzadeh, for Shopify
        </h2>
        {loading && <>Loading...</>}
        {error && <p>{error}</p>}
        {data && (
          <div className="space-y-8 pb-8 ">
            {data?.map((item) => (
              <ImageCard data={item} key={item.url} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
