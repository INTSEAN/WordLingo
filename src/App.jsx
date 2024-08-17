import HomePage from "./components/HomePage";
import Header from "./components/Header";
import FileDisplay from "./components/FileDisplay";
import Transcribing from "./components/Transcribing";
import Info from "./components/Info";
import { useState, useRef, useEffect } from "react";
import { MessageTypes } from "./utils/presets";

function App() {
  const [file, setFile] = useState(null);
  const [audioStr, setAudioStr] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [download, setDownloading] = useState(false);

  const isAudioAvailable = file || audioStr;

  function handleReset() {
    setFile(null);
    setAudioStr(null);
  }

  const worker = useRef(null);
  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("./utils/whisper.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case "DOWNLOADING":
          setDownloading(true);
          console.log("DOWNLOADING");
          break;
        case "LOADING":
          setLoading(true);
          console.log("LOADING");
          break;
        case "RESULT":
          setOutput(e.data.results);
          break;
        case "INFERENCE_DONE":
          setFinished(true);
          console.log("DONE");
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  }, []);

  async function readAudioFrom(file) {
    const sampling_rate = 16000;
    const audioContext = new AudioContext({ sampleRate: sampling_rate });
    const response = await file.arrayBuffer();
    const decoded = await audioContext.decodeAudioData(response);
    const audio = decoded.getChannelData(0);
    return audio;
  }

  async function handleFormSubmission() {
    if (!file && !audioStr) {
      return;
    }

    let audio = await readAudioFrom(file ? file : audioStr);
    const model_name = `openai/whisper-tiny.en`;

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name,
    });
  }

  return (
    <>
      <div className="flex flex-col max-w-[1000px mx-auto w-full">
        <section className="min-h-screen flex flex-col">
          <Header />
          {output ? (
            <Info output={output} />
          ) : loading ? (
            <Transcribing />
          ) : isAudioAvailable ? (
            <FileDisplay
              file={file}
              audioStr={audioStr}
              handleReset={handleReset}
              handleFormSubmission={handleFormSubmission}
            />
          ) : (
            <HomePage setFile={setFile} setAudioStr={setAudioStr} />
          )}
        </section>
        <footer></footer>
      </div>
    </>
  );
}

export default App;
