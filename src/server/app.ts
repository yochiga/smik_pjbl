import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

export const app = express();

// Parse JSON bodies
app.use(express.json());

// Enable CORS for all incoming requests (crucial for serverless deployment)
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (_req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Path normalizer middleware for Vercel Serverless Functions and Express rewrites
app.use((req, _res, next) => {
  const matched = (req.headers['x-matched-path'] as string) || (req.headers['x-forwarded-uri'] as string);
  if (matched && matched !== '/api' && matched !== '/') {
    req.url = matched;
  }
  next();
});

// Helper to get Gemini Client with fresh env vars
function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback recommendations if offline or key is missing
function getFallbackRecommendations(profession: string) {
  const norm = profession.toLowerCase();

  if (norm.includes('jaringan') || norm.includes('wi-fi') || norm.includes('wifi') || norm.includes('tkj') || norm.includes('komputer')) {
    return {
      profession: profession || 'Teknisi Jaringan Wi-Fi & LAN',
      summary: 'Simulasi instalasi dan konfigurasi titik akses (Access Point) serta pengkabelan LAN UTP untuk kantor mini atau lab sekolah.',
      prototypeIdea: 'Purwarupa Mini Hotspot Wi-Fi Voucher & Jaringan Kabel Terstruktur dengan Router Rumahan Bekas',
      approach: 'Standar Vokasi SMK',
      difficulty: 'Mudah',
      estimatedTime: '2-3 Jam',
      whyRepresentative: 'Merepresentasikan tugas pokok Teknisi Jaringan Komputer: terminasi kabel UTP standard T568B, konfigurasi SSID/VLAN hotspot, dan pengujian throughput.',
      physicalOutput: '1 unit router mini hotspot terkonfigurasi dengan kabel patchcord UTP buatan siswa.',
      competencies: 'Crimping kabel UTP RJ-45 • Konfigurasi IP static/DHCP router • Pengujian sinyal RSSI nirkabel',
      recommendedTools: [
        { id: 't1', name: 'Tang Crimping RJ-45', category: 'Perkakas Tangan', importance: 'Wajib', description: 'Memasang konektor RJ45 ke kabel UTP', available: true, substituteTip: 'Bisa pinjam tang crimping bengkel lab TKJ atau gunakan kabel patchcord siap pakai' },
        { id: 't2', name: 'LAN Tester (Kabel Tester)', category: 'Alat Ukur', importance: 'Wajib', description: 'Menguji kontinuitas 8 pin kabel UTP', available: true, substituteTip: 'Bisa tes langsung dengan menghubungkan PC ke router dan cek lampu indikator LED port' },
        { id: 't3', name: 'Gunting / Cutter Pengupas Kabel', category: 'Perkakas Tangan', importance: 'Wajib', description: 'Mengupas jaket luar kabel tanpa memutus inti tembaga', available: true, substituteTip: 'Gunting dapur atau pisau lipat kecil dengan hati-hati' },
        { id: 't4', name: 'Laptop / PC dengan Port RJ-45 (atau adaptor USB-LAN)', category: 'Perangkat Uji', importance: 'Wajib', description: 'Konfigurasi IP address dan pengujian bandwidth', available: true, substituteTip: 'Bisa juga via smartphone terkoneksi Wi-Fi ke IP gateway default' },
        { id: 't5', name: 'Smartphone untuk Wi-Fi Analyzer App', category: 'Alat Ukur Digital', importance: 'Dianjurkan', description: 'Mengukur kekuatan sinyal (RSSI dBm) dan kanal frekuensi', available: true, substituteTip: 'Gunakan aplikasi gratis WiFi Analyzer dari PlayStore' },
      ],
      recommendedMaterials: [
        { id: 'm1', name: 'Kabel UTP Cat 5e / Cat 6 (3 - 5 meter)', category: 'Media Transmisi', importance: 'Wajib', description: 'Kabel penghubung antara router dan perangkat', estimatedQty: '5 meter', available: true, recycleAlternative: 'Gunakan sisa kabel potongan dari instalasi sebelumnya' },
        { id: 'm2', name: 'Konektor RJ-45', category: 'Bahan Habis Pakai', importance: 'Wajib', description: 'Konektor ujung kabel UTP standard T568B', estimatedQty: '6 - 10 buah', available: true, recycleAlternative: 'Sediakan cadangan untuk latihan crimping berulang' },
        { id: 'm3', name: 'Router Wi-Fi Bekas / TP-Link / Mikrotik', category: 'Perangkat Utama', importance: 'Wajib', description: 'Sebagai access point pemancar sinyal nirkabel', estimatedQty: '1 unit', available: true, recycleAlternative: 'Bisa gunakan router Wi-Fi rumahan bekas indihome/modem ADSL lama' },
        { id: 'm4', name: 'Kabel Ties & Label Sticker', category: 'Manajemen Kabel', importance: 'Dianjurkan', description: 'Merapikan dan memberi penomoran port jaringan', estimatedQty: '10 buah', available: true, recycleAlternative: 'Gunakan selotip kertas atau lakban kertas' },
      ],
      k3Protocols: [
        'Kacamata Pelindung & Alas Karet: Melindungi mata dari serpihan tembaga saat memotong kabel UTP.',
        'Pengecekan Arus Stop Kontak: Pastikan adaptor daya router tidak bocor tegangan atau kabel terkelupas.',
      ],
      tipsSekolah: 'Manfaatkan router lama di gudang sekolah SMKN 4 Kendari untuk di-reset ke pengaturan pabrik sebagai media latihan siswa.',
    };
  }

  if (norm.includes('busi') || norm.includes('karburator') || norm.includes('motor') || norm.includes('otomotif') || norm.includes('tbsm') || norm.includes('mesin')) {
    return {
      profession: profession || 'Teknisi Servis Sepeda Motor (Busi & Karburator)',
      summary: 'Simulasi pembersihan, penyetelan celah elektroda busi, dan kalibrasi pengabutan bahan bakar pada karburator sepeda motor.',
      prototypeIdea: 'Purwarupa Meja Uji Servis Ringan Sistem Pengapian & Bahan Bakar Menggunakan Karburator Bekas Praktek',
      approach: 'Standar Vokasi SMK',
      difficulty: 'Mudah',
      estimatedTime: '2-3 Jam',
      whyRepresentative: 'Merepresentasikan tugas pokok mekanik TBSM: diagnosis spark plug, pengukuran gap feeler gauge, serta penyetelan campuran udara & bahan bakar spuyer.',
      physicalOutput: '1 unit modul peraga karburator bersih terkalibrasi dan busi teruji gap elektroda.',
      competencies: 'Penggunaan Feeler Gauge • Prosedur pembongkaran dan pembersihan karburator • Penyetelan sekrup stasioner',
      recommendedTools: [
        { id: 't1', name: 'Kunci Busi Fleksibel 16mm / 18mm', category: 'Kunci Khusus', importance: 'Wajib', description: 'Membuka dan mengencangkan busi tanpa merusak ulir head silinder', available: true, substituteTip: 'Gunakan kunci busi bawaan toolkit motor' },
        { id: 't2', name: 'Feeler Gauge (Bilah Ukur Celah)', category: 'Alat Ukur Presisi', importance: 'Wajib', description: 'Mengukur kerenggangan celah elektroda busi (0.7 - 0.8 mm)', available: true, substituteTip: 'Dapat menggunakan amplas halus nomor 400 dan kawat pembatas darurat' },
        { id: 't3', name: 'Obeng Min (-) & Plus (+) Khusus Karburator', category: 'Perkakas Tangan', importance: 'Wajib', description: 'Membuka baut mangkok karburator dan menyetel spuyer angin', available: true, substituteTip: 'Pastikan mata obeng pas agar baut kuningan tidak selek' },
        { id: 't4', name: 'Sikat Kawat Kuningan & Kuas Kecil', category: 'Alat Pembersih', importance: 'Wajib', description: 'Membersihkan jelaga karbon pada elektroda busi', available: true, substituteTip: 'Sikat gigi bekas yang dipotong bulunya agar kaku' },
        { id: 't5', name: 'Pompa Udara / Kompresor Mini', category: 'Alat Tiup', importance: 'Dianjurkan', description: 'Meniup lubang spuyer pilot jet & main jet', available: true, substituteTip: 'Bisa menggunakan semprotan carb cleaner bertekanan pipa kecil' },
      ],
      recommendedMaterials: [
        { id: 'm1', name: 'Cairan Pembersih Karburator (Carb Cleaner)', category: 'Bahan Pembersih', importance: 'Wajib', description: 'Melarutkan getah bensin dan kerak karbon membandel', estimatedQty: '1 kaleng', available: true, recycleAlternative: 'Bensin murni/pertalite 200ml dalam wadah kaleng tertutup' },
        { id: 'm2', name: 'Busi Bekas Layak Pakai & Baru', category: 'Bahan Uji', importance: 'Wajib', description: 'Untuk perbandingan kondisi busi basah, normal, dan aus', estimatedQty: '2 buah', available: true, recycleAlternative: 'Busi bekas dari bengkel sekitar sekolah' },
        { id: 'm3', name: 'Kain Majun Bersih & Nampan Plastik', category: 'Perlengkapan Kerja', importance: 'Wajib', description: 'Wadah pembongkaran agar part kecil tidak tercecer', estimatedQty: '2 lembar kain & 1 nampan', available: true, recycleAlternative: 'Kardus bekas dilapisi plastik tebal atau baki makan plastik' },
        { id: 'm4', name: 'Amplas Halus Grid 400 - 600', category: 'Bahan Finishing', importance: 'Dianjurkan', description: 'Membersihkan kontak elektroda busi dari kerak', estimatedQty: '1 lembar', available: true, recycleAlternative: 'Tersedia di toko bangunan terdekat' },
      ],
      k3Protocols: [
        'Sarung Tangan Nitril & Masker: Mencegah iritasi kulit dari cairan kimia carb cleaner dan bensin.',
        'APAR (Alat Pemadam Api Ringan) / Pasir Kering: Pencegahan bahaya percikan api saat menangani bahan bakar.',
      ],
      tipsSekolah: 'Lakukan praktik di area berventilasi terbuka di workshop TBSM SMKN 4 Kendari dan jauhkan dari sumber api.',
    };
  }

  if (norm.includes('sablon') || norm.includes('kaos') || norm.includes('baju') || norm.includes('stensil')) {
    return {
      profession: profession || 'sablon baju',
      summary: 'Siswa tidak perlu lagi bingung menebak-nebak alat atau bahan apa yang dibutuhkan. AI telah merekomendasikan daftar alat dan bahan baku yang harus ada untuk membuat purwarupa representatif, lengkap dengan alternatif murah dan bahan daur ulang di sekitar siswa.',
      prototypeIdea: 'Purwarupa Mini Lightbox Studio Foto Produk & Sablon Stensil Kaos Manual',
      approach: 'Standar Vokasi SMK',
      difficulty: 'Mudah',
      estimatedTime: '2-3 Jam',
      whyRepresentative: 'Merepresentasikan tugas pokok Desainer Grafis & Industri Kreatif: perancangan template stensil pola vector, teknik cetak rintang manual (stencil screen printing), dan pencahayaan studio untuk katalog promosi komersial.',
      physicalOutput: '1 unit mini lightbox fotografi produk berkardus dan 1 sampel sablon stensil pada kain/tote bag.',
      competencies: 'Prinsip komposisi fotografi produk dan refleksi cahaya difusi studio • Teknik stensil pola pisau cutter presisi untuk sablon manual',
      recommendedTools: [
        {
          id: 't1',
          name: 'Cutter Presisi (Pen Cutter / Cutter Tajam)',
          importance: 'Wajib',
          description: 'Memotong detail pola stensil desain logo/huruf pada kertas rintang',
          available: true,
          substituteTip: 'Cutter standar dengan mata pisau baru yang dipatahkan ujungnya agar runcing',
        },
        {
          id: 't2',
          name: 'Gunting & Penggaris Besi',
          importance: 'Wajib',
          description: 'Mengukur dan memotong jendela pencahayaan pada bodi kardus lightbox',
          available: true,
          substituteTip: 'Penggaris plastik tebal dan gunting rumah biasa',
        },
        {
          id: 't3',
          name: 'Spons Cuci Piring / Kuas Busa / Rakel Miniatur',
          importance: 'Wajib',
          description: 'Alat penepuk (dabbing) cat akrilik agar merata menembus lubang pola stensil',
          available: true,
          substituteTip: 'Potongan spons cuci piring kering bersih',
        },
        {
          id: 't4',
          name: 'Kamera Smartphone & Lampu Meja Belajar',
          importance: 'Pendukung',
          description: 'Pencahayaan produk dari samping dan pengambilan foto katalog komersial',
          available: true,
          substituteTip: 'Senter HP atau diletakkan di dekat jendela luar ruangan',
        },
      ],
      recommendedMaterials: [
        {
          id: 'm1',
          name: 'Kardus Bekas Ukuran Sedang (Kotak Sepatu / Mie Instan)',
          estimatedQty: '1 buah',
          description: 'Bodi rangka kubus mini lightbox studio foto produk',
          available: true,
          recycleAlternative: 'Kardus bekas mie instan atau kardus paket belanja online',
        },
        {
          id: 'm2',
          name: 'Kertas HVS Putih atau Kertas Kalkir/Mika Tipis',
          estimatedQty: '3-4 lembar',
          description: 'Difuser cahaya lembut di jendela kardus dan media pemotongan pola stensil',
          available: true,
          recycleAlternative: 'Kertas HVS bekas yang masih bersih satu sisinya atau plastik mika jilid',
        },
        {
          id: 'm3',
          name: 'Cat Akrilik / Cat Tekstil Sablon',
          estimatedQty: '1 botol kecil (warna kontras)',
          description: 'Pigmen pewarna yang dicapkan ke atas media kain',
          available: true,
          recycleAlternative: 'Cat poster atau cat tembok sisa rumah yang dicampur sedikit lem putih PVA',
        },
        {
          id: 'm4',
          name: 'Kain Perca Katun / Tote Bag Polos / Kaos Bekas',
          estimatedQty: '1 lembar',
          description: 'Media uji coba pencetakan pola sablon stensil',
          available: true,
          recycleAlternative: 'Kain lap katun polos atau bagian punggung kaos bekas yang sudah tidak dipakai',
        },
        {
          id: 'm5',
          name: 'Lakban Kertas (Masking Tape) / Selotip',
          estimatedQty: '1 rol',
          description: 'Mengunci kertas stensil di atas kain agar tidak bergeser saat dicat',
          available: true,
          recycleAlternative: 'Selotip bening biasa',
        },
      ],
      k3Protocols: [
        'Gunakan alas potong (cutting mat atau kardus tebal) agar pisau cutter tidak merusak permukaan meja.',
        'Biarkan cat mengering sempurna sebelum kertas stensil dilepas dari kain.',
      ],
      tipsSekolah: 'Manfaatkan kardus bekas di kantin/koperasi sekolah SMKN 4 Kendari untuk menghemat biaya.',
    };
  }

  // Generic fallback
  return {
    profession: profession || 'Wirausaha & Teknisi Terapan',
    summary: 'Siswa tidak perlu lagi bingung menebak-nebak alat atau bahan apa yang dibutuhkan. AI telah merekomendasikan daftar alat dan bahan baku yang harus ada untuk membuat purwarupa representatif, lengkap dengan alternatif murah dan bahan daur ulang di sekitar siswa.',
    prototypeIdea: `Purwarupa Simulasi Praktik Representatif: ${profession}`,
    approach: 'Standar Vokasi SMK',
    difficulty: 'Mudah',
    estimatedTime: '2-3 Jam',
    whyRepresentative: `Merepresentasikan tugas pokok kejuruan pada bidang ${profession} dengan alur kerja standar industri.`,
    physicalOutput: `1 unit purwarupa model kerja representatif untuk ${profession}.`,
    competencies: `Penerapan K3 kejuruan • Keterampilan perakitan dan pengujian model kerja terapan`,
    recommendedTools: [
      { id: 't1', name: 'Cutter Presisi / Perkakas Tangan', importance: 'Wajib', description: 'Pekerjaan perakitan dan penyesuaian detail', available: true, substituteTip: 'Gunakan perkakas rumah tangga multifungsi' },
      { id: 't2', name: 'Penggaris Besi & Alat Ukur', importance: 'Wajib', description: 'Memastikan dimensi dan takaran purwarupa akurat', available: true, substituteTip: 'Penggaris siku atau meteran gulung' },
      { id: 't3', name: 'Alat Perekat / Aplikator', importance: 'Pendukung', description: 'Penyatuan cepat modul dan mockup purwarupa', available: true, substituteTip: 'Isolasi bolak-balik tebal atau lakban' },
    ],
    recommendedMaterials: [
      { id: 'm1', name: 'Kardus Bekas / Bahan Rangka', estimatedQty: '1 buah', description: 'Bodi rangka kubus atau dudukan modul purwarupa', available: true, recycleAlternative: 'Kardus bekas mie instan atau paket belanja' },
      { id: 'm2', name: 'Kertas HVS / Media Desain', estimatedQty: '3 lembar', description: 'Media perancangan alur dan sketsa purwarupa', available: true, recycleAlternative: 'Kertas bekas satu sisi bersih' },
      { id: 'm3', name: 'Selotip / Perekat Kertas', estimatedQty: '1 rol', description: 'Mengunci posisi komponen agar presisi', available: true, recycleAlternative: 'Selotip bening biasa' },
    ],
    k3Protocols: [
      'Gunakan alas potong pelindung agar tidak merusak permukaan meja kerja.',
      'Periksa isolasi dan hindari kontak langsung dengan bahan kimia atau tepi tajam.',
    ],
    tipsSekolah: 'Sesuaikan tahapan proyek dengan sarana dan prasarana yang ada di SMKN 4 Kendari.',
  };
}

// Create dedicated API router
const apiRouter = express.Router();

// Health check
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'SimulasiVokasi SMKN 4 Kendari',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Endpoint 1: Recommend Tools & Materials using Gemini
apiRouter.post('/recommend-resources', async (req: Request, res: Response) => {
  const { profession, context, approach } = req.body;

  if (!profession || typeof profession !== 'string' || !profession.trim()) {
    return res.status(400).json({ error: 'Profesi atau bidang usaha harus diisi.' });
  }

  const cleanProfession = profession.trim();
  const selectedApproach = approach || 'Standar Vokasi SMK';
  const aiClient = getAiClient();

  // If Gemini API Key is available, call Gemini 3.8 Flash
  if (aiClient) {
    try {
      const prompt = `Anda adalah ahli kurikulum SMK dan praktisi industri kejuruan di Indonesia (khususnya untuk SMK Negeri seperti SMKN 4 Kendari).
Siswa ingin mendalami profesi / bidang usaha: "${cleanProfession}".
Pendekatan Purwarupa: "${selectedApproach}".
Konteks lingkungan: ${context || 'Lingkungan sekolah SMK, lab kejuruan, dan rumah siswa di Indonesia'}.

TUGAS ANDA:
Analisislah kebutuhan dan rekomendasikan:
1. Ringkasan tujuan purwarupa atau simulasi representatif dari profesi tersebut yang realistis dibuat siswa SMK.
2. Ide purwarupa / model kerja representatif (misal: "Purwarupa Mini Lightbox Studio Foto Produk & Sablon Stensil Kaos Manual").
3. Penjelasan "Mengapa Purwarupa Ini Merepresentasikan Profesi Target" (ringkasan 1-2 kalimat tugas pokok industri yang diwakili).
4. "Output Fisik Purwarupa" (deskripsi wujud fisik yang dibuat siswa).
5. "Kompetensi yang Dilatih" (daftar kompetensi kejuruan/SKKNI terapan).
6. Tingkat kesulitan ("Mudah" / "Menengah" / "Mahir") dan estimasi waktu (misal "2-3 Jam").
7. Daftar "Alat yang Harus Ada" (urgensi: "Wajib" atau "Pendukung", fungsi, dan "substituteTip" alternatif sederhana sekitar).
8. Daftar "Bahan Baku Purwarupa" (takaran "estimatedQty", fungsi, dan "recycleAlternative" alternatif daur ulang sekitar).
9. "k3Protocols" (2-3 butir protokol keselamatan kerja praktikum purwarupa).

Kembalikan respon DALAM FORMAT JSON SAJA sesuai struktur berikut:
{
  "profession": "${cleanProfession}",
  "summary": "Siswa tidak perlu lagi bingung menebak-nebak alat atau bahan apa yang dibutuhkan. AI telah merekomendasikan daftar alat dan bahan baku yang harus ada untuk membuat purwarupa representatif, lengkap dengan alternatif murah dan bahan daur ulang di sekitar siswa.",
  "prototypeIdea": "Judul Purwarupa Konkret",
  "approach": "${selectedApproach}",
  "difficulty": "Mudah",
  "estimatedTime": "2-3 Jam",
  "whyRepresentative": "Penjelasan keterkaitan tugas pokok profesi...",
  "physicalOutput": "1 unit purwarupa...",
  "competencies": "Kompetensi kejuruan yang dilatih...",
  "recommendedTools": [
    {
      "id": "t1",
      "name": "Nama Alat",
      "importance": "Wajib",
      "description": "Fungsi alat",
      "available": true,
      "substituteTip": "Alternatif sederhana sekitar jika tidak ada"
    }
  ],
  "recommendedMaterials": [
    {
      "id": "m1",
      "name": "Nama Bahan",
      "estimatedQty": "1 buah",
      "description": "Fungsi bahan dalam purwarupa",
      "available": true,
      "recycleAlternative": "Alternatif daur ulang sekitar"
    }
  ],
  "k3Protocols": [
    "Protokol K3 1",
    "Protokol K3 2"
  ]
}`;

      const generatePromise = aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
          systemInstruction: 'Anda adalah instruktur kejuruan SMK berpengalaman yang sangat solutif. Anda fokus membantu siswa SMK membuat simulasi proyek purwarupa profesi nyata menggunakan sumber daya yang ada di sekitar sekolah dan rumah. Kembalikan selalu JSON valid.',
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('AI response timed out')), 22000)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);
      const text = response.text;
      if (text) {
        try {
          const parsed = JSON.parse(text);
          return res.json(parsed);
        } catch {
          const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanText);
          return res.json(parsed);
        }
      }
    } catch (err: any) {
      console.error('Gemini recommend-resources error:', err);
      const fallback = getFallbackRecommendations(cleanProfession);
      return res.json({
        ...fallback,
        approach: selectedApproach,
        _notice: 'Menggunakan kurikulum cadangan terverifikasi karena koneksi AI sementara terbatas.',
      });
    }
  }

  // If no API key configured
  const fallback = getFallbackRecommendations(cleanProfession);
  return res.json({
    ...fallback,
    approach: selectedApproach,
    _notice: !process.env.GEMINI_API_KEY
      ? 'GEMINI_API_KEY belum terpasang di Vercel. Berjalan menggunakan kurikulum internal.'
      : undefined,
  });
});

// Endpoint 2: Generate Project Simulation & Jobsheet
apiRouter.post('/generate-project', async (req: Request, res: Response) => {
  const {
    profession,
    availableTools = [],
    availableMaterials = [],
    prototypeIdea = '',
    scope = 'Simulasi Proyek Praktik Siswa',
    customNotes = '',
  } = req.body;

  if (!profession) {
    return res.status(400).json({ error: 'Profesi harus ditentukan.' });
  }

  const toolsListStr = Array.isArray(availableTools)
    ? availableTools.map((t: any) => (typeof t === 'string' ? t : `${t.name || t.id} (${t.substituteTip ? 'Alternatif: ' + t.substituteTip : 'standar'})`)).join(', ')
    : String(availableTools);

  const materialsListStr = Array.isArray(availableMaterials)
    ? availableMaterials.map((m: any) => (typeof m === 'string' ? m : `${m.name || m.id} [${m.estimatedQty || ''}]`)).join(', ')
    : String(availableMaterials);

  const aiClient = getAiClient();
  if (aiClient) {
    try {
      const prompt = `Anda adalah kepala bengkel dan perancang kurikulum SMK Industri terkemuka di Indonesia.
Rancang sebuah PROYEK SIMULASI PURWARUPA KEJURUAN SMK LENGKAP untuk profesi: "${profession}".

DATA KETERSEDIAAN SUMBER DAYA SISWA:
- Ide Acuan Purwarupa: "${prototypeIdea || 'Purwarupa aplikatif profesi'}"
- Alat yang diverifikasi tersedia di sekitar siswa: ${toolsListStr || 'Peralatan standar kejuruan'}
- Bahan baku yang diverifikasi tersedia: ${materialsListStr || 'Bahan praktik standar'}
- Lingkup Proyek: "${scope}"
- Catatan Tambahan Siswa: "${customNotes || 'Tidak ada catatan'}"

TENTUKAN PROYEK SECARA DETAIL:
1. Judul Proyek Purwarupa yang memikat dan mencerminkan standar industri.
2. Tagline singkat yang memotivasi siswa.
3. Gambaran Umum Proyek & relevansinya terhadap dunia kerja nyata.
4. Kompetensi Kejuruan (SKKNI / Kurikulum Merdeka) yang dikuasai siswa melalui proyek ini.
5. Tingkat kesulitan (Pemula / Menengah / Mahir) dan Estimasi Waktu (misal: "3 x 45 Menit").
6. Wujud Fisik Purwarupa (Deliverable / Output Akhir).
7. Peluang Wirausaha (Entrepreneurship): Bagaimana siswa dapat mengomersialkan hasil keahlian atau prototipe ini menjadi jasa/usaha mandiri.
8. LANGKAH-LANGKAH PENGERJAAN JOBSHEET:
   - Buat minimal 5 sampai 7 langkah pengerjaan yang runut, mulai dari persiapan K3, perakitan/pengujian komponen, kalibrasi/troubleshooting, hingga pengujian hasil akhir dan dokumentasi.
   - Setiap langkah HARUS memiliki:
     * id: string unik (misal "step-1")
     * stepNumber: nomor urut (1, 2, ...)
     * title: judul langkah (misal "Persiapan K3 dan Kalibrasi Alat Ukur")
     * description: panduan instruksi kerja teknis yang jelas dan mendalam
     * safetyNote: peringatan keselamatan penting pada langkah ini
     * expectedResult: kriteria hasil sukses pada langkah ini
     * completed: false
     * notes: ""
9. Rubrik Penilaian Unjuk Kerja (minimal 3 kriteria: Kesiapan Kerja & K3, Kualitas Teknis & Presisi, Fungsi Purwarupa & Sikap Kerja).

Kembalikan HANYA format JSON valid sesuai schema:
{
  "id": "proj-${Date.now()}",
  "title": "string",
  "profession": "${profession}",
  "tagline": "string",
  "overview": "string",
  "learningObjectives": ["string"],
  "difficulty": "Pemula / Menengah / Mahir",
  "estimatedTime": "string",
  "prototypeOutput": "string",
  "entrepreneurshipOpportunity": "string",
  "toolsUsed": ["string"],
  "materialsUsed": ["string"],
  "steps": [
    {
      "id": "step-1",
      "stepNumber": 1,
      "title": "string",
      "description": "string",
      "safetyNote": "string",
      "expectedResult": "string",
      "completed": false,
      "notes": ""
    }
  ],
  "assessmentRubric": [
    {
      "criteria": "string",
      "weight": "30%",
      "indicator": "string"
    }
  ],
  "reflectionQuestions": ["string"]
}`;

      const generatePromise = aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
          systemInstruction: 'Anda adalah master perancang jobsheet kejuruan SMK profesional. Pastikan deskripsi setiap langkah sangat aplikatif, jelas, serta memberikan pengalaman nyata seperti di dunia industri dan dunia kerja (DUDI). Respon wajib JSON murni.',
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('AI generation timed out')), 24000)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);
      const text = response.text;
      if (text) {
        try {
          const parsed = JSON.parse(text);
          return res.json(parsed);
        } catch {
          const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanText);
          return res.json(parsed);
        }
      }
    } catch (err: any) {
      console.error('Gemini generate-project error:', err);
    }
  }

  // Robust fallback project generator
  const norm = (profession || '').toLowerCase();
  let fallbackProject: any;

  if (norm.includes('sablon') || norm.includes('kaos') || norm.includes('baju') || norm.includes('stensil')) {
    fallbackProject = {
      id: `proj-${Date.now()}`,
      title: 'Purwarupa Mini Lightbox Studio Foto Produk & Sablon Stensil Kaos Manual',
      profession: profession,
      tagline: 'Simulasi Cetak Rintang Manual & Miniatur Studio Katalog Komersial SMKN 4 Kendari',
      overview: 'Proyek ini mensimulasikan tugas inti desainer grafis dan wirausaha sablon: merancang pola vektor stensil logo/tipografi, memotong kertas stensil dengan cutter presisi, melakukan pencetakan rintang manual ke media kaos/kain perca dengan kuas spons akrilik, serta merakit mini lightbox kardus untuk dokumentasi katalog promosi komersial.',
      learningObjectives: [
        'Merancang dan memotong stensil pola vector presisi dengan cutter stensil',
        'Menerapkan teknik cetak rintang manual (dabbing spons) merata pada kain katun',
        'Merakit kotak mini lightbox difuser berkardus untuk foto produk komersial',
        'Menerapkan SOP K3 penanganan benda tajam dan pengeringan pigmen sablon',
      ],
      difficulty: 'Mudah',
      estimatedTime: '2-3 Jam',
      prototypeOutput: '1 unit mini lightbox fotografi produk berkardus dan 1 sampel sablon stensil pada kain/tote bag.',
      entrepreneurshipOpportunity: 'Jasa sablon kaos custom satuan/komunitas, pembuatan suvenir tote bag sekolah, dan jasa foto katalog produk UMKM lokal.',
      toolsUsed: Array.isArray(availableTools) && availableTools.length > 0 ? availableTools.map((t: any) => (typeof t === 'string' ? t : t.name)) : [
        'Cutter Presisi (Pen Cutter / Cutter Tajam)',
        'Gunting & Penggaris Besi',
        'Spons Cuci Piring / Kuas Busa / Rakel Miniatur',
        'Kamera Smartphone & Lampu Meja Belajar',
      ],
      materialsUsed: Array.isArray(availableMaterials) && availableMaterials.length > 0 ? availableMaterials.map((m: any) => (typeof m === 'string' ? m : m.name)) : [
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
          title: 'Persiapan Pola Desain Stensil & Area Kerja K3',
          description: 'Cetak atau gambarkan pola desain logo/huruf pada kertas HVS. Siapkan alas potong (cutting mat atau kardus tebal) di atas meja kerja yang bersih dan terang.',
          safetyNote: 'Pastikan jari tangan selalu berada di belakang jalur tarikan mata pisau cutter.',
          expectedResult: 'Desain pola siap potong dan meja kerja aman beralas pelindung.',
          completed: false,
          notes: '',
        },
        {
          id: 'step-2',
          stepNumber: 2,
          title: 'Pemotongan Presisi Pola Stensil dengan Cutter',
          description: 'Potong bagian negatif desain (bidang yang akan diberi warna) menggunakan pen cutter secara perlahan mengikuti lekukan garis. Bersihkan serpihan kertas.',
          safetyNote: 'Gunakan mata pisau baru yang tajam agar serat kertas tidak sobek berserabut.',
          expectedResult: 'Kertas stensil berlubang rapi sesuai kontur logo tanpa robekan yang tidak diinginkan.',
          completed: false,
          notes: '',
        },
        {
          id: 'step-3',
          stepNumber: 3,
          title: 'Pemasangan & Penguncian Stensil pada Kain Kaos',
          description: 'Bentangkan kain perca atau kaos di atas permukaan datar. Selipkan kardus pembatas di dalam lipatan kaos agar cat tidak tembus ke belakang. Rekatkan kertas stensil menggunakan lakban kertas agar terkunci kuat.',
          safetyNote: 'Pastikan selotip menempel rapat di sekeliling pinggiran stensil untuk mencegah cat merembes (bleeding).',
          expectedResult: 'Stensil terpasang kencang dan tidak bergeser saat ditekan.',
          completed: false,
          notes: '',
        },
        {
          id: 'step-4',
          stepNumber: 4,
          title: 'Aplikasi Pencapan Warna dengan Spons (Dabbing Technique)',
          description: 'Tuang sedikit cat akrilik/tekstil ke piring kecil. Celupkan ujung spons, tepuk-tepuk di tisu agar cat tidak terlalu basah, lalu tepuk secara vertikal (dabbing tegak lurus) ke area stensil secara merata.',
          safetyNote: 'Jangan menggeser atau menyapu spons secara horizontal agar cat tidak masuk ke kolong kertas stensil.',
          expectedResult: 'Lapisan pigmen warna menutup pori kain dengan rata dan ketebalan konsisten.',
          completed: false,
          notes: '',
        },
        {
          id: 'step-5',
          stepNumber: 5,
          title: 'Perakitan Mini Lightbox Studio Foto Produk Berkardus',
          description: 'Potong 3 jendela pada sisi kiri, kanan, dan atas kardus bekas. Tempelkan kertas HVS putih sebagai difuser penyaring cahaya. Masukkan kain putih melengkung sebagai latar belakang (infinity sweep).',
          safetyNote: 'Hati-hati saat memotong kardus tebal; gunakan penggaris besi sebagai pemandu.',
          expectedResult: 'Kotak mini studio selesai dengan difuser cahaya lembut siap pakai.',
          completed: false,
          notes: '',
        },
        {
          id: 'step-6',
          stepNumber: 6,
          title: 'Pengeringan Sablon, Pemotretan Katalog & Evaluasi 5R',
          description: 'Tunggu cat kering selama 15 menit, lalu lepas lakban dan kertas stensil perlahan. Letakkan produk bersablon ke dalam lightbox, nyalakan lampu dari samping jendela difuser, lalu potret katalog produk menggunakan smartphone.',
          safetyNote: 'Bersihkan alat kuas spons dengan air bersih sebelum cat mengering permanen.',
          expectedResult: 'Foto katalog produk sablon beresolusi tajam dengan pencahayaan studio profesional siap dipresentasikan.',
          completed: false,
          notes: '',
        },
      ],
      assessmentRubric: [
        { criteria: 'Kerapian Pemotongan Stensil & Cetak', weight: '35%', indicator: 'Garis sablon tajam tanpa rembesan cat di luar batas pola stensil.' },
        { criteria: 'Kreativitas Pembuatan Mini Lightbox', weight: '30%', indicator: 'Konstruksi kotak kokoh, kertas difuser terpasang rapi, dan efek pencahayaan merata.' },
        { criteria: 'Hasil Foto Katalog & Sikap Kerja K3', weight: '35%', indicator: 'Foto produk estetik dengan sudut pengambilan profesional serta area kerja bersih rapi.' },
      ],
      reflectionQuestions: [
        'Bagaimana teknik dabbing spons mempengaruhi ketebalan dan ketajaman sablon pada media kain?',
        'Strategi apa yang dapat digunakan untuk mempercepat proses pengeringan tanpa merusak kualitas sablon?',
      ],
    };
  } else {
    fallbackProject = {
      id: `proj-${Date.now()}`,
      title: `Purwarupa Simulasi Kejuruan: ${profession}`,
      profession: profession,
      tagline: `Simulasi Praktik Mandiri Berbasis Sumber Daya Lingkungan Sekolah SMKN 4 Kendari`,
      overview: `Proyek ini dirancang untuk mensimulasikan tugas inti profesi ${profession} menggunakan alat dan bahan yang telah diverifikasi di sekitar siswa. Siswa belajar menyelesaikan masalah teknis nyata, menerapkan standar K3, dan menguji purwarupa hingga berfungsi prima.`,
      learningObjectives: [
        `Menerapkan keselamatan dan kesehatan kerja (K3) pada bidang ${profession}`,
        `Menggunakan alat kerja esensial secara tepat dan presisi`,
        `Merakit dan menguji purwarupa representatif sesuai standar operasional prosedur (SOP)`,
        `Menganalisis hasil kerja dan menyusun dokumentasi teknis / lembar kerja siswa`,
      ],
      difficulty: 'Menengah',
      estimatedTime: '3 x 45 Menit',
      prototypeOutput: `Satu unit purwarupa model kerja representatif untuk ${profession} yang telah diuji fungsi dan siap dipresentasikan di depan instruktur.`,
      entrepreneurshipOpportunity: `Hasil simulasi ini dapat dikembangkan menjadi layanan jasa servis/instalasi mandiri atau produk bernilai jual untuk masyarakat dan UMKM di sekitar siswa.`,
      toolsUsed: Array.isArray(availableTools) ? availableTools.map((t: any) => (typeof t === 'string' ? t : t.name)) : ['Peralatan dasar'],
      materialsUsed: Array.isArray(availableMaterials) ? availableMaterials.map((m: any) => (typeof m === 'string' ? m : m.name)) : ['Bahan praktik'],
      steps: [
        {
          id: 'step-1',
          stepNumber: 1,
          title: 'Identifikasi Kebutuhan, Pemeriksaan Alat & Protokol K3',
          description: `Periksa kelayakan seluruh alat dan bahan untuk proyek ${profession}. Siapkan APD (Alat Pelindung Diri) yang sesuai dan pastikan lingkungan kerja bebas dari potensi bahaya.`,
          safetyNote: 'Gunakan sarung tangan atau kacamata pelindung bila menangani material tajam, panas, atau bertegangan listrik.',
          expectedResult: 'Area kerja bersih, alat terverifikasi siap pakai, dan SOP K3 dipahami.',
          completed: false,
          notes: '',
        },
        {
          id: 'step-2',
          stepNumber: 2,
          title: 'Pembuatan Sketsa Desain & Skema Rangkaian / Rangka',
          description: 'Gambarkan rancangan teknis purwarupa pada selembar kertas. Tentukan dimensi, alur instalasi, dan penempatan komponen utama agar mudah dirakit.',
          safetyNote: 'Pastikan ukuran skala proporsional sebelum memotong bahan baku.',
          expectedResult: 'Sketsa kerja dengan label komponen yang jelas dan terukur.',
          completed: false,
          notes: '',
        },
        {
          id: 'step-3',
          stepNumber: 3,
          title: 'Fabrikasi, Pemotongan & Perakitan Komponen Inti',
          description: 'Potong bahan baku sesuai ukuran sketsa. Pasang dudukan dan sambungkan bagian-bagian struktural secara bertahap menggunakan perkakas yang sesuai.',
          safetyNote: 'Lakukan perakitan secara perlahan; jangan memaksakan baut atau sambungan yang belum presisi.',
          expectedResult: 'Modul purwarupa terpasang kokoh dan sambungan terikat kuat.',
          completed: false,
          notes: '',
        },
        {
          id: 'step-4',
          stepNumber: 4,
          title: 'Kalibrasi, Pengukuran & Pengujian Awal (Dry Run)',
          description: 'Gunakan alat ukur atau indikator untuk memverifikasi nilai tegangan, celah, kontinuitas kabel, atau sinyal sebelum beban penuh diberikan. Catat setiap anomali atau deviasi dari standar teknis.',
          safetyNote: 'Saat menyalakan pertama kali, perhatikan apakah ada bau sangit, percikan, atau panas berlebih.',
          expectedResult: 'Indikator menunjukkan kondisi normal tanpa adanya korsleting atau kebocoran.',
          completed: false,
          notes: '',
        },
        {
          id: 'step-5',
          stepNumber: 5,
          title: 'Uji Fungsi Penuh & Penyesuaian Kinerja (Fine Tuning)',
          description: 'Jalankan purwarupa dalam kondisi operasional normal selama 15 menit. Lakukan fine-tuning bila diperlukan (penyetelan spuyer, pengujian throughput jaringan, atau kalibrasi respon sistem).',
          safetyNote: 'Tetap awasi sistem selama pengujian beban berlangsung.',
          expectedResult: 'Purwarupa bekerja stabil sesuai target parameter representasi profesi.',
          completed: false,
          notes: '',
        },
        {
          id: 'step-6',
          stepNumber: 6,
          title: 'Penyusunan Laporan Lembar Kerja & Pembersihan Area Kerja (5R)',
          description: 'Catat hasil pengujian pada jobsheet, ambil foto dokumentasi purwarupa, dan bersihkan area kerja (Ringkas, Rapi, Resik, Rawat, Rajin) sesuai budaya kerja industri.',
          safetyNote: 'Kembalikan alat ke tempat semula dan pastikan sakelar daya utama telah diputus.',
          expectedResult: 'Jobsheet terisi lengkap dan bengkel kembali bersih serta aman.',
          completed: false,
          notes: '',
        },
      ],
      assessmentRubric: [
        { criteria: 'Kesiapan K3 & Penggunaan APD', weight: '20%', indicator: 'Siswa mematuhi SOP K3 dan memakai alat pelindung diri secara konsisten.' },
        { criteria: 'Keterampilan Teknis & Ketelitian Perakitan', weight: '40%', indicator: 'Ketepatan langkah kerja, kerapian kabel/komponen, dan penggunaan alat yang benar.' },
        { criteria: 'Fungsionalitas Purwarupa & Troubleshooting', weight: '25%', indicator: 'Purwarupa berfungsi sesuai tujuan dan siswa mampu menjelaskan prinsip kerjanya.' },
        { criteria: 'Sikap Kerja, Budaya 5R & Jobsheet', weight: '15%', indicator: 'Kebersihan area kerja dan kelengkapan catatan hasil uji pada jobsheet.' },
      ],
      reflectionQuestions: [
        'Kendala teknis apa yang paling menantang saat merakit purwarupa ini dan bagaimana Anda mengatasinya?',
        'Jika proyek ini diterapkan untuk melayani klien nyata, perbaikan apa yang perlu ditambahkan?',
      ],
    };
  }

  return res.json(fallbackProject);
});

// Endpoint 3: AI Consultation / Substitution Helper
apiRouter.post('/ai-chat', async (req: Request, res: Response) => {
  const { message, projectContext } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Pesan konsultasi tidak boleh kosong.' });
  }

  const aiClient = getAiClient();
  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Anda adalah guru pembimbing kejuruan SMK ramah dan solutif di SMKN 4 Kendari.
Konteks Proyek Siswa saat ini: ${JSON.stringify(projectContext || {})}
Pertanyaan Siswa: "${message}"

Berikan saran yang sangat praktis, aman, dan mudah diterapkan dengan bahan/alat yang ada di sekitar sekolah/rumah. Jawaban singkat, padat, dan menyemangati.`,
        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
          systemInstruction: 'Anda adalah guru pembimbing vokasi SMK yang suportif, mengedepankan K3, kreativitas memanfaatkan bahan sekitar, dan penalaran teknis.',
        },
      });

      return res.json({ reply: response.text });
    } catch (err: any) {
      console.error('Gemini chat error:', err);
    }
  }

  return res.json({
    reply: `Tips dari Guru Pembimbing: Untuk kendala "${message}", Anda dapat memanfaatkan peralatan serupa di lab bengkel SMKN 4 Kendari atau menggunakan substitusi aman yang telah diverifikasi di modul. Pastikan selalu utamakan keselamatan kerja (K3) dan catat di lembar kerja!`,
  });
});

// Mount the API router at both /api and root /
// This ensures requests work whether the hosting environment rewrites with or without stripping /api
app.use('/api', apiRouter);
app.use(apiRouter);

export default app;
