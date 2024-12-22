import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'About'
};

interface ClientLayoutProps {
    children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    return children;
}
