import React from 'react';
import { useHistory } from 'react-router-dom'

function Home() {
  const history = useHistory();
  return (
    <section>
      home
      <button
        type="button"
        onClick={() => history.push('/device')}
      >
        Criar um dispositivo
      </button>
      <button
        type="button"
        onClick={() => history.push('/dashboard')}
      >
        Criar um dashboard
      </button>
    </section>
  );
}

export default Home;