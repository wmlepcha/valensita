import { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import Header from './Header';
import Footer from './Footer';
import Marquee from '../Components/Marquee';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function MainLayout({ children, title = 'VALENSITA' }: MainLayoutProps) {

  return (
    <>
      <Head title={title} />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-100 to-neutral-200">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Marquee />
        <Footer />
      </div>
    </>
  );
}

