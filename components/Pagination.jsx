import { useEffect, useState } from "react";

export const Pagination = ({ totalData, pageLimit, paginate }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= Math.ceil(totalData / pageLimit); i++) {
      arr.push(i);
    }

    setPages(arr);
  }, []);

  return (
    <>
      <ul className="flex justify-center items-center text-white w-full ">
        {pages.map((pageNo, idx) => (
          <li
            key={idx}
            className="bg-blue-500 m-4 p-4 rounded-md hover:bg-blue-800"
          >
            <a href="#" onClick={() => paginate(pageNo)}>
              {pageNo}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};