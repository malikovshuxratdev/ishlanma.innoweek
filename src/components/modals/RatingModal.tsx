import React, { useState } from 'react';
import { Modal, Rate, Input, Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface RatingModalProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (rating: number, comment: string) => void;
    application: any;
}

const RatingModal: React.FC<RatingModalProps> = ({
    visible,
    onCancel,
    onSubmit,
    application,
}) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        if (rating === 0) return;
        onSubmit(rating, comment);
        setRating(0);
        setComment('');
    };

    return (
        <Modal
            title="Rate Application"
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleSubmit}
                    disabled={rating === 0}
                >
                    Submit Rating
                </Button>,
            ]}
        >
            {application && (
                <div className="py-4">
                    <Title level={5}>{application.title}</Title>
                    <Paragraph className="text-gray-600 mb-4">
                        {application.description}
                    </Paragraph>
                    <div className="mb-4">
                        <div className="mb-2 font-medium">Your Rating:</div>
                        <Rate value={rating} onChange={setRating} />
                    </div>
                    <div>
                        <div className="mb-2 font-medium">
                            Comments (Optional):
                        </div>
                        <TextArea
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your thoughts about this application..."
                        />
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default RatingModal;
