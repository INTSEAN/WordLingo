import React, { useState, useEffect, useRef } from "react";

function HomePage(props) {
  const { setFile, setAudioStr } = props;

  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);
  const mediaRecorder = useRef(null);
  const mimeType = "audio/webm";

  async function startRecording() {
    let tempstream;

    console.log("Start Recording...");

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempstream = streamData;
    } catch (error) {
      console.error(error.message);
      return;
    }
    setRecordingStatus("recording");

    const media = new MediaRecorder(tempstream, { type: mimeType });
    mediaRecorder.current = media;

    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (e) => {
      if (typeof e.data == "undefined") {
        return;
      }
      if (e.data.size === 0) {
        return;
      }
      localAudioChunks.push(e.data);
    };
    setAudioChunks(localAudioChunks);
  }

  async function stopRecording() {
    setRecordingStatus("inactive");
    console.log("Stop recording .. ");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStr(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  }

  useEffect(() => {
    if (recordingStatus === "inactive") {
      return;
    }
    const interval = setInterval(() => {
      setDuration((current) => current + 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <main
        className="flex-1 flex flex-col gap-3 sm:gap-4 text-center 
      justify-center p-4 pb-100"
      >
        <h1 className="font-semibold text-5xl sm:text-6xl md:text 7xl">
          Word <span className="text-purple-400 bold">Lingo</span>
        </h1>
        <h3 className="font-medium md:text-lg">
          Record <span className="text-purple-400">&rarr;</span> Transcribe
          <span className="text-purple-400">&rarr;</span> Translate
        </h3>

        <button
          onClick={
            recordingStatus === "recording" ? stopRecording : startRecording
          }
          className="flex items-center text-base justify-between gap-4 
        mx-auto w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-xl"
        >
          <p className="text-purple-400">
            {recordingStatus === "inactive" ? "Record" : `Stop recording`}
          </p>
          <div className="flex items-center gap-2">
            {duration !== 0 && <p className="text-sm">{duration}s</p>}
            <i
              className={
                "fa-solid duration-200 fa-microphone " +
                (recordingStatus === "recording" ? "text-rose-300" : "")
              }
            ></i>
          </div>
        </button>

        <p className="text-base">
          Or{" "}
          <label className="text-purple-400 cursor-pointer hover:text-blue-600 duration-200">
            {" "}
            upload{" "}
            <input
              onChange={(e) => {
                const tempFile = e.target.files[0];
                setFile(tempFile);
              }}
              className="hidden"
              type="file"
              accept=".mp3, .wav"
            />
          </label>{" "}
          an mp3 or wave file
        </p>
        <p className="italic text-slate-400">Free now free forever</p>
      </main>
    </>
  );
}

export default HomePage;
