import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SubToicForm = () => {
  const [listData, setListData] = useState();
  const [subList, setSubList] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [defaultValue, setDefaultValue] = useState();
  const [topic, setTopic] = useState([]);
  const [updateName, setUpdateName] = useState("");

  const location = useLocation();

  // get the query prams
  const quearyString = location.search;
  const queryParams = new URLSearchParams(quearyString);
  const id = queryParams.get("id");
  console.log("from ", id);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    console.log(isToggled);
  };

  // subtopic from default value

  useEffect(() => {
    fetch(`http://localhost:3000/subtopic/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDefaultValue(data);
      });
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:3000/topic")
      .then((res) => res.json())
      .then((data) => {
        setSubList(data);
      });
  }, []);

  const handleList = async (event) => {
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
    setListData(formateDate);


    // input value
    event.preventDefault();
    const from = event?.target;
    const Name = from?.name?.value;
    const TopicID = from?.selectTopic?.value;
    const position = from?.position?.value;
    const News = from?.news?.value;
    const Articles = from?.articale?.value;
    const Highlights = from?.highlight?.value;
    const Description = from?.description?.value;
    const heading = from?.heading?.value;
    const mainHeading = from?.main?.value;
    const menuFlag = from?.menuFlag?.value;
    const uploadLogo = from?.uploadLogo?.value;
    const navLogo = from?.navLogo?.value;
    const sequence = "";
    const createdBy = "";
    const CreatedOn = formateDate;
    const editOn = "";
    const isActive = isToggled;

    const fomData = {
      Name,
      TopicID,
      position,
      News,
      Articles,
      Highlights,
      Description,
      heading,
      mainHeading,
      menuFlag,
      uploadLogo,
      navLogo,
      sequence,
      createdBy,
      CreatedOn,
      editOn,
      isActive,
    };

    try {
      const response = await fetch("http://localhost:3000/subtopic", {
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
    console.log(listData);

    event.target.reset();
  };

  // edit data

  const updateData = (event) => {
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

    // update input value

    event.preventDefault();
    const from = event?.target;
    const Name = from?.name?.value;
    const TopicID = from?.selectTopic?.value;
    const position = from?.position?.value;
    const News = from?.news?.value;
    const Articles = from?.articale?.value;
    const Highlights = from?.highlight?.value;
    const Description = from?.description?.value;
    const heading = from?.heading?.value;
    const mainHeading = from?.main?.value;
    const menuFlag = from?.menuFlag?.value;
    const uploadLogo = from?.uploadLogo?.value;
    const navLogo = from?.navLogo?.value;
    const sequence = "";
    const createdBy = "";
    const CreatedOn = formateDate;
    const editOn = "";
    const isActive = isToggled;

    const updateData = {
      Name,
      TopicID,
      position,
      News,
      Articles,
      Highlights,
      Description,
      heading,
      mainHeading,
      menuFlag,
      uploadLogo,
      navLogo,
      sequence,
      createdBy,
      CreatedOn,
      editOn,
      isActive,
    };

    fetch(`http://localhost:3000/subtopic/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the updated data as needed
        alert("Data updated successfully");

        // Update the state with the new data
        const updatedTopics = topic.map((item) => {
          if (item.TopicID === updateName) {
            return { ...item, updateData };
          }
          return item;
        });

        setTopic(updatedTopics);
        setUpdateName(""); // Clear the updateName state
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });

    event.target.reset();
  };

  // marge handle submit
  const margeSubmit = (event) => {
    event.preventDefault();
    if (id === null) {
      handleList(event);
    } else {
      updateData(event);
    }
  };
  return (
    <form onSubmit={margeSubmit} className="my-10">
      <p className="font-bold text-2sxl mx-6 lg:px-40">
        Create a Sub Topic List
      </p>
      <div className="grid grid-cols-2 lg:px-40">
        <div>
          <p className="my-2 mx-6 mt-5">
            SubTopic Name{" "}
            <span className="text-red-700 font-bold text-lg">*</span>
          </p>
          <input
            defaultValue={defaultValue?.Name}
            required
            name="name"
            type="text"
            placeholder="Enter Yor name"
            className="input input-bordered "
          />
        </div>
        <div>
          <p className="my-2 mx-6 mt-5">
            Select Topic{" "}
            <span className="text-red-700 font-bold text-lg">*</span>
          </p>
          <div className="mx-5">
            <select
              name="selectTopic"
              className="select select-bordered w-10/12  "
            >
              {subList.map((list) => (
                <option>{list.Name}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <p className="my-2 mx-6 mt-5">
            Position <span className="text-red-700 font-bold text-lg">*</span>
          </p>
          <input
          defaultValue={defaultValue?.position}
            required
            name="position"
            type="text"
            placeholder="Enter Your position"
            className="input input-bordered "
          />
        </div>
        <div>
          <p className="my-2 mx-6 mt-5">
            News <span className="text-red-700 font-bold text-lg">*</span>
          </p>
          <input
          defaultValue={defaultValue?.News}
            required
            name="news"
            type="text"
            placeholder="Enter Your news"
            className="input input-bordered"
          />
        </div>
        <div>
          <p className="my-2 lg:mx-6 mt-5">
            Ariticales <span className="text-red-700 font-bold text-lg">*</span>
          </p>
          <input
          defaultValue={defaultValue?.Articles}
            required
            name="articale"
            type="text"
            placeholder="Enter Your ariticales"
            className="input input-bordered "
          />
        </div>
        <div>
          <p className="my-2 mx-6 mt-5">
            Highlights <span className="text-red-700 font-bold text-lg">*</span>
          </p>
          <input
          defaultValue={defaultValue?.Highlights}
            required
            name="highlight"
            type="text"
            placeholder="Enter Your highlights"
            className="input input-bordered "
          />
        </div>
        <div>
          <p className="my-2 mx-6 mt-5">
            Description{" "}
            <span className="text-red-700 font-bold text-lg">*</span>
          </p>
          <input
          defaultValue={defaultValue?.Description}
            required
            name="description"
            type="text"
            placeholder="Enter Your description"
            className="input input-bordered "
          />
        </div>
        <div>
          <p className="my-2 mx-6 mt-5">
            Main Heading{" "}
            <span className="text-red-700 font-bold text-lg">*</span>
          </p>
          <input
          defaultValue={defaultValue?.mainHeading}
            required
            name="main"
            type="text"
            placeholder="Enter Your main heading"
            className="input input-bordered "
          />
        </div>
        <div>
          <p className="my-2 mx-6 mt-5">
            MenuFlag <span className="text-red-700 font-bold text-lg">*</span>
          </p>
          <input
          defaultValue={defaultValue?.menuFlag}
            required
            name="menuFlag"
            type="text"
            placeholder="Enter Your main menuflag"
            className="input input-bordered "
          />
        </div>

        <div>
          <p className="my-2 mx-6 mt-5">
            Upload Logo{" "}
            <span className="text-red-700 font-bold text-lg">*</span>
          </p>
          <input
          defaultValue={defaultValue?.uploadLogo}
            required
            name="uploadLogo"
            type="text"
            placeholder="Enter Your logo"
            className="input input-bordered "
          />
        </div>
        <div>
          <p className="my-2 mx-6 mt-5">
            Upload Nav Logo{" "}
            <span className="text-red-700 font-bold text-lg">*</span>
          </p>
          <input
          defaultValue={defaultValue?.navLogo}
            required
            name="navLogo"
            type="text"
            placeholder="Enter Your  nav logo"
            className="input input-bordered "
          />
        </div>
      </div>

      <div className="mt-5 lg:mx-48 flex items-center">
        <input
          type="checkbox"
          onChange={handleToggle}
          className="toggle toggle-primary"
        />
        <p className="mx-3">Is Active</p>
      </div>

      <input
        className="btn w-40 lg:mx-48 btn-active btn-sm my-2 btn-primary mt-10"
        type="submit"
        value={"submit"}
      />
    </form>
  );
};

export default SubToicForm;
