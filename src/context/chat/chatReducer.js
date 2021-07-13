import { types } from "../../types/types";

// const initialState = {          // Estado inicial del chat
//     uid:'',                     // UID del usuario al que yo quiero enviar mensajes
//     chatActivo: null,
//     usuarios:[],                // Todos los usuarios de la bd
//     mensajes:[]                 // El chat seleccionado
// }

export const chatReducer = ( state, action ) => {

    switch ( action.type ) {
        
        case types.usuariosCargados:                // Si la acción que se requiere es usuariosCargados
            return{
                ...state,                           // cargamos las propiedades del estado como estuvierán
                usuarios: [...action.payload]       // menos la prop que queremos modificar, usuarios se sustituye por el payload
            }                                       // generado por el useEffect cuando el backend generó a su vez los usuarios del estado del chat
    
        case types.activarChat:                     // Si la acción es activar los mensajes de un chat determinado

            if( state.chatActivo === action.payload) return state; // Si pulsamos el chat de la misma persona varias veces el state será el mismo

            return{
                ...state,
                chatActivo: action.payload,         // La prop del state chatActivo se rellenará con el usuario.uid del payload
                mensajes:[]                         // y los mensajes a cargar se limpiaran
            }
        
        case types.nuevoMensaje:                    // Si la acción es enviar un nuevo mensaje

            if( state.chatActivo === action.payload.de ||   // Tanto si recibimos mensajes (Si el uid del chatActivo = uid del usuario que envia el mensaje)
                state.chatActivo === action.payload.para){  // como si los enviamos ( Si el uid del chatActivo = uid del usuario que recibe el mensaje) 
                return{                                     // tendremos el chatActivo de la persona que me envia o recibe el mensaje 
                    ...state,                               // Devolveremos el state modificando
                    mensajes:[                              // los mensajes
                        ...state.mensajes,                  // añadiendo el último recibido.
                        action.payload
                    ]}                                      // Sino otra persona me estará enviando un mensaje en un chat que no tengo activo
            }else{
                return state
            }

        case types.cargarMensajes:                  // Si la acción es cargar los mensajes de un chat
            return{
                ...state,                           // recibimos el resto del estado que no se modifica
                mensajes:action.payload             // y cambiamos mensajes[] por la respuesta del backend
            }    

        case types.cerrarSesion: 
            return {
                uid:'',                     
                chatActivo: null,
                usuarios:[],                
                mensajes:[]
            }

        default:
            return state;
    }
}