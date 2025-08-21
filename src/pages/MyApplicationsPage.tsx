import React from 'react';
import { Button, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ApplicationCard from '../components/cards/ApplicationCard';
import { useGetMyApplicationQuery } from '../hooks/useGetApplicationQuery';

const { Title } = Typography;

interface Application {
    id: string;
    title: string;
    authors: string[];
    budget: string;
    sectors: string[];
    status: 'approved' | 'rejected' | 'revision';
    submissionDate: string;
    attachments: number;
    image: string;
    description: string;
    organization: string;
    rating: number;
    ratingCount: number;
    maturityLevel: string;
    region: string;
}

const MyApplicationsPage: React.FC = () => {
    const {} = useGetMyApplicationQuery();

    const mockApplications: Application[] = [
        {
            id: '1',
            title: 'AI-Powered Medical Diagnosis System',
            authors: ['Dr. Akmal Saidov', 'Dr. Nigora Karimova'],
            budget: '$150,000',
            sectors: ['Healthcare', 'AI'],
            status: 'approved',
            submissionDate: '2024-01-15',
            attachments: 5,
            image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg',
            description:
                'Advanced AI system for early disease detection and medical diagnosis assistance.',
            organization: 'Tashkent Medical Institute',
            rating: 4.8,
            ratingCount: 24,
            maturityLevel: 'Prototype Testing',
            region: 'Tashkent',
        },
        {
            id: '2',
            title: 'Smart Agricultural IoT System',
            authors: ['Dr. Akmal Saidov', 'Prof. Jamshid Rasulov'],
            budget: '$85,000',
            sectors: ['Agriculture', 'IoT'],
            status: 'revision',
            submissionDate: '2024-02-20',
            attachments: 3,
            image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg',
            description:
                'IoT-based system for monitoring crop health, soil conditions, and irrigation optimization.',
            organization: 'Samarkand Agricultural Research Institute',
            rating: 4.6,
            ratingCount: 18,
            maturityLevel: 'Commercial Ready',
            region: 'Samarkand',
        },
        {
            id: '3',
            title: 'Blockchain Supply Chain Tracker',
            authors: ['Dr. Akmal Saidov'],
            budget: '$120,000',
            sectors: ['Technology'],
            status: 'rejected',
            submissionDate: '2024-01-10',
            attachments: 4,
            image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
            description:
                'Transparent and secure supply chain management using blockchain technology.',
            organization: 'IT Innovation Hub',
            rating: 4.4,
            ratingCount: 15,
            maturityLevel: 'Prototype Testing',
            region: 'Fergana',
        },
    ];

    const handleEdit = (application: Application) => {
        message.info(`Editing ${application.title}`);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center mb-6">
                <Title level={2} className="mb-0 text-text">
                    Mening arizalarim
                </Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() =>
                        (window.location.href = '/submit-application')
                    }
                    className="w-full sm:w-auto"
                >
                    Yangi ariza
                </Button>
            </div>

            <div className="space-y-6">
                {mockApplications.map((application) => (
                    <ApplicationCard
                        key={application.id}
                        application={application}
                        showEdit={true}
                        onEdit={() => handleEdit(application)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyApplicationsPage;
