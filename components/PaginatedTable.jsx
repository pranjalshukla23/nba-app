import { useEffect, useState } from "react";
import { Stats } from "./Stats";
import { Pagination } from "./Pagination";

export const PaginatedTable = ({ teamsData }) => {
  const [open, setOpen] = useState(false);

  //state to store the teams data
  const [teams, setTeams] = useState(teamsData);

  //state to store selected team data
  const [teamStat, setTeamStat] = useState();

  //state to store the sorting order
  const [order, setOrder] = useState("ASC");

  //state to store the current page number
  const [pageNo, setPageNo] = useState(1);

  //state to store total number of teams data to be displayed on current page
  const [TeamsPerPage, setTeamsPerPage] = useState(10);

  //variable to store the last index of data which should be read
  const indexOfLastTeam = pageNo * TeamsPerPage;

  //variable to store the starting index from which data should be read
  const indexOfFirstTeam = indexOfLastTeam - TeamsPerPage;

  //get the teams data between starting index and ending index to be
  // displayed on
  // the current page
  const paginatedTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

  //function to change page number
  const paginate = (pageNo) => {
    setPageNo(pageNo);
  };

  //function to sort data
  const sortData = (col) => {
    //if sorting order is ascending
    if (order === "ASC") {
      //sort in descending order
      const sortedTeams = teams.sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );

      //set the sorted data
      setTeams(sortedTeams);

      //set the order to descending
      setOrder("DSC");

      //if order is descending
    } else if (order === "DSC") {
      //sort in ascending order
      const sortedTeams = teams.sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );

      //set the sorted data
      setTeams(sortedTeams);

      //set the order to ascending
      setOrder("ASC");
    }
  };

  //function to get stats of the team
  const getStats = async (id, name, symbol) => {
    //fetch team stat for season 2021
    const res = await fetch(
      `https://www.balldontlie.io/api/v1/games?team_ids[]=${id}&seasons[]=2021`
    );

    let stats = await res.json();

    stats.data[0].name = name;
    stats.data[0].symbol = symbol;

    setTeamStat(stats.data[0]);

    setOpen(true);
  };

  useEffect(() => {
    paginate(1);
  }, []);

  if (teamsData.length === 0) {
    return <h1>No data found</h1>;
  }

  return (
    <>
      {teamStat && <Stats stat={teamStat} open={open} setOpen={setOpen} />}

      <table className="w-full border-2 border-red-300 relative">
        <thead>
          <tr className="bg-blue-800 text-2xl text-white text-center">
            <th className="p-4">Team Name</th>
            <th>
              City{" "}
              <i
                className="fa-solid fa-sort cursor-pointer hover:text-black"
                onClick={() => sortData("city")}
              ></i>
            </th>
            <th>Abbreviation</th>
            <th>Conference</th>
            <th>Division</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTeams.map((team) => (
            <tr
              key={team.id}
              className="text-center text-xl border-b-2 border-b-gray-900 even:bg-slate-200 hover:bg-black hover:text-white hover:border-red-500 cursor-pointer"
              onClick={() =>
                getStats(team.id, team.full_name, team.abbreviation)
              }
            >
              <td className="p-4">{team.full_name}</td>
              <td>{team.city}</td>
              <td>{team.abbreviation}</td>
              <td>{team.conference}</td>
              <td>{team.division}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalData={teams.length}
        pageLimit={TeamsPerPage}
        paginate={paginate}
      />
    </>
  );
};