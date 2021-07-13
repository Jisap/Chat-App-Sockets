import React, { useContext } from 'react'
import { SendMessages } from './SendMessages';
import { IncomingMessage } from './IncomingMessage';
import { OutgoingMessages } from './OutgoingMessages';
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../auth/AuthContext';

export const Messages = () => {

    const { chatState } = useContext( ChatContext );
    const { auth } = useContext( AuthContext );


    return (
        
        <div className="mesgs">

            {/* <!-- Historia inicio --> */}
            <div 
                id="mensajes"
                className="msg_history">
                
            {
                chatState.mensajes.map(msg => (
                    ( msg.para === auth.uid )                                       // Si el uid identificativo msg.para = uid del usuario autenticado -> el mensaje es para mi
                        ? <IncomingMessage key={msg._id} msg={ msg }/>              // Mostraremos el msg en el incoming mensaje
                        : <OutgoingMessages key={msg._id} msg={ msg }/>             // Sino se mostrará en el outgoing mensaje
                ))
            }
                
        </div>

            {/* <!-- Historia Fin --> */}

            <SendMessages />

        </div>
                
    )
}
