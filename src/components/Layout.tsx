import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Layout as AntLayout } from 'antd';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';
import {
    useLoginScienceId,
    useLogOut,
    useOauthScienceId,
} from '../hooks/useOauthScienceIdMutate';
import { useLocation } from 'react-router-dom';

const { Content } = AntLayout;

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { mutate } = useOauthScienceId();
    const { mutate: loginMutate, isPending } = useLoginScienceId();
    const codeRef = useRef<string | null>(null);
    const location = useLocation();
    const logOut = useLogOut();

    useEffect(() => {
        const newCode = new URLSearchParams(location.search).get('code');
        if (newCode && newCode !== codeRef.current) {
            codeRef.current = newCode;
            loginMutate({
                code: newCode,
            });
        }
    }, [location]);

    const handleLogin = useCallback(() => {
        mutate();
        console.log('Login initiated');
    }, [mutate]);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const next = !prev;
            document.documentElement.setAttribute(
                'data-theme',
                next ? 'dark' : 'light'
            );
            return next;
        });
    };

    return (
        <AntLayout
            className={`min-h-screen ${darkMode ? 'dark-theme' : ''}`}
            style={{ overflow: 'hidden' }}
        >
            <SiteHeader
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                onLoginClick={handleLogin}
                onLogout={logOut}
                isPending={isPending}
            />
            <div className="pt-16 flex flex-col min-h-screen">
                <Content className="flex-1 overflow-y-hidden bg-background">
                    {children}
                </Content>
                <SiteFooter />
            </div>
        </AntLayout>
    );
};

export default Layout;
