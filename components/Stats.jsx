import { useState } from "react";

export const Stats = ({ stat, open, setOpen }) => {
  return (
    <div
      className={`absolute top-0 right-0 flex flex-col justify-start bg-white z-50 w-1/3 h-screen shadow-lg shadow-gray-400 gap-4 origin-right ${
        stat ? "translate-x-0" : "translate-x-full"
      } transition-transform ${open ? "" : "hidden"}`}
    >
      <h1 className="flex justify-between text-3xl bg-blue-400 font-bold p-4">
        {stat.name}
        <i
          className="fa-solid fa-xmark cursor-pointer hover:text-red-700 hover:scale-150"
          onClick={() => setOpen(false)}
        ></i>
      </h1>
      <ul className="text-xl">
        <li className="flex justify-between items-center p-4 mb-4 border-2 border-b-gray-300">
          Team Full Name: <span className="font-bold">{stat.name}</span>
        </li>
        <li className="flex justify-between items-center p-4 mb-4 border-2 border-b-gray-300">
          Symbol: <span className="font-bold">{stat.symbol}</span>
        </li>
      </ul>
      <h3 className="text-xl font-bold p-4">Game Summary</h3>
      <ul className="text-xl">
        <li className="flex justify-between items-center p-4 mb-4 border-2 border-b-gray-300">
          Date:{" "}
          <span className="font-bold">
            {new Date(stat.date).toDateString()}
          </span>
        </li>
        <li className="flex justify-between items-center p-4 mb-4 border-2 border-b-gray-300">
          Home Team:
          <span className="font-bold">{stat.home_team.full_name}</span>
        </li>
        <li className="flex justify-between items-center p-4 mb-4 border-2 border-b-gray-300">
          Home Team Score:
          <span className="font-bold">{stat.home_team_score}</span>
        </li>
        <li className="flex justify-between items-center p-4 mb-4 border-2 border-b-gray-300">
          Visitor Team:
          <span className="font-bold">{stat.visitor_team.full_name}</span>
        </li>
        <li className="flex justify-between items-center p-4 mb-4 border-2 border-b-gray-300">
          Visitor Team Score:
          <span className="font-bold">{stat.visitor_team_score}</span>
        </li>
      </ul>
    </div>
  );
};