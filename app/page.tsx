import Banner from "./components/Banner";
import Category from "./components/Category";
import GoodBook from "./components/GoodBook";
import NewBook from "./components/NewBook";
import OnSale from "./components/OnSale";
import Recommend from "./components/Recommend";
import Search from "./components/Search";

const page = () => {
  return (
    <>
      <div className="flex flex-col gap-5 px-10 py-3 bg-[#FFFFF0]">
        <Banner />
        <div className="flex items-center justify-between">
          <Category />
          <Search />
        </div>
        <NewBook />
        <Recommend />
        <OnSale />
        <GoodBook />
      </div>
    </>
  );
};
export default page;
