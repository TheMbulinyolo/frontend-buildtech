import React, { useEffect, useState } from 'react';
import { getParticipants, validateParticipant, logoutUser } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showValidateConfirm, setShowValidateConfirm] = useState(false);
  const [participantToValidate, setParticipantToValidate] = useState(null);
  const navigate = useNavigate();
  const [isActiveModal, setIsActiveModal] = useState(false);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await getParticipants();
        setParticipants(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des participants');
        setLoading(false);
        console.error('Error:', err);
      }
    };

    fetchParticipants();
  }, []);

  const handleValidateClick = (id) => {
    setParticipantToValidate(id);
    setShowValidateConfirm(true);
  };

  const handleValidateConfirm = async () => {
    try {
      await validateParticipant(participantToValidate);
      setParticipants(participants.map(participant =>
        participant.id === participantToValidate ? { ...participant, status: 'VALIDATED' } : participant
      ));
      setShowValidateConfirm(false);
    } catch (err) {
      console.error('Détails de l’erreur:', err.response?.data || err.message);
      alert(`Erreur lors de la validation: ${err.response?.data?.detail || err.message}`);
      setShowValidateConfirm(false);
    }
  };

  const handleValidateCancel = () => {
    setShowValidateConfirm(false);
    setParticipantToValidate(null);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    logoutUser();
    setShowLogoutConfirm(false);
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  if (loading) return <div className="container mx-auto p-4">Chargement...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;

  return (
    <div className="grand_liste">
      <div className='liste '>
        <nav className="title_liste">
          <h1 className="text-2xl font-bold mb-4">Liste des Participants</h1>
          <button
            onClick={() =>{handleLogoutClick() ; setTimeout(() => { setIsActiveModal(true) }, 100)} }
          >
            Se déconnecter
          </button>
        </nav>
        
        <div className="sous_liste ">
          <table >
          <thead>
            <tr>
              <th className="py-2 px-4 border">Nom</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Téléphone</th>
              <th className="py-2 px-4 border">Adresse</th> {/* ← ajout ici */}
              <th className="py-2 px-4 border">Date d'inscription</th>
              <th className="py-2 px-4 border">Statut</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
            <tbody>
              {participants.map((participant) => (
                <tr key={participant.id}>
                  <td className="py-2 px-4 border">{participant.first_name} {participant.last_name}</td>
                  <td className="py-2 px-4 border">{participant.email}</td>
                  <td className="py-2 px-4 border">{participant.phone}</td>
                  <td className="py-2 px-4 border">{participant.address}</td>
                  <td className="py-2 px-4 border">
                    {new Date(participant.registration_date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      participant.status === 'VALIDATED' ? 'bg-green-200 text-green-800' :
                      participant.status === 'PAID' ? 'bg-blue-200 text-blue-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>
                      {participant.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    {participant.status !== 'VALIDATED' && (
                      <button
                        onClick={() =>{handleValidateClick(participant.id); setTimeout(() => { setIsActiveModal(true) }, 100)} }
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                      >
                        Valider
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>        
      </div>

      </div>

      {/* Confirmation pour la validation */}
      {showValidateConfirm && (
        <div className='modal'>
          <div className={`sous_modal ${isActiveModal ? "modal_plus" : "modal_moin"}`}>
            <div className='info_modal'>
              <h2 style={{color:"#fff"}}>Confirmer la validation</h2>
              <p style={{color:"#fff"}}>Voulez-vous vraiment valider ce participant ?</p>
              <div className='actions_supp'>
                <button
                  onClick={() =>{{ setTimeout(() => handleValidateCancel(), 200); setIsActiveModal(false) }}}
                  className='btn_cancel'
                >
                  Annuler
                </button>
                <button
                  onClick={handleValidateConfirm}
                  className='btn_danger'
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation pour la déconnexion */}
      {showLogoutConfirm && (
        <div className="modal">
          <div className={`sous_modal ${isActiveModal ? "modal_plus" : "modal_moin"}`}>
            <div className='info_modal'>
              <h2 style={{color:"#fff"}}>Confirmer la déconnexion</h2>
              <p style={{color:"#fff"}}>Voulez-vous vraiment vous déconnecter ?</p>
              <div className='actions_supp'>
                <button
                  className='btn_cancel'
                  onClick={() =>{ setTimeout(() => handleLogoutCancel(), 200); setIsActiveModal(false) }}
                >
                  Annuler
                </button>
                <button
                  className='btn_danger'
                  onClick={handleLogoutConfirm}
                >
                  Confirmer
                </button>
              </div>              
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantList;