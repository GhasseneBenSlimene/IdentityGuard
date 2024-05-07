import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaReact } from "react-icons/fa";
import { SiTailwindcss, SiFigma, SiNextdotjs } from "react-icons/si";

const LeftBanner = () => {
  const [text] = useTypewriter({
    words: [
      "Protect your data.",
      "Prove age without disclosure.",
      "Avoid people judging you.",
    ],
    loop: true,
    typeSpeed: 20,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });
  return (
    <div className="-full lgl:w-3/5 flex flex-col gap-20">
      <div className="flex flex-col gap-5">
      
        <h1 className="text-6xl font-bold text-black">
          With the {" "}
          <span className="text-designColor capitalize">ZKP </span>
          technology
        </h1>
        <h2 className="text-4xl font-bold text-black min-w-full min-h-20 flex-shrink-0">
          <span>{text}</span>
          <Cursor
            cursorBlinking="false"
            cursorStyle="|"
            cursorColor="#123456"
          />
        </h2>
      </div>
      <div className="flex flex-col xl:flex-row gap-6 lgl:gap-0 justify-between"></div>
    </div>
  );
};

export default LeftBanner;
