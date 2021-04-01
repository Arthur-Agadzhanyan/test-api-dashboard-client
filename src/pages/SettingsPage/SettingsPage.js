import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import UserList from '../../components/UserList/UserList';
import { useMessage } from '../../hooks/message.hook';
import { addUser } from '../../redux/actionCreator';
import style from './settings.module.scss'

const SettingsPage = ({ users,onAddUser }) => {
    const [adding, setAdding] = useState(false);
    const [modalForm, setForm] = useState({
        name: '', info: '',phone:''
    });
    const message = useMessage()

    const changeHandler = event => { 
        setForm({ ...modalForm, [event.target.name]: event.target.value }) 
    }

    const cancelAdd = ()=>{
        setAdding(!adding)
        setForm({
            name: '', info: '',phone:''
        })
    }

    const addNewUser = (e)=>{
        e.preventDefault()
        if(modalForm.name.trim().length <= 300 && modalForm.name.trim().length < 40 && modalForm.info.trim().length <= 300 && modalForm.phone.trim().length <= 300 && modalForm.name.trim().length >= 2 && modalForm.info.trim().length > 7 && modalForm.phone.trim().length >= 10){
            onAddUser(modalForm.name,modalForm.info,modalForm.phone)
            cancelAdd()
        }
        if(modalForm.name.trim().length < 2 || modalForm.name.trim().length > 40){
            message('Имя не должно быть менее 2 символов и не более 40 ')
        }
        if(modalForm.info.trim().length <= 7 ){
            message('Поле "О себе" должно содержать не менее 7 символов')
        }
        if(modalForm.phone.trim().length < 10){
            message('Поле "Телефон" должно содержать не менее 10 символов')
        }
        if(modalForm.name.trim().length > 300 || modalForm.info.trim().length > 300 || modalForm.phone.trim().length > 300){
            message('Введеные данные не должны превышать 300 символов')
        }  
    }
    useEffect(() => {
        sessionStorage.setItem('Users', JSON.stringify(users))
    })
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.controls}>
                    <button onClick={() => setAdding(!adding)} className={style.addBtn}><span>+</span>Add</button>
                </div>
            </div>
            <UserList users={users} />
            
         { adding 
            ?<div className={style.modal}>
                <div className={style.modal__overlay}></div>
                <div className={style.modal__container} >
                    <h3 className={style.modal__title}>Добавить пользователя</h3>
                    <form className={style.modal__form} onSubmit={addNewUser}>
                        <input
                            placeholder="ФИО"
                            type="text"
                            className={style.modal__input}
                            name="name"
                            value={modalForm.name}
                            onChange={changeHandler} required />

                        <input
                            placeholder="Телефон"
                            id="phone"
                            type="number"
                            className={style.modal__input}
                            name="phone"
                            value={modalForm.phone}
                            onChange={changeHandler} required />
                        <input
                            placeholder="О себе"
                            id="info"
                            type="text"
                            className={style.modal__input}
                            name="info"
                            value={modalForm.info}
                            onChange={changeHandler} required />
                        <div className={style.modal__buttons}>
                            <button type='submit' className={style.modal__add_btn}>Добавить</button>
                            <button className={style.modal__rem_btn} onClick={cancelAdd}>Отмена</button>
                        </div>

                    </form>
                </div>
            </div> :''}
        </div>
    );
}

const stateToProps = state => ({
    users: state.users
})

const dispatchToProps = dispatch => ({
    onAddUser: (name,info,phone)=>{
        dispatch(addUser(name,info,phone))
    }
})

export default connect(stateToProps, dispatchToProps)(SettingsPage);
