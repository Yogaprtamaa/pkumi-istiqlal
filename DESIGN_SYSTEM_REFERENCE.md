# PKUMI Design System - Quick Reference

## 🎨 Color Palette

### Primary Colors (Emerald)
```css
Primary:      #10B981
Primary-700:  #15803D
Primary-50:   #F0FDF4
Primary-100:  #DCFCE7
```

### Secondary Colors (Slate)
```css
Secondary:    #475569
Secondary-900: #0F172A
Secondary-50: #F8FAFC
Secondary-100: #F1F5F9
```

### Accent Colors (Amber)
```css
Accent:       #F59E0B
Accent-600:   #D97706
Accent-50:    #FFFBEB
Accent-100:   #FEF3C7
```

---

## 🔤 Typography

| Use Case | Family | Size | Weight |
|----------|--------|------|--------|
| Heading | Manrope | 2.5-3.5rem | 700 (bold) |
| Body | Inter | 1rem | 400 |
| Small | Inter | 0.875rem | 500 |
| Label | Inter | 0.75rem | 600 |

---

## 🎯 Component Colors

### Buttons

**Primary (CTA):**
```tsx
className="bg-emerald-600 hover:bg-emerald-700 text-white"
```

**Secondary:**
```tsx
className="border-2 border-slate-300 text-slate-700 hover:border-emerald-600"
```

**Accent (Special):**
```tsx
className="bg-amber-500 hover:bg-amber-600 text-slate-900"
```

### Cards & Surfaces

**Default:**
```tsx
className="bg-white border-2 border-slate-200 hover:border-emerald-400"
```

**Highlighted:**
```tsx
className="bg-gradient-to-br from-emerald-50 to-slate-100 border-2 border-emerald-200"
```

### Text

**Heading:**
```tsx
className="text-slate-900 font-bold"
```

**Body:**
```tsx
className="text-slate-600 leading-relaxed"
```

**Accent (Link):**
```tsx
className="text-emerald-600 hover:text-emerald-700 font-semibold"
```

---

## 🎪 Spacing System

```
xs:  0.25rem (4px)
sm:  0.5rem  (8px)
md:  1rem    (16px)
lg:  1.5rem  (24px)
xl:  2rem    (32px)
2xl: 3rem    (48px)
```

### Page Sections
```tsx
className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
```

---

## 🔄 Border Radius

```
sm:   0.375rem (6px)   - Form inputs, small elements
md:   0.5rem   (8px)   - Standard buttons
lg:   0.75rem  (12px)  - Cards, medium components
xl:   1rem     (16px)  - Larger cards, containers
2xl:  1.5rem   (24px)  - Hero sections, large components
```

---

## ✨ Common Patterns

### Hero Section
```tsx
<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-50 via-white to-slate-50">
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">Title</h1>
  <p className="text-xl text-slate-600">Subtitle</p>
</section>
```

### Grid Cards
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div className="bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-emerald-400">
    {/* Content */}
  </div>
</div>
```

### CTA Button
```tsx
<button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors">
  Call to Action
</button>
```

### Badge/Label
```tsx
<span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
  Label
</span>
```

---

## 🎬 Animation Presets

### Fade In Up
```tsx
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
```

### Stagger Container
```tsx
const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};
```

### Scale On Hover
```tsx
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  {/* Content */}
</motion.div>
```

---

## 🔗 Navigation Structure

```
Home /
├── Profil /profil
│   ├── Tentang /profil
│   ├── Struktur /profil/struktur
│   └── Dosen /profil/dosen
├── Berita & Opini
│   ├── Berita /rubrik
│   └── Opini /khazanah
├── Akademik /akademik
│   ├── Agenda /akademik/agenda
│   ├── Penelitian /akademik/penelitian
│   ├── Mata Kuliah /akademik/matkul
│   ├── Kalender /akademik/kalender
│   ├── Jurnal /akademik/jurnal
│   ├── Khazanah /akademik/khazanah
│   └── Kurikulum /akademik/kurikulum
├── Galeri /galeri
├── Pendaftaran /pendaftaran
└── Kontak /kontak
```

---

## 📱 Breakpoints

| Name | Size | Use Case |
|------|------|----------|
| **sm** | 640px | Tablets |
| **md** | 768px | Small laptops |
| **lg** | 1024px | Desktops |
| **xl** | 1280px | Large screens |
| **2xl** | 1536px | Very large screens |

---

## 🎨 Gradient Examples

### Emerald Gradient
```css
bg-gradient-to-r from-emerald-50 to-emerald-100
bg-gradient-to-br from-emerald-600 to-emerald-700
```

### Mixed Gradient
```css
bg-gradient-to-r from-emerald-50 via-white to-amber-50
```

---

## 🔍 Dark Mode Support (Future)

```tsx
// Example for future dark mode
<div className="dark:bg-slate-900 dark:text-white">
  {/* Content */}
</div>
```

---

## 📐 Common Widths

```
max-w-4xl    (896px)  - Content pages
max-w-5xl    (1024px) - Wide layouts
max-w-7xl    (1280px) - Full site width
max-w-2xl    (672px)  - Narrow content
```

---

## 🎯 Accessibility

- ✅ Minimum contrast ratio: 4.5:1
- ✅ Focus visible with outline
- ✅ Alt text for images
- ✅ ARIA labels where needed
- ✅ Semantic HTML structure

---

**Last Updated:** 8 Januari 2026
**Version:** 1.0
