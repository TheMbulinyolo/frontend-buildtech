import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import dessin from '../assets/images/dessin.png';


const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(credentials);
      navigate('/list');
    } catch (err) {
      let errorMessage = 'Erreur lors de la connexion';
      if (err.response) {
        // Server responded with an error
        if (err.response.status === 401) {
          errorMessage = 'Nom d’utilisateur ou mot de passe incorrect';
        } else if (err.response.data && err.response.data.detail) {
          errorMessage = err.response.data.detail;
        }
      } else if (err.request) {
        // No response from server
        errorMessage = 'Pas de réponse du serveur. Vérifiez votre connexion.';
      }
      setError(errorMessage);
      console.error('Login error:', err);
    }
  };

  return (
    <div className='subscription-page'>

      {error && <div className="message">{error}</div>} 

      <div className='subscription' style={{height:"45%"}}>
        <h1>Se connecter</h1>
        <Link to="/" >
          <ChevronLeft/>
        </Link>
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="form-group">
            <label>Nom d'utilisateur:</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label >Mot de passe:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
          >
            Se connecter
          </button>
        </form>  
        <img src={dessin} alt="Dessin" style={{width:"50%", right:'1rem'}} />      
      </div>

    </div>
  );
};

export default Login;