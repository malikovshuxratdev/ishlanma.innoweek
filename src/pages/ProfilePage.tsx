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

const { Title, Text } = Typography;
const ImageUrl = import.meta.env.VITE_BASE_URI;

const ProfilePage: React.FC = () => {
    const { data: userProfile, isLoading: userLoading } = useUserProfileQuery();
    const navigate = useNavigate();
    const { data } = useGetMyApplicationQuery();
    const hasDraft = (data?.results ?? []).some(
        (app) => app.status_display === 'Draft'
    );

    if (userLoading) {
        return <Spin className="flex justify-center items-center h-full" />;
    }

    return (
        <div className="container mx-auto px-6 py-8 animate-fade-in max-w-[1100px]">
            <Row gutter={[24, 24]}>
                {/* Profile Card */}
                <Col xs={24} lg={8} className="order-1">
                    <Card className="text-center h-full">
                        <div className="relative mb-2">
                            <Avatar
                                size={120}
                                src={
                                    userProfile?.photo
                                        ? `${ImageUrl}/${userProfile.photo}`
                                        : undefined
                                }
                                icon={<UserOutlined />}
                                className="mb-4 border-4 border-accent shadow-lg"
                            />
                        </div>

                        <Title level={4} className="mb-2 text-text">
                            {userProfile?.full_name}
                        </Title>

                        <div className="flex justify-center space-x-2 mb-2">
                            <div className="bg-surface-secondary px-3 py-1 rounded-full">
                                <Text className="text-xs text-accent font-medium">
                                    Science ID: {userProfile?.science_id}
                                </Text>
                            </div>
                        </div>

                        <div className="mb-2 flex-row gap-3">
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
                                    onClick={() => navigate('/my-applications')}
                                >
                                    Mening arizalarim
                                </Button>
                            )}

                            <Button
                                block
                                size="large"
                                icon={<FolderOpenOutlined />}
                                onClick={() => navigate('/my-applications')}
                                className="bg-surface-secondary mt-2"
                            >
                                Mening arizalarim
                            </Button>
                        </div>
                    </Card>
                </Col>

                {/* Profile Information */}
                <Col xs={24} lg={16} className="order-2">
                    <Card
                        title={
                            <div className="flex items-center">
                                <IdcardOutlined className="mr-2 text-accent" />
                                <span className="text-text">
                                    Shaxsiy ma'lumotlar
                                </span>
                            </div>
                        }
                    >
                        <Descriptions column={1} bordered size="middle">
                            <Descriptions.Item
                                label={
                                    <span className="text-text-secondary">
                                        <UserOutlined className="mr-2" />
                                        To'liq ism
                                    </span>
                                }
                            >
                                <span className="text-text font-medium">
                                    {userProfile?.full_name}
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="text-text-secondary">
                                        <PhoneOutlined className="mr-2" />
                                        Telefon raqami
                                    </span>
                                }
                            >
                                <span className="text-text">
                                    {userProfile?.phone_number}
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="text-text-secondary">
                                        <MailOutlined className="mr-2" />
                                        Email
                                    </span>
                                }
                            >
                                <span className="text-text">
                                    {userProfile?.email}
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="text-text-secondary">
                                        <IdcardOutlined className="mr-2" />
                                        Science ID
                                    </span>
                                }
                            >
                                <span className="text-accent font-medium">
                                    {userProfile?.science_id}
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="text-text-secondary">
                                        JSHSHIR
                                    </span>
                                }
                            >
                                <span className="text-text">
                                    {userProfile?.pin}
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={
                                    <span className="text-text-secondary">
                                        <EnvironmentOutlined className="mr-2" />
                                        Tug'ilgan joy
                                    </span>
                                }
                            >
                                <span className="text-text">
                                    {userProfile?.citizen}
                                </span>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProfilePage;
