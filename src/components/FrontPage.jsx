import React, { useState } from "react";
import SurveryModal from "./SurveryModal";

const FrontPage = () => {
  const [showModal, setShowModal] = useState(false);

  const displayModal = () => {
    setShowModal(true);
  };

  return (
    <div className="flex h-screen w-full bg-black animate-slideright">
      <button
        className="text-center text-red-400 mx-auto justify-center items-center"
        onClick={displayModal}
      >
        {showModal ? "" : <p className="text-3xl">Take Survey</p>}
      </button>
      <SurveryModal modalOpen={showModal} setModalOpen={setShowModal} />
    </div>
  );
};

export default FrontPage;
