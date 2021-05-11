import { useState, useEffect } from 'react';
import CompButton from './CompButton';

const GetData = () => {
    // hooks
    const [location, setLocation] = useState({})
    const [current, setCurrent] = useState({})
    const [condition, setCondition] = useState({})
    const [convertion, setConvertion] = useState(false)
    const [temperatura, setTemperature] = useState()
    // function para capturar error
    const error = error => {
        alert(`ERROR(${error.code}): ${error.message}`);
    }
    // hook useffect para obtener la información del clima
    useEffect(() => {
        if (!navigator.geolocation) {
           error({
                code: 0,
                message: 'Geolocation is not supported by your browser'
            });
        }
        navigator.geolocation.getCurrentPosition((location) => {
            fetch(`http://api.weatherapi.com/v1/current.json?key=06795e871e80431fb8d192528210805&q=${location.coords.latitude},${location.coords.longitude}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        setCurrent(data.current)
                        setCondition(data.current.condition)
                        setTemperature(data.current.temp_c + " °C")
                        setLocation(data.location)
                        console.log(data)
                    }
                });
        }, error);
    }, []);
// Function para cambiar la temperatura
    const Handleclick = () => {
        convertion ? setTemperature(current.temp_c + " °C") : setTemperature(current.temp_f + " F")
        setConvertion(!convertion);
    }
    return (<div>
        <p> {location.country + "/" + location.region + "/" + location.name}</p>
        <div>
            <img src={condition.icon} alt="Icono"></img>
            <p>{condition.text}</p>
            <p>{temperatura}</p>
            <CompButton text={'Convertion a F/°C'} onclik={Handleclick} />
        </div>
    </div>);
}

export default GetData;