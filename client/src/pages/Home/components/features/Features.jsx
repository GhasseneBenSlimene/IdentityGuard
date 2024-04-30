import React from 'react';
import { AiFillAppstore } from 'react-icons/ai';
import { FaMobile, FaGlobe } from 'react-icons/fa';
import { SiProgress, SiAntdesign } from 'react-icons/si';
import Title from '../layouts/Title';
import "./style.css";

const Features = () => {
 return (
    <section
      id="features"
      className="w-full py-20 border-b-[1px] border-b-black bg-gray-100"
    >
      <Title title="" des="Problem with current solutions" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 custom-border">
        <div>
          <h3 className="text-xl font-bold mb-2">Centralized age proof:</h3>
          <p className="text-gray-700">
            Current solutions, such as ID cards and driving licenses, are centralized and controlled by governments or private institutions.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Security and privacy risks:</h3>
          <p className="text-gray-700">
            This poses security and privacy risks, as these institutions can store and share your personal information without your consent.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Lack of transparency and auditability:</h3>
          <p className="text-gray-700">
            It is often difficult to verify the authenticity of these documents, which can facilitate fraud and identity theft.
          </p>
        </div>
      </div>

      <Title title="" des="Advantages of ZKP and blockchain technology" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 custom-border">
        <div>
          <h3 className="text-xl font-bold mb-2">Decentralized and secure age proof:</h3>
          <p className="text-gray-700">
            ZKP and blockchain allow you to prove your age without revealing sensitive information.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Increased privacy and control:</h3>
          <p className="text-gray-700">
            You retain control of your data and can choose to share it only with trusted parties.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Transparency and auditability:</h3>
          <p className="text-gray-700">
            Transactions on the blockchain are transparent and can be verified by anyone.
          </p>
        </div>
      </div>

      <Title title="" des="Planned use cases" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 custom-border">
        <div>
          <h3 className="text-xl font-bold mb-2">Online age verification:</h3>
          <p className="text-gray-700">
            ZKP and blockchain can be used to verify the age of users for websites and applications that require age restrictions, such as online gambling sites and tobacco and alcohol sales sites.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Online voting:</h3>
          <p className="text-gray-700">
            ZKP technology can allow citizens to vote online securely and anonymously, ensuring that only eligible individuals can vote.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Hiring and school registration:</h3>
          <p className="text-gray-700">
            Employers and educational institutions can use ZKP to verify the age of candidates and students without having to collect and store sensitive information.
          </p>
        </div>
      </div>
    </section>
 );
};

export default Features;
