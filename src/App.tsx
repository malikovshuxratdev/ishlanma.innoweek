import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ApplicationsPage from './pages/ApplicationsPage';
import ApplicationDetailPage from './pages/ApplicationDetailPage';
import ProfilePage from './pages/ProfilePage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import ApplicationWizard from './pages/ApplicationWizard';
import './App.css';

const App: React.FC = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#1890ff',
                    borderRadius: 8,
                },
            }}
        >
            <Router>
                <Routes>
                    <Route
                        path="*"
                        element={
                            <Layout>
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route
                                        path="/applications"
                                        element={<ApplicationsPage />}
                                    />
                                    <Route
                                        path="/applications/:id"
                                        element={<ApplicationDetailPage />}
                                    />
                                    <Route
                                        path="/profile"
                                        element={<ProfilePage />}
                                    />
                                    <Route
                                        path="/my-applications"
                                        element={<MyApplicationsPage />}
                                    />
                                    <Route
                                        path="/submit-application"
                                        element={<ApplicationWizard />}
                                    />
                                </Routes>
                            </Layout>
                        }
                    />
                </Routes>
            </Router>
        </ConfigProvider>
    );
};

export default App;
