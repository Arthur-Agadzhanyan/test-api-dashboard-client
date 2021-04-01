import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import style from '../../styles/auth.module.scss'
import {Link} from 'react-router-dom'
import { useMessage } from '../../hooks/message.hook';

const LoginPage = () => {
    const auth = useContext(AuthContext);//в переменную передаём все данные из контекста которые передаём в главном файле App.js
    const message = useMessage()
    const {loading, request,error ,clearError} = useHttp()
    const [form, setForm]= useState({
        email:'', password:''
    })
    const changeHandler = event=>{
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    useEffect(()=>{
        message(error)
        clearError()
    },[error,message,clearError])//в случае если меняется объект error то показывается ошибка 

    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    
    const loginHandler = async ()=>{
        try{
            const data = await request('http://localhost:5000/api/auth/login',"POST",{...form})
            auth.login(data.token,data.userId)
        } catch(e){}
    }

    return (
        <div className={style.wrapper}>
            <div className={style.container}>

                <h1 className={style.title}>
                    Вход
                </h1>
                <div>
                    <div className={style.input__block}>
                        <input
                            placeholder="Email"
                            id="email"
                            type="text"
                            className={style.input}
                            name="email"
                            value={form.email}
                            onChange={changeHandler} />
                        {/* <label htmlFor="email">Email</label> */}
                    </div>
                    <div className={style.input__block}>
                        <input
                            placeholder="Пароль"
                            id="password"
                            type="password"
                            className={style.input}
                            name="password"
                            value={form.password}
                            onChange={changeHandler} />
                        {/* <label htmlFor="password">Password</label> */}
                    </div>
                </div>
                <div className={style.card_action}>
                    <button
                        className={style.btn}
                        disabled={loading}
                        onClick={loginHandler}
                    >Авторизация</button>
                    <div className={style.auth_text}>
                        <p>У вас нет аккаунта? <Link to='/register'>Регистрация</Link></p>
                    </div>

                </div>
            </div>

        </div>

    );
}

export default LoginPage;
