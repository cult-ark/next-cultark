'use client';

import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/lib/query-client';

export default function QueryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const originalConsoleError = console.error;

        console.error = (...args: unknown[]) => {
            const message = args
                .map((arg) => (typeof arg === 'string' ? arg : ''))
                .join(' ');

            if (
                message.includes(
                    "A tree hydrated but some attributes of the server rendered HTML didn't match"
                ) && message.includes('bis_skin_checked')
            ) {
                return;
            }

            originalConsoleError(...args);
        };

        return () => {
            console.error = originalConsoleError;
        };
    }, []);

    // NOTE: Avoid useState when initializing the query client if you don't
    // have a suspense boundary between this and the code that may suspend
    // because React will throw away the client on the initial render if it suspends
    // and there is no boundary
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools
                    initialIsOpen={false}
                    buttonPosition="bottom-left"
                />
            )}
        </QueryClientProvider>
    );
}
