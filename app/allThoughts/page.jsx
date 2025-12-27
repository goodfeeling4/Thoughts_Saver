"use client";
import React, { useState, useEffect } from "react";
import Deletebtn from "@/component/deletebtn";
import Link from "next/link";
import { getAllMessages } from "../../lib/indexdb";



export default function Page() {
  const [thoughts, setThoughts] = useState([]);
  useEffect(() => {
    getAllMessages().then(setThoughts);
  }, []);
  return (
    <div className="static flex justify-center items-center dark:bg-[#111827] bg-blue-300 w-full mx-auto">
      <div className="flex flex-col w-full min-h-[90vh]">
        {thoughts.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">No messages found.</div>
        ) : (
          thoughts.map((m) => (
            <div key={m.id} className="flex justify-between items-start sm:mx-[10vw] mx-[5vw] m-2 p-4 dark:bg-slate-800 bg-blue-500 dark:text-blue-200 rounded-md">
              <div className="flex-1 pr-4">
                <h1 className="text-[1.2rem] dark:text-blue-400 text-black font-extrabold">{m.title}</h1>
                <div className="dark:text-gray-400 text-black">{m.description}</div>
              </div>
              <div className="flex-col gap-2">
                <div className="flex sm:gap-4 gap-2 items-start flex-shrink-0">
                  <Deletebtn id={m.id} />
                  <Link href={`/editThoughts/${m.id}`}>
                    <div className="bg-gradient-to-r from-pink-800 to-blue-800 rounded-sm p-1">
                      EditThoughts
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="flex justify-center sticky bottom-0 items-center sm:gap-0.5 mb-[10vh] m-3 gap-2">
          <button className="bg-blue-900 rounded-l-full text-white rounded p-2 px-4 hover:bg-blue-600 transition-colors mt-3">
            <a href="/">go to home</a>
          </button>
          <button className="bg-blue-700 rounded-r-full text-white rounded p-2 px-4 hover:bg-blue-600 transition-colors mt-3">
            <a href="/addThoughts">add thoughts</a>
          </button>
        </div>
      </div>
    </div>
  );
}