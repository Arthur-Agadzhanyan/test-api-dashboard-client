import React, { useState } from 'react';
import { connect } from 'react-redux';
import { cancelEdit, editUser, removeUser, userEdited } from '../../redux/actionCreator';
import style from './style.module.scss'

const UserList = ({ users, onRemoveUser, onEditUser, onCancelEdit, onUserEdited }) => {
    const [changeInput, setChange] = useState({
        name:'',phone:'',info:''
    });
    if (!users.length) {
        return <div></div>
    }
    
    const changeHandler = event => { 
        setChange({ ...changeInput, [event.target.name]: event.target.value }) 
    }

    const userChanged = (id)=>{
        onUserEdited(id,changeInput.name,changeInput.phone,changeInput.info)
        setChange({
            name:'',phone:'',info:''
        })
    }

    const cancelEditUser = (id)=>{
        onCancelEdit(id)
        setChange({
            name:'',phone:'',info:''
        })
    }
    
    return (
        <table className={`${style.table} striped`}>
            <thead className={style.table__head}>
                <tr>
                    {/* <th>№</th> */}
                    <th>ФИО</th>
                    <th>Телефон</th>
                    <th>О себе</th>
                    <th>Настройки</th>
                </tr>
            </thead>

            <tbody className={style.table__content}>

                {users.map((user, index) => {
                    return (

                        <tr key={`${user.id}`} className={`${style.content__item} ${user.active ? style.active_user : ''}`}>
                            {user.change
                                ?
                                <>
                                    <td className={style.item__col}>
                                        <input
                                        placeholder="ФИО"
                                        type="text"
                                        name="name"
                                        onChange={changeHandler} 
                                        defaultValue={user.name}/>
                                    </td>
                                    <td className={style.item__col}>    
                                        <input 
                                        placeholder="Телефон"
                                        type="number"
                                        name="phone"
                                        onChange={changeHandler} 
                                        defaultValue={user.phone}/>
                                    </td>
                                    <td className={style.item__col}>
                                        <input 
                                        placeholder="О себе"
                                        type="text"
                                        name="info"
                                        onChange={changeHandler} 
                                        defaultValue={user.info}/>
                                    </td>
                                    <td className={style.item__col}>
                                        <button className={style.change__btn} onClick={()=>userChanged(user.id)}>Сохранить</button>
                                        <button className={style.cancel__btn} onClick={()=>cancelEditUser(user.id)}>Отмена</button>
                                    </td>
                                </>
                                : <>
                                    <td className={style.item__col}>{user.name}</td>
                                    <td className={style.item__col}>{user.phone}</td>
                                    <td className={style.item__col}>{user.info}</td>
                                    <td className={`${style.item__col} ${style.settings}`}>
                                        <button className={style.settings__btn} onClick={() => onEditUser(user.id)} disabled={`${user.disabled ? 'disbled': ''}`}><i className="fas fa-pen"></i></button>
                                        <button className={style.settings__btn} onClick={() => onRemoveUser(user.id)} disabled={`${user.disabled ? 'disbled': ''}`}><i className="fas fa-times"></i></button>
                                    </td>
                                </>
                            }

                        </tr>
                    )
                })}




            </tbody>
        </table>
    );
}

const stateToProps = state => ({
    users: state.users
})

const dispatchToProps = dispatch => ({
    onRemoveUser: id => {
        dispatch(removeUser(id))
    },
    onEditUser: id => {
        dispatch(editUser(id))
    },
    onUserEdited: (id,name,phone,info)=>{
        dispatch(userEdited(id,name,phone,info))
    },
    onCancelEdit: id=>{
        dispatch(cancelEdit(id))
    }

})

export default connect(stateToProps, dispatchToProps)(UserList);