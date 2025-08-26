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
import {
    UserOutlined,
    LogoutOutlined,
    MenuOutlined,
    DownOutlined,
} from '@ant-design/icons';
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
            label: <span className="text-gray-700">Profil ma'lumotlari</span>,
        },
        { type: 'divider' },
        {
            key: 'logout',
            icon: <LogoutOutlined className="text-red-500" />,
            label: <span className="text-red-600">Chiqish</span>,
        },
    ];

    const menuItems: MenuProps['items'] = [
        {
            key: '/',
            label: (
                <Link to="/" className="font-medium">
                    Bosh sahifa
                </Link>
            ),
        },
        {
            key: '/applications',
            label: (
                <Link to="/applications" className="font-medium">
                    Ishlanmalar
                </Link>
            ),
        },
    ];

    return (
        <>
            <Header
                className="fixed top-0 left-0 w-full z-50 shadow-lg"
                style={{
                    background:
                        'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                    padding: '0 24px',
                    height: '72px',
                    lineHeight: '72px',
                }}
            >
                <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto h-full">
                    <Link
                        to="/"
                        className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
                    >
                        <img
                            src={logoImage}
                            alt="Logo"
                            className="w-40 md:w-full h-10"
                        />
                    </Link>

                    <div className="hidden md:flex items-center">
                        <Menu
                            mode="horizontal"
                            selectedKeys={[location.pathname]}
                            items={menuItems}
                            className="border-0 bg-transparent min-w-0"
                            style={{
                                fontSize: '16px',
                                fontWeight: 500,
                            }}
                            theme="light"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
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
                                    minWidth: '280px',
                                    borderRadius: '12px',
                                    boxShadow:
                                        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                }}
                            >
                                <div className="cursor-pointer">
                                    <Space className="rounded-xl border border-gray-200">
                                        <Avatar
                                            src={
                                                userProfile?.photo
                                                    ? `${ImageUrl}/${userProfile.photo}`
                                                    : undefined
                                            }
                                            icon={<UserOutlined />}
                                            size={36}
                                            className="border-2 border-white shadow-sm"
                                        />
                                        <div className="hidden lg:block text-left">
                                            <div className="text-sm font-semibold text-gray-900 max-w-full truncate">
                                                {userProfile?.sur_name ?? ''}{' '}
                                                {userProfile?.first_name ?? ''}
                                            </div>
                                            <div className="text-xs text-gray-500 max-w-32 truncate">
                                                {userProfile?.science_id || ''}
                                            </div>
                                        </div>
                                        <DownOutlined className="text-gray-400 text-xs" />
                                    </Space>
                                </div>
                            </Dropdown>
                        ) : (
                            <Button
                                type="primary"
                                loading={isPending}
                                onClick={onLoginClick}
                                size="large"
                                className="h-12 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                style={{
                                    background:
                                        'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                    border: 'none',
                                    fontSize: '16px',
                                }}
                            >
                                {isPending ? 'Yuklanmoqda...' : 'Kirish'}
                            </Button>
                        )}
                        <Button
                            type="text"
                            icon={<MenuOutlined />}
                            onClick={() => setMobileMenuVisible(true)}
                            className="md:hidden w-12 h-12 rounded-xl text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
                            style={{ fontSize: '18px' }}
                        />
                    </div>
                </div>
            </Header>

            <Drawer
                title={
                    <div className="space-x-3">
                        <img
                            src={logoImage}
                            alt="Logo"
                            className="w-40 md:w-full h-10"
                        />
                    </div>
                }
                placement="right"
                onClose={() => setMobileMenuVisible(false)}
                open={mobileMenuVisible}
                width={320}
                className="md:hidden"
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
                        className="border-0 bg-transparent rounded-lg"
                        onClick={() => setMobileMenuVisible(false)}
                        style={{
                            fontSize: '16px',
                            fontWeight: 500,
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
                                    className="border-2 border-blue-200 shadow-sm"
                                />

                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-gray-900 truncate">
                                        {userProfile
                                            ? `${userProfile.sur_name ?? ''} ${
                                                  userProfile.first_name ?? ''
                                              }`.trim()
                                            : 'Foydalanuvchi'}
                                    </div>
                                    <div className="text-sm text-gray-500 truncate">
                                        {userProfile?.science_id || ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Link
                                to="/profile"
                                onClick={() => setMobileMenuVisible(false)}
                                className="flex items-center space-x-3 p-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 bg-white border border-gray-100"
                            >
                                <span className="font-medium">
                                    Profil ma'lumotlari
                                </span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 p-4 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 bg-white border border-gray-100"
                            >
                                <LogoutOutlined className="text-red-500 text-lg" />
                                <span className="font-medium">Chiqish</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="pt-4">
                        <Button
                            type="primary"
                            loading={isPending}
                            onClick={() => {
                                onLoginClick();
                                setMobileMenuVisible(false);
                            }}
                            size="large"
                            className="w-full h-14 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            style={{
                                background:
                                    'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                border: 'none',
                                fontSize: '16px',
                            }}
                        >
                            {isPending ? 'Yuklanmoqda...' : 'Kirish'}
                        </Button>
                    </div>
                )}
            </Drawer>

            <style>{`
                .user-dropdown .ant-dropdown-menu {
                    border-radius: 12px !important;
                    padding: 8px !important;
                    background: rgba(255, 255, 255, 0.95) !important;
                    backdrop-filter: blur(10px) !important;
                }
                
                .user-dropdown .ant-dropdown-menu-item {
                    border-radius: 8px !important;
                    margin: 2px 0 !important;
                    padding: 8px 12px !important;
                }
                
                .user-dropdown .ant-dropdown-menu-item:hover {
                    background: rgba(59, 130, 246, 0.1) !important;
                }
                
                .ant-menu-horizontal {
                    border-bottom: none !important;
                }
                
                .ant-menu-horizontal > .ant-menu-item {
                    border-radius: 8px !important;
                    margin: 0 4px !important;
                    transition: all 0.3s ease !important;
                }
                
                .ant-menu-horizontal > .ant-menu-item:hover {
                    background: rgba(59, 130, 246, 0.1) !important;
                    color: #3b82f6 !important;
                }
                
                .ant-menu-horizontal > .ant-menu-item-selected {
                    color: #3b82f6 !important;
                }
                
                .ant-drawer-header {
                    border-radius: 0 !important;
                }
                
                .ant-drawer-body {
                    padding: 24px !important;
                }
            `}</style>
        </>
    );
};

export default SiteHeader;
