import React, { useEffect, useState } from "react";
import { SEARCH_API } from "../utils/config";
import { useSelector } from "react-redux";
import SearchCards from "./SearchCards";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const SearchPaga = () => {
  const [result, setResult] = useState([]);
  const selector = useSelector((store) => store.search);

  useEffect(() => {
    if (selector) {
      getSearch();
    }
  }, [selector]);

  async function getSearch() {
    const data = await fetch(SEARCH_API + "&q=" + selector);
    const json = await data.json();
    setResult(json.items); // Set result to the array of items
  }

  if (!result) {
    return null;
  }
  return result.length === 0 ? (
    <Loader />
  ) : (
    <div className="mx-auto  lg:w-[60%] w-[100%] lg:mt-0 mt-14 h-screen overflow-y-scroll">
      {result.map((r, index) => (
        <Link to={"/browse/watch?v=" + r?.id?.videoId}>
          <SearchCards key={index} info={r} />
        </Link>
      ))}
    </div>
  );
};

export default SearchPaga;
