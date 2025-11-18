import { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function MainLayout({ children, title = 'VALENSITA' }: MainLayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

