import React, { useState, useEffect } from 'react';
import {
    Upload,
    Card,
    Button,
    message,
    Row,
    Col,
    Typography,
    Modal,
    Tag,
    Popconfirm,
} from 'antd';
import {
    DeleteOutlined,
    FileImageOutlined,
    FilePdfOutlined,
    FileWordOutlined,
    FileExcelOutlined,
    EyeOutlined,
    CloudUploadOutlined,
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { useUploadFileMutation } from '../../hooks/useUploadFileMutation';

const { Dragger } = Upload;
const { Text, Title } = Typography;

interface FileUploadProps {
    accept?: string;
    maxSize?: number;
    maxCount?: number;
    value?: UploadFile[];
    onChange?: (fileList: UploadFile[]) => void;
    disabled?: boolean;
    title?: string;
    vertical?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
    accept = '.jpg,.jpeg,.png,.gif,.pdf,.docx,.pptx',
    maxSize = 10,
    maxCount = 10,
    value,
    onChange,
    disabled = false,
    title = 'Upload Files',
    vertical = false,
}) => {
    const { mutate: uploadFile } = useUploadFileMutation();
    const [fileList, setFileList] = useState<UploadFile[]>(value ?? []);
    // Keep internal fileList in sync when parent passes existing files (server-side)
    useEffect(() => {
        if (!value || !Array.isArray(value)) return;

        // Normalize incoming value to a stable shape
        const normalized = value.map((f, idx) => {
            const uid =
                (f as any).uid ?? `server-${(f as any).serverId ?? `v-${idx}`}`;
            const serverId = (f as any).serverId ?? (f as any).id ?? undefined;
            const url = (f as any).url ?? (f as any).file ?? '';
            const name = f.name || String((f as any).name || url || uid);
            const status = (f as any).status ?? 'done';

            const normalizedFile: UploadFile & { serverId?: number } = {
                ...f,
                uid,
                name,
                status,
                url,
            } as UploadFile & { serverId?: number };
            if (serverId) (normalizedFile as any).serverId = Number(serverId);
            return normalizedFile;
        });

        // Only update state if it actually changed to avoid render loops
        const isSame =
            fileList.length === normalized.length &&
            fileList.every((a, i) => {
                const b = normalized[i] as any;
                const aAny = a as any;
                return (
                    a.uid === b.uid &&
                    a.name === b.name &&
                    a.status === b.status &&
                    (a.url || '') === (b.url || '') &&
                    (a.size || 0) === (b.size || 0) &&
                    (aAny.serverId || 0) === (b.serverId || 0)
                );
            });

        if (!isSame) setFileList(normalized);
    }, [value]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewFile, setPreviewFile] = useState<UploadFile | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [lastUploadedUid, setLastUploadedUid] = useState<string>('');

    const getFileIcon = (fileName: string) => {
        const extension = fileName.toLowerCase().split('.').pop();
        const iconSize = window.innerWidth < 640 ? '20px' : '24px';
        const iconProps = { style: { fontSize: iconSize } };

        switch (extension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'webp':
                return (
                    <FileImageOutlined
                        {...iconProps}
                        style={{ ...iconProps.style, color: '#52c41a' }}
                    />
                );
            case 'pdf':
                return (
                    <FilePdfOutlined
                        {...iconProps}
                        style={{ ...iconProps.style, color: '#ff4d4f' }}
                    />
                );
            case 'docx':
            case 'doc':
                return (
                    <FileWordOutlined
                        {...iconProps}
                        style={{ ...iconProps.style, color: '#1890ff' }}
                    />
                );
            case 'pptx':
            case 'ppt':
                return (
                    <FileExcelOutlined
                        {...iconProps}
                        style={{ ...iconProps.style, color: '#fa8c16' }}
                    />
                );
            default:
                return (
                    <FileImageOutlined
                        {...iconProps}
                        style={{ ...iconProps.style, color: '#8c8c8c' }}
                    />
                );
        }
    };

    const formatFileSize = (size: number) => {
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
        return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    };

    const isImageLike = (file: UploadFile) => {
        const nameOrUrl = (file.name || file.url || '').toString();
        const ext = nameOrUrl.split('.').pop()?.toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(
            ext || ''
        );
    };

    const handleRemove = (file: UploadFile) => {
        const newFileList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(newFileList);
        onChange?.(newFileList);
        message.success('File removed successfully');
    };

    const handlePreview = (file: UploadFile) => {
        let url = '';

        if (!file.url && !file.preview && file.originFileObj) {
            url = URL.createObjectURL(file.originFileObj);
            file.preview = url;
        } else {
            url = file.url || file.preview || '';
        }

        if (url) {
            setPreviewFile(file);
            setPreviewUrl(url);
            setPreviewVisible(true);
        } else {
            message.warning('Preview not available for this file');
        }
    };

    const handleClosePreview = () => {
        setPreviewVisible(false);
        setPreviewFile(null);
        setPreviewUrl('');
    };

    const beforeUpload = (file: File) => {
        if (disabled) return false;

        const isAcceptedType = accept
            .split(',')
            .some((type) =>
                file.name.toLowerCase().endsWith(type.replace('.', '').trim())
            );

        if (!isAcceptedType) {
            message.error(`File type not supported. Please upload: ${accept}`);
            return false;
        }

        const isLessThanMaxSize = file.size / 1024 / 1024 < maxSize;
        if (!isLessThanMaxSize) {
            message.error(`File must be smaller than ${maxSize}MB`);
            return false;
        }

        if (fileList.length >= maxCount) {
            message.error(`Cannot upload more than ${maxCount} files`);
            return false;
        }

        // Create a temporary UploadFile entry with 'uploading' status
        const uid = `tmp-${Date.now()}-${Math.random()}`;
        const tempFile: UploadFile = {
            uid,
            name: file.name,
            size: file.size,
            status: 'uploading',
            originFileObj: file,
        } as UploadFile;

        setFileList((prev) => {
            const next = [...prev, tempFile];
            onChange?.(next);
            return next;
        });

        // Prepare form data and call mutation
        const formData = new FormData();
        formData.append('file', file);

        uploadFile(formData, {
            onSuccess: (res: { id: number; file: string }) => {
                // Update the temp file with server response (title/url and id)
                setFileList((prev) => {
                    const next = prev.map((f) => {
                        if (
                            f.uid === uid ||
                            (f.originFileObj && f.originFileObj === file)
                        ) {
                            const updated: UploadFile & { serverId?: number } =
                                {
                                    name: f.name,
                                    status: 'done',
                                    url: res.file || f.url,
                                    size: f.size,
                                    uid: f.uid,
                                    originFileObj: f.originFileObj,
                                } as UploadFile & { serverId?: number };
                            (updated as any).serverId = res.id;
                            return updated;
                        }
                        return f;
                    });
                    onChange?.(next as UploadFile[]);
                    setLastUploadedUid(uid);
                    return next as UploadFile[];
                });

                message.success(`File uploaded successfully`);
            },
            onError: () => {
                setFileList((prev) => {
                    const next = prev.map((f) =>
                        f.uid === uid
                            ? ({ ...f, status: 'error' } as UploadFile)
                            : f
                    );
                    onChange?.(next as UploadFile[]);
                    return next as UploadFile[];
                });
                message.error(`${file.name} upload failed`);
            },
        });

        // Return false to prevent antd from auto uploading (we handle it)
        return false;
    };

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: true,
        fileList,
        beforeUpload,
        // We manage fileList manually in beforeUpload/upload callbacks to prevent duplicates
        onRemove: () => false,
        showUploadList: false,
        accept,
        disabled,
    };

    return (
        <div className="w-full">
            <Dragger
                {...uploadProps}
                className="mb-4 sm:mb-6"
                disabled={disabled}
            >
                <p className="ant-upload-drag-icon">
                    <CloudUploadOutlined
                        style={{
                            fontSize: window.innerWidth < 640 ? '32px' : '48px',
                            color: disabled ? '#8c8c8c' : '#1890ff',
                        }}
                    />
                </p>
                <p className="ant-upload-text text-sm sm:text-base lg:text-lg font-medium px-2">
                    {title}
                </p>
            </Dragger>

            {fileList.length > 0 && (
                <div className="flex flex-col gap-2 mt-2">
                    {vertical ? (
                        <div className="space-y-2 sm:space-y-3">
                            {fileList.map((file) => (
                                <Card
                                    key={file.uid}
                                    size="small"
                                    className={`transition-all duration-300 hover:shadow-md ${
                                        lastUploadedUid === file.uid
                                            ? 'ring-2 ring-blue-400'
                                            : ''
                                    }`}
                                    bodyStyle={{ padding: '8px 12px' }}
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                                            <div className="flex-shrink-0">
                                                {isImageLike(file) &&
                                                (file.url || file.preview) ? (
                                                    <img
                                                        src={
                                                            (file.url ||
                                                                file.preview) as string
                                                        }
                                                        alt={file.name}
                                                        className="w-8 h-8 rounded object-cover"
                                                    />
                                                ) : (
                                                    getFileIcon(file.name)
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <Text
                                                    className="font-medium block text-xs sm:text-sm"
                                                    ellipsis={{
                                                        tooltip: file.name,
                                                    }}
                                                >
                                                    {file.name}
                                                </Text>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <Text
                                                        type="secondary"
                                                        className="text-[10px] sm:text-xs"
                                                    >
                                                        {file.size
                                                            ? formatFileSize(
                                                                  file.size
                                                              )
                                                            : ''}
                                                    </Text>
                                                    {file.status === 'done' && (
                                                        <Tag
                                                            color="green"
                                                            className="m-0 text-[10px] sm:text-xs"
                                                        >
                                                            Yuklandi
                                                        </Tag>
                                                    )}
                                                    {file.status ===
                                                        'error' && (
                                                        <Tag
                                                            color="red"
                                                            className="m-0 text-[10px] sm:text-xs"
                                                        >
                                                            Xato
                                                        </Tag>
                                                    )}
                                                    {file.status ===
                                                        'uploading' && (
                                                        <Tag
                                                            color="blue"
                                                            className="m-0 text-[10px] sm:text-xs"
                                                        >
                                                            Yuklanmoqda...
                                                        </Tag>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                                            <Button
                                                type="text"
                                                size="small"
                                                icon={<EyeOutlined />}
                                                onClick={() =>
                                                    handlePreview(file)
                                                }
                                                title="Preview"
                                                className="text-blue-500 hover:text-blue-700 p-1"
                                            />
                                            <Popconfirm
                                                title="Faylni o'chirish?"
                                                okText="Ha"
                                                cancelText="Yo'q"
                                                onConfirm={() =>
                                                    handleRemove(file)
                                                }
                                            >
                                                <Button
                                                    type="text"
                                                    size="small"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={() =>
                                                        handleRemove(file)
                                                    }
                                                    title="Remove"
                                                    className="p-1"
                                                />
                                            </Popconfirm>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Row gutter={[8, 12]} className="sm:gutter-16">
                            {fileList.map((file) => (
                                <Col
                                    xs={12}
                                    sm={8}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                    key={file.uid}
                                >
                                    <Card
                                        size="small"
                                        className={`h-full transition-all duration-300 hover:shadow-md ${
                                            lastUploadedUid === file.uid
                                                ? 'ring-2 ring-blue-400'
                                                : ''
                                        }`}
                                        bodyStyle={{ padding: '8px' }}
                                        actions={[
                                            <Button
                                                key="preview"
                                                type="text"
                                                icon={<EyeOutlined />}
                                                onClick={() =>
                                                    handlePreview(file)
                                                }
                                                title="Preview"
                                                className="text-blue-500 hover:text-blue-700"
                                                size="small"
                                            />,
                                            <Popconfirm
                                                key="delete"
                                                title="Faylni o'chirish?"
                                                okText="Ha"
                                                cancelText="Yo'q"
                                                onConfirm={() =>
                                                    handleRemove(file)
                                                }
                                            >
                                                <Button
                                                    type="text"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    title="Remove"
                                                    size="small"
                                                />
                                            </Popconfirm>,
                                        ].filter(Boolean)}
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <div className="mb-1 sm:mb-2 w-full">
                                                {isImageLike(file) &&
                                                (file.url || file.preview) ? (
                                                    <img
                                                        src={
                                                            (file.url ||
                                                                file.preview) as string
                                                        }
                                                        alt={file.name}
                                                        className="w-full h-24 sm:h-28 object-cover rounded"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center w-full h-24 sm:h-28 bg-gray-50 rounded">
                                                        {getFileIcon(file.name)}
                                                    </div>
                                                )}
                                            </div>

                                            <Text
                                                className="font-medium block mb-1 text-xs sm:text-sm"
                                                ellipsis={{
                                                    tooltip: file.name,
                                                }}
                                                style={{ width: '100%' }}
                                            >
                                                {file.name}
                                            </Text>

                                            <div className="flex items-center gap-2">
                                                <Text
                                                    type="secondary"
                                                    className="text-xs"
                                                >
                                                    {file.size
                                                        ? formatFileSize(
                                                              file.size
                                                          )
                                                        : ''}
                                                </Text>
                                                {file.status === 'done' && (
                                                    <Tag
                                                        color="green"
                                                        className="m-0 text-[10px] sm:text-xs"
                                                    >
                                                        Yuklandi
                                                    </Tag>
                                                )}
                                                {file.status === 'error' && (
                                                    <Tag
                                                        color="red"
                                                        className="m-0 text-[10px] sm:text-xs"
                                                    >
                                                        Xato
                                                    </Tag>
                                                )}
                                                {file.status ===
                                                    'uploading' && (
                                                    <Tag
                                                        color="blue"
                                                        className="m-0 text-[10px] sm:text-xs"
                                                    >
                                                        Yuklanmoqda...
                                                    </Tag>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>
            )}

            <Modal
                title={
                    <div className="flex items-center space-x-2 text-sm sm:text-base">
                        <EyeOutlined className="text-blue-500" />
                        <span>File Preview</span>
                        {previewFile && (
                            <span className="text-gray-500 text-xs sm:text-sm font-normal truncate max-w-xs">
                                - {previewFile.name}
                            </span>
                        )}
                    </div>
                }
                open={previewVisible}
                onCancel={handleClosePreview}
                footer={[
                    <Button
                        key="close"
                        onClick={handleClosePreview}
                        size="small"
                        className="sm:size-default"
                    >
                        Close
                    </Button>,
                ]}
                width="95%"
                style={{
                    top: window.innerWidth < 640 ? 10 : 20,
                    maxWidth: window.innerWidth < 640 ? '100vw' : '90vw',
                }}
                bodyStyle={{
                    padding: 0,
                    height: window.innerWidth < 640 ? '60vh' : '70vh',
                    maxHeight: '80vh',
                }}
                destroyOnClose
                centered={window.innerWidth < 640}
            >
                {previewUrl &&
                    (() => {
                        const name = previewFile?.name || previewUrl;
                        const ext = (name || '')
                            .toString()
                            .split('.')
                            .pop()
                            ?.toLowerCase();
                        const imageExts = [
                            'jpg',
                            'jpeg',
                            'png',
                            'gif',
                            'webp',
                            'bmp',
                            'svg',
                        ];

                        if (ext && imageExts.includes(ext)) {
                            // For images: show at natural/intrinsic size. The wrapper is scrollable
                            // so large images won't overflow the modal.
                            return (
                                <div
                                    style={{
                                        overflow: 'auto',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 12,
                                    }}
                                >
                                    <img
                                        src={previewUrl}
                                        alt={previewFile?.name || 'preview'}
                                        style={{
                                            display: 'block',
                                            width: 'auto',
                                            height: 'auto',
                                            borderRadius: 6,
                                        }}
                                    />
                                </div>
                            );
                        }

                        // For non-images (PDFs etc) use iframe and offer an "Open original" link
                        return (
                            <div
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <div style={{ flex: 1, overflow: 'auto' }}>
                                    <iframe
                                        src={previewUrl}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            border: 'none',
                                            borderRadius: '0 0 6px 6px',
                                        }}
                                        title={`Preview of ${
                                            previewFile?.name || 'file'
                                        }`}
                                    />
                                </div>
                                <div style={{ padding: 8, textAlign: 'right' }}>
                                    <a
                                        href={previewUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600"
                                    >
                                        Open original
                                    </a>
                                </div>
                            </div>
                        );
                    })()}
            </Modal>
        </div>
    );
};

export default FileUpload;
