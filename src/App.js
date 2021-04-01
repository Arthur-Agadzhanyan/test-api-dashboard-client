import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import Loader from './components/Loader/Loader';
import { useRoutes } from './routes';
import Navbar from './components/Navbar/Navbar';
import 'materialize-css'

function App() {
  const { login, logout, token, userId,ready } = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)

  if(!ready){
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{
      login, logout, token, userId,isAuth
    }}>
      <Router>
      {isAuth && <Navbar/>}
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
