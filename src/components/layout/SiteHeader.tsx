import React, { useState } from 'react';
import {
    Layout as AntLayout,
    Menu,
    Button,
    Avatar,
    Dropdown,
    Space,
    Switch,
    Drawer,
} from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
    UserOutlined,
    LogoutOutlined,
    ProfileOutlined,
    ExperimentOutlined,
    MoonOutlined,
    SunOutlined,
    MenuOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { TokenService } from '../../utils/storage';
import { useUserProfileQuery } from '../../hooks/useOauthScienceIdMutate';

const ImageUrl = import.meta.env.VITE_BASE_URI;

interface SiteHeaderProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
    onLoginClick: () => void;
    onLogout: () => void;
    isPending: boolean;
}

const { Header } = AntLayout;

const SiteHeader: React.FC<SiteHeaderProps> = ({
    darkMode,
    toggleDarkMode,
    onLoginClick,
    onLogout,
    isPending,
}) => {
    const location = useLocation();
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const token = TokenService.getToken();
    const { data: userProfile, isLoading: userLoading } = useUserProfileQuery();

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <ProfileOutlined />,
            label: <Link to="/profile">Profile</Link>,
        },
        { type: 'divider' },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: onLogout,
        },
    ];

    const menuItems: MenuProps['items'] = [
        {
            key: '/',
            label: (
                <Link
                    to="/"
                    className="text-sm font-medium hover:text-blue-500 transition-colors duration-300"
                >
                    Bosh sahifa
                </Link>
            ),
        },
        {
            key: '/applications',
            label: (
                <Link
                    to="/applications"
                    className="text-sm font-medium hover:text-blue-500 transition-colors duration-300"
                >
                    Loyihalar
                </Link>
            ),
        },
    ];

    return (
        <Header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg px-6 lg:px-8 flex justify-between items-center border-b border-gray-100 h-16">
            {/* Left: Logo */}
            <div className="flex items-center">
                <div className="text-xl lg:text-2xl font-bold text-gray-800 mr-6 lg:mr-10 flex items-center select-none">
                    <div className="mr-3 p-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
                        <ExperimentOutlined className="text-blue-600 text-lg lg:text-xl" />
                    </div>
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline font-light">
                        Loyiha
                    </span>
                </div>
            </div>

            {/* Right: Menu + Controls */}
            <div className="flex items-center space-x-4 lg:space-x-6">
                <div className="hidden md:block">
                    <Menu
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                        items={menuItems}
                        disabledOverflow
                        className="border-0 bg-transparent flex items-center"
                    />
                </div>

                {/* Dark Mode Toggle */}
                <div className="flex items-center bg-gray-50 rounded-full p-1">
                    <SunOutlined
                        className={`mr-2 transition-all duration-300 text-sm ${
                            !darkMode ? 'text-amber-500' : 'text-gray-400'
                        }`}
                    />
                    <Switch
                        checked={darkMode}
                        onChange={toggleDarkMode}
                        checkedChildren={
                            <MoonOutlined className="text-xs text-indigo-600" />
                        }
                        unCheckedChildren={
                            <SunOutlined className="text-xs text-amber-500" />
                        }
                        className="bg-gradient-to-r from-amber-400 to-orange-400 scale-90 lg:scale-100"
                    />
                    <MoonOutlined
                        className={`ml-2 transition-all duration-300 text-sm ${
                            darkMode ? 'text-indigo-500' : 'text-gray-400'
                        }`}
                    />
                </div>

                {/* User Section */}
                {token ? (
                    <Dropdown
                        menu={{ items: userMenuItems }}
                        placement="bottomRight"
                        trigger={['click']}
                    >
                        <Space className="cursor-pointer hover:bg-blue-50 px-4 py-2 rounded-2xl transition-all duration-300 border border-transparent hover:border-blue-200">
                            <Avatar
                                src={
                                    userProfile?.photo
                                        ? `${ImageUrl}/${userProfile.photo}`
                                        : undefined
                                }
                                icon={<UserOutlined />}
                                size="large"
                                className="ring-2 ring-blue-100"
                            />
                            <div className="text-right hidden lg:block">
                                <div className="text-sm font-medium text-gray-800">
                                    {userLoading
                                        ? '...'
                                        : userProfile?.sur_name +
                                              ' ' +
                                              userProfile?.first_name || ''}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {userLoading
                                        ? ''
                                        : userProfile?.science_id || ''}
                                </div>
                            </div>
                        </Space>
                    </Dropdown>
                ) : (
                    <Button
                        type="primary"
                        loading={isPending}
                        onClick={onLoginClick}
                        size="large"
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 border-0 rounded-2xl px-6 py-2 h-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium"
                    >
                        <span className="inline">Login</span>
                    </Button>
                )}

                {/* Mobile Menu Button */}
                <Button
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={() => setMobileMenuVisible(true)}
                    className="md:hidden text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
                />
            </div>

            {/* Mobile Drawer */}
            <Drawer
                title={
                    <div className="flex items-center">
                        <div className="mr-3 p-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
                            <ExperimentOutlined className="text-blue-600 text-lg" />
                        </div>
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-light">
                            Ishlanma
                        </span>
                    </div>
                }
                placement="left"
                onClose={() => setMobileMenuVisible(false)}
                open={mobileMenuVisible}
                width={300}
                className="md:hidden"
                styles={{
                    body: { padding: '24px' },
                    header: {
                        borderBottom: '1px solid #f3f4f6',
                        padding: '20px 24px',
                    },
                }}
            >
                <Menu
                    mode="vertical"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    className="border-0 bg-transparent"
                    onClick={() => setMobileMenuVisible(false)}
                />
                {token && (
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                            <Avatar
                                src={
                                    userProfile?.photo
                                        ? `${ImageUrl}/${userProfile.photo}`
                                        : undefined
                                }
                                icon={<UserOutlined />}
                                className="mr-4 ring-2 ring-blue-100"
                                size="large"
                            />
                            <div>
                                <div className="text-base font-medium text-gray-800">
                                    {userLoading
                                        ? '...'
                                        : userProfile?.full_name || '—'}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {userLoading
                                        ? ''
                                        : userProfile?.science_id || ''}
                                </div>
                            </div>
                        </div>
                        <Menu
                            mode="vertical"
                            items={userMenuItems}
                            className="border-0 bg-transparent"
                            onClick={() => setMobileMenuVisible(false)}
                        />
                    </div>
                )}
            </Drawer>
        </Header>
    );
};

export default SiteHeader;
