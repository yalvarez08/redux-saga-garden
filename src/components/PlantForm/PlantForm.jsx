import React, { useState }from 'react';
import { useDispatch } from 'react-redux';

const PlantForm = () => {
    const dispatch = useDispatch();
    
    //Initial state is an OBJECT, with keys id and name
    // let [newPlant, setPlant] = useState({id: 4, name: ''});
    //plant properties/fields ("name", "kingdom", "clade", "order", "family", "subfamily", "genus")

    const [formInfo, setFormInfo] = useState({
        name: '',
        kingdom: '',
        clade: '',
        order: '',
        family: '',
        subfamily: '',
        genus: '',
    });

    const handleFormChange = (evt, t) => {
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setFormInfo({...formInfo, [t]: evt.target.value})
    }

    const addNewPlant = evt => {
        evt.preventDefault();
        dispatch({ type: 'ADD_PLANT', payload: {...formInfo} });
        //updates the next plant to have a new id
        setFormInfo({
            name: '',
            kingdom: '',
            clade: '',
            order: '',
            family: '',
            subfamily: '',
            genus: '',
        });
    }

    return (
        <div>
            <h3>This is the form</h3>
            {/* <pre>{JSON.stringify(formInfo)}</pre> */}
            <form onSubmit={addNewPlant}>
                <input type='text' value={formInfo.name} placeholder='name' onChange={evt => handleFormChange(evt, 'name')} />
                <input type='text' value={formInfo.kingdom} placeholder='kingdom' onChange={evt => handleFormChange(evt, 'kingdom')} />
                <input type='text' value={formInfo.clade} placeholder='clade' onChange={evt => handleFormChange(evt, 'clade')} />
                <input type='text' value={formInfo.order} placeholder='order' onChange={evt => handleFormChange(evt, 'order')} />
                <input type='text' value={formInfo.family} placeholder='family' onChange={evt => handleFormChange(evt, 'family')} />
                <input type='text' value={formInfo.subfamily} placeholder='subfamily' onChange={evt => handleFormChange(evt, 'subfamily')} />
                <input type='text' value={formInfo.genus} placeholder='genus' onChange={evt => handleFormChange(evt, 'genus')} />

                <button type='submit'>Add New Plant</button>
            </form>
        </div>
    );
}

export default PlantForm;
