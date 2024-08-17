import React from "react";
import Translation from "./Translation";
import Transcription from "./Transcription";
import { useState, useEffect, useRef } from "react";

function Info(props) {
  const [tab, setTab] = useState("transcription");
  const { output } = props;
  const [translation, setTranslation] = useState(null);
  const [translating, setTranslating] = useState(null);
  const [toLanguage, setToLanguage] = useState("Select Language");

  console.log(output);
  const worker = useRef();

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("../utils/translate.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }

    const onMessageReceived = async (e) => {
      switch (e.data.status) {
        case "initiate":
          console.log("DOWNLOADING");
          break;
        case "progress":
          console.log("LOADING");
          break;
        case "update":
          setTranslation(e.data.output);
          break;
        case "complete":
          setTranslating(false);
          console.log("DONE");
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  }, []);

  const textElement =
    tab === "transcription"
      ? output.map((val) => val.text)
      : translation || "No Translation";

  function handleCopy() {
    navigator.clipboard.writeText(textElement);
  }

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([textElement], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `WordLingo_${new Date().toString()}.txt`;
    document.body.appendChild(element);
    element.click();
  }

  function generateTranslation() {
    if (translation || toLanguage === "Select Language") {
      return;
    }

    worker.current.postMessage({
      text: output.map((val) => val.text),
      src_lang: "eng_Latn",
      tgt_lang: toLanguage,
    });
  }

  return (
    <main
      className="flex-1 flex flex-col gap-3 sm:gap-4 text-center 
    justify-center max-w-prose w-full p-4 pb-100 max-w-full mx-auto"
    >
      <h1 className="font-semibold text-4xl sm:text-5xl md:text 6xl whitespace-nowrap">
        Your <span className="text-purple-400 bold">Transcription</span>
      </h1>

      <div
        className="grid grid-cols-2 items-center mx-auto bg-white border-2 
      border-solid border-purple-300 shadow rounded-full overflow-hidden"
      >
        <button
          onClick={() => {
            setTab("transcription");
          }}
          className={
            "px-4 py-1 duration-200 " +
            (tab === "transcription"
              ? " bg-purple-400 text-white "
              : " text-purple-400 hover:text-purple-600")
          }
        >
          Transcription
        </button>
        <button
          onClick={() => {
            setTab("translation");
          }}
          className={
            "px-4 py-1 duratiion-200 " +
            (tab === "translation"
              ? " bg-purple-400 text-white "
              : " text-purple-400 hover:text-purple-600")
          }
        >
          Translation
        </button>
      </div>
      <div className="my-8 flex flex-col">
        {tab == "transcription" ? (
          <Transcription {...props} textElement={textElement} />
        ) : (
          <Translation
            {...props}
            toLanguage={toLanguage}
            translating={translating}
            textElement={textElement}
            setToLanguage={setToLanguage}
            setTranslating={setTranslating}
            generateTranslation={generateTranslation}
          />
        )}
      </div>
      <div className="flex items-center gap-4 mx-auto">
        <button
          onClick={handleCopy}
          title="Copy"
          className="specialBtn text-purple-400 px-2 aspect-square grid place-items-center rounded"
        >
          <i className="fa-solid fa-copy"></i>
        </button>
        <button
          onClick={handleDownload}
          title="Download"
          className="specialBtn text-purple-400 px-2 aspect-square grid place-items-center rounded"
        >
          <i class="fa-solid fa-download"></i>
        </button>
      </div>
    </main>
  );
}

export default Info;
