import React, { useEffect, useState } from "react";
import Quill from "./Quill";

const Artical = () => {
  const [topics, setTopics] = useState([]);
  const [subTopics, setSubTopics] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/topic')
      .then((res) => res.json())
      .then((data) => {
        setTopics(data);
      });
  }, []);
  useEffect(() => {
    fetch('http://localhost:3001/subtopic')
      .then((res) => res.json())
      .then((data) => {
        setSubTopics(data);
      });
  }, []);
  return (
    <div className="lg:p-10 md:p-5 p-3 ">
      <div className="flex md:justify-between justify-around md:border p-2 lg:mx-60  ">
        <div className="">
          <div className="flex items-center">
            <p >Topic</p>
            <div className="relative w-full mx-3 ">
              <select className="md:w-48 w-32 p-2.5 rounded-md shadow-sm outline-none appearance-none focus:border-black">
                {
                  topics.map((topic)=><option key={topic.TopicID}>{topic.Name}</option>)
                }
               
              </select>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex items-center">
            <p>Topic</p>
            <div className="relative w-full lg:max-w-sm mx-3">
              <select className="md:w-48 w-32 p-2.5 rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
              {
                  subTopics.map((subTopic)=><option key={subTopic.TopicID}>{subTopic.Name}</option>)
                }
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 lg:mx-60 md:mx-12">
        <p>Header</p>
        <div class="md:w-3/3 py-3">
          <input
            class=" appearance-none border-2-black border-black-200 rounded w-full py-2 px-4  leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="mt-5 lg:mx-60 md:mx-12">
        <p>Abstract</p>
        <div class=" py-3">
          <textarea class="resize rounded-md w-full md:py-10 py-7"></textarea>
        </div>
      </div>
      <Quill></Quill>
      <div className="mt-5 lg:mx-60 md:mx-12">
        <p>Embed video</p>
        <div class="md:w-3/4 py-3">
          <textarea class="resize rounded-md w-3/4 md:py-10 py-7"></textarea>
        </div>
      </div>
      <div className="mt-5 lg:mx-60 md:mx-12">
        <p>Upload Image:</p>
        <div class="mb-3 mt-3">
          <input
            className="relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-400 file:px-3 file:py-[0.32rem] file:text-neutral-800 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-400 focus:border-primary focus:text-neutral-800 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-800 dark:file:bg-neutral-00 dark:file:text-neutral-700 dark:focus:border-primary"
            type="file"
            id="formFile"
          />
        </div>
      </div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded lg:mx-60 md:mx-12">
        Save
      </button>
    </div>
  );
};

export default Artical;
