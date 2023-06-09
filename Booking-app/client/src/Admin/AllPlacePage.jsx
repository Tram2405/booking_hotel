import { useEffect, useState } from "react";
import AdminPage from "./AdminPage";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllPlacePage(){
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
          setPlaces(response.data);
        });
      }, []);

      const [user,setUser] = useState([]);
    useEffect(() => {
        axios.get('/user').then(response => {
          setUser(response.data);
        });
    }, []); 

      const deletePlace = (id) => {
        axios.delete(`http://localhost:4000/deletePlace/${id}`)
          .then(response => {
            console.log(response.data);
            alert('Delete Place Successful');
            window.location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      }

      const findPlaceOwner = (place, users) => {
        const user = users.find(user => user._id === place.owner);
        return user ? user.name : 'Unknown user';
      };

    return(
        <div>
            <AdminPage />
            <div className="mt-8 ml-20 mr-20 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 ">
        {places.length > 0 && places.map(place => (
          <div>
            <div className="w-70 h-30 bg-gray-500 rounded-2xl">
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover" src={'http://localhost:4000/'+place.photos?.[0]} alt=""/>
            )}
            </div>
            <h2 className="font-bold ">{place.title}</h2>
            <h3 className="text-sm text-gray-500">{place.address}</h3>
            <h2>  <b>Owner: {findPlaceOwner(place,user)}</b></h2>
            <div className="mt-5">
           <button className="inline-flex bg-primary gap-1 py-2 px-6 rounded-full" onClick={() => deletePlace(place._id)}>
                Delete
            </button>
            <Link to={'/details/'+place._id}>
            <button className="ml-20 inline-flex gap-1 py-2 px-6 rounded-full" >
                Details
            </button>
            </Link>
            
           </div> 
          </div>
        ))}
       </div>
        </div>
    );
}