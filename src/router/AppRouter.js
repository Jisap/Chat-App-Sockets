import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';
import { AuthRouter } from './AuthRouter';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { ChatPage } from '../pages/ChatPage';

export const AppRouter = () => {

    const { auth, verificaToken } = useContext( AuthContext );              // Extraemos el estado de auth y verificaToken del AuthContext

    useEffect(() => {                                                       // Cada vez que la app se recargue hay que comprobar la validez del token
        verificaToken();
    }, [verificaToken])

    if( auth.checking ){
        return <h1>Espere por favor</h1>
    }



    return (
        <Router>
            <div>
                <Switch>
                    
                    <PublicRoute isAuthenticated={ auth.logged } 
                                 path="/auth" 
                                 component={ AuthRouter } />
                    
                    <PrivateRoute isAuthenticated={ auth.logged }
                                  exact path="/" 
                                 component={ ChatPage } />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
