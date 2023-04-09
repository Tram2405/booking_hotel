import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FooterPage from "../Footer";
import Header from "../Header";

export default function IndexPage() {
  const [redirect,setRedirect] = useState(false);
  const [places, setPlaces] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  }, []);
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const matchingPlaces = places.filter(place => {
      const placeAddress = place.address.toLocaleLowerCase('vi');
      const searchAddress = searchValue.toLocaleLowerCase('vi');
      return placeAddress.includes(searchAddress);
    });
    setPlaces(matchingPlaces);
  };

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  
  return (
    <div>
      <form id="place-form" onSubmit={handleFormSubmit}>
        <label htmlFor="address">ADDRESS:</label>
        <input 
          type="text" 
          id="address" 
          name="address" 
          value={searchValue} 
          onChange={handleSearchInputChange}
        />
        <input className="bg-primary py-2 px-8 rounded-2xl" type="submit" value="Submit"/>
      </form>
      <div className="mt-8 ml-20 mr-20 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3">
        {places.length > 0 && places.map(place => (
          <Link to={'/place/'+place._id} key={place._id}>
            <div className="w-70 h-30 bg-gray-500 rounded-2xl">
              {place.photos?.[0] && (
                <img className="rounded-2xl object-cover" src={'http://localhost:4000/'+place.photos?.[0]} alt=""/>
              )}
            </div>
            <h2 className="font-bold ">{place.title}</h2>
            <h3 className="text-sm text-gray-500">{place.address}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
      </div>
      <FooterPage />
    </div>
  ); 
}
