import React, { useState, useEffect } from 'react';

const TraerId = () => {
  const [id, setUserId] = useState(null);

  useEffect(() => {
    // Obtener el ID del usuario desde localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return id; // Devuelve el ID obtenido del localStorage
};

export default TraerId;