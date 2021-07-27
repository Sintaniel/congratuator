import { createStore } from 'redux';
import setNumber from './reducer';

const store = createStore(setNumber);

export default store;