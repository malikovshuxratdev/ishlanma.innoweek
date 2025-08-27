import React from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useModeratorApplicationCheckQuery } from '../../hooks/useModeratorQuery';
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;

interface SendForEditApplicationModalProps {
    applicationId: number;
    isOpen: boolean;
    onClose: () => void;
}

interface EditFormData {
    comment: string;
}

const SendForEditApplicationModal: React.FC<
    SendForEditApplicationModalProps
> = ({ applicationId, isOpen, onClose }) => {
    const { mutate: checkApplication, isPending } =
        useModeratorApplicationCheckQuery();
    const [form] = Form.useForm<EditFormData>();
    const navigate = useNavigate();
    const handleSendForEdit = async () => {
        try {
            const values = await form.validateFields();
            checkApplication(
                {
                    id: applicationId,
                    body: { status: -2, comment: values.comment }, // RE_EDIT status
                },
                {
                    onSuccess: () => {
                        message.success('Ariza tahrirlandi');
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
            title="Tahrirlashga yuborish"
            open={isOpen}
            onCancel={handleClose}
            footer={[
                <Button key="cancel" onClick={handleClose}>
                    Bekor qilish
                </Button>,
                <Button
                    key="confirm"
                    type="default"
                    icon={<EditOutlined />}
                    onClick={handleSendForEdit}
                    loading={isPending}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                    Tahrirlashga yuborish
                </Button>,
            ]}
            width={500}
            destroyOnClose
        >
            <div className="space-y-4">
                <div className="mt-6">
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="comment"
                            label={
                                <span className="font-medium text-orange-600">
                                    Tahrirlash sababi *
                                </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Tahrirlash sababini kiriting',
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
                                placeholder="Arizani tahrirlashga yuborish sababini batafsil kiriting..."
                                maxLength={500}
                                showCount
                                className="border-orange-200 focus:border-orange-500"
                            />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default SendForEditApplicationModal;
