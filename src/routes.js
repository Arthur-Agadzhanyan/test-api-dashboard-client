import React from 'react'
import {Switch,Route, Redirect} from 'react-router-dom'
import DetailApiPage from './pages/DetailApiPage/DetailApiPage'
import LoginPage from './pages/LoginPage/LoginPage'
import MainPage from './pages/MainPage/MainPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'

export const useRoutes = isAuth=>{
    if(isAuth){//роуты для человека который зарегистрирован и находится в системе
        return(
            <Switch>
                <Route path='/api' exact>
                    <MainPage/>
                </Route>
                <Route path='/api/:id' exact>
                    <DetailApiPage/>
                </Route>
                <Route path='/settings' exact>
                    <SettingsPage/>
                </Route>
                <Redirect to='/api'/>
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path='/login' exact>
                <LoginPage/>
            </Route>
            <Route path='/register' exact>
                <RegisterPage/>
            </Route>
            <Redirect to='/login'/>
        </Switch>
    )
}