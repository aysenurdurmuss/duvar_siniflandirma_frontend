# Duvar Hasarı Sınıflandırma - Arayüz (Frontend)

Duvar yüzeylerine ait bir görsel yükleyip, görüntü işleme modelinin bu görseli "sağlam", "çatlak" veya "kırık" olarak nasıl sınıflandırdığını gösteren Angular tabanlı web arayüzü. Bir staj projesi kapsamında geliştirilmiştir.

Bu arayüz, tahmin işlemini şu backend servisine istek atarak yapar: [duvar_siniflandirma_backend (FastAPI backend)](https://github.com/aysenurdurmuss/duvar_siniflandirma_backend)

## Özellikler

- Bilgisayardan görsel seçip önizleme
- Seçilen görseli backend'e gönderip tahmin sonucu alma
- Tahmin edilen sınıfı ve her sınıf için olasılık yüzdelerini görselleştirme
- Backend'den gelen hata mesajlarının kullanıcıya gösterilmesi (örn. desteklenmeyen dosya, sunucuya ulaşılamaması)

## Kullanılan Teknolojiler

- Angular
- TypeScript

## Kurulum

```bash
npm install
```

## Çalıştırma

Bu arayüz, tahmin isteklerini `http://127.0.0.1:8000` adresinde çalışan backend servisine gönderir. Bu yüzden önce [backend servisinin](https://github.com/aysenurdurmuss/duvar_siniflandirma_backend) çalışır durumda olması gerekir.

```bash
npm start
```

Uygulama ayağa kalktıktan sonra `http://localhost:4200` adresinden erişilebilir.
