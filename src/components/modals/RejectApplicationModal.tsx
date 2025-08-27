import React from 'react';
import { Modal, Button, Form, Input, Typography, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useModeratorApplicationCheckQuery } from '../../hooks/useModeratorQuery';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Title } = Typography;

interface RejectApplicationModalProps {
    applicationId: number;
    isOpen: boolean;
    onClose: () => void;
}

interface RejectFormData {
    comment: string;
}

const RejectApplicationModal: React.FC<RejectApplicationModalProps> = ({
    applicationId,
    isOpen,
    onClose,
}) => {
    const { mutate: checkApplication, isPending } =
        useModeratorApplicationCheckQuery();
    const [form] = Form.useForm<RejectFormData>();
    const navigate = useNavigate();

    const handleReject = async () => {
        try {
            const values = await form.validateFields();
            checkApplication(
                {
                    id: applicationId,
                    body: { status: -1, comment: values.comment },
                },
                {
                    onSuccess: () => {
                        message.success('Ariza qaytarildi');
                        onClose();
                        navigate('/moderator-applications');
                    },
                }
            );
            onClose();
        } catch (error) {
            // Form validation error
        }
    };

    const handleClose = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="Arizani qaytarish"
            open={isOpen}
            onCancel={handleClose}
            footer={[
                <Button key="cancel" onClick={handleClose}>
                    Bekor qilish
                </Button>,
                <Button
                    key="confirm"
                    type="default"
                    icon={<CloseOutlined />}
                    onClick={handleReject}
                    loading={isPending}
                    danger
                >
                    Qaytarish
                </Button>,
            ]}
            width={500}
            destroyOnHidden
        >
            <div className="space-y-4">
                <div className="mt-6">
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="comment"
                            label={
                                <span className="font-medium text-sm">
                                    Qaytarish sababi
                                </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Qaytarish sababini kiriting',
                                },
                                {
                                    min: 10,
                                    message:
                                        "Sabab kamida 10 ta belgidan iborat bo'lishi kerak",
                                },
                            ]}
                        >
                            <TextArea
                                rows={4}
                                placeholder="Arizani qaytarish sababini batafsil kiriting..."
                                maxLength={500}
                                showCount
                                className="text-base"
                            />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default RejectApplicationModal;
