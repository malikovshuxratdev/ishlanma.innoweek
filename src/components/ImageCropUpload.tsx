import React, { useCallback, useState } from 'react';
import { Modal, Upload, Space, Slider, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Cropper from 'react-easy-crop';
import FilePreview from './uploads/FilePreview';

interface ImageCropUploadProps {
    value?: { url: string; file: File }[];
    onChange?: (files: { url: string; file: File }[]) => void;
    maxCount?: number;
    label?: string;
}

// Helper to create a cropped image blob
// Only using pixelCrop currently; others kept for potential future enhancements
async function getCroppedImg(
    imageSrc: string,
    _crop: { x: number; y: number },
    _zoom: number,
    _aspect: number,
    pixelCrop: any
): Promise<Blob> {
    const image: HTMLImageElement = await new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
    });

    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported');

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (!blob) return; // Should not happen
            resolve(blob);
        }, 'image/png');
    });
}

const ImageCropUpload: React.FC<ImageCropUploadProps> = ({
    value = [],
    onChange,
    maxCount = 5,
}) => {
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const triggerChange = (files: { url: string; file: File }[]) => {
        onChange?.(files);
    };

    const beforeUpload = (file: File) => {
        const isAllowed = ['image/png', 'image/jpeg'].includes(file.type);
        if (!isAllowed) {
            message.error('Faqat PNG yoki JPEG');
            return Upload.LIST_IGNORE;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('5MB dan kichik rasm yuklang');
            return Upload.LIST_IGNORE;
        }

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setImageSrc(reader.result as string);
            setCropModalOpen(true);
        });
        reader.readAsDataURL(file);

        // prevent automatic addition; will add after crop
        return false;
    };

    const onCropComplete = useCallback(
        (_croppedArea: any, croppedPixels: any) => {
            setCroppedAreaPixels(croppedPixels);
        },
        []
    );

    const handleCropOk = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        try {
            const blob = await getCroppedImg(
                imageSrc,
                crop,
                zoom,
                1,
                croppedAreaPixels
            );
            const fileName = `cropped-${Date.now()}.png`;
            const croppedFile = new File([blob], fileName, {
                type: 'image/png',
            });
            const newItem = {
                url: URL.createObjectURL(croppedFile),
                file: croppedFile,
            };
            const next = [...value, newItem].slice(0, maxCount);
            triggerChange(next);
        } catch (e) {
            message.error('Kesishda xatolik');
        } finally {
            setCropModalOpen(false);
            setImageSrc(null);
            setZoom(1);
        }
    };

    const remove = (index: number) => {
        const next = value.filter((_, i) => i !== index);
        triggerChange(next);
    };

    return (
        <div className="space-y-3">
            <Upload
                listType="picture-card"
                fileList={[]}
                beforeUpload={beforeUpload}
                showUploadList={false}
                accept="image/png,image/jpeg"
            >
                {value.length >= maxCount ? null : (
                    <div className="flex flex-col items-center justify-center gap-1 p-2">
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Rasm qo'shish</div>
                    </div>
                )}
            </Upload>

            {value.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {value.map((item, idx) => (
                        <FilePreview
                            key={item.url || idx}
                            file={item.file}
                            fileName={`Rasm ${idx + 1}`}
                            onDelete={() => remove(idx)}
                        />
                    ))}
                </div>
            )}
            <Modal
                title="Rasmni kesish"
                open={cropModalOpen}
                onOk={handleCropOk}
                onCancel={() => {
                    setCropModalOpen(false);
                    setImageSrc(null);
                }}
                okText="Saqlash"
                cancelText="Bekor qilish"
                width={520}
            >
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: 320,
                        background: '#333',
                    }}
                >
                    {imageSrc && (
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    )}
                </div>
                <Space
                    direction="vertical"
                    style={{ width: '100%', marginTop: 16 }}
                >
                    <Slider
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={setZoom}
                    />
                </Space>
            </Modal>
        </div>
    );
};

export default ImageCropUpload;
