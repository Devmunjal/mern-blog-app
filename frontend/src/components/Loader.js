import React from "react";

function Loader() {
  return (
    <div className="flex h-full w-full justify-center align-middle">
      <span class="animate-ping h-20 w-20 rounded-full bg-sky-400 opacity-75"></span>
    </div>
  );
}

export default Loader;
