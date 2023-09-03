import React, { useState } from "react";
import "../../pages/Topic/Topic.scss";

import "whatwg-fetch";
import Tabile from "./Tabile";



const Topic = () => {


  const [listData, setListData] = useState();
  const handleList = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const date = new Date();
    setListData(name, date);

    console.log(name, date);
    event.target.reset();
  };

  return (
    <div className="lg:p-10 md:p-5 p-3  h-[100vh]">
      <div className="mt-5 lg:mx-60 md:mx-12 flex justify-around items-center">
        {listData}
        <div>
          <p className="text-4xl font-bold">Create Topic</p>
        </div>
        {/* Open the modal using ID.showModal() method */}
        <button
          className="btn btn-primary btn-outline btn-sm"
          onClick={() => window.my_modal_2.showModal()}
        >
          Create
        </button>
        <dialog id="my_modal_2" className="modal">
          <form onSubmit={handleList} method="dialog" className="modal-box">
            <p className="font-bold text-lg">Create a topic list</p>
            <p className="my-2 mx-6 mt-5">Topic Name</p>
            <input
              name="name"
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xl"
            />
            <input
              className="btn w-40 flex mx-auto btn-active btn-sm my-2 btn-primary mt-10"
              type="submit"
              value={"submit"}
            />
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>

      <div className="mt-5 lg:mx-60 md:mx-12">
        <div class="md:w-3/3 py-3">
          
          <Tabile></Tabile>
        </div>
      </div>
    </div>
  );
};

export default Topic;
