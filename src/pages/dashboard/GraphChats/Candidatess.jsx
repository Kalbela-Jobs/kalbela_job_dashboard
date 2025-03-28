"use client";

import { useQuery } from "@tanstack/react-query";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import { useContext } from "react";
import ModalChart1 from "./ModalChart1";
import ModalChart2 from "./ModalChart2";

const Candidatess = ({ itemUrl }) => {
  const { base_url } = useContext(Kalbela_AuthProvider);
  console.log("more checked", itemUrl);

  // Fetch candidates data
  const {
    data: candidatesData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["job_candidates", itemUrl], // itemUrl ke dependency te add korlam
    queryFn: async () => {
      if (!itemUrl) return []; // Jodi itemUrl na thake, empty array return korbo
      const res = await fetch(
        `${base_url}/employer/candidate-by-job?job_slug=${itemUrl}`
      );
      const data = await res.json();
      return data.data?.candidates || [];
    },
    enabled: !!itemUrl, // Jodi itemUrl thake tahole query run hobe
  });

  // console.log("checked 99999999955", candidatesData);

  return (
    <div className=" lg:w-[900px] md:w-[700px]  mx-auto p-4 ">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Job Applications by Date */}
        <div className="h-80 w-full">
          <h4 className="text-md font-bold mb-1">
            Total Jobs Applied : {candidatesData.length}
          </h4>
          <ModalChart2 candidatesData={candidatesData} />
        </div>

        {/* Existing Demographics Chart */}
        <div className="h-80 w-full mt-6 lg:mt-0">
          <ModalChart1 candidatesData={candidatesData} />
        </div>
      </div>
    </div>
  );
};

export default Candidatess;
