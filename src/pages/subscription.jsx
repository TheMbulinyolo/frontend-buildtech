import maquette from '../assets/images/maquette.png';
import React, { useState, useCallback } from 'react';
import { registerParticipant, registerPayement, verifyemail } from '../services/api';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import debounce from 'lodash.debounce';

const Subscription = () => {
  const [message, setMessage] = useState('');
  const [stape, setStape] = useState(1);
  const [disablePayement, setDisablePayement] = useState(true);

  const [inscriptionForm, setInscriptionForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    phone_tuteur: '',
    address: '',
  });

  const [payementForm, setPayementForm] = useState({
    email: '',
    validator: '',
  });

  // Débouncer pour éviter les appels excessifs à l’API
  const verifyEmail = useCallback(
    debounce(async (email) => {
      try {
        const res = await verifyemail({ email });
        if (res.data.status === 'paid') {
          setMessage("Ce participant a déjà payé ✅");
          setDisablePayement(true);
        } else if (res.data.status === 'exist') {
          setMessage("Participant trouvé. En attente du payement 🟡");
          setDisablePayement(false);
        } else {
          setMessage("Adresse non reconnue ❌");
          setDisablePayement(true);
        }
      } catch {
        setMessage("Erreur lors de la vérification de l'adresse.");
        setDisablePayement(true);
      }
    }, 500),
    []
  );

  const handleChangeInscription = (e) => {
    const { name, value } = e.target;
    setInscriptionForm(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePayement = (e) => {
    const { name, value } = e.target;
    setPayementForm(prev => ({ ...prev, [name]: value }));

    if (name === 'email') verifyEmail(value);
  };

  const handleInscriptionSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerParticipant(inscriptionForm);
      if (res.status === 201) {
        setMessage("Inscription réussie ✅");
        setInscriptionForm({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          phone_tuteur: '',
          address: '',
        });
        setTimeout(() => setStape(2), 1000);
      }
    } catch (err) {
      if (err.response?.data) {
        const msg = Object.values(err.response.data).flat().join(', ');
        setMessage(`Erreur : ${msg}`);
      } else {
        setMessage("Erreur inconnue lors de l'inscription ❌");
      }
    }
  };

  const handlePayementSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerPayement(payementForm);
      if (res.status === 200) {
        setMessage(`Payement validé pour ${res.data.first_name} ${res.data.last_name} ✅`);
        setPayementForm({ email: '', validator: '' });
        setDisablePayement(true);
      }
    } catch (err) {
      if (err.response?.data) {
        const msg = Object.values(err.response.data).flat().join(', ');
        setMessage(`Erreur : ${msg}`);
      } else {
        setMessage("Erreur inconnue lors du payement ❌");
      }
    }
  };

  return (
    <div className="subscription-page">
      {message && <p className="message">{message}</p>}

      <div className="subscription">


        <Link to="/" className="back-link"><ChevronLeft /></Link>

        {stape === 1 ? (
          <>
            <h1 className="title">Formulaire d'inscription</h1>

            <form onSubmit={handleInscriptionSubmit} className='form_sub'>
              <div className="form-group">
                <label>Prénom</label>
                <input name="first_name" value={inscriptionForm.first_name} onChange={handleChangeInscription} required />
              </div>
              <div className="form-group">
                <label>Nom</label>
                <input name="last_name" value={inscriptionForm.last_name} onChange={handleChangeInscription} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={inscriptionForm.email} onChange={handleChangeInscription} required />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input name="phone" value={inscriptionForm.phone} onChange={handleChangeInscription} required />
              </div>
              <div className="form-group">
                <label>Téléphone du tuteur</label>
                <input name="phone_tuteur" value={inscriptionForm.phone_tuteur} onChange={handleChangeInscription} required />
              </div>
              <div className="form-group">
                <label>Adresse</label>
                <textarea name="address" value={inscriptionForm.address} onChange={handleChangeInscription} required />
              </div>
              <button type="submit" className="btn">Continuer</button>
            </form>
          </>
        ) : (
          <>
            <h1 className="title">Formulaire de payement</h1>
            <div className='form_sub'>
              <p>
                Après vous être inscrit, veuillez envoyer <strong>3$</strong> pour valider votre inscription :
              </p>
              <ul>
                <li><strong>Airtel Money :</strong> +243 972 159 400</li>
                <li><strong>Orange Money :</strong> +243 846 843 590</li>
              </ul>
              <p>
                Une fois le paiement effectué, remplissez les informations ci-dessous pour valider votre inscription.
              </p>
              <form onSubmit={handlePayementSubmit} className='form_pay'>
                <div className="form-group">
                  <label>Email du participant</label>
                  <input type="email" name="email" value={payementForm.email} onChange={handleChangePayement} required />
                </div>
                <div className="form-group">
                  <label>Numéro de transaction</label>
                  <input name="validator" value={payementForm.validator} onChange={handleChangePayement} required />
                </div>
                <button type="submit" className="btn" disabled={disablePayement}>Valider le payement</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Subscription;


