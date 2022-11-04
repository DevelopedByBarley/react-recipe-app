import { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  useEffect(() => {
    axios.get('/api/recipes')
      .then(res => console.log(res.data))
  }, [])
  return (
    'APP'
  );
}

export default App;
