import Link from "next/link";
import Banner from "./components/Banner";
import GoodBook from "./components/GoodBook";
import NewBook from "./components/NewBook";
import OnSale from "./components/OnSale";
import Recommend from "./components/Recommend";

const page = () => {
  return (
    <>
      <Banner />
      <div className="flex flex-col gap-5 px-6 py-3 border border-red-500">
        <OnSale />
        <NewBook />
        <Recommend />
        <GoodBook />
      </div>

      
    </>
  );
};
export default page;
