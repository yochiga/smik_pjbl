# Panduan Lengkap Deploy ke Vercel & Solusi AI di Langkah 2

Aplikasi **SimulasiVokasi SMKN 4 Kendari** telah dikonfigurasi penuh untuk berjalan lancar di **Vercel** dengan paket gratis (**Hobby Tier** 100% Free).

---

## 🔍 Mengapa Sebelumnya AI Tidak Bekerja di Langkah 2 pada Vercel?

Ada 3 penyebab teknis utama yang telah kami selesaikan:

1. **Path Rewrite Vercel Menghapus Nama Endpoint**:
   - Sebelumnya pada `vercel.json`, aturan routing rewrite mengarahkan `/api/(.*)` ke `/api`. Hal ini menyebabkan request browser ke `/api/recommend-resources` dan `/api/generate-project` dipotong oleh jaringan Vercel menjadi hanya `/api`, sehingga server Express merespon `404 Not Found`.
   - **Solusi Kami**:
     - Memperbaiki `vercel.json` menjadi `"destination": "/api/$1"`.
     - Menyediakan endpoint langsung: `api/recommend-resources.ts`, `api/generate-project.ts`, `api/ai-chat.ts`, dan `api/health.ts`. Vercel mengenali rute ini secara native tanpa risiko path terpotong.

2. **Timeout Standar Vercel Serverless (10 Detik)**:
   - Serverless gratis Vercel membatasi waktu eksekusi default 10 detik. Perancangan jobsheet dan kurikulum AI Gemini memerlukan waktu 6–14 detik, sehingga Vercel memutus koneksi dengan status `504 Gateway Timeout`.
   - **Solusi Kami**: Menambahkan konfigurasi `"maxDuration": 60` pada `vercel.json` agar AI memiliki waktu cukup untuk menyelesaikan perancangan.

3. **Environment Variable `GEMINI_API_KEY` Belum Terdaftar di Dashboard Vercel**:
   - File `.env` lokal tidak ikut ter-upload ke Vercel demi keamanan. Jika `GEMINI_API_KEY` belum dimasukkan di pengaturan Vercel, fungsi AI akan menggunakan kurikulum fallback offline.
   - **Solusi Kami**: Panduan langkah mudah mendaftarkan API Key di bawah ini.

---

## 🚀 Langkah Deploy & Pengaturan di Vercel:

### Langkah 1: Masukkan `GEMINI_API_KEY` di Dashboard Vercel
1. Buka dashboard proyek Anda di [https://vercel.com/dashboard](https://vercel.com/dashboard).
2. Klik proyek **SimulasiVokasi**.
3. Masuk ke tab **Settings** > pilih menu **Environment Variables**.
4. Isi data berikut:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: *(Paste Google Gemini API Key Anda dari Google AI Studio)*
   - Centang ketiga target: **Production**, **Preview**, dan **Development**.
5. Klik **Save**.

### Langkah 2: Lakukan Redeploy (Penting!)
Setelah Environment Variables disimpan:
1. Buka tab **Deployments** di Vercel.
2. Klik ikon titik tiga (**...**) pada deployment terakhir > pilih **Redeploy**.
3. Tunggu ~45 detik sampai status menjadi **Ready**.

---

## 🛠️ Verifikasi Bahwa AI Bekerja:
- Buka website Anda di browser.
- Di Langkah 1, ketik profesi apa saja (misal: *sablon baju*, *teknisi ac*, *las listrik*).
- Masuk ke Langkah 2: AI akan merekomendasikan alat & bahan baku sesuai profesi. Tombol **Rancang Ulang dengan AI** dan pilihan pendekatan (*Standar Vokasi SMK*, *Bahan Daur Ulang*, *Sampel Usaha Komersial*) akan memuat ulang rekomendasi secara cerdas!
- Klik **Lanjut ke Simulasi & Jobsheet Purwarupa**: AI akan merancang jobsheet lengkap beserta rubrik penilaian dan panduan K3.

