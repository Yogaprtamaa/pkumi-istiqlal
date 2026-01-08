/**
 * Layout Compro
 * Layout khusus untuk halaman-halaman Compro (website institusi)
 * Menggunakan NavbarCompro dan FooterCompro
 */

import { NavbarCompro } from '@/components/compro/NavbarCompro';
import { FooterCompro } from '@/components/compro/FooterCompro';

export default function ComproLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarCompro />
      <main className="min-h-screen">
        {children}
      </main>
      <FooterCompro />
    </>
  );
}
