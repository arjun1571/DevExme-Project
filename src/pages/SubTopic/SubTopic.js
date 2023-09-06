import React, { useEffect, useState } from "react";
import SubTopicTabile from "./StuTopicTabile";

const SubTopic = () => {
  const [subList, setSubList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/topic")
      .then((res) => res.json())
      .then((data) => {
        setSubList(data);
      });
  }, []);

  const handleList = async (event) => {
    event.preventDefault();
    const from = event?.target;
    const name = from?.name?.value;
    const selectTopic = from?.selectTopic?.value;
    const position = from?.position?.value;
    const news = from?.news?.value;
    const articale = from?.articale?.value;
    const highlight = from?.highlight?.value;
    const description = from?.description?.value;
    const heading = from?.heading?.value;
    const mainHeading = from?.main?.value;
    const menuFlag = from?.menuFlag?.value;
    const uploadLogo = from?.uploadLogo?.value;
    const navLogo = from?.navLogo?.value;

    const fomData = {
      name,
      selectTopic,
      position,
      news,
      articale,
      highlight,
      description,
      heading,
      mainHeading,
      menuFlag,
      uploadLogo,
      navLogo,
    };

    console.log(fomData);

    try {
      const response = await fetch("http://localhost:3000/createSubTopic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fomData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Article added successfully:", responseData);
      } else {
        console.error("Error adding article:", response.status);
      }
    } catch (error) {
      console.error("Error adding article:", error);
    }

    console.log();
    // create a date
    let date = new Date();
    let date1 = date.toString();
    let date2 = date1.split(" ");
    const finaldate = date2.slice(1, 4);
    const fullFinalData = finaldate.join("-");

    const YYYY_MM_DD_Formater = (date, format = "YYYY-MM-DD") => {
      const t = new Date(date);
      const y = t.getFullYear();
      const m = ("0" + (t.getMonth() + 1)).slice(-2);
      const d = ("0" + t.getDate()).slice(-2);
      return format.replace("YYYY", y).replace("MM", m).replace("DD", d);
    };
    const formateDate = YYYY_MM_DD_Formater(fullFinalData);
    console.log(formateDate);

    event.target.reset();
  };
  return (
    <div className="lg:p-10 md:p-5 p-3  h-[100vh]">
      <div className="mt-5 lg:mx-60 md:mx-12 flex justify-around items-center">
        <div>
          <p className="text-4xl font-bold">Create SubTopic</p>
        </div>
        {/* You can open the modal using ID.showModal() method */}
        <button
          className="btn btn-primary btn-outline btn-sm"
          onClick={() => window.my_modal_2.showModal()}
        >
          Create
        </button>
        <dialog id="my_modal_2" className="modal">
          <form onSubmit={handleList} method="dialog" className="modal-box">
            <p className="font-bold text-lg">Create a topic list</p>
            <p className="my-2 mx-6 mt-5">subTopic Name</p>
            <input
              required
              name="name"
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">Select Topic</p>
            <div className="mx-5">
              <select name="selectTopic" className="select select-bordered w-full max-w-[240px] md:max-w-[360px] ">
                {subList.map((list) => (
                  <option>{list.Name}</option>
                ))}
              </select>
            </div>
            <p className="my-2 mx-6 mt-5">Position</p>
            <input
              required
              name="position"
              type="text"
              placeholder="Type Your position"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">News</p>
            <input
              required
              name="news"
              type="text"
              placeholder="Type Your news"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">Ariticales</p>
            <input
              required
              name="articale"
              type="text"
              placeholder="Type Your ariticales"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">Highlights</p>
            <input
              required
              name="highlight"
              type="text"
              placeholder="Type Your highlights"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">Description</p>
            <input
              required
              name="description"
              type="text"
              placeholder="Type Your description"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">Main Heading</p>
            <input
              required
              name="main"
              type="text"
              placeholder="Type Your main heading"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">MenuFlag</p>
            <input
              required
              name="menuFlag"
              type="text"
              placeholder="Type Your main menuflag"
              className="input input-bordered w-full max-w-xl"
            />

            <p className="my-2 mx-6 mt-5">Upload Logo</p>
            <input
              required
              name="uploadLogo"
              type="text"
              placeholder="Type Your main menuflag"
              className="input input-bordered w-full max-w-xl"
            />
            <p className="my-2 mx-6 mt-5">Upload Nav Logo</p>
            <input
              required
              name="navLogo"
              type="text"
              placeholder="Type Your main menuflag"
              className="input input-bordered w-full max-w-xl"
            />

            <div className="mt-3 mx-6 flex items-center">
              <input type="checkbox" className="checkbox" />
              <p className="mx-3">please accept tream and condition </p>
            </div>

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
          <SubTopicTabile></SubTopicTabile>
          {/* <table class="border-collapse border border-slate-700 ... w-full">
            <thead>
              <tr>
                <th class="border border-slate-800 ...">Name</th>
                <th class="border border-slate-800 ...">Created On</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-slate-700 ...">SHL</td>
                <td class="border border-slate-700 ...">12-20-2023</td>
              </tr>
              <tr>
                <td class="border border-slate-700 ...">Ridspot</td>
                <td class="border border-slate-700 ...">12-20-2023</td>
              </tr>
              <tr>
                <td class="border border-slate-700 ...">Seria</td>
                <td class="border border-slate-700 ...">12-20-2023</td>
              </tr>
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default SubTopic;

//  <div className="mx-5">
// <select className="select select-bordered w-full max-w-[240px] md:max-w-[360px] ">
//   {subList.map((list) => (
//     <option  >
//       {list.Name}
//     </option>
//   ))}
// </select>
// </div>
