import { animateScroll } from 'react-scroll';

export const scrollToBottom = ( id ) => {

    animateScroll.scrollToBottom({
        containerId: id,
        duration: 0
    });
}

export const scrollToBottomAnimated = ( id ) => { // id="mensajes" en Messages.js

    animateScroll.scrollToBottom({
        containerId: id,
        duration: 250
    });
}