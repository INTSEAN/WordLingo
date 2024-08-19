import React from "react";
import { useRef, useEffect } from "react";

function FileDisplay(props) {
  const { file, audioStr, handleReset, handleFormSubmission } = props;
  const audioRef = useRef();
  useEffect(() => {
    if (!file && !audioStr) {
      return;
    }
    if (file) {
      console.log("HERE FILE", file);
      audioRef.current.src = URL.createObjectURL(file);
    } else {
      console.log("EHER AUDIO", audioStr);
      audioRef.current.src = URL.createObjectURL(audioStr);
    }
  }, [audioStr, file]);

  return (
    <main
      className="flex-1 flex flex-col gap-3 sm:gap-4 text-center 
  justify-center w-72 sm:w-96 p-4 pb-100 max-w-full mx-auto"
    >
      <h1 className="font-semibold text-4xl sm:text-5xl md:text 6xl">
        Your <span className="text-purple-400 bold">File</span>
      </h1>
      <div className="flex flex-col text-left mx-auto gap-1 my-4">
        <h3 className="font-semibold"> Name</h3>
        <p className="truncate">{file ? file?.name : "Custom audio "}</p>
      </div>
      <div className="flex flex-col mb-2">
        <audio ref={audioRef} className="w-full" controls>
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="flex items-center justify-between gap-4 ">
        <button
          onClick={handleReset}
          className="text-slate-400 hover:text-purple-600 duration-200"
        >
          Reset
        </button>
        <button
          onClick={handleFormSubmission}
          className="specialBtn px-4 py-2 rounded-lg text-purple-400 flex items-center gap-2 font-medium"
        >
          {" "}
          <p>Transcribe</p>
          <i className="fa-solid fa-pen-nib"></i>
        </button>
      </div>
    </main>
  );
}

export default FileDisplay;
