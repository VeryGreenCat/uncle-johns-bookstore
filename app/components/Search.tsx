import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

const Search = () => {
  return (
    <Link
      href={"/searchResult"}
      className="flex items-center gap-2 p-4 text-lg font-bold text-white"
    >
      <Button
        style={{
          backgroundColor: "#743014",
          color: "white",
          borderColor: "#743014",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 12px",
        }}
        className="h-[45px] text-lg flex items-center hover:bg-[#5a2710]"
      >
        <span className="flex-1 text-center">
          <SearchOutlined />
        </span>
        ค้นหา
      </Button>
    </Link>
  );
};
export default Search;
