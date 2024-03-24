import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Prouveur() {
  const [data, setData] = useState({
    accountNumber: '',
    age: '',
  });

  const deployContract = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/deploy_contract', data);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        // Réinitialiser les champs après le succès du déploiement
        setData({
          ...data,
          accountNumber: '',
          age: '',
        });
        toast.success('Contrat déployé avec succès !');
      }
    } catch (error) {
      console.error('Erreur lors du déploiement du contrat :', error);
      toast.error('Erreur lors du déploiement du contrat');
    }
  };

  return (
    <div>
      <h1>Prouveur Page</h1>
      <form onSubmit={deployContract}>
        <label htmlFor="accountNumber">Numéro de Compte :</label>
        <input
          type="text"
          id="accountNumber"
          placeholder="Entrez le numéro de compte ..."
          value={data.accountNumber}
          onChange={(e) => setData({ ...data, accountNumber: e.target.value })}
          required
        />
        <br />
        <label htmlFor="age">Âge :</label>
        <input
          type="number"
          id="age"
          placeholder="Entrez l'âge ..."
          value={data.age}
          onChange={(e) => setData({ ...data, age: e.target.value })}
          required
        />
        <button type="submit">Déployer le Contrat</button>
      </form>
    </div>
  );
};
