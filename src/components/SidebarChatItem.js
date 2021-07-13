import React, { useContext } from 'react'
import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';
import { types } from '../types/types';

export const SidebarChatItem = ( {usuario} ) => {

    const { chatState, dispatch } = useContext( ChatContext );
    const { chatActivo } = chatState;

    const onClick = async() => {                                            // Cuando demos click al a los usuarios de sidebarChatItem...
        dispatch({                                                          // cambiaremos el estado de chatActivo por la uid del usuario seleccionado
            type: types.activarChat,
            payload: usuario.uid
        });

        const resp = await fetchConToken(`mensajes/${ usuario.uid }`);      // Haremos la petición de mensajes[] según uid del usuario seleccionado
        dispatch({                                                          // Cambiaremos el estado mensajes[] con la respuesta del backend
            type: types.cargarMensajes,
            payload: resp.mensajes
        });

        // TODO: Mover el scroll
        scrollToBottom('mensajes');
    }


    return (
        
        <div 
            className={ `chat_list ${ (usuario.uid === chatActivo) && 'active_chat' }` }
            onClick={ onClick }>
            {/* active_chat */}
            <div className="chat_people">
                <div className="chat_img"> 
                    <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{ usuario.nombre }</h5>

                    {
                        (usuario.online)
                            ? <span className="text-success">Online</span>
                            : <span className="text-danger">Offline</span>
                    }
                    
                </div>
            </div>
        </div>
            
    )
}
