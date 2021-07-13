import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SidebarChatItem } from './SidebarChatItem'; 

export const Sidebar = () => {

    const { chatState } = useContext( ChatContext );

    const { auth } = useContext( AuthContext );         // Extraemos el estado del usuario que esta logueado
    const { uid } = auth;

    return (
        
        <div className="inbox_chat">

            {
                chatState.usuarios  // (u. de bd !== u. autenticado). Creamos un nuevo array con los usuarios que cumplen la condición
                    .filter( user => user.uid !== uid )   // Excluimos al usuario que esta logueado para que no aparezca en la lista del chat
                    .map( (usuario) => (
                    <SidebarChatItem 
                        usuario={ usuario }
                        key={ usuario.uid }/>
                ))
            }


            {/* <!-- Espacio extra para scroll --> */}
            <div className="extra_space"></div>


        </div>
                    
    )
}
