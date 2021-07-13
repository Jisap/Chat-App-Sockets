

const baseUrl = process.env.REACT_APP_API_URL;                              // Definimos la base url -> http://localhost:8080/api

export const fetchSinToken = async( endpoint, data , method='GET' ) => {    // Esta petición es para cuando se loguea alguien por 1ª vez
                                                                            // o crea un usuario en la bd.
    const url = `${ baseUrl }/${ endpoint }`;                               // Dirección url a donde hacemos la petición
    
    if(method === 'GET'){                                                   // Si la petición es GET la resp será un fetch a la url
        const resp = await fetch( url );
        return await resp.json();
    }else{                                                                  // Pero si la petición es PUT, POST o DELETE
        const resp = await fetch( url, {                                    // la petición habrá que construila de este modo
            method,
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        })

        return await resp.json();
    }
}

export const fetchConToken = async( endpoint, data, method='GET' ) => {      // Esta petición es para cuando se accede a la app habiendo logueado antes

    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || undefined;

    if(method === 'GET'){                                                   // Si la petición es GET la resp será un fetch a la url
        const resp = await fetch( url,{                                     // pero definiendo el token almacenado en localStorage previamente
            headers:{
                'x-token': token
            }
        } );
        return await resp.json();
    }else{                                                                  // Pero si la petición es PUT, POST o DELETE
        const resp = await fetch( url, {                                    // la petición habrá que construirla de este modo
            method,
            headers:{
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        })

        return await resp.json();
    }
}