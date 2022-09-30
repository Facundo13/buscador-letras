import { useState, createContext } from 'react'
import axios from 'axios';

const LetrasContext = createContext();

const LetrasProvider = ({ children }) => {

  const [alerta, setAlerta] = useState('');
  const [letra, setLetra] = useState('');
  const [cargando, setCargando] = useState(false);

  const busquedaLetra = async (busqueda) => {
    setCargando(true);
    try {
      const options = {
        method: 'GET',
        url: `https://lyrics-plus.p.rapidapi.com/lyrics/${busqueda.cancion}/${busqueda.artista}`,
        headers: {
          'X-RapidAPI-Key': `${import.meta.env.VITE_API_KEY}`,
          'X-RapidAPI-Host': `${import.meta.env.VITE_API_HOST}`
        }
      };
      axios.request(options).then(function (response) {

        if(!response.data.lyrics){
          setAlerta('Canción no encontrada')
          setLetra('')
        }else{
          setLetra(response.data.lyrics)
          setAlerta('')
        }
        setCargando(false);

      });

    } catch (error) {
      console.error(error);
    }
  }

  return (

    <LetrasContext.Provider value={{ alerta, setAlerta, busquedaLetra, letra, cargando}}>
      {children}
    </LetrasContext.Provider>

  )
}

export {
  LetrasProvider
}

export default LetrasContext