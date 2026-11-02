import { VocationalProgram, ProjectSimulation } from '../types';

export const VOCATIONAL_PROGRAMS: VocationalProgram[] = [
  {
    id: 'tkj',
    code: 'TKJ',
    title: 'Teknik Komputer & Jaringan',
    cluster: 'Teknologi Informasi & Komunikasi',
    description: 'Instalasi jaringan kabel LAN/UTP, konfigurasi router Wi-Fi, manajemen bandwidth hotspot, dan keamanan jaringan komputer.',
    prototypeExamples: ['Mini Hotspot Voucher Wi-Fi Sekolah', 'Server Berkas Mini Portabel Samba', 'Sistem Pengawas CCTV IP Sederhana'],
    essentialTools: ['Tang Crimping RJ45', 'LAN Cable Tester', 'Obeng Presisi', 'Multimeter'],
    icon: 'Network',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    id: 'tbsm',
    code: 'TBSM',
    title: 'Teknik Bisnis Sepeda Motor',
    cluster: 'Teknologi Rekayasa & Otomotif',
    description: 'Perawatan berkala sistem pengapian, servis injeksi dan karburator, pengereman cakram/tromol, dan kelistrikan bodi motor.',
    prototypeExamples: ['Meja Uji Servis Busi & Karburator', 'Simulator Kelistrikan Lampu Sein & Klakson', 'Tester Pompa Injeksi Portabel'],
    essentialTools: ['Kunci Busi Fleksibel', 'Feeler Gauge', 'Obeng Karburator', 'Multitester Digital'],
    icon: 'Wrench',
    color: 'from-amber-600 to-orange-600',
  },
  {
    id: 'rpl',
    code: 'RPL',
    title: 'Rekayasa Perangkat Lunak',
    cluster: 'Teknologi Informasi & Komunikasi',
    description: 'Pengembangan aplikasi web, basis data kasir toko sekolah, dan purwarupa sistem inventaris barang lab SMK.',
    prototypeExamples: ['Aplikasi Kasir Mini Kantin Sekolah (PWA)', 'Sistem Presensi QR Code Siswa', 'Katalog Digital Produk Kreatif SMK'],
    essentialTools: ['Laptop / PC Komputer', 'Browser & Editor Kode', 'Webcam / Kamera HP'],
    icon: 'Code',
    color: 'from-indigo-600 to-purple-600',
  },
  {
    id: 'tata-boga',
    code: 'KULINER',
    title: 'Tata Boga & Usaha Kuliner',
    cluster: 'Pariwisata & Kuliner',
    description: 'Pembuatan aneka roti manis, pengolahan minuman herbal lokal, penataan hidangan (plating), dan pengemasan food-grade.',
    prototypeExamples: ['Bakery Roti Manis Isi Cokelat Keju Skala Lab', 'Kemasan Siap Saji Sambal Khas Daerah', 'Mockup Minuman Segar Herbal Botolan'],
    essentialTools: ['Timbangan Digital Dapur', 'Oven Mini / Panci Kukus', 'Mixer Tangan / Spatula Silikon', 'Termometer Makanan'],
    icon: 'UtensilsCrossed',
    color: 'from-rose-600 to-pink-600',
  },
  {
    id: 'agribisnis',
    code: 'ATPH',
    title: 'Agribisnis Tanaman & Hidroponik',
    cluster: 'Pertanian & Agribisnis',
    description: 'Budidaya sayuran daun perkotaan dengan sistem rakit apung / NFT, peracikan nutrisi AB Mix, dan pengujian pH air.',
    prototypeExamples: ['Miniatur Instalasi Hidroponik Rakit Apung Botol Bekas', 'Sistem Pengairan Tetes Gravitasi', 'Bibit Microgreens Skala Rumahan'],
    essentialTools: ['TDS Meter & pH Tester', 'Gergaji Mini / Solder Lubang Netpot', 'Gelas Ukur Takaran'],
    icon: 'Sprout',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'dkv',
    code: 'DKV',
    title: 'Desain Komunikasi Visual',
    cluster: 'Seni & Ekonomi Kreatif',
    description: 'Pembuatan identitas jenama (branding logo), desain kemasan produk UMKM lokal, stiker label die-cut, dan fotografi produk.',
    prototypeExamples: ['Purwarupa Mockup Kemasan Produk Kopi Lokal', 'Stiker Label Vinyl Tahan Air Produk Sekolah', 'Brosur Lipat Tiga Promosi Jurusan'],
    essentialTools: ['Cutting Mat & Cutter Presisi', 'Penggaris Baja', 'Software Grafis / Smartphone', 'Printer Warna'],
    icon: 'Palette',
    color: 'from-purple-600 to-fuchsia-600',
  },
  {
    id: 'tata-busana',
    code: 'TB',
    title: 'Tata Busana & Kriya Tekstil',
    cluster: 'Seni Kreatif & Industri Kerajinan',
    description: 'Pembuatan pola dasar busana kerja, teknik jahit tindas lurus, pembuatan tote bag kanvas ecoprint, dan finishing kancing.',
    prototypeExamples: ['Tote Bag Kanvas Kombinasi Perca Tenun Lokal', 'Masker Kain 3-Ply Ergonomis', 'Celemek Kerja (Apron) Bengkel Sekolah'],
    essentialTools: ['Mesin Jahit Portable / Jarum Tangan', 'Gunting Kain Khusus', 'Pita Meteran Jahit', 'Kapur Jahit'],
    icon: 'Scissors',
    color: 'from-fuchsia-600 to-pink-600',
  },
  {
    id: 'listrik',
    code: 'TITL',
    title: 'Teknik Instalasi Tenaga Listrik',
    cluster: 'Teknologi & Rekayasa',
    description: 'Pemasangan instalasi penerangan 1 fasa, sakelar ganda, stop kontak pengaman, dan perakitan panel mini MCB.',
    prototypeExamples: ['Papan Latih (Trainer Board) Sakelar Hotel & Lampu Penerangan', 'Sistem Sakelar Otomatis Sensor Cahaya LDR', 'Kabel Roll Stop Kontak Berpengaman'],
    essentialTools: ['Tang Kombinasi & Tang Kupas Kabel', 'Tespen Indikator Tegangan', 'Obeng VDE Isolasi 1000V', 'Multitester Analog/Digital'],
    icon: 'Zap',
    color: 'from-yellow-600 to-amber-600',
  },
  {
    id: 'pengelasan',
    code: 'TPL',
    title: 'Teknik Pengelasan & Fabrikasi',
    cluster: 'Teknologi & Rekayasa Mesin',
    description: 'Pengelasan SMAW sambungan tumpul (butt joint) dan sambungan sudut (tee joint) pada pelat baja lunak dengan elektroda E6013.',
    prototypeExamples: ['Rangka Rak Bunga Besi Minimalis', 'Gantungan Helm Bengkel Ergonomis', 'Bangku Kerja Kaki Besi Pipa Hollow'],
    essentialTools: ['Topeng Las Auto-Darkening', 'Palu Terak & Sikat Baja', 'Gerinda Tangan Pembersih', 'Tang Klem C'],
    icon: 'Flame',
    color: 'from-red-600 to-orange-600',
  },
];

export const INITIAL_SAVED_PROJECTS: ProjectSimulation[] = [
  {
    id: 'proj-init-1',
    title: 'Purwarupa Mini Hotspot Wi-Fi Voucher & Jaringan Kabel Terstruktur',
    profession: 'Teknisi Jaringan Wi-Fi & Administrator Lab',
    tagline: 'Simulasi Sistem Jaringan Nirkabel Berbasis Router Rumahan Bekas SMKN 4 Kendari',
    overview: 'Proyek simulasi ini melatih siswa mengkonfigurasi Access Point nirkabel dengan sistem halaman login (Captive Portal), pembatasan kecepatan bandwidth, dan pengetesan redaman sinyal di lingkungan gedung sekolah.',
    learningObjectives: [
      'Membuat kabel patch UTP Cat5e standar T568B dengan akurasi 100% pada pin tester',
      'Mengkonfigurasi SSID, security WPA2/WPA3, dan IP DHCP Server pada router',
      'Menganalisis kekuatan sinyal (RSSI) menggunakan aplikasi Wi-Fi Analyzer',
      'Menyusun prosedur keselamatan instalasi kabel jaringan sekolah',
    ],
    difficulty: 'Menengah',
    estimatedTime: '3 x 45 Menit',
    prototypeOutput: 'Satu unit mini hotspot terpasang pada rak trainer dengan 2 kabel LAN teruji dan jaringan Wi-Fi login siap pakai.',
    entrepreneurshipOpportunity: 'Jasa instalasi jaringan Wi-Fi rumah tinggal, pemasangan router repeater di perumahan, dan maintenance warnet / kafe mini.',
    toolsUsed: ['Tang Crimping RJ-45', 'LAN Cable Tester', 'Cutter Pengupas Kabel', 'Laptop Penguji', 'Smartphone Wi-Fi Analyzer'],
    materialsUsed: ['Kabel UTP Cat 5e (5 meter)', 'Konektor RJ-45 (8 buah)', 'Router Wi-Fi Bekas TP-Link', 'Kabel Ties', 'Label Port'],
    steps: [
      {
        id: 'step-1-1',
        stepNumber: 1,
        title: 'Pemeriksaan Alat, Bahan & Kesiapan APD (K3)',
        description: 'Periksa kebersihan mata pisau tang crimping, baterai 9V pada LAN tester, serta kondisi fisik adaptor router. Kenakan kacamata pelindung saat mengupas jaket kabel.',
        safetyNote: 'Hati-hati dengan serpihan tembaga tajam dari kabel UTP yang terpotong.',
        expectedResult: 'Semua alat dan bahan di inventarisasi lengkap di atas meja kerja lab.',
        completed: true,
        notes: 'Alat lengkap di lab TKJ SMKN 4 Kendari, tester kabel bekerja normal.',
      },
      {
        id: 'step-1-2',
        stepNumber: 2,
        title: 'Pemotongan & Pengupasan Kabel UTP Standard T568B',
        description: 'Kupas jaket luar kabel UTP sepanjang 2 cm. Luruskan dan urutkan 8 kabel sesuai standar T568B: Putih Oranye, Oranye, Putih Hijau, Biru, Putih Biru, Hijau, Putih Cokelat, Cokelat.',
        safetyNote: 'Jangan sampai menggores atau memotong isolasi kabel bagian dalam saat mengupas.',
        expectedResult: 'Urutan warna kabel lurus, rapi, dan rata sebelum dimasukkan ke kepala RJ-45.',
        completed: true,
        notes: 'Dua kabel patchcord 1.5 meter selesai dipotong rapi.',
      },
      {
        id: 'step-1-3',
        stepNumber: 3,
        title: 'Crimping Konektor RJ-45 & Pengujian Kontinuitas Pin',
        description: 'Dorong susunan kabel ke dalam konektor RJ-45 hingga menyentuh pin tembaga di ujung. Gunakan tang crimping dan tekan mantap hingga berbunyi klik. Pasang kedua ujung ke LAN Tester.',
        safetyNote: 'Pastikan jaket luar kabel ikut terjepit oleh penjepit plastik di dalam RJ-45 agar tidak mudah copot.',
        expectedResult: 'Lampu LED indikator 1 sampai 8 menyala berurutan secara sinkron tanpa putus atau bersilang.',
        completed: false,
        notes: 'Sedang diverifikasi bersama instruktur lab.',
      },
      {
        id: 'step-1-4',
        stepNumber: 4,
        title: 'Reset Pabrik & Konfigurasi IP Gateway Router',
        description: 'Tekan tombol reset pada router selama 10 detik. Hubungkan kabel LAN dari port LAN 1 router ke port laptop. Buka browser dan akses alamat gateway default (192.168.1.1 atau 192.168.0.1) untuk konfigurasi.',
        safetyNote: 'Gunakan adaptor dengan voltase dan ampere yang sesuai spesifikasi router (hindari adaptor acak).',
        expectedResult: 'Halaman web admin router berhasil terbuka dan login dengan kredensial baru.',
        completed: false,
        notes: '',
      },
      {
        id: 'step-1-5',
        stepNumber: 5,
        title: 'Pengaturan SSID, Password WPA2 & Uji Coverage Sinyal',
        description: 'Buat nama SSID unik misal "SMK4_Lab_Net". Atur password WPA2-PSK. Lakukan uji coba koneksi dari smartphone siswa dan ukur redaman sinyal pada jarak 1m, 5m, dan 10m dengan Wi-Fi Analyzer.',
        safetyNote: 'Hindari meletakkan router dekat benda logam tebal atau sumber panas.',
        expectedResult: 'Smartphone terhubung lancar, kekuatan sinyal di atas -65 dBm dengan ping stabil di bawah 20ms.',
        completed: false,
        notes: '',
      },
      {
        id: 'step-1-6',
        stepNumber: 6,
        title: 'Pemberian Labeling & Dokumentasi Jobsheet 5R',
        description: 'Tempelkan label identitas port dan IP address pada badan router. Rapikan sisa potongan kabel dan bersihkan meja kerja sesuai prinsip 5R (Ringkas, Rapi, Resik, Rawat, Rajin).',
        safetyNote: 'Pastikan steker adaptor dicabut dengan memegang kepala steker, bukan menarik kabelnya.',
        expectedResult: 'Dokumentasi foto dan jobsheet pengujian terisi lengkap.',
        completed: false,
        notes: '',
      },
    ],
    assessmentRubric: [
      { criteria: 'Kualitas Fisik Pengkabelan (Crimping)', weight: '30%', indicator: 'Kabel terkunci kuat, urutan warna sesuai standar T568B, tester 8-pin menyala berurutan.' },
      { criteria: 'Konfigurasi Jaringan & Keamanan', weight: '40%', indicator: 'IP address, DHCP pool, dan enkripsi nirkabel terkonfigurasi dengan benar tanpa konflik.' },
      { criteria: 'Kepatuhan K3 & Budaya 5R', weight: '30%', indicator: 'Penggunaan alat sesuai fungsi, kebersihan meja kerja, dan keselamatan instalasi.' },
    ],
    savedAt: '2026-11-01 10:30',
  },
  {
    id: 'proj-init-2',
    title: 'Meja Uji Servis Busi & Karburator Sepeda Motor 110cc',
    profession: 'Teknisi Servis Mesin Sepeda Motor (TBSM)',
    tagline: 'Simulasi Perawatan Berkala Sistem Bahan Bakar & Pengapian Motor Ringan',
    overview: 'Purwarupa modul meja praktikum untuk menyimulasikan prosedur inspeksi warna kepala busi, penyetelan celah elektroda dengan feeler gauge, serta overhaul pembersihan spuyer karburator sepeda motor.',
    learningObjectives: [
      'Mendiagnosis kondisi pembakaran mesin melalui warna elektroda busi',
      'Mengukur dan menyetel celah elektroda busi dengan toleransi 0.7 - 0.8 mm',
      'Membongkar mangkok karburator, pilot jet, dan main jet dengan aman',
      'Menerapkan K3 penanganan bahan bakar mudah terbakar di bengkel',
    ],
    difficulty: 'Menengah',
    estimatedTime: '2 x 45 Menit',
    prototypeOutput: 'Satu set dudukan pengujian busi dan karburator terkalibrasi siap pasang ke blok mesin.',
    entrepreneurshipOpportunity: 'Layanan servis panggilan tune-up motor siswa, perawatan berkala sepeda motor warga sekolah, dan penjualan suku cadang fast-moving.',
    toolsUsed: ['Kunci Busi Fleksibel 16mm', 'Feeler Gauge', 'Obeng Karburator (+/-)', 'Sikat Kawat Kuningan', 'Kuas Pembersih'],
    materialsUsed: ['Carb Cleaner Spray (1 kaleng)', 'Busi Bekas & Baru (2 buah)', 'Kain Majun', 'Baki Nampan Plastik', 'Amplas Halus Grid 400'],
    steps: [
      {
        id: 'step-2-1',
        stepNumber: 1,
        title: 'Persiapan Bengkel & APD Penanganan Bahan Bakar',
        description: 'Pastikan ventilasi bengkel terbuka lebar dan APAR siap di samping meja kerja. Pasang sarung tangan nitril dan kacamata keselamatan kerja.',
        safetyNote: 'Dilarang keras merokok atau memicu percikan api di sekitar area kerja karburator.',
        expectedResult: 'Area kerja aman dari potensi ledakan/api dan APD terpasang lengkap.',
        completed: true,
        notes: 'SOP K3 TBSM dipenuhi.',
      },
      {
        id: 'step-2-2',
        stepNumber: 2,
        title: 'Pelepasan & Inspeksi Visual Kondisi Pembakaran Busi',
        description: 'Gunakan kunci busi fleksibel untuk melepas busi. Amati warna isolator porselen: cokelat bata (normal), hitam pekat kering (campuran terlalu kaya/boros), atau putih pucat (terlalu miskin).',
        safetyNote: 'Jangan membuka busi saat mesin dalam kondisi masih sangat panas guna mencegah ulir silinder slek.',
        expectedResult: 'Status pembakaran teridentifikasi dan tercatat pada tabel jobsheet.',
        completed: true,
        notes: 'Busi uji menunjukkan jelaga karbon tipis, perlu pembersihan elektroda.',
      },
      {
        id: 'step-2-3',
        stepNumber: 3,
        title: 'Pembersihan Jelaga & Pengukuran Celah Elektroda (Feeler Gauge)',
        description: 'Bersihkan kerak karbon dengan sikat kawat kuningan dan semprotan pembersih. Selipkan bilah feeler gauge ukuran 0.70 mm di antara elektroda samping dan tengah. Setel celah dengan mengetuk lembut bila terlalu renggang.',
        safetyNote: 'Jangan menekan elektroda tengah karena porselen inti busi bisa retak.',
        expectedResult: 'Bilah feeler gauge 0.70 mm terasa seret pas meluncur di celah elektroda busi.',
        completed: false,
        notes: '',
      },
      {
        id: 'step-2-4',
        stepNumber: 4,
        title: 'Pembongkaran Karburator & Pembersihan Saluran Jet Udara',
        description: 'Lepas 2 baut mangkok karburator di atas nampan. Buka pelampung dan jarum pelampung. Buka pilot jet dan main jet menggunakan obeng min yang pas presisi. Semprot saluran lubang spuyer dengan carb cleaner hingga tembus.',
        safetyNote: 'Arahkan semprotan carb cleaner menjauhi mata karena bertekanan tinggi dan pedih di mata.',
        expectedResult: 'Lubang mikron pilot jet dan main jet bersih tembus cahaya tanpa sumbatan debu/endapan.',
        completed: false,
        notes: '',
      },
      {
        id: 'step-2-5',
        stepNumber: 5,
        title: 'Perakitan Kembali & Penyetelan Standar Sekrup Udara',
        description: 'Pasang kembali spuyer dan mangkok karburator dengan paking karet terpasang sempurna. Putar sekrup udara ke dalam hingga mentok lembut, lalu putar balik keluar 1.5 putaran sebagai patokan awal pabrikan.',
        safetyNote: 'Jangan mengencangkan baut karburator terlalu kencang karena bodi karburator berbahan babet mudah patah/retak.',
        expectedResult: 'Karburator terakit rapat tanpa ada part kecil yang tertinggal di nampan.',
        completed: false,
        notes: '',
      },
    ],
    assessmentRubric: [
      { criteria: 'Kecermatan Pengukuran & Kalibrasi', weight: '35%', indicator: 'Celah busi presisi sesuai spesifikasi manual servis dan tidak merusak elektroda.' },
      { criteria: 'Keterampilan Pembongkaran & Pembersihan', weight: '35%', indicator: 'Teknik membuka spuyer benar, tidak ada baut selek, saluran bahan bakar bersih.' },
      { criteria: 'SOP K3 & Manajemen Alat', weight: '30%', indicator: 'Penggunaan nampan kerja, APD, dan pembuangan limbah cairan pembersih secara bertanggung jawab.' },
    ],
    savedAt: '2026-11-01 14:15',
  },
  {
    id: 'proj-init-3',
    title: 'Purwarupa Miniatur Hidroponik Rakit Apung Botol Daur Ulang',
    profession: 'Wirausaha Agribisnis & Pertanian Modern',
    tagline: 'Simulasi Sistem Pertanian Perkotaan Berkelanjutan dengan Bahan Bekas Sekolah',
    overview: 'Proyek simulasi budidaya tanaman sayur daun (selada/kangkung) menggunakan wadah daur ulang botol air mineral dan styrofoam bekas, dilengkapi dengan kalibrasi larutan nutrisi AB Mix.',
    learningObjectives: [
      'Membuat sistem rakit apung aerasi pasif dari limbah botol plastik',
      'Meracik larutan pekatan AB Mix dan mengukur kepekatan dengan TDS meter (PPM)',
      'Memahami siklus serapan air dan nutrisi tanaman dalam skala purwarupa',
    ],
    difficulty: 'Pemula',
    estimatedTime: '2 x 45 Menit',
    prototypeOutput: '1 unit modul hidroponik botol daur ulang berisi 4 bibit siap bertumbuh dengan nutrisi terkalibrasi.',
    entrepreneurshipOpportunity: 'Penyediaan paket kit hidroponik sayur mini untuk perumahan perkotaan, suplier sayur organik hidroponik ke kantin sekolah.',
    toolsUsed: ['TDS & EC Meter Digital', 'Gunting / Cutter Tebal', 'Solder Listrik Pelubang', 'Gelas Ukur Takaran'],
    materialsUsed: ['Botol Plastik Bekas 1.5 Liter (4 buah)', 'Kain Flanel Sumbu Kapiler', 'Nutrisi AB Mix Sayur Daun', 'Rockwool / Busa Potong', 'Air Bersih'],
    steps: [
      {
        id: 'step-3-1',
        stepNumber: 1,
        title: 'Pembersihan & Pemotongan Botol Bekas Daur Ulang',
        description: 'Potong botol air mineral 1.5L menjadi 2 bagian pada sepertiga bagian atas. Balikkan bagian atas botol ke dalam bagian bawah sebagai wadah netpot dan reservoir nutrisi.',
        safetyNote: 'Gunakan cutter dengan hati-hati ke arah luar tubuh saat memotong plastik tebal.',
        expectedResult: 'Dua bagian botol presisi bersarang sempurna tanpa sisi tajam bergerigi.',
        completed: true,
        notes: '4 wadah botol bekas telah disiapkan dan dicuci bersih.',
      },
      {
        id: 'step-3-2',
        stepNumber: 2,
        title: 'Pembuatan Sumbu Kapiler Kain Flanel & Lubang Aerasi',
        description: 'Gunakan solder panas untuk melubangi tutup botol diameter 6mm. Selipkan potongan kain flanel lebar 1.5cm dan panjang 12cm melewati tutup botol hingga menjulur ke dasar wadah.',
        safetyNote: 'Lakukan pelubangan solder di tempat berventilasi untuk menghindari asap lelehan plastik.',
        expectedResult: 'Sumbu flanel terpasang kuat dan mampu menghisap air ke atas melalui gaya kapilaritas.',
        completed: true,
        notes: 'Kapilaritas teruji bekerja menyerap air dalam 1 menit.',
      },
      {
        id: 'step-3-3',
        stepNumber: 3,
        title: 'Peracikan Nutrisi AB Mix & Pengukuran TDS (500 - 800 PPM)',
        description: 'Campurkan masing-masing 5ml pekatan A dan 5ml pekatan B ke dalam 1 liter air baku. Aduk rata, lalu celupkan TDS meter. Pastikan angka terbaca di rentang 600 - 800 PPM untuk bibit muda.',
        safetyNote: 'Jangan mencampurkan pekatan A dan B secara langsung tanpa air pelarut agar tidak terjadi endapan kalsium.',
        expectedResult: 'Angka TDS meter stabil di angka 720 PPM dengan pH di kisaran 6.0 - 6.5.',
        completed: false,
        notes: '',
      },
      {
        id: 'step-3-4',
        stepNumber: 4,
        title: 'Pindah Tanam Bibit & Penataan Pada Rak Cahaya',
        description: 'Pindahkan bibit berdaun 3 helai yang tertanam di rockwool ke wadah botol. Pastikan bagian bawah rockwool menyentuh sumbu flanel basah. Letakkan di rak yang mendapat sinar matahari pagi minimal 4 jam.',
        safetyNote: 'Hindari sengatan matahari terik langsung tengah hari yang bisa memanaskan air reservoir.',
        expectedResult: 'Bibit berdiri tegak, sumbu mengalirkan nutrisi, dan tanaman tidak layu.',
        completed: false,
        notes: '',
      },
    ],
    assessmentRubric: [
      { criteria: 'Kerapian Purwarupa & Pemanfaatan Limbah', weight: '30%', indicator: 'Kerapian potongan botol, kebersihan wadah, dan fungsi sumbu kapiler.' },
      { criteria: 'Ketepatan Takaran Nutrisi (PPM & pH)', weight: '40%', indicator: 'PPM nutrisi sesuai fase pertumbuhan dan tidak terjadi pengendapan zat kimia.' },
      { criteria: 'Perencanaan Perawatan & Dokumentasi', weight: '30%', indicator: 'Kelengkapan jadwal pengamatan pertumbuhan pada jobsheet siswa.' },
    ],
    savedAt: '2026-11-01 16:40',
  },
];

export const SABLON_BAJU_PROJECT: ProjectSimulation = {
  id: 'proj-sablon-baju',
  title: 'Purwarupa Mini Lightbox Studio Foto Produk & Sablon Stensil Kaos Manual',
  profession: 'sablon baju',
  tagline: 'Simulasi Cetak Rintang Manual & Miniatur Studio Katalog Komersial SMKN 4 Kendari',
  overview:
    'Proyek ini mensimulasikan tugas inti desainer grafis dan wirausaha sablon: merancang pola vektor stensil logo/tipografi, memotong kertas stensil dengan cutter presisi, melakukan pencetakan rintang manual ke media kaos/kain perca dengan kuas spons akrilik, serta merakit mini lightbox kardus untuk dokumentasi katalog promosi komersial.',
  learningObjectives: [
    'Merancang dan memotong stensil pola vector presisi dengan cutter stensil',
    'Menerapkan teknik cetak rintang manual (dabbing spons) merata pada kain katun',
    'Merakit kotak mini lightbox difuser berkardus untuk foto produk komersial',
    'Menerapkan SOP K3 penanganan benda tajam dan pengeringan pigmen sablon',
  ],
  difficulty: 'Mudah',
  estimatedTime: '2-3 Jam',
  prototypeOutput:
    '1 unit mini lightbox fotografi produk berkardus dan 1 sampel sablon stensil pada kain/tote bag.',
  entrepreneurshipOpportunity:
    'Jasa pembuatan merchandise tote bag/kaos sablon satuan custom untuk komunitas lokal dan jasa fotografi produk UMKM sekolah.',
  toolsUsed: [
    'Cutter Presisi (Pen Cutter / Cutter Tajam)',
    'Gunting & Penggaris Besi',
    'Spons Cuci Piring / Kuas Busa / Rakel Miniatur',
    'Kamera Smartphone & Lampu Meja Belajar',
  ],
  materialsUsed: [
    'Kardus Bekas Ukuran Sedang (Kotak Sepatu / Mie Instan)',
    'Kertas HVS Putih atau Kertas Kalkir/Mika Tipis',
    'Cat Akrilik / Cat Tekstil Sablon',
    'Kain Perca Katun / Tote Bag Polos / Kaos Bekas',
    'Lakban Kertas (Masking Tape) / Selotip',
  ],
  steps: [
    {
      id: 'step-1',
      stepNumber: 1,
      title: 'Pemeriksaan Bahan Baku, Alat Potong & Kesiapan APD (K3)',
      description:
        'Siapkan alas potong (cutting mat atau kardus tebal pelindung meja). Pasang mata pisau cutter yang masih tajam dan presisi. Kenakan celemek kerja dan siapkan wadah buangan limbah kertas/cat.',
      safetyNote:
        'Pastikan bilah cutter tidak patah di tengah pemotongan; potong selalu menjauhi jari tangan penahan.',
      expectedResult:
        'Meja kerja siap dengan alas pelindung dan semua alat-bahan tertata rapi di posisinya.',
      completed: true,
      notes: 'Alat dan alas kardus potong telah disiapkan rapi.',
    },
    {
      id: 'step-2',
      stepNumber: 2,
      title: 'Perancangan Sketsa Pola Desain Vektor & Penempelan pada Media Stensil',
      description:
        'Gambarkan siluet logo atau tipografi desain pada kertas HVS atau print pola vektor sederhana (hindari detail pulau/island yang terputus tanpa jembatan stensil). Rekatkan kertas pola di atas plastik mika tipis atau kalkir menggunakan lakban kertas agar tidak bergeser.',
      safetyNote:
        'Perhatikan jembatan penghubung huruf berlubang (seperti huruf O, B, A, D) agar bagian tengah tidak rontok.',
      expectedResult:
        'Pola desain menempel stabil dan siap dipotong tanpa kerutan.',
      completed: true,
      notes: 'Pola tipografi teks SMKN 4 Kendari selesai dibuat.',
    },
    {
      id: 'step-3',
      stepNumber: 3,
      title: 'Pemotongan Presisi Pola Stensil Menggunakan Cutter & Cutting Mat',
      description:
        'Pegang pen cutter dengan sudut kemiringan 45 derajat menyerupai memegang pena. Potong garis kontur desain secara perlahan dan berkesinambungan. Gunakan penggaris besi khusus untuk garis lurus.',
      safetyNote:
        'Jaga jari tangan penahan penggaris tetap di belakang tepi potong penggaris.',
      expectedResult:
        'Pola stensil terpotong rapi dengan tepi tajam dan tanpa serabut bergerigi.',
      completed: false,
      notes: '',
    },
    {
      id: 'step-4',
      stepNumber: 4,
      title: 'Pembuatan Bodi Kotak Mini Lightbox Difuser dari Kardus Bekas',
      description:
        'Ambil kardus sepatu atau kardus mie instan. Lubangi jendela persegi berukuran 15x15 cm pada sisi kiri, kanan, dan atas. Tutup ketiga jendela tersebut dengan kertas HVS putih atau kalkir sebagai difuser cahaya lembut untuk fotografi produk komersial.',
      safetyNote:
        'Potong dinding kardus tebal dengan beberapa goresan bertahap, jangan dipaksakan sekali tekan.',
      expectedResult:
        'Kotak lightbox kubus berdiri kokoh dan kertas difuser terpasang kencang tanpa robek.',
      completed: false,
      notes: '',
    },
    {
      id: 'step-5',
      stepNumber: 5,
      title: 'Proses Cetak Sablon Stensil Manual (Dabbing Technique) pada Kain',
      description:
        'Letakkan kain kaos/tote bag di permukaan rata. Tempelkan kertas stensil dengan masking tape di sekelilingnya. Tuangkan sedikit cat akrilik/tekstil ke piring cat, celupkan spons spons cuci piring kering, lalu tepuk-tepukkan (dabbing) secara tegak lurus hingga warna merata.',
      safetyNote:
        'Jangan menggeser atau menyapukan spons secara horizontal agar cat tidak merembes ke bawah tepi stensil.',
      expectedResult:
        'Pigmen cat terdistribusi rata dengan ketebalan yang seragam di seluruh bidang desain.',
      completed: false,
      notes: '',
    },
    {
      id: 'step-6',
      stepNumber: 6,
      title: 'Pengeringan Sablon, Pemotretan Katalog & Evaluasi 5R',
      description:
        'Tunggu cat kering selama 15 menit, lalu lepas lakban dan kertas stensil perlahan. Letakkan produk bersablon ke dalam lightbox, nyalakan lampu dari samping jendela difuser, lalu potret katalog produk menggunakan smartphone.',
      safetyNote:
        'Bersihkan alat kuas spons dengan air bersih sebelum cat mengering permanen.',
      expectedResult:
        'Foto katalog produk sablon beresolusi tajam dengan pencahayaan studio profesional siap dipresentasikan.',
      completed: false,
      notes: '',
    },
  ],
  assessmentRubric: [
    {
      criteria: 'Kerapian Pemotongan Stensil & Cetak',
      weight: '35%',
      indicator:
        'Garis sablon tajam tanpa rembesan cat di luar batas pola stensil.',
    },
    {
      criteria: 'Kreativitas Pembuatan Mini Lightbox',
      weight: '30%',
      indicator:
        'Konstruksi kotak kokoh, kertas difuser terpasang rapi, dan efek pencahayaan merata.',
    },
    {
      criteria: 'Hasil Foto Katalog & Sikap Kerja K3',
      weight: '35%',
      indicator:
        'Foto produk estetik dengan sudut pengambilan profesional serta area kerja bersih rapi.',
    },
  ],
  reflectionQuestions: [
    'Bagaimana teknik dabbing spons mempengaruhi ketebalan dan ketajaman sablon pada media kain?',
    'Strategi apa yang dapat digunakan untuk mempercepat proses pengeringan tanpa merusak kualitas sablon?',
  ],
};

export const getDefaultProjectForProfession = (profession: string): ProjectSimulation => {
  const norm = (profession || '').toLowerCase();
  if (
    norm.includes('sablon') ||
    norm.includes('kaos') ||
    norm.includes('baju') ||
    norm.includes('stensil')
  ) {
    return { ...SABLON_BAJU_PROJECT, id: `proj-${Date.now()}` };
  }
  return {
    ...INITIAL_SAVED_PROJECTS[0],
    id: `proj-${Date.now()}`,
    profession: profession || 'Teknisi Kejuruan',
    title: `Purwarupa Simulasi Kejuruan: ${profession || 'Teknisi Kejuruan'}`,
  };
};

