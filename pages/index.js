import Head from "next/head";
import { PaginatedTable } from "../components/PaginatedTable";
import { useEffect, useState } from "react";

export default function Home({ teamsData }) {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      const res = await fetch(`https://www.balldontlie.io/api/v1/teams/${id}`);

      const teamData = await res.json();

      const arr = [];

      arr.push(teamData);

      setData(arr);

      setId("");
    } else {
      setData(teamsData);
    }
  };

  useEffect(() => {
    setData(teamsData);
  }, [teamsData]);

  return (
    <div className="flex flex-col justify-center w-screen items-start bg-slate-100">
      <Head>
        <title>NBA App</title>
      </Head>
      <h1 className="text-5xl font-bold text-blue-500 m-12">
        <i className="fa-sharp fa-solid fa-basketball mr-4 text-orange-400"></i>
        NBA TEAMS
      </h1>
      <form className="w-1/4 flex justify-between my-4 p-2">
        {data.length === 1 ? (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 px-8 p-4 font-bold rounded-md uppercase"
            onClick={handleSubmit}
          >
            Go back
          </button>
        ) : (
          <>
            <input
              type="text"
              className="p-2 border-2 border-gray-600 w-2/3 placeholder:text-gray-500 font-medium focus:outline-none mx-2"
              placeholder="search a team by id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 px-8 font-bold rounded-md uppercase"
              onClick={handleSubmit}
            >
              search
            </button>
          </>
        )}
      </form>
      <PaginatedTable teamsData={data} />
    </div>
  );
}

//runs only once at build time
//suitable for displaying static data
export async function getStaticProps(context) {
  //get data from api
  const res = await fetch("https://www.balldontlie.io/api/v1/teams");

  const teams = await res.json();

  return {
    props: {
      teamsData: teams.data,
    },
  };
}