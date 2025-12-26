/**
 * Footer Component
 * Footer minimal dengan ayat/hadits pendek random
 */

import Link from 'next/link';
import { FOOTER_QUOTES, SITE_CONFIG, MENU_ITEMS } from '@/lib/constants';
import { getRandomItem } from '@/lib/utils';

export function Footer() {
  // Ambil quote random untuk ditampilkan
  const quote = getRandomItem(FOOTER_QUOTES);

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      {/* Quote Section */}
      <div className="bg-islamGreen-pastel/30 py-8">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <blockquote className="text-lg italic text-gray-700">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <cite className="mt-2 block text-sm font-medium text-islamGreen-dark">
            — {quote.source}
          </cite>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link 
              href="/" 
              className="flex items-center gap-2 text-xl font-heading font-bold text-islamGreen"
            >
              <span className="text-2xl">☪</span>
              <span>{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gray-900">
              Menu
            </h3>
            <ul className="mt-4 space-y-2">
              {MENU_ITEMS.filter(item => !item.children).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 transition-colors hover:text-islamGreen"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rubrik */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gray-900">
              Rubrik
            </h3>
            <ul className="mt-4 space-y-2">
              {MENU_ITEMS.find(item => item.label === 'Rubrik')?.children?.map((rubrik) => (
                <li key={rubrik.href}>
                  <Link
                    href={rubrik.href}
                    className="text-sm text-gray-600 transition-colors hover:text-islamGreen"
                  >
                    {rubrik.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. 
            Dibuat dengan ❤️ untuk umat.
          </p>
        </div>
      </div>
    </footer>
  );
}
