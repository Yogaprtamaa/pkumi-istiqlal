/**
 * Mock Data untuk Portal Berita Islami
 * Data dummy untuk artikel, rubrik, dan khazanah
 */

import { Article, Rubrik, Khazanah } from '@/types';

// Data Rubrik/Kategori
export const rubriks: Rubrik[] = [
  {
    id: '1',
    name: 'Akhlak',
    slug: 'akhlak',
    description: 'Pembahasan seputar budi pekerti dan adab dalam Islam',
    color: '#2E7D32',
  },
  {
    id: '2',
    name: 'Fiqih',
    slug: 'fiqih',
    description: 'Kajian hukum-hukum Islam dalam kehidupan sehari-hari',
    color: '#1565C0',
  },
  {
    id: '3',
    name: 'Tazkiyatun Nafs',
    slug: 'tazkiyatun-nafs',
    description: 'Penyucian jiwa dan pengembangan spiritualitas',
    color: '#6A1B9A',
  },
  {
    id: '4',
    name: 'Keluarga',
    slug: 'keluarga',
    description: 'Panduan membangun keluarga sakinah mawaddah warahmah',
    color: '#C62828',
  },
  {
    id: '5',
    name: 'Muamalah',
    slug: 'muamalah',
    description: 'Etika bisnis dan transaksi dalam perspektif Islam',
    color: '#EF6C00',
  },
];

// Data Artikel
export const articles: Article[] = [
  {
    id: '1',
    title: 'Menjaga Lisan: Kunci Keselamatan Dunia dan Akhirat',
    slug: 'menjaga-lisan-kunci-keselamatan',
    excerpt: 'Rasulullah SAW bersabda bahwa barangsiapa menjaga lisannya, maka ia telah menjaga sebagian besar agamanya. Artikel ini membahas pentingnya menjaga ucapan.',
    content: `
      <p>Lisan adalah salah satu nikmat Allah yang luar biasa. Dengan lisan, kita bisa berzikir, berdoa, mengajarkan kebaikan, dan menyebarkan ilmu. Namun, lisan juga bisa menjadi sumber malapetaka jika tidak dijaga dengan baik.</p>
      
      <h2>Bahaya Lisan yang Tidak Terjaga</h2>
      <p>Rasulullah SAW bersabda, "Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam." (HR. Bukhari dan Muslim)</p>
      
      <p>Hadits ini mengajarkan kita bahwa setiap kata yang keluar dari lisan harus dipertimbangkan. Apakah kata tersebut membawa kebaikan atau justru kemudharatan?</p>
      
      <h2>Tips Menjaga Lisan</h2>
      <ul>
        <li>Berpikir sebelum berbicara</li>
        <li>Menghindari ghibah dan namimah</li>
        <li>Memperbanyak dzikir dan istighfar</li>
        <li>Bergaul dengan orang-orang shalih</li>
      </ul>
      
      <p>Semoga Allah senantiasa menjaga lisan kita dari perkataan yang tidak bermanfaat. Aamiin.</p>
    `,
    rubrik: rubriks[0],
    author: 'Ustadz Ahmad Zainuddin',
    date: '2025-12-25',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&h=600&fit=crop',
    views: 1250,
    readTime: 5,
  },
  {
    id: '2',
    title: 'Panduan Lengkap Shalat Tahajud untuk Pemula',
    slug: 'panduan-shalat-tahajud-pemula',
    excerpt: 'Shalat tahajud adalah shalat sunnah yang memiliki keutamaan luar biasa. Berikut panduan lengkap bagi Anda yang ingin memulai rutinitas tahajud.',
    content: `
      <p>Shalat tahajud merupakan shalat sunnah yang dikerjakan pada sepertiga malam terakhir. Allah SWT memuji hamba-Nya yang bangun di malam hari untuk beribadah.</p>
      
      <h2>Waktu Pelaksanaan</h2>
      <p>Waktu terbaik untuk shalat tahajud adalah sepertiga malam terakhir, yaitu sekitar pukul 02.00-04.00 dini hari, tergantung waktu subuh di daerah masing-masing.</p>
      
      <h2>Tata Cara Shalat Tahajud</h2>
      <ol>
        <li>Bangun dari tidur dan berwudhu</li>
        <li>Niatkan shalat tahajud karena Allah</li>
        <li>Lakukan minimal 2 rakaat, maksimal tidak terbatas</li>
        <li>Tutup dengan witir</li>
      </ol>
      
      <p>Keutamaan shalat tahajud sangat besar. Rasulullah SAW tidak pernah meninggalkan shalat ini hingga akhir hayatnya.</p>
    `,
    rubrik: rubriks[1],
    author: 'Ustadz Muhammad Faisal',
    date: '2025-12-24',
    imageUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=600&fit=crop',
    views: 2340,
    readTime: 7,
  },
  {
    id: '3',
    title: 'Mengenal Penyakit Hati dan Cara Mengobatinya',
    slug: 'mengenal-penyakit-hati-dan-cara-mengobatinya',
    excerpt: 'Penyakit hati seperti hasad, riya, dan ujub bisa menggerogoti iman. Kenali dan obati sebelum terlambat.',
    content: `
      <p>Dalam Islam, hati adalah pusat dari segala kebaikan dan keburukan manusia. Rasulullah SAW bersabda, "Ketahuilah, di dalam tubuh ada segumpal daging. Jika ia baik, maka baiklah seluruh tubuh. Jika ia rusak, maka rusaklah seluruh tubuh. Ketahuilah, ia adalah hati." (HR. Bukhari)</p>
      
      <h2>Jenis-jenis Penyakit Hati</h2>
      <ul>
        <li><strong>Hasad (iri hati)</strong> - Tidak senang melihat nikmat orang lain</li>
        <li><strong>Riya</strong> - Beramal karena ingin dilihat manusia</li>
        <li><strong>Ujub</strong> - Bangga diri atas amal yang dilakukan</li>
        <li><strong>Sombong</strong> - Merasa lebih baik dari orang lain</li>
      </ul>
      
      <h2>Cara Mengobati Penyakit Hati</h2>
      <p>Obat utama penyakit hati adalah muhasabah (introspeksi diri), memperbanyak istighfar, dan senantiasa mengingat kematian.</p>
    `,
    rubrik: rubriks[2],
    author: 'Ustadzah Fatimah Azzahra',
    date: '2025-12-23',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    views: 1890,
    readTime: 6,
  },
  {
    id: '4',
    title: 'Membangun Komunikasi yang Sehat dalam Keluarga',
    slug: 'membangun-komunikasi-sehat-keluarga',
    excerpt: 'Komunikasi yang baik adalah fondasi keluarga harmonis. Pelajari cara membangun komunikasi yang sehat menurut ajaran Islam.',
    content: `
      <p>Keluarga adalah unit terkecil dalam masyarakat. Kualitas komunikasi dalam keluarga sangat menentukan keharmonisan rumah tangga.</p>
      
      <h2>Prinsip Komunikasi Islami</h2>
      <ul>
        <li><strong>Qaulan Sadida</strong> - Perkataan yang benar dan tepat sasaran</li>
        <li><strong>Qaulan Ma'rufa</strong> - Perkataan yang baik dan menyenangkan</li>
        <li><strong>Qaulan Layyina</strong> - Perkataan yang lemah lembut</li>
        <li><strong>Qaulan Karima</strong> - Perkataan yang mulia</li>
      </ul>
      
      <h2>Tips Praktis</h2>
      <p>Luangkan waktu khusus untuk berkomunikasi dengan pasangan dan anak-anak. Matikan gadget saat berkumpul bersama keluarga.</p>
    `,
    rubrik: rubriks[3],
    author: 'Ustadz Hasan Basri',
    date: '2025-12-22',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
    views: 1456,
    readTime: 5,
  },
  {
    id: '5',
    title: 'Etika Berbisnis dalam Islam: Panduan Praktis',
    slug: 'etika-berbisnis-dalam-islam',
    excerpt: 'Islam mengatur seluruh aspek kehidupan termasuk berbisnis. Kenali etika dan prinsip bisnis yang sesuai syariat.',
    content: `
      <p>Berbisnis dalam Islam bukan sekadar mencari keuntungan materi, tetapi juga mencari keberkahan. Rasulullah SAW sendiri adalah seorang pedagang yang jujur dan amanah.</p>
      
      <h2>Prinsip Dasar Bisnis Islami</h2>
      <ul>
        <li>Kejujuran dalam transaksi</li>
        <li>Tidak ada unsur gharar (ketidakjelasan)</li>
        <li>Bebas dari riba</li>
        <li>Tidak menjual barang haram</li>
      </ul>
      
      <h2>Keutamaan Pedagang Jujur</h2>
      <p>Rasulullah SAW bersabda, "Pedagang yang jujur dan amanah akan bersama para nabi, orang-orang yang jujur, dan para syuhada." (HR. Tirmidzi)</p>
    `,
    rubrik: rubriks[4],
    author: 'Dr. Abdullah Rahman',
    date: '2025-12-21',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    views: 987,
    readTime: 6,
  },
  {
    id: '6',
    title: 'Keutamaan Sedekah dan Dampaknya bagi Pemberi',
    slug: 'keutamaan-sedekah-dampak-pemberi',
    excerpt: 'Sedekah tidak akan mengurangi harta. Justru sebaliknya, sedekah membawa berkah dan kelapangan rezeki.',
    content: `
      <p>Sedekah adalah salah satu amalan yang sangat dicintai Allah. Rasulullah SAW bersabda, "Sedekah tidak akan mengurangi harta." (HR. Muslim)</p>
      
      <h2>Keutamaan Sedekah</h2>
      <ul>
        <li>Menghapus dosa seperti air memadamkan api</li>
        <li>Menjadi naungan di hari kiamat</li>
        <li>Mendatangkan keberkahan harta</li>
        <li>Menyembuhkan penyakit</li>
      </ul>
      
      <h2>Sedekah Terbaik</h2>
      <p>Sedekah yang paling utama adalah sedekah yang diberikan saat kita sendiri membutuhkan. Ini menunjukkan keimanan yang kuat kepada Allah sebagai Pemberi Rezeki.</p>
    `,
    rubrik: rubriks[0],
    author: 'Ustadz Ahmad Zainuddin',
    date: '2025-12-20',
    imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop',
    views: 2100,
    readTime: 4,
  },
  {
    id: '7',
    title: 'Panduan Puasa Sunnah Senin Kamis',
    slug: 'panduan-puasa-sunnah-senin-kamis',
    excerpt: 'Puasa Senin Kamis adalah sunnah Rasulullah yang memiliki banyak keutamaan. Berikut panduan lengkapnya.',
    content: `
      <p>Puasa Senin dan Kamis adalah puasa sunnah yang rutin dikerjakan Rasulullah SAW. Beliau bersabda, "Amal-amal dihadapkan (kepada Allah) pada hari Senin dan Kamis, maka aku suka amalku dihadapkan saat aku berpuasa." (HR. Tirmidzi)</p>
      
      <h2>Keutamaan Puasa Senin Kamis</h2>
      <ul>
        <li>Amal diangkat dalam keadaan berpuasa</li>
        <li>Mendapat pahala puasa sunnah</li>
        <li>Melatih pengendalian diri</li>
        <li>Menyehatkan tubuh</li>
      </ul>
      
      <h2>Tips Menjalankan Puasa Senin Kamis</h2>
      <p>Mulailah dengan niat yang ikhlas. Persiapkan sahur yang bergizi meski sederhana. Jaga ibadah dan hindari perbuatan sia-sia selama berpuasa.</p>
    `,
    rubrik: rubriks[1],
    author: 'Ustadz Muhammad Faisal',
    date: '2025-12-19',
    imageUrl: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=800&h=600&fit=crop',
    views: 1678,
    readTime: 5,
  },
  {
    id: '8',
    title: 'Mendidik Anak dengan Kasih Sayang ala Rasulullah',
    slug: 'mendidik-anak-kasih-sayang-rasulullah',
    excerpt: 'Rasulullah SAW adalah teladan terbaik dalam mendidik anak. Beliau mendidik dengan kasih sayang, bukan kekerasan.',
    content: `
      <p>Anak adalah amanah dari Allah yang harus dijaga dan dididik dengan baik. Rasulullah SAW memberikan contoh nyata bagaimana mendidik anak dengan penuh kasih sayang.</p>
      
      <h2>Metode Pendidikan Rasulullah</h2>
      <ul>
        <li>Memberikan kasih sayang dan perhatian</li>
        <li>Bermain dan bercanda dengan anak</li>
        <li>Mendoakan anak dengan doa-doa baik</li>
        <li>Memberikan teladan, bukan sekadar nasihat</li>
      </ul>
      
      <h2>Hindari Kekerasan</h2>
      <p>Rasulullah tidak pernah memukul anak-anak. Beliau mendidik dengan kelembutan dan kesabaran. Jika anak berbuat salah, beliau menasihati dengan cara yang bijak.</p>
    `,
    rubrik: rubriks[3],
    author: 'Ustadzah Fatimah Azzahra',
    date: '2025-12-18',
    imageUrl: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=600&fit=crop',
    views: 2456,
    readTime: 6,
  },
  {
    id: '9',
    title: 'Zikir Pagi dan Petang: Benteng Diri Muslim',
    slug: 'zikir-pagi-petang-benteng-muslim',
    excerpt: 'Zikir pagi dan petang adalah amalan yang melindungi diri dari berbagai kejahatan. Amalkan setiap hari untuk ketenangan jiwa.',
    content: `
      <p>Zikir pagi dan petang adalah amalan yang sangat dianjurkan. Dengan zikir, hati menjadi tenang dan diri terlindungi dari gangguan setan.</p>
      
      <h2>Waktu Pelaksanaan</h2>
      <ul>
        <li><strong>Pagi:</strong> Setelah shalat Subuh hingga terbit matahari</li>
        <li><strong>Petang:</strong> Setelah shalat Ashar hingga terbenam matahari</li>
      </ul>
      
      <h2>Zikir-zikir Utama</h2>
      <p>Di antara zikir pagi petang yang utama adalah membaca Ayat Kursi, surat Al-Ikhlas, Al-Falaq, An-Naas, dan doa-doa ma'tsurat dari Rasulullah SAW.</p>
    `,
    rubrik: rubriks[2],
    author: 'Ustadz Hasan Basri',
    date: '2025-12-17',
    imageUrl: 'https://images.unsplash.com/photo-1473181488821-2d23949a045a?w=800&h=600&fit=crop',
    views: 3210,
    readTime: 5,
  },
  {
    id: '10',
    title: 'Halal dan Haram dalam Investasi Modern',
    slug: 'halal-haram-investasi-modern',
    excerpt: 'Dunia investasi semakin beragam. Pelajari mana yang halal dan mana yang harus dihindari menurut syariat Islam.',
    content: `
      <p>Investasi adalah salah satu cara mengembangkan harta. Namun, seorang muslim harus memastikan bahwa investasinya sesuai dengan syariat Islam.</p>
      
      <h2>Jenis Investasi Halal</h2>
      <ul>
        <li>Saham syariah yang masuk dalam DES (Daftar Efek Syariah)</li>
        <li>Sukuk (obligasi syariah)</li>
        <li>Reksa dana syariah</li>
        <li>Emas dan properti</li>
      </ul>
      
      <h2>Yang Harus Dihindari</h2>
      <ul>
        <li>Investasi dengan skema riba</li>
        <li>Saham perusahaan yang bergerak di bidang haram</li>
        <li>Trading dengan unsur judi dan spekulasi tinggi</li>
      </ul>
    `,
    rubrik: rubriks[4],
    author: 'Dr. Abdullah Rahman',
    date: '2025-12-16',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    views: 1845,
    readTime: 7,
  },
];

// Data Khazanah (Tafsir, Hadits, Doa, Kisah)
export const khazanah: Khazanah[] = [
  {
    id: '1',
    title: 'Tafsir Surah Al-Fatihah: Induk Al-Quran',
    slug: 'tafsir-surah-al-fatihah',
    type: 'tafsir',
    excerpt: 'Al-Fatihah disebut Ummul Quran karena mengandung pokok-pokok ajaran Islam. Mari mendalami maknanya.',
    content: `
      <p>Surah Al-Fatihah adalah surah pertama dalam Al-Quran dan disebut sebagai Ummul Quran (induk Al-Quran) karena mengandung intisari seluruh ajaran Islam.</p>
      
      <h2>Kandungan Surah Al-Fatihah</h2>
      <ul>
        <li>Pujian kepada Allah (ayat 1-4)</li>
        <li>Pengakuan hanya menyembah Allah (ayat 5)</li>
        <li>Permohonan hidayah (ayat 6-7)</li>
      </ul>
    `,
    source: 'Tafsir Ibnu Katsir',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'Hadits Arbain: 40 Hadits Pilihan Imam Nawawi',
    slug: 'hadits-arbain-nawawi',
    type: 'hadits',
    excerpt: 'Kumpulan 40 hadits pilihan yang menjadi fondasi ajaran Islam, dikumpulkan oleh Imam An-Nawawi.',
    content: `
      <p>Hadits Arbain An-Nawawi adalah kumpulan 40 hadits yang dipilih oleh Imam An-Nawawi karena mencakup pokok-pokok ajaran Islam.</p>
      
      <h2>Hadits Pertama: Niat</h2>
      <p>"Sesungguhnya setiap amal tergantung pada niatnya, dan setiap orang hanya mendapatkan sesuai dengan yang ia niatkan..." (HR. Bukhari Muslim)</p>
    `,
    source: 'Imam An-Nawawi',
    imageUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&h=600&fit=crop',
  },
  {
    id: '3',
    title: 'Kumpulan Doa Sehari-hari',
    slug: 'kumpulan-doa-sehari-hari',
    type: 'doa',
    excerpt: 'Doa-doa harian yang diajarkan Rasulullah SAW untuk diamalkan dalam setiap aktivitas.',
    content: `
      <p>Rasulullah SAW mengajarkan banyak doa untuk setiap aktivitas harian. Dengan berdoa, setiap aktivitas menjadi bernilai ibadah.</p>
      
      <h2>Doa Bangun Tidur</h2>
      <p>الحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَمَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ</p>
      
      <h2>Doa Sebelum Makan</h2>
      <p>بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ</p>
    `,
    source: 'Hisnul Muslim',
    imageUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=600&fit=crop',
  },
  {
    id: '4',
    title: 'Kisah Sahabat: Abu Bakar Ash-Shiddiq',
    slug: 'kisah-abu-bakar-shiddiq',
    type: 'kisah',
    excerpt: 'Perjalanan hidup sahabat terdekat Rasulullah yang mendapat gelar Ash-Shiddiq karena keimanannya.',
    content: `
      <p>Abu Bakar adalah sahabat terdekat Rasulullah SAW dan orang pertama yang masuk Islam dari kalangan pria dewasa. Ia mendapat gelar Ash-Shiddiq karena selalu membenarkan Rasulullah.</p>
      
      <h2>Keistimewaan Abu Bakar</h2>
      <ul>
        <li>Orang pertama yang membenarkan peristiwa Isra' Mi'raj</li>
        <li>Sahabat Rasulullah dalam hijrah ke Madinah</li>
        <li>Khalifah pertama setelah wafatnya Rasulullah</li>
      </ul>
    `,
    source: 'Siyar A\'lam An-Nubala',
    imageUrl: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=600&fit=crop',
  },
];

// Helper functions untuk mengambil data
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByRubrik(rubrikSlug: string): Article[] {
  return articles.filter((article) => article.rubrik.slug === rubrikSlug);
}

export function getRubrikBySlug(slug: string): Rubrik | undefined {
  return rubriks.find((rubrik) => rubrik.slug === slug);
}

export function getRelatedArticles(currentSlug: string, limit: number = 3): Article[] {
  const currentArticle = getArticleBySlug(currentSlug);
  if (!currentArticle) return articles.slice(0, limit);
  
  return articles
    .filter((article) => 
      article.slug !== currentSlug && 
      article.rubrik.slug === currentArticle.rubrik.slug
    )
    .slice(0, limit);
}

export function getLatestArticles(limit: number = 6): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getPopularArticles(limit: number = 5): Article[] {
  return [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function getKhazanahBySlug(slug: string): Khazanah | undefined {
  return khazanah.find((item) => item.slug === slug);
}
