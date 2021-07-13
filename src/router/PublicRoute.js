
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({           // Función que recibe
    isAuthenticated,                    // un parámetro booleano
    component: Component,               // un componente a renderizar (authRouter) 
    ...rest                             // y el resto de propiedades  (path, exact, redirect ) 
}) => {
    return (
        <Route { ...rest }                                  // La ruta recibe las props
            component={ (props) => (                        // Renderizará un componente según estado del booleano    
                ( !isAuthenticated ) 
                    ? <Component { ...props } />            // Si no esta autenticado lo dejará pasar , renderizará (authRouter)
                    : <Redirect to="/" />                   // Si si está autenticado lo redigirá  a otro componente  (chatPage)
            )}
            
        />
    )
}
