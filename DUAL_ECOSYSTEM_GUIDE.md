# 🔄 DUAL ECOSYSTEM INTEGRATION GUIDE

## 📊 Arsitektur Sistem

PKUMI sekarang memiliki **2 platform terintegrasi** dalam satu repository:

```
┌─────────────────────────────────────────────────┐
│                   PKUMI.AC.ID                   │
│                 (Landing Page)                  │
└──────────────┬──────────────────┬───────────────┘
               │                  │
       ┌───────▼───────┐   ┌─────▼──────┐
       │   COMPRO      │   │   PORTAL   │
       │  (Institusi)  │   │  (Berita)  │
       └───────────────┘   └────────────┘
```

---

## 🎯 Platform Overview

### 1. **COMPRO** (Company Profile / Website Institusi)
**Route:** `/home`

**Tujuan:** Website institusi resmi PKUMI dengan informasi akademik, profil, dan galeri.

**Halaman:**
- `/home` - Beranda Compro
- `/profil` - Profil PKUMI (Tentang, Struktur, Dosen)
- `/akademik` - Hub Akademik (7 sub-halaman)
- `/galeri` - Galeri Foto & Video
- `/pendaftaran` - Info Pendaftaran + Link PMB
- `/kontak` - Kontak & Maps

**Karakteristik:**
- ✅ Public access (semua pengunjung)
- ✅ Fokus informasi institusi
- ✅ Desain formal & profesional
- ✅ Integrasi dengan PMB Portal: https://pmb.pkumionline.cloud/

---

### 2. **PORTAL BERITA** (Platform Artikel & Konten)
**Route:** `/portal`

**Tujuan:** Platform untuk publikasi artikel Khazanah dan Rubrik dari mahasiswa/dosen.

**Halaman:**
- `/portal` - Homepage Portal (Trending, Popular)
- `/khazanah` - List Artikel Khazanah
- `/khazanah/[slug]` - Detail Artikel Khazanah
- `/rubrik` - List Artikel Rubrik
- `/rubrik/[slug]` - Detail Artikel Rubrik
- `/penulis/[slug]` - Profil Penulis
- `/submit/khazanah` - Submit Artikel Khazanah
- `/submit/rubrik` - Submit Artikel Rubrik
- `/login` - Login untuk kontributor
- `/register` - Registrasi akun baru

**Karakteristik:**
- ✅ Memerlukan login untuk submit konten
- ✅ Fokus pada artikel & opini
- ✅ Desain modern & engaging
- ✅ Fitur trending, popular, filter kategori

---

## 🚀 Struktur Routing

```
src/app/
├── page.tsx                    → Landing page (pilih Compro/Portal)
├── layout.tsx                  → Root layout
│
├── (public)/                   → Group route untuk halaman publik
│   ├── layout.tsx             → Navbar + Footer untuk public pages
│   ├── home/                  → COMPRO routes
│   │   └── page.tsx          → ✅ Beranda Compro
│   ├── profil/
│   │   ├── page.tsx          → ✅ Tentang PKUMI
│   │   ├── struktur/page.tsx → ✅ Struktur Organisasi
│   │   └── dosen/page.tsx    → ✅ Dosen Pengajar
│   ├── akademik/
│   │   ├── page.tsx          → ✅ Hub Akademik
│   │   ├── agenda/page.tsx   → ✅ Placeholder
│   │   ├── penelitian/...    → ✅ 6 more subpages
│   ├── galeri/page.tsx       → ✅ Galeri
│   ├── pendaftaran/page.tsx  → ✅ Pendaftaran
│   ├── kontak/page.tsx       → ✅ Kontak
│   │
│   ├── khazanah/             → PORTAL BERITA routes
│   │   ├── page.tsx          → List Khazanah
│   │   └── [slug]/page.tsx   → Detail Khazanah
│   ├── rubrik/
│   │   ├── page.tsx          → List Rubrik
│   │   └── [slug]/page.tsx   → Detail Rubrik
│   ├── penulis/
│   │   └── [slug]/page.tsx   → Profil Penulis
│   ├── submit/
│   │   ├── khazanah/page.tsx → Submit Khazanah
│   │   └── rubrik/page.tsx   → Submit Rubrik
│   ├── login/page.tsx
│   └── register/page.tsx
│
├── portal/                    → Redirect/alias untuk Portal Berita
│   └── page.tsx              → Homepage Portal (copy dari (public)/page.tsx)
│
└── compro/                    → Admin dashboard (future)
    ├── dashboard/page.tsx    → ✅ Dashboard stub
    ├── submissions/page.tsx  → ✅ Review submissions
    ├── users/page.tsx        → ✅ User management
    └── analytics/page.tsx    → ✅ Analytics stub
```

---

## 🧭 Navigation Flow

### Landing Page (/)
```
User visits pkumi.ac.id
     │
     ├──→ Click "Compro PKUMI" → /home (Institusi)
     │
     └──→ Click "Portal Berita" → /portal (Artikel)
```

### Navbar Behavior
- **Di Compro** (`/home`, `/profil`, dll):
  - Menu: Beranda, Profil, Akademik, Galeri, Pendaftaran, Kontak
  - Platform Switcher menunjukkan "Compro" aktif
  
- **Di Portal** (`/portal`, `/khazanah`, `/rubrik`, dll):
  - Menu: Beranda, Khazanah, Rubrik, Penulis
  - Platform Switcher menunjukkan "Portal" aktif

---

## 🎨 Design System (Unified)

Kedua platform menggunakan **color scheme yang sama**:

```css
Primary: Emerald Green (#10B981)
Secondary: Slate Grey (#475569)
Accent: Amber/Gold (#F59E0B)
```

**Fonts:**
- Headings: Manrope (Bold, 700-900)
- Body: Inter (Regular, 400-600)

**Components Shared:**
- Button styles
- Card layouts
- Form inputs
- Modal dialogs
- Toast notifications

---

## 🔐 Authentication & Authorization

### Role Hierarchy
```
guest (0) < user (1) = contributor (1) < reviewer (2) < admin (3)
```

### Access Matrix
| Role         | Compro | Portal View | Portal Submit | Admin Dashboard |
|--------------|--------|-------------|---------------|-----------------|
| guest        | ✅     | ✅          | ❌            | ❌              |
| user         | ✅     | ✅          | ✅            | ❌              |
| contributor  | ✅     | ✅          | ✅            | ❌              |
| reviewer     | ✅     | ✅          | ✅            | ✅ (Moderation) |
| admin        | ✅     | ✅          | ✅            | ✅ (Full)       |

### Login Flow
```
1. User visits /login
2. Enter NIM + Password
3. API validates credentials
4. Store token + user data in localStorage
5. Redirect based on role:
   - admin/reviewer → /compro/dashboard
   - user/contributor → /portal
```

---

## 📡 API Integration

### Ecosystem Config
**File:** `src/lib/ecosystem-config.ts`

```typescript
ECOSYSTEM_CONFIG = {
  portal: {
    name: 'Portal Berita PKUMI',
    slug: 'portal',
    public: true,
    requiredRole: 'guest',
  },
  compro: {
    name: 'Compro PKUMI',
    slug: 'compro',
    public: false,
    requiredRole: 'admin',
  },
}
```

### API Endpoints
```
Portal:
- GET /api/khazanah → List articles
- GET /api/rubrik → List articles
- POST /api/khazanah → Submit article
- POST /api/rubrik → Submit article

Compro (Admin):
- GET /api/submissions → List pending submissions
- POST /api/submissions/:id/approve → Approve
- POST /api/submissions/:id/reject → Reject
- GET /api/users → List users
- PUT /api/users/:id/role → Update role
```

---

## 🛠️ Key Components

### 1. Platform Switcher
**File:** `src/components/public/PlatformSwitcher.tsx`

Toggle button di Navbar untuk switch antara Compro dan Portal.

```tsx
<PlatformSwitcher />
// Shows: [Compro] [Portal]
```

### 2. Ecosystem Switcher
**File:** `src/components/public/EcosystemSwitcher.tsx`

Dropdown menu untuk admin yang bisa akses Compro admin dashboard.

```tsx
<EcosystemSwitcher />
// Shows current ecosystem + role + logout
```

### 3. Auth Context
**File:** `src/contexts/AuthContext.tsx`

Unified auth untuk kedua platform dengan ecosystem awareness.

```tsx
const { user, currentEcosystem, switchEcosystem } = useAuth();
```

### 4. Shared Services
**File:** `src/lib/services/shared.service.ts`

Data access layer untuk submissions, users, analytics.

```tsx
import { submissionService, userService } from '@/lib/services/shared.service';
```

---

## 🎯 Development Workflow

### Adding New Page to Compro
```bash
# 1. Create page file
src/app/(public)/new-page/page.tsx

# 2. Add to COMPRO_MENU_ITEMS in constants.ts
{ label: 'New Page', href: '/new-page' }

# 3. Test navigation
npm run dev
```

### Adding New Feature to Portal
```bash
# 1. Create feature component
src/components/portal/NewFeature.tsx

# 2. Import in portal page
import { NewFeature } from '@/components/portal/NewFeature';

# 3. Test functionality
npm run dev
```

---

## 🧪 Testing Checklist

### Compro Testing
- [ ] All 8 sitemap pages load
- [ ] Navbar menu works
- [ ] Links to PMB portal work
- [ ] Images load correctly
- [ ] Responsive on mobile
- [ ] Galeri lightbox works
- [ ] Contact form submits

### Portal Testing
- [ ] Homepage shows trending/popular
- [ ] Khazanah list loads
- [ ] Rubrik list loads
- [ ] Article detail pages work
- [ ] Search/filter works
- [ ] Login/logout works
- [ ] Submit forms work (authenticated)
- [ ] Profile page shows user data

### Integration Testing
- [ ] Landing page switches platforms
- [ ] Platform switcher in navbar works
- [ ] Auth persists across platforms
- [ ] Logout works from both platforms
- [ ] Role-based access enforced
- [ ] API calls work for both platforms

---

## 🚨 Common Issues & Solutions

### Issue 1: "Cannot read property of undefined"
**Cause:** Accessing nested properties without null check
**Solution:**
```tsx
// ❌ Bad
const name = user.profile.name;

// ✅ Good
const name = user?.profile?.name || 'Guest';
```

### Issue 2: Navbar shows wrong menu
**Cause:** Not detecting current platform correctly
**Solution:** Check pathname in `PlatformSwitcher.tsx`
```tsx
const isInPortal = pathname?.startsWith('/portal') || 
                   pathname?.startsWith('/khazanah') || 
                   pathname?.startsWith('/rubrik');
```

### Issue 3: Build fails with "Parsing ecmascript source code failed"
**Cause:** Syntax error (duplicate closing braces, etc)
**Solution:** Check for duplicate `}, []);` in useEffect hooks

### Issue 4: Auth not persisting
**Cause:** localStorage/sessionStorage not syncing
**Solution:** Use `localStorage` for user data, `sessionStorage` for ecosystem
```tsx
localStorage.setItem('nurberita_user', JSON.stringify(user));
sessionStorage.setItem('pkumi_current_ecosystem', ecosystem);
```

---

## 📚 File Reference Guide

### Core Configuration
- `src/lib/constants.ts` - Menu items, colors, site config
- `src/lib/ecosystem-config.ts` - Ecosystem definitions & RBAC
- `src/contexts/AuthContext.tsx` - Authentication state
- `src/hooks/useEcosystem.ts` - Ecosystem switching logic

### Compro Pages
- `src/app/(public)/home/page.tsx` - Beranda Compro (✅ 553 lines)
- `src/app/(public)/profil/page.tsx` - Profil PKUMI
- `src/app/(public)/akademik/page.tsx` - Hub Akademik
- `src/app/(public)/galeri/page.tsx` - Galeri
- `src/app/(public)/pendaftaran/page.tsx` - Pendaftaran
- `src/app/(public)/kontak/page.tsx` - Kontak

### Portal Pages
- `src/app/portal/page.tsx` - Homepage Portal
- `src/app/(public)/khazanah/page.tsx` - List Khazanah
- `src/app/(public)/rubrik/page.tsx` - List Rubrik
- `src/app/(public)/submit/khazanah/page.tsx` - Submit Khazanah

### Admin Pages
- `src/app/compro/dashboard/page.tsx` - Dashboard
- `src/app/compro/submissions/page.tsx` - Review Submissions
- `src/app/compro/users/page.tsx` - User Management
- `src/app/compro/analytics/page.tsx` - Analytics

### Components
- `src/components/public/Navbar.tsx` - Main navigation
- `src/components/public/PlatformSwitcher.tsx` - Platform toggle
- `src/components/public/EcosystemSwitcher.tsx` - Ecosystem dropdown
- `src/components/public/Footer.tsx` - Footer

---

## 🎓 Next Steps

### Phase 1: Current (✅ COMPLETED)
- [x] Ecosystem config created
- [x] Auth context enhanced
- [x] Platform switcher built
- [x] Admin dashboard stubs created
- [x] Shared services layer built
- [x] Documentation written

### Phase 2: Integration Enhancement
- [ ] Connect API endpoints to backend
- [ ] Implement real submission workflow
- [ ] Add role management UI
- [ ] Build analytics charts
- [ ] Add notification system

### Phase 3: Advanced Features
- [ ] Real-time updates (WebSocket)
- [ ] Advanced search & filters
- [ ] Content recommendation engine
- [ ] Multi-language support
- [ ] PWA features

---

## 📞 Support

**Documentation:** `DUAL_ECOSYSTEM_GUIDE.md` (this file)
**Implementation Summary:** `IMPLEMENTATION_SUMMARY.md`
**Design Reference:** `DESIGN_SYSTEM_REFERENCE.md`
**Checklist:** `CHECKLIST.md`

**Build Command:**
```bash
npm run build
# or
pnpm build
```

**Dev Server:**
```bash
npm run dev
# or
pnpm dev
```

---

**Last Updated:** January 9, 2026
**Version:** 2.0.0 (Dual Ecosystem)
**Author:** GitHub Copilot
