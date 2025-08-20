import React, { useEffect } from 'react';
import Dragger from 'antd/es/upload/Dragger';
import { Tooltip, UploadProps, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';
import { Rule } from 'antd/es/form';
import { useUploadFileMutation } from '../../hooks/useUploadFileMutation';
import FilePreview from '../uploads/FilePreview';

interface IProps {
    label: string;
    multiple: boolean;
    rules?: Rule[];
    value?: RcFile | RcFile[] | string | string[] | null;
    onchange?: (fileList: { id: number; file: string }[]) => void;
    onChange?: (fileList: string[]) => void;
    children?: React.ReactNode;
    accept?: string;
    required?: boolean;
    maxFiles?: number;
    maxFile?: number;
}

interface FileItem {
    id?: number;
    uid: string;
    url: string;
    name: string;
    type: string;
    isUploading?: boolean;
}

const UploadForm: React.FC<IProps> = ({
    label = 'Fayl yuklang',
    multiple = false,
    onchange,
    onChange,
    value = null,
    children,
    accept = '.pdf,.jpg,.jpeg,.png',
    required = false,
    maxFiles,
    maxFile,
}) => {
    const { mutateAsync: uploadFileAsync } = useUploadFileMutation();
    const [fileList, setFileList] = React.useState<FileItem[]>([]);

    const resolvedMax =
        typeof maxFiles === 'number'
            ? maxFiles
            : typeof maxFile === 'number'
            ? maxFile
            : undefined;
    const computedMaxCount =
        typeof resolvedMax === 'number'
            ? resolvedMax
            : multiple
            ? undefined
            : 1;

    const valueToFileItems = (val: IProps['value']): FileItem[] => {
        if (!val) return [];

        const items = Array.isArray(val) ? val : [val];
        return items.map((item, index) => {
            if (typeof item === 'string') {
                return {
                    uid: `${index}-${item}`,
                    url: item,
                    name: item.split('/').pop() || `File ${index + 1}`,
                    type: item.split('.').pop()?.toLowerCase() || '',
                };
            } else {
                return {
                    uid: `${item.name}-${index}-${Date.now()}`,
                    url: URL.createObjectURL(item),
                    name: item.name,
                    type: item.name.split('.').pop()?.toLowerCase() || '',
                    isUploading: true,
                };
            }
        });
    };

    useEffect(() => {
        const items = valueToFileItems(value);
        setFileList(items);
    }, [value]);

    const notifyParent = React.useCallback(
        (items: FileItem[]) => {
            const completedFiles = items.filter((item) => !item.isUploading);
            const urls = completedFiles.map((item) => item.url);
            const fileObjects = completedFiles.map((item) => ({
                id: item.id || 0,
                file: item.url,
            }));

            onChange?.(urls);
            onchange?.(fileObjects);
        },
        [onChange, onchange]
    );

    const handleUpload = async (file: RcFile) => {
        // Check file limit
        if (computedMaxCount && fileList.length >= computedMaxCount) {
            message.error(
                `Maksimal ${computedMaxCount} ta fayl yuklash mumkin`
            );
            return false;
        }

        const fileType = file.name.split('.').pop()?.toLowerCase() || '';
        const tempUid = `${file.name}-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}`;

        const tempItem: FileItem = {
            uid: tempUid,
            url: file.name,
            name: file.name,
            type: fileType,
            isUploading: true,
        };

        setFileList((prev) => {
            const newList = [...prev, tempItem];
            return newList;
        });

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = (await uploadFileAsync(formData)) as {
                id: number;
                file: string;
            };

            setFileList((prev) => {
                const updatedList = prev.map((item) =>
                    item.uid === tempUid && item.isUploading
                        ? {
                              ...item,
                              id: response.id,
                              url: response.file,
                              isUploading: false,
                          }
                        : item
                );

                notifyParent(updatedList);
                return updatedList;
            });

            message.success(`${file.name} muvaffaqiyatli yuklandi`);
        } catch (error) {
            setFileList((prev) => {
                const filteredList = prev.filter(
                    (item) => !(item.name === file.name && item.isUploading)
                );
                notifyParent(filteredList);
                return filteredList;
            });
            message.error(`${file.name} yuklanmadi: ${error}`);
        }

        return false;
    };

    const handleDelete = (itemToDelete: FileItem) => {
        setFileList((prev) => {
            const filteredList = prev.filter((item) => item !== itemToDelete);
            notifyParent(filteredList);
            return filteredList;
        });
        message.success("Fayl o'chirildi");
    };

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: multiple && (!computedMaxCount || computedMaxCount > 1),
        accept,
        beforeUpload: handleUpload,
        showUploadList: false,
        disabled: computedMaxCount
            ? fileList.length >= computedMaxCount
            : false,
    };

    return (
        <div className="self-stretch w-full min-h-[150px] h-full bg-white dark:bg-dark-card rounded-2xl ring-1 ring-slate-200/70 p-4 inline-flex flex-col justify-start items-stretch gap-3">
            <div className="self-stretch">
                <div className="flex justify-start items-center gap-1.5">
                    <Tooltip title={label}>
                        <p className="justify-start line-clamp-2">
                            <span className="text-secondary-700 text-sm font-medium leading-snug">
                                {label}
                            </span>
                            {required && (
                                <span className="text-red-500 ml-1">*</span>
                            )}
                        </p>
                    </Tooltip>
                </div>
            </div>

            <Dragger
                className={`self-stretch !bg-white dark:!bg-dark-card rounded-xl border border-dashed border-slate-300 hover:border-indigo-400 transition ${
                    computedMaxCount && fileList.length >= computedMaxCount
                        ? 'opacity-50'
                        : ''
                }`}
                {...uploadProps}
            >
                <div className="py-6">
                    <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 relative bg-white p-1 rounded-xl ring-1 ring-slate-200/70 mx-auto inline-flex items-center justify-center">
                            <UploadOutlined style={{ fontSize: 20 }} />
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                        {computedMaxCount && fileList.length >= computedMaxCount
                            ? `${computedMaxCount} ta fayl yuklandi`
                            : 'Faylni bu yerga tashlang yoki tanlang'}
                    </p>
                </div>
            </Dragger>

            {fileList.length > 0 && (
                <div className="w-full grid grid-cols-1 gap-2 mt-3">
                    {fileList.map((item, idx) => (
                        <FilePreview
                            key={`${item.name}-${idx}-${item.url}`}
                            file={item.url}
                            fileName={item.name}
                            description={
                                item.isUploading
                                    ? 'Yuklanmoqda...'
                                    : 'Yuklangan'
                            }
                            onDelete={() => handleDelete(item)}
                            isDownload={!item.isUploading}
                        />
                    ))}
                </div>
            )}

            {children}
        </div>
    );
};

export default UploadForm;
