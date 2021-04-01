import { ADD_USER, EDIT_USER, REMOVE_USER, CANCEL_EDIT,USER_EDITED,SET_ACTIVE_USER} from "./constants";

export function addUser(name, info, phone) {
    return {
        type: ADD_USER,
        name,
        info,
        phone
    }
}
export function removeUser(id) {
    return {
        type: REMOVE_USER,
        id
    }
}

export function editUser(id){
    return{
        type: EDIT_USER,
        id,
    }
}

export function userEdited(id,name,phone,info) {
    return{
        type:USER_EDITED,
        id,
        name,
        info,
        phone
    }
}

export function cancelEdit(id) {
    return{
        type:CANCEL_EDIT,
        id
    }
}

export function setActiveUser(id) {
    return{
        type:SET_ACTIVE_USER,
        id
    }
}