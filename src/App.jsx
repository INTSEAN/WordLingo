import HomePage from "./components/HomePage";
import Header from "./components/Header";
import FileDisplay from "./components/FileDisplay";
import { useState, useEffect } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [audioStr, setAudioStr] = useState(null);

  const isAudioAvailable = file || audioStr;

  function handleReset() {
    setFile(null);
    setAudioStr(null);
  }

  useEffect(() => {
    console.log(audioStr);
  }, [audioStr]);

  return (
    <>
      <div className="flex flex-col max-w-[1000px mx-auto w-full">
        <section className="min-h-screen flex flex-col">
          <Header />
          {isAudioAvailable ? (
            <FileDisplay
              file={file}
              audioStr={audioStr}
              handleReset={handleReset}
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
