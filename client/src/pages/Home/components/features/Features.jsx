import React from 'react';
import { AiFillAppstore } from 'react-icons/ai';
import { FaMobile, FaGlobe } from 'react-icons/fa';
import { SiProgress, SiAntdesign } from 'react-icons/si';
import Title from '../layouts/Title';

const Features = () => {
 return (
    <section
      id="features"
      className="w-full py-20 border-b-[1px] border-b-black bg-gray-100"
    >
      <Title title="Contexte" des="Problème avec les solutions actuelles" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-2">Preuve d'âge centralisée:</h3>
          <p className="text-gray-700">
            Les solutions actuelles, comme les cartes d'identité et les permis de conduire, sont centralisées et contrôlées par des gouvernements ou des institutions privées.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Risques de sécurité et de confidentialité:</h3>
          <p className="text-gray-700">
            Cela pose des risques de sécurité et de confidentialité, car ces institutions peuvent stocker et partager vos informations personnelles sans votre consentement.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Manque de transparence et d'auditabilité:</h3>
          <p className="text-gray-700">
            Il est souvent difficile de vérifier l'authenticité de ces documents, ce qui peut faciliter la fraude et le vol d'identité.
          </p>
        </div>
      </div>

      <Title title="" des="Avantages de la technologie ZKP et de la blockchain" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-2">Preuve d'âge décentralisée et sécurisée:</h3>
          <p className="text-gray-700">
            ZKP et la blockchain permettent de prouver votre âge sans révéler d'informations sensibles.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Confidentialité et contrôle accru:</h3>
          <p className="text-gray-700">
            Vous conservez le contrôle de vos données et pouvez choisir de les partager uniquement avec les parties de confiance.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Transparence et auditabilité:</h3>
          <p className="text-gray-700">
            Les transactions sur la blockchain sont transparentes et peuvent être vérifiées par quiconque.
          </p>
        </div>
      </div>

      <Title title="" des="Cas d'utilisation prévus" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-2">Vérification de l'âge en ligne:</h3>
          <p className="text-gray-700">
            ZKP et la blockchain peuvent être utilisés pour vérifier l'âge des utilisateurs pour les sites Web et les applications qui exigent une restriction d'âge, comme les jeux d'argent en ligne et les sites de vente de tabac et d'alcool.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Vote en ligne:</h3>
          <p className="text-gray-700">
            La technologie ZKP peut permettre aux citoyens de voter en ligne de manière sécurisée et anonyme, tout en s'assurant que seuls les éligibles peuvent voter.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Embauche et inscription à l'école:</h3>
          <p className="text-gray-700">
            Les employeurs et les établissements d'enseignement peuvent utiliser ZKP pour vérifier l'âge des candidats et des étudiants sans avoir à collecter et stocker des informations sensibles.
          </p>
        </div>
      </div>
    </section>
 );
};

export default Features;
