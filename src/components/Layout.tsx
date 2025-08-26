import React, { useCallback, useEffect, useRef } from 'react';
import { Layout as AntLayout } from 'antd';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';
import {
    useLoginScienceId,
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

    return (
        <AntLayout
            className="min-h-screen"
            style={{ scrollBehavior: 'smooth' }}
        >
            <SiteHeader onLoginClick={handleLogin} isPending={isPending} />
            <div className="flex flex-col min-h-screen">
                <Content
                    className="flex-1 bg-background"
                    style={{ marginTop: '80px' }}
                >
                    {children}
                </Content>
                <SiteFooter />
            </div>
        </AntLayout>
    );
};

export default Layout;
