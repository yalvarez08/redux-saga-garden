import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {takeLatest, put} from 'redux-saga/effects';

import logger from 'redux-logger';
import axios from 'axios';

// this startingPlantArray should eventually be removed
// const startingPlantArray = [
//   { id: 1, name: 'Rose' },
//   { id: 2, name: 'Tulip' },
//   { id: 3, name: 'Oak' }
// ];

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ];
    case 'SET_PLANTS':
      return action.payload;
    default:
      return state;
  }
};

// GET list of plants from server using generator function
function* fetchPlants() {
  try {
    const plantArrResponse = yield axios.get('/api/plants');
    yield put({type: 'SET_PLANTS', payload: plantArrResponse.data});
  } catch(err) {
    console.log('Error getting plants from server:', err);

  }
}

//POST new plant to list 
function* postNewPlant(action) {
  try {
      yield axios.post('/api/plants', action.payload);
      yield put({type: 'FETCH_PLANTS'});
  } catch(err) {
      console.log('Error posting plant to server:', err);
  }
}

//DELETE plant from list
function* deletePlant(action) {
  try {
    yield axios.delete('/api/plants', action.payload);
    yield put({type: 'SET_PLANTS'});
  } catch(err) {
    console.log('Error removing plant from server:', err);
  }
}

// Create the rootSaga generator function
function* rootSaga() {
  yield takeLatest('FETCH_PLANTS', fetchPlants);
  yield takeLatest('ADD_PLANT', postNewPlant);
  yield takeLatest('DELETE_PLANT', deletePlant);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// Note that the store is currently not
// configured to utilize redux-saga OR
// redux logger!
const store = createStore(
  combineReducers({ plantList }),

  applyMiddleware(sagaMiddleware, logger),
);
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

sagaMiddleware.run(rootSaga);

export default store;
