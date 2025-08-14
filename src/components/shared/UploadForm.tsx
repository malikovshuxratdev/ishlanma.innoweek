import React from 'react';
import Dragger from 'antd/es/upload/Dragger';
import { Tooltip, UploadProps, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';
import { Rule } from 'antd/es/form';
import FilePreview from '../uploads/FilePreview';

interface IProps {
    label: string;
    multiple: boolean;
    rules?: Rule[];
    value?: RcFile | RcFile[] | string | null;
    onchange?: (fileList: RcFile[]) => void;
    children?: React.ReactNode;
    accept?: string;
    required?: boolean;
    beforeUpload?: (file: File) => boolean | string;
    maxFiles?: number;
    maxFile?: number;
}

const UploadForm: React.FC<IProps> = ({
    label = 'Fayl yuklang',
    multiple = false,
    onchange,
    value = null,
    children,
    accept = '.pdf, .jpg, .jpeg, .png,',
    required = false,
    beforeUpload = () => false,
    maxFiles,
    maxFile,
}) => {
    // Determine effective settings based on maxFiles and legacy `multiple` prop
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
    const allowMultiple =
        typeof resolvedMax === 'number' ? resolvedMax > 1 : !!multiple;

    // Keep an internal aggregated list to ensure multiple previews render reliably
    const toItems = (val: IProps['value']): (RcFile | string)[] => {
        const base: (RcFile | string)[] = Array.isArray(val)
            ? (val as (RcFile | string)[])
            : val
            ? ([val] as (RcFile | string)[])
            : [];
        if (
            typeof computedMaxCount === 'number' &&
            computedMaxCount > 0 &&
            base.length > computedMaxCount
        ) {
            return base.slice(0, computedMaxCount);
        }
        return base;
    };

    const [internalItems, setInternalItems] = React.useState<
        (RcFile | string)[]
    >(() => toItems(value));

    // Sync when external value changes
    React.useEffect(() => {
        setInternalItems(toItems(value));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, computedMaxCount]);

    const props: UploadProps = {
        name: 'file',
        multiple: allowMultiple,
        maxCount: computedMaxCount,
        beforeUpload: beforeUpload,
        onChange(info) {
            const { fileList } = info;
            // New RcFiles from this change (could be one or many)
            let incoming = fileList
                .map((uploadFile) => uploadFile.originFileObj)
                .filter((file): file is RcFile => !!file);

            // Build merged list using previous internal items to avoid losing earlier picks
            setInternalItems((prev) => {
                const existingStrings = prev.filter(
                    (x): x is string => typeof x === 'string'
                );
                const prevRc = prev.filter(
                    (x): x is RcFile => typeof x !== 'string'
                );

                // Merge prev RcFiles with incoming, dedupe by name+lastModified+size
                const seen = new Set<string>();
                const key = (f: RcFile) =>
                    `${f.name}|${f.lastModified}|${f.size}`;
                const mergedRc: RcFile[] = [];
                for (const f of [...prevRc, ...incoming]) {
                    const k = key(f);
                    if (!seen.has(k)) {
                        seen.add(k);
                        mergedRc.push(f);
                    }
                }

                // Enforce max count if provided
                let limitedRc = mergedRc;
                if (
                    typeof computedMaxCount === 'number' &&
                    computedMaxCount > 0
                ) {
                    limitedRc = mergedRc.slice(0, computedMaxCount);
                }

                const next: (RcFile | string)[] = [
                    ...existingStrings,
                    ...limitedRc,
                ];

                // Notify parent with the full RcFile list (not including string items)
                onchange?.(limitedRc);
                return next;
            });
        },
        showUploadList: false,
        itemRender: () => null,
        accept: accept,
    };

    const renderPreviews = () => {
        const items = internalItems;
        if (!items.length) return null;

        return (
            <div className="w-full grid grid-cols-1 gap-2">
                {items.map((file, idx) => (
                    <FilePreview
                        key={typeof file === 'string' ? file : file.name + idx}
                        file={file as any}
                        fileName={
                            typeof file === 'string' ? undefined : file.name
                        }
                        onDelete={() => {
                            const next = internalItems.filter(
                                (_, i) => i !== idx
                            );
                            setInternalItems(next);
                            onchange?.(
                                next.filter(
                                    (f): f is RcFile => typeof f !== 'string'
                                )
                            );
                        }}
                    />
                ))}
            </div>
        );
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
                                <span className="text-red-500">*</span>
                            )}
                        </p>
                    </Tooltip>
                </div>
            </div>
            <Dragger
                className="self-stretch !bg-white dark:!bg-dark-card rounded-xl border border-dashed border-slate-300 hover:border-indigo-400 transition"
                {...props}
                disabled={
                    typeof computedMaxCount === 'number' && computedMaxCount > 0
                        ? internalItems.length >= computedMaxCount
                        : false
                }
                fileList={internalItems
                    .filter((f): f is RcFile => typeof f !== 'string')
                    .map(
                        (file) =>
                            ({
                                ...file,
                                uid: file.name,
                            } as UploadFile)
                    )}
            >
                <p className="ant-upload-drag-icon">
                    <span className="w-10 h-10 relative bg-white p-1 rounded-xl ring-1 ring-slate-200/70 mx-auto inline-flex items-center justify-center">
                        <UploadOutlined style={{ fontSize: 24 }} />
                    </span>
                </p>
            </Dragger>
            {renderPreviews()}
            {children}
        </div>
    );
};

export default UploadForm;
