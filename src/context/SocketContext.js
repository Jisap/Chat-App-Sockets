import React, { createContext, useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import { scrollToBottomAnimated } from "../helpers/scrollToBottom";
import { useSockets } from "../hooks/useSockets";
import { types } from "../types/types";
import { ChatContext } from "./chat/ChatContext";

export const SockectContext = createContext();    // Creamos el context

export const SocketProvider = ( {children} ) => { // Cada objeto context viene con un componente provider que permite que otros componentes se subscriban
                                                  // a los cambios del context. Children es el componente que colocaremos dentro del provider
    const { socket, online, conectarSocket, desconectarSocket } = useSockets('http://localhost:8080');
    
    const { auth } = useContext( AuthContext );

    const { dispatch } = useContext( ChatContext );

    useEffect(() => {               // Cada vez que cambie el estado de auth
        if( auth.logged ){          // Si el cliente está autenticado        
            conectarSocket();       // nos conectaremos al socket
        }
    }, [ auth, conectarSocket ])

    useEffect(() => {               // Cada vez que cambie el estado de auth
        if( !auth.logged ){         // Si el cliente no está autenticado        
            desconectarSocket();    // nos desconectaremos al socket
        }
    }, [ auth, desconectarSocket ])

    useEffect(() => {                                               // Escuchar los cambios en los usuarios conectados
        socket?.on('lista-usuarios', ( usuarios ) => {
            dispatch( {                                             // Con dispatch modificamos el state del chat
                type: types.usuariosCargados,                       // usando el nombre de la acción usuariosCargados
                payload: usuarios                                   // la modificación del estado se hará en base a los usuarios devueltos por el backend    
            })
        })
    }, [socket, dispatch]);

    useEffect(() => {
        socket?.on('mensaje-personal', ( mensaje ) => {
            // TODO Dispatch de una acción
                dispatch( {
                    type: types.nuevoMensaje,
                    payload: mensaje
                })
            // TODO Mover el scroll al final
            scrollToBottomAnimated('mensajes');
        })
    }, [socket, dispatch]);

    return (

        <SockectContext.Provider value = {{ socket, online }}>
            { children }
        </SockectContext.Provider>
    )
}