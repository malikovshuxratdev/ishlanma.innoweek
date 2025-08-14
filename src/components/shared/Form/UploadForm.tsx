import React from 'react';
import Dragger from 'antd/es/upload/Dragger';
import { Tooltip, UploadProps, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';
import { Rule } from 'antd/es/form';

interface IProps {
    label: string;
    multiple: boolean;
    rules?: Rule[];
    value?: RcFile | RcFile[] | string | null;
    onchange?: (fileList: RcFile[]) => void;
    children?: React.ReactNode;
    desc?: string;
    accept?: string;
    required?: boolean;
    beforeUpload?: (file: File) => boolean | string;
}

const UploadForm: React.FC<IProps> = ({
    label = 'Fayl yuklang',
    multiple = false,
    onchange,
    value = null,
    children,
    desc = ' ',
    accept = '.pdf, .doc, .docx, .txt, .jpg, .jpeg, .png, .gif',
    required = false,
    beforeUpload = () => false,
}) => {
    const props: UploadProps = {
        name: 'file',
        multiple: multiple,
        beforeUpload: beforeUpload,
        onChange(info) {
            const { fileList } = info;
            if (onchange) {
                const files = fileList
                    .map((uploadFile) => uploadFile.originFileObj)
                    .filter((file): file is RcFile => !!file);
                onchange(files);
            }
        },
        itemRender: () => null,
        accept: accept,
    };

    return (
        <div className="self-stretch w-full p-3.5 bg-white/50 min-h-[150px] h-full dark:bg-dark-card rounded-[20px] outline outline-offset-[-1px] outline-white/70 inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch">
                <div className="flex justify-start items-center gap-1.5">
                    <Tooltip title={label}>
                        <p className="justify-start line-clamp-2">
                            <span className="text-Text-Main text-base font-normal font-['Roboto'] leading-snug ">
                                {label}
                            </span>
                            {required && (
                                <span className="text-red-500">*</span>
                            )}
                        </p>
                    </Tooltip>
                </div>
                <p className="self-stretch text-tertiary text-xs font-normal font-['Inter'] leading-none">
                    {desc}
                </p>
            </div>
            {multiple && (
                <Dragger
                    className="self-stretch px-6 py-4 !bg-white dark:bg-dark-card rounded-xl"
                    {...props}
                    fileList={
                        Array.isArray(value)
                            ? value.map(
                                  (file) =>
                                      ({
                                          ...file,
                                          uid: file.name,
                                      } as UploadFile)
                              )
                            : value && typeof value === 'object'
                            ? [{ ...value, uid: value.name } as UploadFile]
                            : []
                    }
                >
                    <p className="ant-upload-drag-icon">
                        <div
                            data-color="Gray"
                            data-gradient-mask="true"
                            data-size="md"
                            data-type="Modern neue"
                            className="w-10 h-10 relative bg-white p-1 rounded-[10px] outline outline-offset-[-1px] outline-border-secondary mx-auto flex items-center justify-center"
                        >
                            <UploadOutlined style={{ fontSize: 24 }} />
                        </div>
                    </p>
                    <div className="self-stretch inline-flex justify-center items-start gap-1">
                        <div
                            data-hierarchy="Link color"
                            data-icon-only="False"
                            data-loading-text="true"
                            data-size="md"
                            data-state="Default"
                            className="flex justify-center items-center gap-1 overflow-hidden"
                        >
                            <div className="justify-start text-brand-secondary text-sm font-semibold font-['Inter'] leading-tight">
                                Yuklash uchun bosing
                            </div>
                        </div>
                        <p className="justify-start text-tertiary text-sm font-normal font-['Inter'] leading-tight">
                            yoki faylni surib olib keling
                        </p>
                    </div>
                    <p className="self-stretch text-center justify-start text-tertiary text-xs font-normal font-['Inter'] leading-none">
                        {desc}
                    </p>
                </Dragger>
            )}
            {children}
        </div>
    );
};

export default UploadForm;
