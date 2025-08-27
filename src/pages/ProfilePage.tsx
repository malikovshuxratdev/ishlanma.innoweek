import React from 'react';
import {
    Card,
    Row,
    Col,
    Typography,
    Avatar,
    Descriptions,
    Spin,
    Button,
    Tooltip,
} from 'antd';
import {
    UserOutlined,
    PhoneOutlined,
    MailOutlined,
    IdcardOutlined,
    FolderOpenOutlined,
    EnvironmentOutlined,
} from '@ant-design/icons';
import { useUserProfileQuery } from '../hooks/useOauthScienceIdMutate';
import { useNavigate } from 'react-router-dom';
import { useGetMyApplicationQuery } from '../hooks/useGetApplicationQuery';
import ModeratorStatisticsCard from '../components/admin-cards/ModeratorStatisticsCard';

const { Title, Text } = Typography;
const ImageUrl = import.meta.env.VITE_BASE_URI;

const ProfilePage: React.FC = () => {
    const { data: userProfile, isLoading: userLoading } = useUserProfileQuery();
    const navigate = useNavigate();
    const { data } = useGetMyApplicationQuery();
    const hasDraft = (data?.results ?? []).some(
        (app) => app.status_display === 'Draft'
    );

    const isModerator = userProfile?.role_display === 'Moderator';

    if (userLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spin className="flex justify-center items-center h-full" />
            </div>
        );
    }

    return (
        <div className="mx-auto px-4 sm:px-6 py-4 sm:py-8 animate-fade-in max-w-[1100px]">
            <Row gutter={[16, 16]} className="sm:gutter-[24, 24]">
                {/* Profile Card */}
                <Col xs={24} sm={24} md={24} lg={8} className="order-1">
                    <Card className="text-center h-full shadow-sm">
                        <div className="relative mb-4 sm:mb-2">
                            <Avatar
                                size={120}
                                src={
                                    userProfile?.photo
                                        ? `${ImageUrl}/${userProfile.photo}`
                                        : undefined
                                }
                                icon={<UserOutlined />}
                                className="mb-4 border-4 border-accent shadow-lg w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                            />
                        </div>

                        <Title
                            level={4}
                            className="mb-2 text-text px-2 text-lg sm:text-xl lg:text-2xl"
                        >
                            {userProfile?.full_name}
                        </Title>

                        <div className="flex justify-center space-x-2 mb-4 sm:mb-2 px-2">
                            <div className="bg-surface-secondary px-3 py-1 rounded-full">
                                <Text className="text-xs text-accent font-medium">
                                    Science ID: {userProfile?.science_id}
                                </Text>
                            </div>
                        </div>

                        <div className="mb-2 flex flex-col gap-3 px-2">
                            {hasDraft ? (
                                <Tooltip title="Sizda tugallanmagan ariza bor">
                                    <Button
                                        type="primary"
                                        block
                                        size="large"
                                        disabled
                                        onClick={() =>
                                            navigate('/submit-application')
                                        }
                                        className="h-10 sm:h-12 text-sm sm:text-base"
                                    >
                                        Ariza topshirish
                                    </Button>
                                </Tooltip>
                            ) : (
                                <Button
                                    block
                                    size="large"
                                    type="primary"
                                    icon={<FolderOpenOutlined />}
                                    onClick={() =>
                                        navigate('/submit-application')
                                    }
                                    className="h-10 sm:h-12 text-sm sm:text-base"
                                >
                                    Ariza topshirish
                                </Button>
                            )}

                            <Button
                                block
                                size="large"
                                icon={<FolderOpenOutlined />}
                                onClick={() => navigate('/my-applications')}
                                className="bg-surface-secondary h-10 sm:h-12 text-sm sm:text-base"
                            >
                                Mening arizalarim
                            </Button>
                        </div>
                    </Card>
                </Col>

                {/* Profile Information */}
                <Col xs={24} sm={24} md={24} lg={16} className="order-2">
                    <Card
                        title={
                            <div className="flex items-center">
                                <IdcardOutlined className="mr-2 text-accent" />
                                <span className="text-text text-sm sm:text-base">
                                    Shaxsiy ma'lumotlar
                                </span>
                            </div>
                        }
                        className="shadow-sm"
                    >
                        <Descriptions
                            column={1}
                            bordered
                            size="middle"
                            className="text-sm sm:text-base"
                        >
                            <Descriptions.Item
                                label={
                                    <span className="text-text-secondary text-xs sm:text-sm">
                                        <UserOutlined className="mr-2" />
                                        To'liq ism
                                    </span>
                                }
                            >
                                <span className="text-text font-medium text-xs sm:text-sm">
                                    {userProfile?.full_name}
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="text-text-secondary text-xs sm:text-sm">
                                        <PhoneOutlined className="mr-2" />
                                        Telefon raqami
                                    </span>
                                }
                            >
                                <span className="text-text text-xs sm:text-sm">
                                    +{userProfile?.phone_number}
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="text-text-secondary text-xs sm:text-sm">
                                        <MailOutlined className="mr-2" />
                                        Email
                                    </span>
                                }
                            >
                                <span className="text-text text-xs sm:text-sm">
                                    {userProfile?.email}
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="text-text-secondary text-xs sm:text-sm">
                                        <IdcardOutlined className="mr-2" />
                                        Science ID
                                    </span>
                                }
                            >
                                <span className="text-accent font-medium text-xs sm:text-sm">
                                    {userProfile?.science_id}
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="text-text-secondary text-xs sm:text-sm">
                                        JSHSHIR
                                    </span>
                                }
                            >
                                <span className="text-text text-xs sm:text-sm">
                                    {userProfile?.pin}
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="text-text-secondary text-xs sm:text-sm">
                                        <EnvironmentOutlined className="mr-2" />
                                        Doimiy yashash joyi
                                    </span>
                                }
                            >
                                <span className="text-text text-xs sm:text-sm">
                                    {userProfile?.personal_address}
                                </span>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    {/* Moderator Statistics Card - Only show for moderators */}
                    {isModerator && (
                        <div className="mt-6">
                            <ModeratorStatisticsCard />
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ProfilePage;
