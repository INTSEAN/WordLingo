import React from "react";
import { LANGUAGES } from "../utils/presets";

function Translation(props) {
  const {
    textElement,
    toLanguage,
    translating,
    setToLanguage,
    setTranslating,
    generateTranslation,
  } = props;

  return (
    <>
      <div className="flex flex-col gap-2 max-w-[400px] w-full mx-auto">
        {!translating && (
          <div className="flex flex-col gap-1">
            <p className="text-xs sm:text-sm font-medium text-slate-500 mr-auto">
              To Language
            </p>
            <dir className="flex items-stretch gap-2">
              <select
                className="flex-1 outline-none bg-white focus:outline-none borber
             border-solid border-transparent duration-200 p-2 rounded hover:border-purple-400"
                value={toLanguage}
                onChange={(e) => setToLanguage(e.target.value)}
              >
                <option value={"Select Language"} disabled></option>
                {Object.entries(LANGUAGES).map(([key, value]) => {
                  return (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={generateTranslation}
                className="specialBtn px-4 py-2 rounded -lg text-purple-400 hover:text-blue-600 duration-200"
              >
                Translate
              </button>
            </dir>
          </div>
        )}
        {textElement && !translating && <p> {textElement} </p>}
        {translating && (
          <div className="grid place-items-center">
            <i className="fa-solid fa-spinner animate-spin"></i>
          </div>
        )}
      </div>
    </>
  );
}

export default Translation;
