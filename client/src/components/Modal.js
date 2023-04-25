import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, task, getData }) => {
  const editMode = mode === "edit" ? true : false;
  const [cookies] = useCookies(null);
  const userEmail = cookies.Email;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : userEmail,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 0,
    date: editMode ? task.date : new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log(response);
        closeModal();
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log(response);
        closeModal();
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={closeModal}>X</button>
        </div>
        <form>
          <input
            name="title"
            required
            maxLength={30}
            placeholder="your task goes here"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            value={data.progress}
            id="range"
            onChange={handleChange}
            type="range"
            min={0}
            max={100}
            name="progress"
            required
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
