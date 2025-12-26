/**
 * Mock Data untuk Portal Berita Islami
 * FULL VERSION: Imports + Rubriks + Articles (Long Content) + Khazanah + Helpers
 */

import { Article, Rubrik, Khazanah } from "@/types";

// --- 1. DATA RUBRIK (Wajib ada agar tidak error 'Cannot find name rubriks') ---
export const rubriks: Rubrik[] = [
  {
    id: "1",
    name: "Akhlak",
    slug: "akhlak",
    description: "Pembahasan seputar budi pekerti dan adab dalam Islam",
    color: "#2E7D32",
  },
  {
    id: "2",
    name: "Fiqih",
    slug: "fiqih",
    description: "Kajian hukum-hukum Islam dalam kehidupan sehari-hari",
    color: "#1565C0",
  },
  {
    id: "3",
    name: "Tazkiyatun Nafs",
    slug: "tazkiyatun-nafs",
    description: "Penyucian jiwa dan pengembangan spiritualitas",
    color: "#6A1B9A",
  },
  {
    id: "4",
    name: "Keluarga",
    slug: "keluarga",
    description: "Panduan membangun keluarga sakinah mawaddah warahmah",
    color: "#C62828",
  },
  {
    id: "5",
    name: "Muamalah",
    slug: "muamalah",
    description: "Etika bisnis dan transaksi dalam perspektif Islam",
    color: "#EF6C00",
  },
];

// --- 2. DATA ARTIKEL (25 ITEM - 5 PERTAMA KONTEN PANJANG) ---
export const articles: Article[] = [
  // --- ARTIKEL 1: AKHLAK ---
  {
    id: "1",
    title: "Menjaga Lisan: Kunci Keselamatan Dunia dan Akhirat",
    slug: "menjaga-lisan-kunci-keselamatan",
    excerpt:
      "Rasulullah SAW bersabda bahwa barangsiapa menjaga lisannya, maka ia telah menjaga sebagian besar agamanya. Artikel ini membahas pentingnya menjaga ucapan.",
    content: `
      <p>Lisan adalah karunia Allah yang sangat agung, namun ukurannya kecil. Meski kecil bentuknya, lisan memiliki dampak yang luar biasa besar, baik dalam ketaatan maupun kemaksiatan. Imam Al-Ghazali dalam <em>Ihya' Ulumuddin</em> menyebutkan bahwa lisan adalah salah satu nikmat Allah yang besar, namun juga memiliki bahaya yang besar jika tidak dikendalikan.</p>

      <h2>Pentingnya Menjaga Lisan dalam Islam</h2>
      <p>Islam menempatkan penjagaan lisan sebagai indikator keimanan seseorang. Rasulullah SAW bersabda:</p>
      
      <blockquote>
        "Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam." 
        <br><strong>(HR. Bukhari dan Muslim)</strong>
      </blockquote>

      <p>Hadits ini memberikan kita dua pilihan sederhana namun berat: berkata yang membawa manfaat (kebaikan) atau, jika tidak mampu, lebih baik diam. Banyak sengketa, perceraian, hingga pertumpahan darah bermula dari ketidakmampuan menahan lisan.</p>

      <h2>Bahaya Lisan yang Tidak Terjaga</h2>
      <p>Allah SWT berfirman dalam Al-Quran surah Qaf ayat 18:</p>
      <p><em>"Tiada suatu ucapanpun yang diucapkannya melainkan ada di dekatnya malaikat pengawas yang selalu hadir."</em></p>
      
      <p>Ayat ini menjadi peringatan keras bahwa tidak ada satu kata pun yang luput dari catatan malaikat. Beberapa bahaya lisan yang sering terjadi antara lain:</p>
      <ul>
        <li><strong>Ghibah (Menggunjing):</strong> Membicarakan keburukan saudara sesama muslim, yang diibaratkan seperti memakan bangkai saudaranya sendiri.</li>
        <li><strong>Namimah (Adu Domba):</strong> Menyampaikan perkataan orang lain dengan tujuan merusak hubungan antar sesama.</li>
        <li><strong>Dusta (Berbohong):</strong> Menyampaikan sesuatu yang tidak sesuai dengan fakta.</li>
        <li><strong>Mencela dan Melaknat:</strong> Mengeluarkan kata-kata kotor yang menyakiti hati orang lain.</li>
      </ul>

      <h2>Tips Praktis Menjaga Lisan</h2>
      <p>Bagaimana agar kita selamat dari tergelincirnya lisan? Berikut beberapa tips yang bisa diamalkan:</p>
      <ol>
        <li><strong>Berpikir Sebelum Berbicara:</strong> Tanyakan pada diri sendiri, "Apakah ucapan ini benar? Apakah ucapan ini bermanfaat? Apakah ini waktu yang tepat?"</li>
        <li><strong>Memperbanyak Dzikir:</strong> Basahi lisan dengan istighfar dan tahlil. Lisan yang sibuk berdzikir tidak akan sempat membicarakan aib orang lain.</li>
        <li><strong>Menghindari Majelis yang Tidak Bermanfaat:</strong> Jauhi perkumpulan yang isinya hanya gosip dan sia-sia.</li>
        <li><strong>Mendoakan Kebaikan:</strong> Jika melihat keburukan orang lain, doakan agar ia mendapat hidayah, bukan malah diceritakan kepada orang lain.</li>
      </ol>

      <p>Semoga Allah memberikan taufik kepada kita untuk senantiasa menjaga lisan, sehingga lisan ini menjadi saksi kebaikan bagi kita di Yaumil Hisab kelak. Aamiin.</p>
    `,
    rubrik: rubriks[0], // Akhlak
    author: "Ustadz Ahmad Zainuddin",
    date: "2025-12-25",
    imageUrl:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&h=600&fit=crop",
    views: 1250,
    readTime: 5,
  },

  // --- ARTIKEL 2: FIQIH ---
  {
    id: "2",
    title: "Panduan Lengkap Shalat Tahajud untuk Pemula",
    slug: "panduan-shalat-tahajud-pemula",
    excerpt:
      "Shalat tahajud adalah shalat sunnah yang memiliki keutamaan luar biasa. Berikut panduan lengkap bagi Anda yang ingin memulai rutinitas tahajud.",
    content: `
      <p>Shalat Tahajud adalah shalat sunnah muakkad (sangat dianjurkan) yang didirikan pada malam hari setelah tidur. Ibadah ini merupakan kebiasaan orang-orang shalih terdahulu dan sarana paling utama untuk mendekatkan diri kepada Allah SWT.</p>

      <h2>Waktu Pelaksanaan</h2>
      <p>Waktu shalat tahajud terbentang mulai dari setelah shalat Isya hingga terbit fajar (waktu Subuh), dengan syarat sudah tidur terlebih dahulu meskipun sebentar. Waktu ini dibagi menjadi tiga:</p>
      <ul>
        <li><strong>Sepertiga Malam Pertama:</strong> Kira-kira pukul 19.00 - 22.00.</li>
        <li><strong>Sepertiga Malam Kedua:</strong> Kira-kira pukul 22.00 - 01.00.</li>
        <li><strong>Sepertiga Malam Terakhir (Paling Utama):</strong> Kira-kira pukul 01.00 hingga masuk waktu Subuh.</li>
      </ul>

      <p>Rasulullah SAW bersabda: <em>"Rabb kita Tabaraka wa Ta'ala turun setiap malam ke langit dunia ketika masih tersisa sepertiga malam terakhir..."</em> (HR. Bukhari)</p>

      <h2>Tata Cara Shalat Tahajud</h2>
      <p>Berikut adalah ringkasan tata cara pelaksanaannya:</p>
      <ol>
        <li><strong>Niat:</strong> Berniat di dalam hati untuk melaksanakan shalat sunnah Tahajud dua rakaat karena Allah Ta'ala.</li>
        <li><strong>Rakaat:</strong> Dilakukan minimal 2 rakaat. Rasulullah biasa mengerjakannya 11 rakaat (termasuk witir), dengan salam setiap dua rakaat.</li>
        <li><strong>Bacaan Surat:</strong> Disunnahkan membaca surat-surat yang panjang jika hafal. Namun jika belum hafal, membaca surat pendek pun tetap sah dan mendapat pahala.</li>
        <li><strong>Doa:</strong> Perbanyak doa saat sujud dan setelah selesai shalat, karena ini adalah waktu mustajab.</li>
      </ol>

      <h2>Tips Agar Mudah Bangun Malam</h2>
      <p>Banyak dari kita merasa berat untuk bangun. Berikut tipsnya:</p>
      <ul>
        <li>Tidur lebih awal (tidak begadang untuk hal sia-sia).</li>
        <li>Berwudhu dan membaca doa serta Ayat Kursi sebelum tidur.</li>
        <li>Niat yang kuat sebelum memejamkan mata.</li>
        <li>Menghindari dosa di siang hari, karena dosa dapat membelenggu ketaatan di malam hari.</li>
        <li>Pasang alarm dan letakkan jauh dari jangkauan tangan agar Anda terpaksa bangun untuk mematikannya.</li>
      </ul>

      <p>Mulailah dari yang ringan, misalnya 2 rakaat selama 10 menit sebelum Subuh. Kuncinya adalah <em>istiqomah</em> (konsisten) meskipun sedikit.</p>
    `,
    rubrik: rubriks[1], // Fiqih
    author: "Ustadz Muhammad Faisal",
    date: "2025-12-24",
    imageUrl:
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=600&fit=crop",
    views: 2340,
    readTime: 7,
  },

  // --- ARTIKEL 3: TAZKIYATUN NAFS ---
  {
    id: "3",
    title: "Mengenal Penyakit Hati dan Cara Mengobatinya",
    slug: "mengenal-penyakit-hati-dan-cara-mengobatinya",
    excerpt:
      "Penyakit hati seperti hasad, riya, dan ujub bisa menggerogoti iman. Kenali dan obati sebelum terlambat.",
    content: `
      <p>Dalam pandangan Islam, hati (Qalb) adalah raja bagi seluruh anggota tubuh. Jika hatinya baik, maka baiklah seluruh amalnya. Sebaliknya, jika hatinya sakit atau rusak, maka rusak pula perilakunya. Penyakit hati ini lebih berbahaya daripada penyakit fisik karena dampaknya terbawa hingga ke akhirat.</p>

      <h2>Jenis-Jenis Penyakit Hati yang Mematikan</h2>
      <p>Para ulama mengidentifikasi beberapa penyakit hati yang sering menjangkiti manusia:</p>
      
      <h3>1. Hasad (Dengki)</h3>
      <p>Hasad adalah perasaan tidak suka melihat orang lain mendapatkan nikmat, bahkan berharap nikmat itu hilang dari orang tersebut. Rasulullah SAW mengingatkan, <em>"Jauhilah hasad, karena hasad memakan kebaikan sebagaimana api memakan kayu bakar."</em></p>

      <h3>2. Riya' dan Sum'ah</h3>
      <p>Riya' adalah beramal agar dilihat orang, sedangkan Sum'ah adalah beramal agar didengar (dibicarakan) orang. Keduanya termasuk syirik kecil yang menghapuskan pahala amal.</p>

      <h3>3. Ujub (Bangga Diri)</h3>
      <p>Perasaan kagum terhadap diri sendiri, merasa dirinya paling shalih, paling pintar, atau paling berjasa. Ujub adalah pintu gerbang menuju kesombongan (Takabur).</p>

      <h2>Terapi dan Obat Penyakit Hati</h2>
      <p>Imam Ibnu Qayyim Al-Jauziyah memberikan resep pengobatan hati, di antaranya:</p>
      <ul>
        <li><strong>Membaca Al-Quran dan Tadabur:</strong> Al-Quran adalah <em>Syifa</em> (penawar) bagi penyakit yang ada di dalam dada.</li>
        <li><strong>Muhasabah Diri:</strong> Sering-seringlah mengintrospeksi kekurangan diri sendiri. Orang yang sibuk dengan aibnya sendiri tidak akan sempat mengurusi aib orang lain.</li>
        <li><strong>Mengingat Kematian:</strong> Kematian adalah pemutus segala kelezatan dunia. Mengingatnya akan melunakkan hati yang keras.</li>
        <li><strong>Berdoa:</strong> Rasulullah sering berdoa: <em>"Ya Muqallibal Qulub, tsabbit qalbi 'ala diinik"</em> (Wahai Dzat yang membolak-balikkan hati, teguhkanlah hatiku di atas agama-Mu).</li>
      </ul>
      
      <p>Mari kita senantiasa membersihkan hati kita, karena hanya hati yang selamat (<em>Qalbun Salim</em>) yang akan diterima di sisi Allah SWT.</p>
    `,
    rubrik: rubriks[2], // Tazkiyatun Nafs
    author: "Ustadzah Fatimah Azzahra",
    date: "2025-12-23",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    views: 1890,
    readTime: 6,
  },

  // --- ARTIKEL 4: KELUARGA ---
  {
    id: "4",
    title: "Membangun Komunikasi yang Sehat dalam Keluarga",
    slug: "membangun-komunikasi-sehat-keluarga",
    excerpt:
      "Komunikasi yang baik adalah fondasi keluarga harmonis. Pelajari cara membangun komunikasi yang sehat menurut ajaran Islam.",
    content: `
      <p>Keluarga sakinah, mawaddah, wa rahmah adalah impian setiap muslim. Namun, impian ini tidak bisa terwujud tanpa adanya komunikasi yang efektif antara suami, istri, dan anak-anak. Kebisuan dalam rumah tangga seringkali menjadi awal dari keretakan.</p>

      <h2>Prinsip Komunikasi dalam Al-Quran</h2>
      <p>Al-Quran mengajarkan kaidah-kaidah berbicara yang sangat indah untuk diterapkan dalam keluarga:</p>
      <ul>
        <li><strong>Qaulan Sadida (Perkataan yang Benar):</strong> Jujur, tidak berbohong, dan langsung pada pokok masalah tanpa berbelit-belit.</li>
        <li><strong>Qaulan Ma'rufa (Perkataan yang Baik):</strong> Kata-kata yang pantas, sopan, dan tidak menyinggung perasaan pasangan.</li>
        <li><strong>Qaulan Layyina (Perkataan yang Lembut):</strong> Nada bicara yang rendah, tidak membentak. Ini dicontohkan bahkan saat Nabi Musa diperintah berdakwah kepada Firaun.</li>
        <li><strong>Qaulan Karima (Perkataan yang Mulia):</strong> Memuliakan lawan bicara, terutama kepada orang tua atau pasangan.</li>
      </ul>

      <h2>Menghidupkan "Quality Time" Islami</h2>
      <p>Di tengah kesibukan, keluarga harus memiliki waktu khusus:</p>
      <ol>
        <li><strong>Shalat Berjamaah:</strong> Minimal satu waktu dalam sehari (misalnya Maghrib) dilakukan berjamaah di rumah.</li>
        <li><strong>Makan Bersama:</strong> Rasulullah menganjurkan makan bersama dalam satu nampan/meja karena di situ turun keberkahan. Hindari main HP saat makan.</li>
        <li><strong>Musyawarah Keluarga (Syura):</strong> Libatkan istri dan anak dalam mengambil keputusan, misalnya mau liburan ke mana atau pembagian tugas rumah.</li>
      </ol>

      <p>Ingatlah, Rasulullah SAW adalah orang yang paling baik akhlaknya kepada keluarganya. Beliau bersabda: <em>"Sebaik-baik kalian adalah yang paling baik terhadap keluarganya, dan aku adalah orang yang paling baik di antara kalian terhadap keluargaku."</em> (HR. Tirmidzi)</p>
    `,
    rubrik: rubriks[3], // Keluarga
    author: "Ustadz Hasan Basri",
    date: "2025-12-22",
    imageUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop",
    views: 1456,
    readTime: 5,
  },

  // --- ARTIKEL 5: MUAMALAH ---
  {
    id: "5",
    title: "Etika Berbisnis dalam Islam: Panduan Praktis",
    slug: "etika-berbisnis-dalam-islam",
    excerpt:
      "Islam mengatur seluruh aspek kehidupan termasuk berbisnis. Kenali etika dan prinsip bisnis yang sesuai syariat.",
    content: `
      <p>Islam tidak melarang umatnya menjadi kaya raya. Bahkan, Rasulullah SAW dan para sahabat seperti Utsman bin Affan dan Abdurrahman bin Auf adalah pebisnis sukses. Namun, Islam memberikan rambu-rambu agar harta yang didapat menjadi berkah dan tidak melalaikan dari akhirat.</p>

      <h2>Prinsip Utama Bisnis Syariah</h2>
      <p>Agar bisnis bernilai ibadah, perhatikan prinsip berikut:</p>
      
      <h3>1. Kejujuran (Ash-Shidq)</h3>
      <p>Rasulullah SAW bersabda, <em>"Pedagang yang jujur dan terpercaya akan dikumpulkan bersama para Nabi, orang-orang shiddiq, dan para syuhada."</em> (HR. Tirmidzi). Jangan menyembunyikan cacat barang dagangan.</p>

      <h3>2. Menjauhi Riba</h3>
      <p>Riba adalah dosa besar yang diperangi Allah dan Rasul-Nya. Pastikan modal dan transaksi bebas dari bunga bank konvensional atau akad-akad batil.</p>

      <h3>3. Tidak Ada Gharar (Ketidakjelasan)</h3>
      <p>Jual beli harus jelas barangnya, jelas harganya, dan jelas waktu serah terimanya. Hindari sistem "jual beli kucing dalam karung".</p>
      
      <h3>4. Menepati Janji dan Amanah</h3>
      <p>Jika berjanji barang sampai dalam 3 hari, usahakan tepati. Jika barang titipan, jagalah dengan baik.</p>

      <h2>Etika Modern: Transaksi Online</h2>
      <p>Di era digital, prinsip syariah tetap berlaku:</p>
      <ul>
        <li>Foto produk harus sesuai realita (tidak manipulatif).</li>
        <li>Testimoni tidak boleh palsu (fake order/review).</li>
        <li>Akad dropship harus jelas (apakah sebagai wakil atau pemilik barang) agar tidak menjual barang yang belum dimiliki.</li>
      </ul>

      <p>Bisnis bukan sekadar untung rugi materi, tapi surga neraka. Biarlah untung sedikit asal berkah, daripada untung banyak tapi dari jalan yang haram.</p>
    `,
    rubrik: rubriks[4], // Muamalah
    author: "Dr. Abdullah Rahman",
    date: "2025-12-21",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    views: 987,
    readTime: 6,
  },

  // --- ARTIKEL 6-25 (Dikompres agar tidak terlalu panjang) ---
  {
    id: "6",
    title: "Keutamaan Sedekah dan Dampaknya bagi Pemberi",
    slug: "keutamaan-sedekah-dampak-pemberi",
    excerpt:
      "Sedekah tidak akan mengurangi harta. Justru sebaliknya, sedekah membawa berkah dan kelapangan rezeki.",
    content: `<p>Sedekah adalah salah satu amalan yang sangat dicintai Allah...</p>`,
    rubrik: rubriks[0],
    author: "Ustadz Ahmad Zainuddin",
    date: "2025-12-20",
    imageUrl:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop",
    views: 2100,
    readTime: 4,
  },
  {
    id: "7",
    title: "Panduan Puasa Sunnah Senin Kamis",
    slug: "panduan-puasa-sunnah-senin-kamis",
    excerpt:
      "Puasa Senin Kamis adalah sunnah Rasulullah yang memiliki banyak keutamaan. Berikut panduan lengkapnya.",
    content: `<p>Puasa Senin dan Kamis adalah puasa sunnah yang rutin dikerjakan Rasulullah SAW...</p>`,
    rubrik: rubriks[1],
    author: "Ustadz Muhammad Faisal",
    date: "2025-12-19",
    imageUrl:
      "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=800&h=600&fit=crop",
    views: 1678,
    readTime: 5,
  },
  {
    id: "8",
    title: "Mendidik Anak dengan Kasih Sayang ala Rasulullah",
    slug: "mendidik-anak-kasih-sayang-rasulullah",
    excerpt:
      "Rasulullah SAW adalah teladan terbaik dalam mendidik anak. Beliau mendidik dengan kasih sayang, bukan kekerasan.",
    content: `<p>Anak adalah amanah dari Allah yang harus dijaga dan dididik dengan baik...</p>`,
    rubrik: rubriks[3],
    author: "Ustadzah Fatimah Azzahra",
    date: "2025-12-18",
    imageUrl:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=600&fit=crop",
    views: 2456,
    readTime: 6,
  },
  {
    id: "9",
    title: "Zikir Pagi dan Petang: Benteng Diri Muslim",
    slug: "zikir-pagi-petang-benteng-muslim",
    excerpt:
      "Zikir pagi dan petang adalah amalan yang melindungi diri dari berbagai kejahatan. Amalkan setiap hari untuk ketenangan jiwa.",
    content: `<p>Zikir pagi dan petang adalah amalan yang sangat dianjurkan...</p>`,
    rubrik: rubriks[2],
    author: "Ustadz Hasan Basri",
    date: "2025-12-17",
    imageUrl:
      "https://images.unsplash.com/photo-1473181488821-2d23949a045a?w=800&h=600&fit=crop",
    views: 3210,
    readTime: 5,
  },
  {
    id: "10",
    title: "Halal dan Haram dalam Investasi Modern",
    slug: "halal-haram-investasi-modern",
    excerpt:
      "Dunia investasi semakin beragam. Pelajari mana yang halal dan mana yang harus dihindari menurut syariat Islam.",
    content: `<p>Investasi adalah salah satu cara mengembangkan harta...</p>`,
    rubrik: rubriks[4],
    author: "Dr. Abdullah Rahman",
    date: "2025-12-16",
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
    views: 1845,
    readTime: 7,
  },
  {
    id: "11",
    title: "Hukum Menggunakan Paylater dalam Pandangan Islam",
    slug: "hukum-paylater-dalam-islam",
    excerpt:
      "Fenomena Paylater semakin marak. Apakah fitur ini termasuk riba yang dilarang atau diperbolehkan dengan syarat tertentu?",
    content: `<p>Pembahasan mendalam mengenai Paylater...</p>`,
    rubrik: rubriks[4],
    author: "Dr. Abdullah Rahman",
    date: "2025-12-15",
    imageUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    views: 4500,
    readTime: 6,
  },
  {
    id: "12",
    title: "Adab Bertamu dan Menerima Tamu",
    slug: "adab-bertamu-dan-menerima-tamu",
    excerpt:
      "Memuliakan tamu adalah tanda keimanan. Pelajari adab-adab bertamu agar kunjungan membawa keberkahan.",
    content: `<p>Tamu adalah raja dalam Islam...</p>`,
    rubrik: rubriks[0],
    author: "Ustadz Ahmad Zainuddin",
    date: "2025-12-14",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
    views: 890,
    readTime: 4,
  },
  {
    id: "13",
    title: "Fiqih Wanita: Darah Kebiasaan Wanita",
    slug: "fiqih-wanita-haid-nifas",
    excerpt:
      "Penjelasan mendalam mengenai hukum haid, nifas, dan istihadhah yang wajib diketahui setiap muslimah.",
    content: `<p>Pembahasan fiqih darah wanita...</p>`,
    rubrik: rubriks[1],
    author: "Ustadzah Fatimah Azzahra",
    date: "2025-12-13",
    imageUrl:
      "https://images.unsplash.com/photo-1528644490543-141957fafe00?w=800&h=600&fit=crop",
    views: 5600,
    readTime: 10,
  },
  {
    id: "14",
    title: "Tips Menghadapi Mertua dan Menantu agar Harmonis",
    slug: "tips-harmonis-mertua-menantu",
    excerpt:
      "Konflik mertua dan menantu sering terjadi. Islam memberikan panduan indah bagaimana menyatukan dua hati ini.",
    content: `<p>Tips menjaga hubungan keluarga besar...</p>`,
    rubrik: rubriks[3],
    author: "Ustadz Hasan Basri",
    date: "2025-12-12",
    imageUrl:
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&h=600&fit=crop",
    views: 3100,
    readTime: 6,
  },
  {
    id: "15",
    title: "Makna Ikhlas dalam Beramal",
    slug: "makna-ikhlas-dalam-beramal",
    excerpt:
      "Ikhlas adalah ruh dari setiap amal. Tanpa ikhlas, amal sebesar gunung pun tak bernilai di sisi Allah.",
    content: `<p>Ikhlas itu berat, namun balasannya surga...</p>`,
    rubrik: rubriks[2],
    author: "Ustadz Muhammad Faisal",
    date: "2025-12-11",
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
    views: 1200,
    readTime: 5,
  },
  {
    id: "16",
    title: "Bahaya Sifat Pemarah (Ghadab)",
    slug: "bahaya-sifat-pemarah",
    excerpt:
      "Marah itu manusiawi, namun jika tidak dikendalikan, ia bisa menghancurkan hubungan dan membinasakan diri.",
    content: `<p>La taghdob walakal jannah...</p>`,
    rubrik: rubriks[2],
    author: "Ustadz Ahmad Zainuddin",
    date: "2025-12-10",
    imageUrl:
      "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=800&h=600&fit=crop",
    views: 1400,
    readTime: 4,
  },
  {
    id: "17",
    title: "Hukum Jual Beli Online (Dropship & Reseller)",
    slug: "hukum-jual-beli-online",
    excerpt:
      "Bagaimana pandangan Islam mengenai sistem dropshipping yang populer saat ini? Simak penjelasan rincinya.",
    content: `<p>Hukum dropship dan reseller...</p>`,
    rubrik: rubriks[4],
    author: "Dr. Abdullah Rahman",
    date: "2025-12-09",
    imageUrl:
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=800&h=600&fit=crop",
    views: 2900,
    readTime: 8,
  },
  {
    id: "18",
    title: "Keutamaan Shalat Dhuha: Pembuka Pintu Rezeki",
    slug: "keutamaan-shalat-dhuha",
    excerpt:
      "Shalat Dhuha sering disebut sebagai shalat awwabin. Rutinkan Dhuha, niscaya Allah cukupkan kebutuhanmu.",
    content: `<p>Tata cara shalat dhuha...</p>`,
    rubrik: rubriks[1],
    author: "Ustadz Muhammad Faisal",
    date: "2025-12-08",
    imageUrl:
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=800&h=600&fit=crop",
    views: 4100,
    readTime: 5,
  },
  {
    id: "19",
    title: "Pentingnya Pendidikan Seks Usia Dini dalam Islam",
    slug: "pendidikan-seks-usia-dini-islam",
    excerpt:
      "Jangan tabu bicara soal seksualitas pada anak. Islam punya kurikulum tarbiyah jinsiyah yang menjaga fitrah anak.",
    content: `<p>Pendidikan seksualitas dalam Islam...</p>`,
    rubrik: rubriks[3],
    author: "Ustadzah Fatimah Azzahra",
    date: "2025-12-07",
    imageUrl:
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=800&h=600&fit=crop",
    views: 3300,
    readTime: 7,
  },
  {
    id: "20",
    title: "Adab Bergaul dengan Lawan Jenis",
    slug: "adab-bergaul-lawan-jenis",
    excerpt:
      "Di era modern, interaksi laki-laki dan perempuan semakin bebas. Mari kembali pada batasan syariat (ikhtilat & khalwat).",
    content: `<p>Batasan pergaulan dalam Islam...</p>`,
    rubrik: rubriks[0],
    author: "Ustadz Hasan Basri",
    date: "2025-12-06",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
    views: 2750,
    readTime: 6,
  },
  {
    id: "21",
    title: "Wakaf Produktif: Amal Jariyah Abadi",
    slug: "wakaf-produktif-amal-jariyah",
    excerpt:
      "Wakaf bukan hanya masjid dan kuburan. Wakaf uang dan saham kini menjadi instrumen pemberdayaan umat yang dahsyat.",
    content: `<p>Mengenal wakaf produktif...</p>`,
    rubrik: rubriks[4],
    author: "Dr. Abdullah Rahman",
    date: "2025-12-05",
    imageUrl:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop",
    views: 1100,
    readTime: 5,
  },
  {
    id: "22",
    title: "Cara Bertaubat Nasuha dari Dosa Besar",
    slug: "cara-bertaubat-nasuha",
    excerpt:
      "Pintu ampunan Allah selalu terbuka luas. Jangan berputus asa, segeralah kembali kepada-Nya dengan taubat nasuha.",
    content: `<p>Syarat taubat nasuha...</p>`,
    rubrik: rubriks[2],
    author: "Ustadz Ahmad Zainuddin",
    date: "2025-12-04",
    imageUrl:
      "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=800&h=600&fit=crop",
    views: 5200,
    readTime: 6,
  },
  {
    id: "23",
    title: "Sujud Sahwi: Penyempurna Kekurangan Shalat",
    slug: "sujud-sahwi-penyempurna-shalat",
    excerpt:
      "Lupa rakaat atau tasyahud awal saat shalat? Jangan khawatir, syariat mengajarkan sujud sahwi sebagai solusinya.",
    content: `<p>Tata cara sujud sahwi...</p>`,
    rubrik: rubriks[1],
    author: "Ustadz Muhammad Faisal",
    date: "2025-12-03",
    imageUrl:
      "https://images.unsplash.com/photo-1583485573477-05c069b2d973?w=800&h=600&fit=crop",
    views: 1900,
    readTime: 4,
  },
  {
    id: "24",
    title: "Ayah, Sosok Penting dalam Pendidikan Anak",
    slug: "peran-ayah-pendidikan-anak",
    excerpt:
      "Pengasuhan bukan hanya tugas ibu. Al-Quran mengabadikan nasihat Luqman kepada anaknya sebagai bukti pentingnya peran ayah.",
    content: `<p>Kisah Luqman Al Hakim...</p>`,
    rubrik: rubriks[3],
    author: "Ustadz Hasan Basri",
    date: "2025-12-02",
    imageUrl:
      "https://images.unsplash.com/photo-1497290756760-23ac55edf36f?w=800&h=600&fit=crop",
    views: 2800,
    readTime: 5,
  },
  {
    id: "25",
    title: "Birrul Walidain: Berbakti Meski Orang Tua Sudah Tiada",
    slug: "birrul-walidain-orang-tua-wafat",
    excerpt:
      "Kewajiban berbakti tidak putus oleh kematian. Inilah cara-cara mengirimkan pahala kepada orang tua yang sudah wafat.",
    content: `<p>Cara berbakti pada orang tua yang sudah wafat...</p>`,
    rubrik: rubriks[0],
    author: "Ustadz Ahmad Zainuddin",
    date: "2025-12-01",
    imageUrl:
      "https://images.unsplash.com/photo-1518640027989-d1f5d60d3771?w=800&h=600&fit=crop",
    views: 6500,
    readTime: 5,
  },
];

// --- 3. DATA KHAZANAH ---
export const khazanah: Khazanah[] = [
  {
    id: "1",
    title: "Tafsir Surah Al-Fatihah: Induk Al-Quran",
    slug: "tafsir-surah-al-fatihah",
    type: "tafsir",
    excerpt:
      "Al-Fatihah disebut Ummul Quran karena mengandung pokok-pokok ajaran Islam. Mari mendalami maknanya.",
    content: `
      <p>Surah Al-Fatihah adalah surah pertama dalam Al-Quran dan disebut sebagai Ummul Quran (induk Al-Quran) karena mengandung intisari seluruh ajaran Islam.</p>
      <h2>Kandungan Surah Al-Fatihah</h2>
      <ul>
        <li>Pujian kepada Allah (ayat 1-4)</li>
        <li>Pengakuan hanya menyembah Allah (ayat 5)</li>
        <li>Permohonan hidayah (ayat 6-7)</li>
      </ul>
    `,
    source: "Tafsir Ibnu Katsir",
    imageUrl:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    title: "Hadits Arbain: 40 Hadits Pilihan Imam Nawawi",
    slug: "hadits-arbain-nawawi",
    type: "hadits",
    excerpt:
      "Kumpulan 40 hadits pilihan yang menjadi fondasi ajaran Islam, dikumpulkan oleh Imam An-Nawawi.",
    content: `
      <p>Hadits Arbain An-Nawawi adalah kumpulan 40 hadits yang dipilih oleh Imam An-Nawawi karena mencakup pokok-pokok ajaran Islam.</p>
      <h2>Hadits Pertama: Niat</h2>
      <p>"Sesungguhnya setiap amal tergantung pada niatnya, dan setiap orang hanya mendapatkan sesuai dengan yang ia niatkan..." (HR. Bukhari Muslim)</p>
    `,
    source: "Imam An-Nawawi",
    imageUrl:
      "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    title: "Kumpulan Doa Sehari-hari",
    slug: "kumpulan-doa-sehari-hari",
    type: "doa",
    excerpt:
      "Doa-doa harian yang diajarkan Rasulullah SAW untuk diamalkan dalam setiap aktivitas.",
    content: `
      <p>Rasulullah SAW mengajarkan banyak doa untuk setiap aktivitas harian. Dengan berdoa, setiap aktivitas menjadi bernilai ibadah.</p>
      <h2>Doa Bangun Tidur</h2>
      <p>الحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَمَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ</p>
    `,
    source: "Hisnul Muslim",
    imageUrl:
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    title: "Kisah Sahabat: Abu Bakar Ash-Shiddiq",
    slug: "kisah-abu-bakar-shiddiq",
    type: "kisah",
    excerpt:
      "Perjalanan hidup sahabat terdekat Rasulullah yang mendapat gelar Ash-Shiddiq karena keimanannya.",
    content: `
      <p>Abu Bakar adalah sahabat terdekat Rasulullah SAW dan orang pertama yang masuk Islam dari kalangan pria dewasa. Ia mendapat gelar Ash-Shiddiq karena selalu membenarkan Rasulullah.</p>
    `,
    source: "Siyar A'lam An-Nubala",
    imageUrl:
      "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=600&fit=crop",
  },
];

// --- 4. HELPER FUNCTIONS ---
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByRubrik(rubrikSlug: string): Article[] {
  return articles.filter((article) => article.rubrik.slug === rubrikSlug);
}

export function getRubrikBySlug(slug: string): Rubrik | undefined {
  return rubriks.find((rubrik) => rubrik.slug === slug);
}

export function getRelatedArticles(
  currentSlug: string,
  limit: number = 3
): Article[] {
  const currentArticle = getArticleBySlug(currentSlug);
  if (!currentArticle) return articles.slice(0, limit);

  return articles
    .filter(
      (article) =>
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
  return [...articles].sort((a, b) => b.views - a.views).slice(0, limit);
}

export function getKhazanahBySlug(slug: string): Khazanah | undefined {
  return khazanah.find((item) => item.slug === slug);
}
