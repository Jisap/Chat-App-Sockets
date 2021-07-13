import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SockectContext } from '../context/SocketContext';

export const SendMessages = () => {

    const { auth } = useContext( AuthContext );
    const { chatState } = useContext(ChatContext);
    const { socket } = useContext( SockectContext );
    const [mensaje, setMensaje] = useState('');
                        //ev
    const onChange = ({ target }) => {
        setMensaje( target.value );
    }

    const onSubmit = ( ev ) => {
        ev.preventDefault();
        if( mensaje.length === 0){ return }
        setMensaje('');

        socket.emit('mensaje-personal', { // Emitimos un evento de sokects para enviar el mensaje
            de: auth.uid,                 // Del usuario autenticado 
            para: chatState.chatActivo,   // Para el usuario con el chatActivo que hemos seleccionado en el sidebar
            mensaje
        })

        // TODO hacer el dispatch del mensaje
    }

    return (
        <form
            onSubmit={ onSubmit }
        >
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input 
                        type="text" 
                        className="write_msg" 
                        placeholder="Mensaje..." 
                        value={ mensaje }
                        onChange={ onChange }
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        Enviar
                    </button>
                </div>
            </div>
        </form>
            

    )
}
