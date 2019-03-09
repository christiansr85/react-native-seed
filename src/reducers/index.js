import {combineReducers} from 'redux';
import peopleReducer from './people.reducer'

export default combineReducers({
    peopleData: peopleReducer,
})