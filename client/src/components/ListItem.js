import React, { useState } from "react";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const editTask = () => {
    setShowModal(true);
  };

  const deleteItem = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        console.log(response);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>
      <div className="button-container">
        <button className="edit" onClick={editTask}>
          EDIT
        </button>
        <button className="delete" onClick={deleteItem}>
          DELETE
        </button>
      </div>
      {showModal && (
        <Modal
          getData={getData}
          mode="edit"
          setShowModal={setShowModal}
          task={task}
        />
      )}
    </li>
  );
};

export default ListItem;
