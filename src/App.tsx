import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider, message } from 'antd';
import { MessageProvider } from './contexts/MessageContext';
import AppRouter from './Router/router';
import './App.css';

const App: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#1890ff',
                    borderRadius: 8,
                },
            }}
        >
            <MessageProvider value={messageApi}>
                {contextHolder}
                <Router>
                    <AppRouter />
                </Router>
            </MessageProvider>
        </ConfigProvider>
    );
};

export default App;
