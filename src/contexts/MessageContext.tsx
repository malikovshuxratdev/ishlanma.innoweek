import React, { createContext, useContext } from 'react';
import type { MessageInstance } from 'antd/es/message/interface';

const MessageContext = createContext<MessageInstance | null>(null);

export const MessageProvider = ({
    value,
    children,
}: {
    value: MessageInstance;
    children: React.ReactNode;
}) => {
    return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
    );
};

export const useAppMessage = (): MessageInstance => {
    const ctx = useContext(MessageContext);

    if (!ctx) {
        // Fallback: provide a no-op implementation to avoid runtime errors
        // when used outside of the provider (shouldn't happen if App is wired).
        return {
            open: () => undefined,
            success: () => undefined,
            error: () => undefined,
            info: () => undefined,
            warning: () => undefined,
            loading: () => undefined,
        } as unknown as MessageInstance;
    }

    return ctx;
};

export default MessageContext;
