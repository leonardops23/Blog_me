import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      <h1>Frontend React dice: ¡Hola Mundo!</h1>
      <p>Backend Django responde: {message}</p>
    </div>
  );
};

export default App;