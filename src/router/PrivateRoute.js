

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({          // Función que recibe
    isAuthenticated,                    // un parámetro booleano
    component: Component,               // un componente a renderizar (chatPage) 
    ...rest                             // y el resto de propiedades  (path, exact, redirect ) 
}) => {
    return (
        <Route { ...rest }                                  // La ruta recibe las props
            component={ (props) => (                        // Renderizará un componente según estado del booleano    
                ( isAuthenticated ) 
                    ? <Component { ...props } />            // Si estoy autenticado lo dejará pasar , renderizará (chatPage)
                    : <Redirect to="/auth" />               // Si no está autenticado lo redigirá a una ruta pública
            )}
            
        />
    )
}