import React from 'react';
import { cover } from "../../assets/index";

const RightBanner = () => {
  return (
    <div className="w-full lgl:w-1/2 flex flex-col justify-center items-center relative text-black">
      <div>
      <img src={cover} alt="Cover" className="w-full h-auto" />

      </div>
      <div>

      <br></br>
      <br></br>
      <br></br>

        Ce projet développe un système utilisant la cryptographie à preuve à divulgation nulle de connaissance (ZKP) pour prouver de manière sécurisée et confidentielle que l'âge d'une personne est supérieur à 18 ans, sans révéler d'autres informations personnelles. La preuve cryptographique générée est ensuite déployée sur la blockchain, offrant une solution de vérification d'identité respectueuse de la vie privée via deux interfaces utilisateur distinctes pour le demandeur et le vérificateur.
      </div>
    </div>
  );
}

export default RightBanner;
