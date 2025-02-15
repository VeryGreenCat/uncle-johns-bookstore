import Banner from "./components/Banner";
import GoodBook from "./components/GoodBook";
import NewBook from "./components/NewBook";
import OnSale from "./components/OnSale";
import Recommend from "./components/Recommend";

const page = () => {
  return (
    <>
      <div className="flex flex-col gap-5 px-6 border border-red-500">
        <Banner />
        <OnSale />
        <NewBook />
        <Recommend />
        <GoodBook />
      </div>
    </>
  );
};
export default page;
