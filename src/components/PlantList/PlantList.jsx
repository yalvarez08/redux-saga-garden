import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const plantList = useSelector(store => store.plantList);

    const getPlants = () => {
        //dispatch saga; get the list from server
        dispatch({type: 'FETCH_PLANTS'});
    }

    useEffect(() => {
        // dispatch an action to request the plantList from the API
        getPlants()
    }, []); 

    const deletePlant = (id) => {
        //dispatch saga; remove plant from list
        dispatch({type: 'DELETE_PLANT', payload: id})
    }

    return (
        <>
        <div>
            <h3>This is the plant list</h3>
            {plantList.map((p) => (
                <li key={p.id}>{p.name} <button onClick={deletePlant}>DELETE</button></li>
            ))}
        </div>
        </>
    );
}

export default PlantList;
