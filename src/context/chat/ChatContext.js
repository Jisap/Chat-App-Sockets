import React, {  createContext, useReducer } from "react";
import { chatReducer } from "./chatReducer";


export const ChatContext = createContext(); // Este context manejará el estado del chat

const initialState = {          // Estado inicial del chat
    uid:'',                     // UID del usuario al que yo quiero enviar mensajes
    chatActivo: null,
    usuarios:[],                // Todos los usuarios de la bd
    mensajes:[]                 // El chat seleccionado
}


export const ChatProvider = ( { children } ) => {

    const [ chatState, dispatch ] = useReducer( chatReducer, initialState )
    

    return (
        <ChatContext.Provider value={{
            chatState, dispatch
        }}>
            { children }
        </ChatContext.Provider>
    )
}
