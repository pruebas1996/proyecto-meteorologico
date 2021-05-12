import { useState, useEffect } from 'react';
import CompButton from './CompButton';
const apiUrl = '06795e871e80431fb8d192528210805';
const GetData = () => {
    // hooks
    const [getData, setGetData] = useState()
    const [current, setCurrent] = useState({})
    const [condition, setCondition] = useState({})
    const [convertion, setConvertion] = useState(false)
    const [temperatura, setTemperature] = useState()
    const [location, setLocation] = useState({})
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
            fetch(`http://api.weatherapi.com/v1/current.json?key=${apiUrl}&q=${location.coords.latitude},${location.coords.longitude}`)
                .then((res) => res.json())
                .then((data) => {
                    setGetData(data);

                });
        }, error);
    }, []);

    useEffect(() => {
        if (getData) {
            setCurrent(getData.current)
            setCondition(getData.current.condition)
            setTemperature(getData.current.temp_c + " °C")
            setLocation(getData.location)
        }
    }, [getData])


    // Function para cambiar la temperatura
    const Handleclick = () => {
        convertion ? setTemperature(current.temp_c + " °C") : setTemperature(current.temp_f + " F")
        setConvertion(!convertion);
        console.log(getData)
    }
    return (<div>
        <p> {location.country}/{location.region}/{location.name} </p>
        <img src={condition.icon} alt="Icono"></img>
        <p>{condition.text}</p>
        <p>{temperatura}</p>
        <CompButton text={'Convertion a F/°C'} onclik={Handleclick} />
    </div>);
}

export default GetData;