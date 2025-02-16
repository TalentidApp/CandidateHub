import React from "react";

const Loader = () => {
  return (
    <div className="relative w-11 h-11 animate-spinner-y0fdc1 [transform-style:preserve-3d]">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-full bg-[rgba(0,77,255,0.2)] border-2 border-[#004dff]"
          style={{
            transform: [
              "translateZ(-22px) rotateY(180deg)",
              "rotateY(-270deg) translateX(50%)",
              "rotateY(270deg) translateX(-50%)",
              "rotateX(90deg) translateY(-50%)",
              "rotateX(-90deg) translateY(50%)",
              "translateZ(22px)",
            ][i],
            transformOrigin: [
              "", "top right", "center left", "top center", "bottom center", "",
            ][i],
          }}
        ></div>
      ))}
    </div>
  );
};

export default Loader;
