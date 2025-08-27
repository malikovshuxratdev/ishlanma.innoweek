import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import {
    CheckCircleOutlined,
    CloseOutlined,
    EditOutlined,
} from '@ant-design/icons';
import ApproveApplicationModal from './ApproveApplicationModal';
import RejectApplicationModal from './RejectApplicationModal';
import SendForEditApplicationModal from './SendForEditApplicationModal';

const { Title, Text } = Typography;

interface ApplicationCheckModalProps {
    applicationId: number;
    applicationStatus: number;
}

const ApplicationCheckModal: React.FC<ApplicationCheckModalProps> = ({
    applicationId,
    applicationStatus,
}) => {
    const [approveModalOpen, setApproveModalOpen] = useState(false);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const isSubmitted = applicationStatus === 1;

    return (
        <>
            {isSubmitted && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="text-center mb-6">
                        <Title level={4} className="mb-2">
                            Ariza tekshirish
                        </Title>
                        <Text type="secondary">
                            Quyidagi amallardan birini tanlang
                        </Text>
                    </div>

                    <div className="flex justify-center gap-4">
                        {/* Approve Button */}
                        <Button
                            type="default"
                            size="large"
                            icon={<CheckCircleOutlined color="green" />}
                            onClick={() => setApproveModalOpen(true)}
                            className="bg-green-500 hover:bg-green-600 text-white"
                        >
                            Ariza tasdiqlash
                        </Button>

                        {/* Send for Editing Button */}
                        <Button
                            type="default"
                            size="large"
                            icon={<EditOutlined />}
                            onClick={() => setEditModalOpen(true)}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            Tahrirlashga yuborish
                        </Button>

                        {/* Return Button */}
                        <Button
                            type="default"
                            size="large"
                            icon={<CloseOutlined />}
                            onClick={() => setRejectModalOpen(true)}
                            className="bg-red-500 hover:bg-red-600 text-white"
                        >
                            Ariza qaytarish
                        </Button>
                    </div>
                </div>
            )}

            {/* Separate Modals for each action */}
            <ApproveApplicationModal
                applicationId={applicationId}
                isOpen={approveModalOpen}
                onClose={() => setApproveModalOpen(false)}
            />

            <RejectApplicationModal
                applicationId={applicationId}
                isOpen={rejectModalOpen}
                onClose={() => setRejectModalOpen(false)}
            />

            <SendForEditApplicationModal
                applicationId={applicationId}
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
            />
        </>
    );
};

export default ApplicationCheckModal;
