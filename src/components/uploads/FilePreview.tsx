import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Spin } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import {
    FileText,
    Image,
    File,
    Presentation,
    Trash2,
    Eye,
    Download,
} from 'lucide-react';

interface IFilePreview {
    file: File | string | null;
    fileName?: string;
    description?: string;
    onDelete?: (file: File | string) => void | null;
    isDownload?: boolean;
}

const FilePreview: React.FC<IFilePreview> = ({
    file,
    onDelete = null,
    fileName,
    description,
    isDownload = false,
}) => {
    const [open, setOpen] = useState(false);
    const [fileURL, setFileURL] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const loadingTimeoutRef = useRef<number | null>(null);

    const file_name = typeof file === 'string' ? file : file?.name || '';
    const format_file: string = file_name.split('.').pop()?.toLowerCase() || '';
    const isBlobFile = typeof file !== 'string';
    // If we have a remote URL (string) and a separate fileName, append it as a query param
    // so downstream viewers/downloads can see the intended filename.
    const previewURL = React.useMemo(() => {
        if (!fileURL) return null;
        if (isBlobFile) return fileURL;
        if (!fileName) return fileURL;
        try {
            const hasFilename = /[?&]filename=/.test(fileURL);
            if (hasFilename) return fileURL;
            const sep = fileURL.includes('?') ? '&' : '?';
            return `${fileURL}${sep}filename=${encodeURIComponent(fileName)}`;
        } catch (e) {
            return fileURL;
        }
    }, [fileURL, isBlobFile, fileName]);

    useEffect(() => {
        if (!file) return;
        if (typeof file === 'string') {
            setFileURL(file);
        } else if (file instanceof Blob) {
            const blobUrl = URL.createObjectURL(file);
            setFileURL(blobUrl);
            return () => {
                URL.revokeObjectURL(blobUrl);
                if (loadingTimeoutRef.current) {
                    clearTimeout(loadingTimeoutRef.current);
                    loadingTimeoutRef.current = null;
                }
            };
        }
    }, [file]);

    const clearLoadingTimeout = () => {
        if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
            loadingTimeoutRef.current = null;
        }
    };

    const handleIframeLoad = () => {
        clearLoadingTimeout();
        setLoading(false);
    };

    const handlePreviewError = () => {
        clearLoadingTimeout();
        setLoading(false);
        setError("Faylni ko'rsatib bo'lmadi. Iltimos, yuklab oling.");
    };

    const getFileIcon = () => {
        const iconProps = { size: 24, className: 'text-blue-600' };

        if (format_file === 'pdf') {
            return <FileText {...iconProps} className="text-red-600" />;
        }
        if (format_file.includes('doc')) {
            return <FileText {...iconProps} className="text-blue-600" />;
        }
        if (format_file.includes('ppt')) {
            return <Presentation {...iconProps} className="text-orange-600" />;
        }
        if (
            ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(format_file)
        ) {
            return <Image {...iconProps} className="text-green-600" />;
        }
        return <File {...iconProps} className="text-gray-600" />;
    };

    return (
        <div className="self-stretch p-4 relative bg-blue-50 dark:bg-dark-card rounded-2xl flex items-center justify-between gap-2 shadow-md">
            <div className="self-stretch inline-flex justify-start items-start gap-3">
                <div className="w-10 h-10 relative flex items-center justify-center bg-white rounded-lg">
                    {getFileIcon()}
                </div>
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                    <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                        <p className="text-secondary-700 text-sm font-medium">
                            {fileName || file_name || 'No file uploaded'}
                        </p>
                        {description && (
                            <p className="text-secondary text-[10px] font-medium">
                                {description}
                            </p>
                        )}

                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <CheckCircleOutlined className="text-green-600" />
                                <span className="text-green-600 text-sm font-medium">
                                    Yuklangan
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    icon={<Eye size={16} />}
                    className="!px-3 !py-2 !rounded-full !bg-white hover:!bg-gray-100"
                    onClick={() => {
                        setOpen(true);
                        setLoading(true);
                        setError(null);
                        // start a timeout to avoid spinner forever
                        if (loadingTimeoutRef.current) {
                            clearTimeout(loadingTimeoutRef.current);
                        }
                        // after 12s show error fallback
                        loadingTimeoutRef.current = window.setTimeout(() => {
                            setLoading(false);
                            setError(
                                "Fayl yuklanishida muammo bo'ldi. Iltimos, yuklab oling."
                            );
                            loadingTimeoutRef.current = null;
                        }, 12000);
                    }}
                />
                {isDownload && (
                    <Button
                        icon={<Download size={16} />}
                        className="!px-3 !py-2 !rounded-full !bg-white hover:!bg-gray-100"
                        href={previewURL || undefined}
                        download={file_name || 'file'}
                        target="_blank"
                    />
                )}
                {onDelete && file && (
                    <Button
                        icon={<Trash2 size={16} />}
                        onClick={() => onDelete(file)}
                        className="!px-3 !py-2 !rounded-full !bg-white hover:!bg-red-50 !text-red-500"
                        danger
                    />
                )}
            </div>

            <Modal
                title="Fayl ko'rish"
                open={open}
                footer={null}
                onCancel={() => {
                    setOpen(false);
                    setLoading(false);
                    setError(null);
                    if (loadingTimeoutRef.current) {
                        clearTimeout(loadingTimeoutRef.current);
                        loadingTimeoutRef.current = null;
                    }
                }}
                width={800}
                style={{ top: 20 }}
            >
                {loading && (
                    <div className="flex justify-center py-8">
                        <Spin size="large" />
                    </div>
                )}

                {error && (
                    <div className="text-center py-4 text-red-600">{error}</div>
                )}

                <div className={loading ? 'hidden' : ''}>
                    {/* Rasm fayllar */}
                    {['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(
                        format_file
                    ) &&
                        fileURL && (
                            <div className="text-center">
                                <img
                                    src={fileURL}
                                    alt={fileName || 'Preview'}
                                    className="max-w-full max-h-[70vh] object-contain mx-auto"
                                    onLoad={handleIframeLoad}
                                />
                            </div>
                        )}

                    {/* PDF fayl */}
                    {format_file === 'pdf' && previewURL && (
                        <iframe
                            src={previewURL}
                            title="PDF Preview"
                            width="100%"
                            height="600px"
                            onLoad={handleIframeLoad}
                            onError={handlePreviewError}
                        />
                    )}

                    {/* Word yoki PowerPoint faqat URL bo'lsa */}
                    {['doc', 'docx', 'ppt', 'pptx'].includes(format_file) &&
                        !isBlobFile &&
                        fileURL && (
                            <iframe
                                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                                    previewURL || ''
                                )}`}
                                width="100%"
                                height="600px"
                                onLoad={handleIframeLoad}
                                onError={handlePreviewError}
                                title="Office Viewer"
                            />
                        )}

                    {/* Local Word/PowerPoint fayllar */}
                    {(format_file.includes('ppt') ||
                        format_file.includes('doc')) &&
                        isBlobFile && (
                            <div className="text-center py-8">
                                <p className="mb-4 text-gray-600">
                                    Brauzer orqali ko'rsatib bo'lmaydi. Yuklab
                                    oling va oching.
                                </p>
                                <Button
                                    type="primary"
                                    icon={<Download size={16} />}
                                    href={fileURL || undefined}
                                    download={file_name || 'file'}
                                >
                                    Yuklab olish
                                </Button>
                            </div>
                        )}

                    {/* Qo'llab-quvvatlanmagan fayl turi */}
                    {![
                        'pdf',
                        'doc',
                        'docx',
                        'ppt',
                        'pptx',
                        'jpg',
                        'jpeg',
                        'png',
                        'gif',
                        'webp',
                        'svg',
                    ].includes(format_file || '') && (
                        <div className="text-center py-8 text-gray-500">
                            <File
                                size={48}
                                className="mx-auto mb-4 text-gray-400"
                            />
                            <p>Bu fayl formatini ko'rsatib bo'lmaydi.</p>
                            {fileURL && (
                                <Button
                                    type="primary"
                                    icon={<Download size={16} />}
                                    className="mt-4"
                                    href={fileURL}
                                    download={file_name || 'file'}
                                >
                                    Yuklab olish
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default FilePreview;
