import React, { useEffect, useState } from 'react';
import pdf_icon from '../../assets/icons/pdf_icons.png';
import doc_icon from '../../assets/icons/doc_icon.png';
import img_icon from '../../assets/icons/img_icon.png';
import ppt_icon from '../../assets/icons/ppt.png';
import { BiTrash } from 'react-icons/bi';
import { CheckCircleOutlined } from '@ant-design/icons';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Button, Modal, Spin } from 'antd';
import { HiDownload } from 'react-icons/hi';

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

    const file_name = typeof file === 'string' ? file : file?.name || '';
    const format_file: string = file_name.split('.').pop()?.toLowerCase() || '';
    const isBlobFile = typeof file !== 'string';

    useEffect(() => {
        if (!file) return;
        if (typeof file === 'string') {
            setFileURL(file);
        } else if (file instanceof Blob) {
            const blobUrl = URL.createObjectURL(file);
            setFileURL(blobUrl);
            return () => URL.revokeObjectURL(blobUrl);
        }
    }, [file]);

    const handleIframeLoad = () => setLoading(false);

    const icon =
        format_file == 'pdf'
            ? pdf_icon
            : format_file.includes('doc')
            ? doc_icon
            : format_file.includes('ppt')
            ? ppt_icon
            : img_icon;

    return (
        <div className="self-stretch p-4 relative bg-blue-50 dark:bg-dark-card rounded-2xl flex items-center justify-between gap-2 shadow-md">
            <div className="self-stretch inline-flex justify-start items-start gap-3">
                <div className="w-10 h-10 relative">
                    <img src={icon} alt="PDF Icon" />
                </div>
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                    <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                        <p className="text-secondary-700 text-sm font-medium">
                            {fileName || 'No file uploaded'}
                        </p>
                        {description && (
                            <p className="text-secondary text-[10px] font-medium">
                                {description}
                            </p>
                        )}

                        <div className="flex items-center gap-2">
                            {/* <PElement className="text-secondary text-sm">200 KB</PElement> */}
                            {/* <div className="h-3 border-l border-gray-300" /> */}
                            <div className="flex items-center gap-1">
                                <CheckCircleOutlined
                                    className="text-success-600 dark:text-white"
                                    color="#414651"
                                />
                                <span className="text-success-600 text-sm font-medium">
                                    Yuklangan
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    icon={
                        <MdOutlineRemoveRedEye className="text-lg text-gray-500" />
                    }
                    className="!px-3 !py-2 !rounded-full !bg-white hover:!bg-gray-100"
                    onClick={() => {
                        setOpen(true);
                    }}
                />
                {isDownload && (
                    <Button
                        icon={<HiDownload className="text-lg text-gray-500" />}
                        className="!px-3 !py-2 !rounded-full !bg-white hover:!bg-gray-100"
                        href={fileURL || undefined}
                        download={isDownload}
                        target="_blank"
                    />
                )}
                {onDelete && file && (
                    <Button
                        icon={<BiTrash className="text-lg text-red-500" />}
                        onClick={() => onDelete(file)}
                        className="w-6 h-6 !rounded-full bg-white hover:bg-gray-100"
                    />
                )}
            </div>

            <Modal
                title="File Preview"
                open={open}
                footer={null}
                onCancel={() => setOpen(false)}
                width={800}
            >
                <Spin spinning={loading} />
                {/* Rasm fayllar */}
                {['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(
                    format_file
                ) &&
                    fileURL && (
                        <div className="text-center">
                            <img
                                src={fileURL}
                                alt={fileName || 'Preview'}
                                className="max-w-full max-h-[80vh] object-contain mx-auto"
                                onLoad={handleIframeLoad}
                            />
                        </div>
                    )}

                {/* PDF fayl */}
                {format_file === 'pdf' && fileURL && (
                    <embed
                        src={fileURL}
                        type="application/pdf"
                        width="100%"
                        className="h-[80vh]"
                        onLoad={handleIframeLoad}
                    />
                )}

                {/* Word yoki PowerPoint faqat URL bo'lsa */}
                {['doc', 'docx', 'ppt', 'pptx'].includes(format_file) &&
                    !isBlobFile && (
                        <iframe
                            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                                fileURL || ''
                            )}`}
                            width="100%"
                            className="h-[80vh]"
                            onLoad={handleIframeLoad}
                            title="Office Viewer"
                        />
                    )}

                {(format_file.includes('ppt') || format_file.includes('doc')) &&
                    isBlobFile && (
                        <div className="text-center">
                            <p className="mb-4">
                                Brauzer orqali ko'rsatib bo'lmaydi. Yuklab oling
                                va oching.
                            </p>
                            <Button
                                href={fileURL || undefined}
                                download={file_name || 'file'}
                                type="primary"
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
                    <div className="text-center text-gray-500">
                        Bu fayl formatini ko'rsatib bo'lmaydi.
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default FilePreview;
