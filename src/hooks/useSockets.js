import { useCallback, useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client'; //npm i socket.io-client

export const useSockets = ( serverPath ) => {

    const [socket, setSocket] = useState(null);             // Definimos el state para socket

    const [online, setOnline] = useState( false );          // Definimos el state para online

    const conectarSocket = useCallback( () => {             // Memorizamos la conexión al socket y establecemos el estado
        
        const token = localStorage.getItem('token');        // Extraemos el token de localStorage y lo insertamos en el estado del socket
        
        const socketTemp = io.connect( serverPath, {        // Conexión
            transports:['websocket'],
            autoConnect:true,
            forceNew:true,
            query: {
                'x-token': token                            // Token                     
            } 
        });
        setSocket( socketTemp );                            // Estado                       
    },[serverPath])

    const desconectarSocket = useCallback( () => {          // Memorizamos la desconexión al socket y establecemos el estado
        socket?.disconnect()
    },[socket])


    useEffect(() => {                                       // Cuando el socket cambia por primera vez
        setOnline( socket?.connected )                      // usamos el método setOnline y establecemos la conexión (online=true)
    }, [ socket ])

    useEffect(() => {                                       // En los futuros cambios este useEffect será el que determine la reconexión
        socket?.on('connect', () => {                       // 'connect' es uno de los eventos de los sockets y estaremos pendientes de el
            setOnline( true )                               // para reestableces el estado de la conexión.
        })
    }, [ socket ])

    useEffect(() => {                                       // Lo mismo pero para la desconexion
        socket?.on('disconnect', () => {
            setOnline( false )
        })
    }, [ socket ])

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }

}

