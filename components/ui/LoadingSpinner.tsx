import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full py-[66px] px-[36px]">
      <div className="relative w-12 h-12 border-4 border-t-transparent border-[#118BCF88] rounded-full animate-spin">
        <div className="absolute inset-0 w-full h-full rounded-full border-4 border-transparent border-t-[#00C22B88]"></div>
      </div>
    </div>
  );
}
