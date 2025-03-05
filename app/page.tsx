import Banner from "./components/Banner";
import Category from "./components/Category";
import GoodBook from "./components/GoodBook";
import NewBook from "./components/NewBook";
import OnSale from "./components/OnSale";
import Recommend from "./components/Recommend";

const page = () => {
  return (
    <>
      <div className="flex flex-col gap-5 px-10 py-3 bg-[#FFFFF0]">
        <Banner />
        <Category />
        <OnSale />
        <NewBook />
        <Recommend />
        <GoodBook />
      </div>
    </>
  );
};
export default page;
