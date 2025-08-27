import React from 'react';
import { Modal, Button, Typography, message } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useModeratorApplicationCheckQuery } from '../../hooks/useModeratorQuery';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface ApproveApplicationModalProps {
    applicationId: number;
    isOpen: boolean;
    onClose: () => void;
}

const ApproveApplicationModal: React.FC<ApproveApplicationModalProps> = ({
    applicationId,
    isOpen,
    onClose,
}) => {
    const navigate = useNavigate();
    const { mutate: checkApplication, isPending } =
        useModeratorApplicationCheckQuery();

    const handleApprove = () => {
        checkApplication(
            {
                id: applicationId,
                body: { status: 2, comment: '' }, // APPROVED status
            },
            {
                onSuccess: () => {
                    message.success('Ariza tasdiqlandi');
                    onClose();
                    navigate('/moderator-applications');
                },
            }
        );
        onClose();
    };

    return (
        <Modal
            title="Arizani tasdiqlash"
            open={isOpen}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Bekor qilish
                </Button>,
                <Button
                    key="confirm"
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={handleApprove}
                    loading={isPending}
                    className="bg-green-500 hover:bg-green-600"
                >
                    Tasdiqlash
                </Button>,
            ]}
            width={500}
            destroyOnClose
        >
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div>
                        <Title level={5} className="mb-2">
                            Siz arizani haqiqatdan ham tasdiqlamoqchimisiz?
                        </Title>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ApproveApplicationModal;
