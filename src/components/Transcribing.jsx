import React from "react";

function Transcribing(props) {
  const { downloading } = props;
  return (
    <div
      className="flex items-center flex-col flex-1 text-center justify-center p-4 gap-10 md:gap-14
     pb-24"
    >
      <div className="flex flex-col gap-2 sm:gap-4">
        <h1 className="font-semibold text-4xl sm:text-5xl md:text 6xl">
          <span className="text-purple-400 bold">Transcribing</span>
        </h1>
        <p>
          {!downloading ? "Warming up cylinders" : "Core cylinders engaged"}
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:gap-3 max-w-[500px] w-full mx-auto">
        {[0, 1, 2].map((val) => {
          return (
            <div
              key={val}
              className={
                "rounded-full h-2 sm:h-3 bg-slate-400 loading " +
                `loading${val}`
              }
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Transcribing;
