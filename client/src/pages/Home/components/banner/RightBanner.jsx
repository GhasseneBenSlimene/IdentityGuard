import React from 'react';
import { cover } from "../../assets/index";
import "../features/style.css"

const RightBanner = () => {
  return (
    <div className="w-full lgl:w-1/2 flex flex-col justify-center items-center relative text-black">
      <div>
      <img src={cover} alt="Cover" className="w-full h-auto pb-10" />

      </div>
      <div className='custom-border '>

      <br></br>
      
      <br></br>

      This project is developing a system that uses zero-knowledge proof (ZKP) cryptography to securely and confidentially prove that a person’s age is over 18, without revealing any other personal information. The cryptographic proof generated is then deployed on the blockchain, providing a privacy-respecting identity verification solution via two separate user interfaces for the applicant and the verifier.      </div>
    </div>
  );
}

export default RightBanner;
