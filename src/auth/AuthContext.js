import React,{ createContext, useCallback, useContext, useState } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";


export const AuthContext = createContext(); // Creamos el context que nos proporciona una forma de pasar datos a través del árbol de componentes

const initialState = {                      // Definimos el estado inicial de auth
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
};


export const AuthProvider = ({ children }) => {             // Definimos el provider que es el componente que hace que redux store esté disponible
                                                            // para cualquier componente anidado
    const [auth, setAuth] = useState(initialState);
    const { dispatch }= useContext( ChatContext );          // Extraemos el dispatch del ChatContext para modificarlo en el logout

    const login = async( email, password ) => {                                 // La petición para el login en el backend es localhost:8080/api/login
        const resp = await fetchSinToken('login', {email, password}, 'POST');   // Enviamos el email y password del form y el method 'POST'
        console.log(resp); 
        if( resp.ok ){                                                          // Si la resp fue ok
            localStorage.setItem( 'token', resp.token );                        // Guardamos el token de la resp en localStorage
            const { usuario } = resp;                                           // Definimos el usuario devuelto en la resp
            setAuth({                                                           // Establecemos el estado de auth para la app de forma global
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email,
            });
            //console.log('Autenticado');
        }
        return resp.ok;       
    }

    const register = async( nombre, email, password ) => {
        const resp = await fetchSinToken('login/new', {nombre, email, password}, 'POST');   // Enviamos el email y password del form y el method 'POST'
        console.log(resp); 
        if( resp.ok ){                                                          // Si la resp fue ok
            localStorage.setItem( 'token', resp.token );                        // Guardamos el token de la resp en localStorage
            const { usuario } = resp;                                           // Definimos el usuario devuelto en la resp
            setAuth({                                                           // Establecemos el estado de auth para la app de forma global
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email,
            });
            //console.log('Autenticado');
            return true;                                                        // Si todo fue bien devolvemos true -> msg en registerPage
        }
        return resp.msg;                                                        // Si hubo algún problema leemos el msg de error de la resp
    }

    const verificaToken = useCallback( async() => {
        
        const token = localStorage.getItem('token');                            // Obtenemos el token del localStorage
        
        if( !token ){                                                           // Si no hay token
            setAuth({                                                           // Definimos el siguiente estado de auth
                uid: null,                                                      // Con logged en false el useEffect nos redirige a ruta pública
                checking: false,
                logged: false,                                                  
                name: null,
                email: null,
            })
            return false;                                                       // Devolvemos false
        }

        const resp = await fetchConToken('login/renew');                        // Si si hay token hacemos la petición con token y obtenemos la resp
        if ( resp.ok){                                                          // Si todo fue bien
            localStorage.setItem( 'token', resp.token );                        // Guardamos el token de la resp en localStorage
            const { usuario } = resp;                                           // Definimos el usuario devuelto en la resp
            setAuth({                                                           // Establecemos el estado de auth para la app de forma global
                uid: usuario.uid,                                               // Con logged en true el useEffect nos redirige a ruta privada
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email,
            });
            console.log('Autenticado');
            return true;                                                        // Devolvemos true

        }else{                                                                  // Si algo fue mal
            setAuth({                                                           // logged = false y el resto null
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            });

            return false;                                                       // Devolvemos false
        }

    },[])

    const logout = () => {
        localStorage.removeItem('token');                                      // Cuando salgamos de la app borramos el token del localstorage                 
        
        dispatch({
            type: types.cerrarSesion                                           // Purgamos del chatState todos los mensajes
        })
        
        
        setAuth({                                                              // logged = false y el resto null
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            });
    }

    return (
        <AuthContext.Provider value={{  // El estado de auth y otras funciones estarán disponble para los children anidados en el context
            login,
            register,
            verificaToken,
            logout,
            auth,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

