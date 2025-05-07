import React, { useState } from 'react';
import { registerParticipant } from '../services/api';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import maquette from '../assets/images/maquette.png';

const Subscription = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    phone_tuteur:'',
    address: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Soumission du formulaire avec:", formData);
      const response = await registerParticipant(formData);
      console.log("Réponse reçue:", response);
      
      if (response.status === 201) {
        setMessage('Inscription réussie !');
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          phone_tuteur: '',
          address: '',
        });
      }
    } catch (error) {
      console.error("Erreur capturée:", error);
      let errorMessage = "Erreur lors de l'inscription";
      
      if (error.response) {
        // Erreur venant du serveur
        if (error.response.data) {
          errorMessage = Object.values(error.response.data).flat().join(', ');
        }
        console.error("Détails de l'erreur:", error.response.data);
      } else if (error.request) {
        // La requête a été faite mais aucune réponse reçue
        errorMessage = "Pas de réponse du serveur - vérifiez votre connexion";
        console.error("Pas de réponse:", error.request);
      } else {
        // Erreur lors de la configuration de la requête
        errorMessage = "Erreur de configuration de la requête";
        console.error("Erreur de configuration:", error.message);
      }
      
      setMessage(errorMessage);
    }
  };

  return (
    <div className='subscription-page'>
      {message && <div className='message'>{message}bbbbbbbbb</div>}
      <div className='subscription'>
        <h1>Formulaire d'inscription</h1>
        <Link to="/"><ChevronLeft/></Link>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Prénom du participant:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Nom du participant:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Email du participant:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Téléphone du participant:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Téléphone du responsable:</label>
            <input
              type="tel"
              name="phone_tuteur"
              value={formData.phone_tuteur}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Adresse du participant:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>
          <button type="submit">Valider l'inscription</button>
        </form>  
        <img src={maquette} alt="" />      
      </div>

    </div>
  );
};

export default Subscription;