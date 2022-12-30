import Head from "next/head";
import { PaginatedTable } from "../components/PaginatedTable";

export default function Home({ teamsData }) {
  return (
    <div className="flex flex-col justify-center w-screen items-start bg-slate-100">
      <Head>
        <title>NBA App</title>
      </Head>
      <h1 className="text-5xl font-bold text-blue-500 m-12">
        <i className="fa-sharp fa-solid fa-basketball mr-4 text-orange-400"></i>
        NBA TEAMS
      </h1>
      <PaginatedTable teamsData={teamsData} />
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