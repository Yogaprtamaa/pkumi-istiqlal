/**
 * Portal Redirect Page
 * Redirect /portal ke homepage portal berita di (public)
 */

import { redirect } from 'next/navigation';

export default function PortalPage() {
  // Redirect ke homepage portal berita (yang ada di public layout)
  redirect('/');
}
