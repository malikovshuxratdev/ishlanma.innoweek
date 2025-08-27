import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import ApplicationsPage from '../pages/ApplicationsPage';
import ApplicationDetailPage from '../pages/ApplicationDetailPage';
import ProfilePage from '../pages/ProfilePage';
import MyApplicationsPage from '../pages/MyApplicationsPage';
import ApplicationWizard from '../pages/ApplicationWizard';
import ModeratorApplicationList from '../pages/ModeratorApplicationList';
import ModeratorApplicationDetail from '../pages/ModeratorApplicationDetail.tsx';

const AppRouter: React.FC = () => {
    return (
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
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route
                                path="/my-applications"
                                element={<MyApplicationsPage />}
                            />
                            <Route
                                path="/submit-application"
                                element={<ApplicationWizard />}
                            />
                            <Route
                                path="/moderator-applications"
                                element={<ModeratorApplicationList />}
                            />
                            <Route
                                path="/moderator-application/:id"
                                element={<ModeratorApplicationDetail />}
                            />
                        </Routes>
                    </Layout>
                }
            />
        </Routes>
    );
};

export default AppRouter;
