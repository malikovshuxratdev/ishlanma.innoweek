import React from 'react';
import { Card, Statistic, Button, Row, Col, Spin } from 'antd';
import {
    FileTextOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import { useModeratorStatisticsQuery } from '../../hooks/useModeratorQuery';
import { useNavigate } from 'react-router-dom';

const StatItem = ({
    label,
    value,
    icon,
    color,
}: {
    label: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}) => (
    <Col span={8}>
        <Card className="text-center border-0 shadow-md">
            <Statistic
                title={label}
                value={value}
                prefix={icon}
                valueStyle={{
                    color: color,
                    fontSize: '24px',
                    fontWeight: 'bold',
                }}
                className="text-center"
            />
        </Card>
    </Col>
);

const ModeratorStatisticsCard: React.FC = () => {
    const { data, isLoading } = useModeratorStatisticsQuery();
    const navigate = useNavigate();
    const statItems = [
        {
            key: 'submitted',
            label: 'Kelib tushgan arizalar',
            value: data?.submitted,
            color: '#1890ff',
            icon: <FileTextOutlined />,
        },
        {
            key: 'approved',
            label: 'Tasdiqlangan arizalar',
            value: data?.approved,
            color: '#52c41a',
            icon: <CheckCircleOutlined />,
        },
        {
            key: 'rejected',
            label: 'Rad qilinadigan arizalar',
            value: data?.rejected,
            color: '#ff4d4f',
            icon: <CloseCircleOutlined />,
        },
    ];

    return (
        <Card
            title="Moderator statistikasi"
            className="shadow-md"
            extra={
                <Button
                    type="primary"
                    icon={<UnorderedListOutlined />}
                    onClick={() => {
                        navigate('/moderator-applications');
                    }}
                    size="large"
                >
                    Arizalar ro'yxati
                </Button>
            }
        >
            {isLoading ? (
                <div className="text-center py-8">
                    <Spin size="large" />
                </div>
            ) : (
                <Row gutter={[16, 16]}>
                    {statItems.map((item) => (
                        <StatItem
                            key={item.key}
                            label={item.label}
                            value={item.value ?? 0}
                            icon={item.icon}
                            color={item.color}
                        />
                    ))}
                </Row>
            )}
        </Card>
    );
};

export default ModeratorStatisticsCard;
