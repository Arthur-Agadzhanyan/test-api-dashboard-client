import {createContext} from 'react'//создаём контекст для приложения

function noop(){}//создаём функцию которая ничего не делает для того чтобы указать её как базовое состояние

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuth: false
})//передаём базовые составляющие для нашего контекста