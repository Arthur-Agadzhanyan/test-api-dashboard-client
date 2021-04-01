import { ADD_USER, REMOVE_USER, EDIT_USER,USER_EDITED,CANCEL_EDIT,SET_ACTIVE_USER } from "../constants"

let initialState = []

if(sessionStorage.getItem('Users')){
    initialState = JSON.parse(sessionStorage.getItem('Users'))
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_USER:
            return [
                ...state,
                {
                    id: (Math.random() * 1e8).toString(16),// генерируем случайный id
                    name: action.name, // ФИО
                    phone: action.phone,
                    info: action.info, // О себе
                    change: false,
                    disabled: false,
                    active:false
                }
            ]
        case REMOVE_USER:
            return state.filter(({ id }) => id !== action.id);
        case EDIT_USER:
            return state.map((user)=>(
                action.id === user.id
                ? {
                    ...user,
                    change:true,
                    disabled: false
                }: {
                    ...user,
                    disabled: true
                }
            ))
        case USER_EDITED:{
            return state.map((user) =>(
                action.id === user.id
                ?{ 
                    ...user,
                    name: action.name.trim() === '' ? user.name : action.name, 
                    phone: action.phone.trim() === '' ? user.phone : action.phone, 
                    info: action.info.trim() === '' ? user.info : action.info, 
                    change: false,
                    disabled: false
                }: {
                    ...user,
                    change:false,
                    disabled: false
                }
            )) 
        }
        case CANCEL_EDIT:{
            return state.map((user)=>(
                action.id === user.id
                ? {
                    ...user,
                    change:false,
                    disabled: false
                }: {
                    ...user,
                    disabled: false
                }
            ))
        }
        case SET_ACTIVE_USER:
            return state.map((user)=>(
                action.id === user.id
                ? {
                    ...user,
                    active: true
                }: {
                    ...user,
                    active: false
                }
            ))
        default:
            return state
    }
}