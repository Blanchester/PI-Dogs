import { useEffect, useState } from "react";

const useTempsArray = (temperament) => {
const [temperaments, setTemperaments] = useState('');
    useEffect(() => {
        if (typeof temperament === 'object') {
          const temperamentValue = temperament.map(obj => 
            obj.name
            );
            
          setTemperaments(temperamentValue.join(', '))
        } else (
          setTemperaments(temperament)
        )
      }, [temperament])

      return temperaments;
}

export default useTempsArray;