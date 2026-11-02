# Panduan Lengkap Deploy ke Vercel (Gratis / Free Tier)

Aplikasi **SimulasiVokasi SMKN 4 Kendari** telah dikonfigurasi penuh untuk di-hosting di **Vercel** dengan paket gratis (**Hobby Tier** 100% Free).

Arsitektur yang digunakan:
- **Frontend**: Vite + React + Tailwind CSS di-build menjadi aset statis super cepat di Global CDN Vercel.
- **Backend API**: Express & Google Gemini AI API berjalan di **Vercel Serverless Functions** (`/api/index.ts`).
- **Konfigurasi Routing**: Diatur rapi pada `vercel.json`.

---

## Opsi 1: Deploy Otomatis via GitHub (Sangat Disarankan & Termudah)

Cara ini paling praktis karena setiap kali Anda push update kode ke GitHub, Vercel akan otomatis men-deploy versi terbaru.

1. **Upload / Push Proyek ke GitHub**:
   Jika belum di GitHub, buat repositori baru di [GitHub](https://github.com/new) dan push kode Anda.

2. **Buka Vercel**:
   - Kunjungi [https://vercel.com/](https://vercel.com/) dan buat akun/login dengan akun GitHub Anda.
   - Di halaman Dashboard Vercel, klik tombol **"Add New..."** lalu pilih **"Project"**.

3. **Import Repositori**:
   - Cari dan pilih repositori GitHub proyek ini, lalu klik **"Import"**.

4. **Konfigurasi Build & Output**:
   Vercel akan otomatis membaca file `vercel.json` yang sudah kami sediakan:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Tambahkan Environment Variables (Kunci API Gemini)**:
   - Di bagian **"Environment Variables"**, masukkan:
     - **Key**: `GEMINI_API_KEY`
     - **Value**: *(Salin API Key Gemini Anda dari Google AI Studio)*
   - Klik **Add**.

6. **Klik "Deploy"**:
   - Tunggu proses build selama ~1 menit.
   - Selesai! Vercel akan memberikan link website gratis Anda, misalnya: `https://simulasi-vokasi.vercel.app`.

---

## Opsi 2: Deploy Cepat via Terminal (Vercel CLI)

Jika Anda ingin deploy langsung dari laptop/komputer Anda:

1. **Buka Terminal di folder proyek**:
   ```bash
   npx vercel
   ```

2. **Ikuti panduan CLI**:
   - Tekan `Y` untuk login dan authorize akun Vercel di browser Anda.
   - Set scope dan nama proyek.
   - Pilih default untuk semua pengaturan.

3. **Tambahkan Gemini API Key ke Vercel**:
   ```bash
   npx vercel env add GEMINI_API_KEY
   ```
   *(Pilih Production, Preview, Development lalu paste API Key Anda).*

4. **Deploy ke Domain Production**:
   ```bash
   npx vercel --prod
   ```
   Terminal akan langsung memberikan URL aktif website Anda!

---

## Keunggulan Server Gratis Vercel untuk Proyek Ini:
- **Biaya Rp 0 (Gratis Selamanya)** untuk akun Hobby.
- **SSL / HTTPS Otomatis**: Aman diakses oleh siswa dan guru di HP maupun laptop.
- **Auto-Scaling**: Kuat menampung puluhan hingga ratusan siswa yang mengakses secara bersamaan tanpa lag.
- **Serverless**: Tidak perlu mengelola sistem operasi server atau membayar VPS bulanan.
