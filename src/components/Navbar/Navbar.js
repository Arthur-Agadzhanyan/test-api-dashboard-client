import React, { useState, useContext, useEffect } from 'react';
import style from './styles.module.scss'
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { connect } from 'react-redux';
import { setActiveUser } from '../../redux/actionCreator';

const Navbar = ({ users, onSetActiveUser }) => {
    const history = useHistory()
    const auth = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [visibleUsers, setVisibleUsers] = useState(false);

    const showMenu = () => {
        setShow(!show)
        setVisibleUsers(false)
    }

    const visibleUsersPoppup = () => {
        setVisibleUsers(!visibleUsers)
    }

    const logout = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    const userClick = (id)=>{
        onSetActiveUser(id)
        visibleUsersPoppup()
        setShow(!show)
        history.push('/')
    }

    useEffect(() => {
        sessionStorage.setItem('Users', JSON.stringify(users))
    })

    return (
        <nav className={style.header}>
            <div className={style.container}>
                <nav className={style.navbar}>
                    <div className={style.navbar__brand} onClick={()=>setVisibleUsers(false)}>
                        <NavLink to='/api'>Dashboard</NavLink>
                    </div>
                    <div className={style.navbar__navigation}>
                        <ul id={style.menu} className={`${style.menu} ${show ? style.active : ''}`}>
                            <span id={style.close_menu} className={style.close_menu} onClick={showMenu}>×</span>
                            <NavLink to='/api' ><li onClick={showMenu} className={`${style.menu__item} ${style.active}`}>Главная</li></NavLink>
                            <div>
                                <li className={`${style.menu__item} ${style.active}`} onClick={visibleUsersPoppup}>
                                    Пользователи
                                </li>
                                {users.length ? <div className={style.users} style={{ display: visibleUsers ? 'block' : 'none' }}>
                                    <ul className={style.users__list} >
                                        {users.map(user => {
                                            return <li
                                                key={user.id}
                                                onClick={()=> user.active ? 'none' :userClick(user.id)}
                                                className={style.list__item}
                                                style={{
                                                    background: user.active ? '#000' : '#fff',
                                                    color: user.active ? '#fff' : '#000',
                                                    userSelect: user.active ? 'none' : 'all'
                                                }}
                                            >{user.name}</li>
                                        })}
                                    </ul>
                                </div>
                                    : <div className={style.users} style={{ display: visibleUsers ? 'block' : 'none' }}>
                                        <ul className={style.users__list} >
                                             <li className={style.list__item} onClick={visibleUsersPoppup}>На данный момент пользователей нет</li>
                                            
                                        </ul>
                                    </div>
                                }
                            </div>





                            <NavLink to='/settings'><li onClick={showMenu} className={`${style.menu__item} ${style.active}`}>Настройки</li></NavLink>
                            <NavLink to='/' onClick={logout}><li className={`${style.menu__item} ${style.active}`}>Выход</li></NavLink>
                            {/* <NavLink to='/api' ><li onClick={showMenu} className={`${style.menu__item} ${style.active}`}><i class="fas fa-user"></i></li></NavLink> */}
                        </ul>
                        <div id={style.bar} className={style.bar} onClick={showMenu}><i className="fas fa-bars"></i></div>
                    </div>
                </nav>
            </div>
        </nav>
    );
}

const stateToProps = state => ({
    users: state.users
})

const dispatchToProps = dispatch => ({
    onSetActiveUser: id => {
        dispatch(setActiveUser(id))
    }
})

export default connect(stateToProps, dispatchToProps)(Navbar);
