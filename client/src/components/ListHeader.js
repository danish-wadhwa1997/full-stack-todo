import React, { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const signOut = () => {
    console.log("signOut");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  const [showModal, setShowModal] = useState(false);

  const createNewTask = () => {
    setShowModal(true);
  };

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={createNewTask}>
          ADD NEW
        </button>
        <button className="signout" onClick={signOut}>
          SIGN OUT
        </button>
      </div>
      {showModal && (
        <Modal getData={getData} mode={"create"} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default ListHeader;
