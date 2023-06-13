import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import surverQuestions from "../utils/surveyQuestions";
import SongsArr from "../utils/SongsArr";
import HipHopArr from "../utils/HipHopArr";

const SurveryModal = ({ modalOpen, setModalOpen }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [result, setResult] = useState([]);

  //  keeps track of selected answers, moves answer to array, and moves to next question
  const selectedAnswer = (answer) => {
    const newAnswers = [...selectedAnswers, answer.target.innerText];
    setSelectedAnswers(newAnswers);

    getRecommendedPlaylist(newAnswers);

    console.log(newAnswers);
    console.log(answer.target.innerText);

    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 750);

    if (currentQuestionIndex === surverQuestions.length - 1) {
      finishSurvey();
      setModalOpen(false);
    }
  };

  // reset question index and remove answers from array
  const resetSurvery = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
  };

  const getRecommendedPlaylist = (answers) => {
    const filterSongs = (genre) => {
      return [...SongsArr, ...HipHopArr].filter(
        (song) => song.genre && song.genre.includes(genre)
      );
    };

    let songs = [];

    if (
      answers.includes("Kanye West") ||
      answers.includes("Hip-hop") ||
      answers.includes("To get pumped up") ||
      answers.includes("To dance") ||
      answers.includes("Yes") ||
      answers.includes("Motivated")
    ) {
      songs = filterSongs("Hip-hop");
    } else if (
      answers.includes("Bjork") ||
      answers.includes("Experimental") ||
      answers.includes("To relax") ||
      answers.includes("To feel emotions") ||
      answers.includes("No") ||
      answers.includes("Weird") ||
      answers.includes("Calm")
    ) {
      songs = filterSongs("Experimental");
    } else if (
      answers.includes("Tame Impala") ||
      answers.includes("Rock") ||
      answers.includes("Audioslave") ||
      answers.includes("To get pumped up") ||
      answers.includes("No") ||
      answers.includes("Thrilling")
    ) {
      songs = filterSongs("Alternative");
    }

    if (songs.length > 0) {
      // No need to check songs && as songs is now always defined
      const newSong = songs[Math.floor(Math.random() * songs.length)];

      if (!result.find((song) => song.id === newSong.id)) {
        setResult((prevSongs) => {
          const updatedSongs = [...prevSongs, newSong];
          console.log("updatedSongs", updatedSongs);
          return updatedSongs;
        });
      }
    } else {
      console.log("No songs matched the selected criteria.");
    }
    console.log("result", result);
  };

  const finishSurvey = () => {
    console.log(result); // This will log the final list of songs added
    resetSurvery();
  };

  // framer motion styling
  const modalVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "0vh", x: "-100vw" },
  };

  // useeffect so selected answers are logged to console
  // useEffect(() => {
  //   if (selectedAnswers.length > 0) {
  //     getRecommendedPlaylist();
  //   }
  // }, [selectedAnswers]);

  return (
    <div className="">
      <ReactModal
        ariaHideApp={false}
        className=" grid h-screen place-items-center bg-black text-white"
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        {surverQuestions[currentQuestionIndex] && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center items-center"
            >
              <h1 className="m-2 text-xl">
                {surverQuestions[currentQuestionIndex].question}
              </h1>
              <div className="flex flex-col">
                {surverQuestions[currentQuestionIndex].answers.map(
                  (answer, index) => {
                    return (
                      <div key={index} className="flex m-2">
                        <li
                          onClick={selectedAnswer}
                          className="p-2 bg-answer active:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 hover:cursor-pointer"
                        >
                          {answer}
                        </li>
                      </div>
                    );
                  }
                )}
                <div className="mt-4">
                  {currentQuestionIndex < surverQuestions.length - 1 ? (
                    <div>
                      <button
                        onClick={resetSurvery}
                        className="border bg-black text-white p-2"
                      >
                        Retake Survey
                      </button>
                      <button
                        className="text-center text-red-400 pl-2"
                        onClick={() => {
                          setModalOpen(false);
                          resetSurvery();
                        }}
                      >
                        close modal
                      </button>
                    </div>
                  ) : (
                    <button
                      className="border bg-black text-white p-2"
                      onClick={finishSurvey}
                    >
                      Finish Survey
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </ReactModal>
    </div>
  );
};

export default SurveryModal;
