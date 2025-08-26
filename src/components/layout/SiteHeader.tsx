import React, { useState } from 'react';
import {
    Layout as AntLayout,
    Menu,
    Button,
    Avatar,
    Dropdown,
    Space,
    Drawer,
    Divider,
} from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { TokenService } from '../../utils/storage';
import {
    useLogOut,
    useUserProfileQuery,
} from '../../hooks/useOauthScienceIdMutate';
import logoImage from '../../assets/images/Logo.svg';

const ImageUrl = import.meta.env.VITE_BASE_URI;

interface SiteHeaderProps {
    onLoginClick: () => void;
    isPending: boolean;
}

const { Header } = AntLayout;

const SiteHeader: React.FC<SiteHeaderProps> = ({ onLoginClick, isPending }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const token = TokenService.getToken();
    const { data: userProfile } = useUserProfileQuery();
    const onLogout = useLogOut();
    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    const handleUserMenuClick: MenuProps['onClick'] = (info) => {
        const { key } = info;
        if (key === 'profile') {
            navigate('/profile');
        } else if (key === 'logout') {
            handleLogout();
        }
    };

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            label: (
                <span className="text-gray-700 font-['Inter',sans-serif]">
                    Profil
                </span>
            ),
        },
        { type: 'divider' },
        {
            key: 'logout',
            icon: <LogoutOutlined className="text-red-500" />,
            label: (
                <span className="text-red-600 font-['Inter',sans-serif]">
                    Chiqish
                </span>
            ),
        },
    ];

    const menuItems: MenuProps['items'] = [
        {
            key: '/',
            label: (
                <Link
                    to="/"
                    className="font-semibold font-['Inter',sans-serif] text-white hover:text-yellow-400 transition-colors duration-300"
                >
                    BOSH SAHIFA
                </Link>
            ),
        },
        {
            key: '/applications',
            label: (
                <Link
                    to="/applications"
                    className="font-semibold font-['Inter',sans-serif] text-white hover:text-yellow-400 transition-colors duration-300"
                >
                    ISHLANMALAR
                </Link>
            ),
        },
    ];

    return (
        <>
            <Header
                className="site-header fixed top-0 left-0 w-full z-[1000] shadow-2xl"
                style={{
                    height: '80px',
                    lineHeight: '80px',
                    color: '#ffffff',
                    background: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto h-full">
                    <Link
                        to="/"
                        className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
                    >
                        <img
                            src={logoImage}
                            alt="logo"
                            className="w-full h-10"
                        />
                    </Link>

                    <div className="hidden lg:flex items-center space-x-8">
                        <Menu
                            mode="horizontal"
                            selectedKeys={[location.pathname]}
                            items={menuItems}
                            className="border-0 bg-transparent min-w-0 site-header-links"
                            style={{
                                fontSize: '14px',
                                fontWeight: 600,
                                letterSpacing: '0.5px',
                            }}
                            theme="dark"
                        />
                    </div>

                    <div className="flex items-center space-x-6">
                        {token ? (
                            <Dropdown
                                menu={{
                                    items: userMenuItems,
                                    onClick: handleUserMenuClick,
                                }}
                                placement="bottomRight"
                                trigger={['click']}
                                overlayClassName="user-dropdown"
                                overlayStyle={{
                                    minWidth: '180px',
                                    borderRadius: '16px',
                                    boxShadow:
                                        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                }}
                            >
                                <div className="cursor-pointer group">
                                    <Space className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300">
                                        <Avatar
                                            src={
                                                userProfile?.photo
                                                    ? `${ImageUrl}/${userProfile.photo}`
                                                    : undefined
                                            }
                                            icon={<UserOutlined />}
                                            size={40}
                                            className="border-2 border-yellow-400/30 shadow-lg group-hover:border-yellow-400/50 transition-all duration-300"
                                        />
                                        <div className="hidden xl:block text-left">
                                            <div className="text-sm font-semibold text-white max-w-full truncate font-['Inter',sans-serif]">
                                                {userProfile?.sur_name ?? ''}{' '}
                                                {userProfile?.first_name ?? ''}
                                            </div>
                                            <div className="text-xs text-yellow-400/80 max-w-32 truncate font-['Inter',sans-serif]">
                                                {userProfile?.science_id || ''}
                                            </div>
                                        </div>
                                    </Space>
                                </div>
                            </Dropdown>
                        ) : (
                            <Button
                                type="primary"
                                loading={isPending}
                                onClick={onLoginClick}
                                size="large"
                                className="h-12 px-8 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-['Inter',sans-serif]"
                            >
                                {'KIRISH'}
                            </Button>
                        )}

                        <Button
                            type="text"
                            icon={<MenuOutlined />}
                            onClick={() => setMobileMenuVisible(true)}
                            className="lg:hidden w-12 h-12 rounded-xl text-white hover:text-yellow-400 hover:bg-white/10 transition-all duration-300 flex items-center justify-center border border-white/20"
                            style={{ fontSize: '18px' }}
                        />
                    </div>
                </div>
            </Header>

            <Drawer
                title={
                    <div className="space-x-3">
                        <div className="flex items-center space-x-2">
                            <div className="text-slate-900 font-bold text-xl font-['Inter',sans-serif]">
                                <img
                                    src={logoImage}
                                    alt="logo"
                                    className="w-full h-10"
                                />
                            </div>
                        </div>
                    </div>
                }
                placement="right"
                onClose={() => setMobileMenuVisible(false)}
                open={mobileMenuVisible}
                width={320}
                className="lg:hidden"
                styles={{
                    body: {
                        padding: '24px',
                        background:
                            'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    },
                    header: {
                        borderBottom: '1px solid #e2e8f0',
                        padding: '20px 24px',
                        background: 'white',
                    },
                }}
            >
                <div className="mb-8">
                    <Menu
                        mode="vertical"
                        selectedKeys={[location.pathname]}
                        items={menuItems}
                        className="border-0 bg-transparent rounded-lg font-['Inter',sans-serif]"
                        onClick={() => setMobileMenuVisible(false)}
                        style={{
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    />
                </div>

                <Divider className="my-6" />

                {token ? (
                    <div className="space-y-4">
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center space-x-4 mb-4">
                                <Avatar
                                    src={
                                        userProfile?.photo
                                            ? `${ImageUrl}/${userProfile.photo}`
                                            : undefined
                                    }
                                    icon={<UserOutlined />}
                                    size={56}
                                    className="border-2 border-yellow-400 shadow-sm"
                                />

                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-gray-900 truncate font-['Inter',sans-serif]">
                                        {userProfile
                                            ? `${userProfile.sur_name ?? ''} ${
                                                  userProfile.first_name ?? ''
                                              }`.trim()
                                            : 'Foydalanuvchi'}
                                    </div>
                                    <div className="text-sm text-gray-500 truncate font-['Inter',sans-serif]">
                                        {userProfile?.science_id || ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Link
                                to="/profile"
                                onClick={() => setMobileMenuVisible(false)}
                                className="flex items-center space-x-3 p-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 bg-white border border-gray-100 font-['Inter',sans-serif]"
                            >
                                <span className="font-medium">Profil</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 p-4 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 bg-white border border-gray-100 font-['Inter',sans-serif]"
                            >
                                <LogoutOutlined className="text-red-500 text-lg" />
                                <span className="font-medium">Chiqish</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="pt-4 space-y-4">
                        <Button
                            type="primary"
                            loading={isPending}
                            onClick={() => {
                                onLoginClick();
                                setMobileMenuVisible(false);
                            }}
                            size="large"
                            className="w-full h-14 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-['Inter',sans-serif]"
                            style={{
                                background:
                                    'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                                border: 'none',
                                fontSize: '16px',
                            }}
                        >
                            {'KIRISH'}
                        </Button>
                    </div>
                )}
            </Drawer>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                
                .user-dropdown .ant-dropdown-menu {
                    border-radius: 16px !important;
                    padding: 12px !important;
                    background: rgba(255, 255, 255, 0.98) !important;
                    backdrop-filter: blur(20px) !important;
                    border: 1px solid rgba(0, 0, 0, 0.05) !important;
                }
                
                .user-dropdown .ant-dropdown-menu-item {
                    border-radius: 12px !important;
                    margin: 4px 0 !important;
                    padding: 12px 16px !important;
                    font-family: 'Inter', sans-serif !important;
                }
                
                .user-dropdown .ant-dropdown-menu-item:hover {
                    background: rgba(245, 158, 11, 0.1) !important;
                }
                
                .ant-menu-horizontal {
                    border-bottom: none !important;
                }
                
                .ant-menu-horizontal > .ant-menu-item {
                    border-radius: 8px !important;
                    margin: 0 4px !important;
                    transition: all 0.3s ease !important;
                    font-family: 'Inter', sans-serif !important;
                }
                
                .ant-menu-horizontal > .ant-menu-item:hover {
                    background: rgba(245, 158, 11, 0.1) !important;
                    color: #f59e0b !important;
                }
                
                .ant-menu-horizontal > .ant-menu-item-selected {
                    color: #f59e0b !important;
                    background: rgba(245, 158, 11, 0.1) !important;
                }
                
                .ant-drawer-header {
                    border-radius: 0 !important;
                }
                
                .ant-drawer-body {
                    padding: 24px !important;
                }

                /* Header-specific color overrides for translucent blurred background */
                .site-header-links a,
                .site-header-links .ant-menu-item,
                .site-header-links .ant-menu-item a {
                    color: #ffffff !important;
                    font-family: 'Inter', sans-serif !important;
                }

                .site-header-links .ant-menu-item:hover {
                    background: rgba(245, 158, 11, 0.1) !important;
                    color: #f59e0b !important;
                }

                .site-header .ant-avatar {
                    border-color: rgba(245, 158, 11, 0.3) !important;
                }

                /* Custom scrollbar for mobile menu */
                .ant-drawer-body::-webkit-scrollbar {
                    width: 6px;
                }

                .ant-drawer-body::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 3px;
                }

                .ant-drawer-body::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 3px;
                }

                .ant-drawer-body::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
            `}</style>
        </>
    );
};

export default SiteHeader;
