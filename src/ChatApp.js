// npm install moment --save
// npm i react-scroll

import React from 'react';
import { AuthProvider } from './auth/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { AppRouter } from './router/AppRouter';
import { ChatProvider } from './context/chat/ChatContext';

import moment from 'moment';
import 'moment/locale/es';
moment.locales('es');

export const ChatApp = () => {
    return (
        <ChatProvider>
            <AuthProvider>
                <SocketProvider>
                    <AppRouter />
                </SocketProvider>
            </AuthProvider>
        </ChatProvider>
    )
}
