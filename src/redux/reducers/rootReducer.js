import {combineReducers} from "redux" // импортирую на случай добавления нового функционала
import users from './usersReducer'

export default combineReducers({
    users
})