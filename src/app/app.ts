import { Component, signal, OnInit } from '@angular/core';  // Angular'ın component, signal ve OnInit araçlarını getir
import { RouterOutlet } from '@angular/router';  // sayfa geçişi aracı (şimdilik kullanmıyoruz)
import { HttpClient } from '@angular/common/http';  // sunucuya istek atabilmek için gereken araç
import { PercentPipe } from '@angular/common';

@Component({  
  imports: [RouterOutlet, PercentPipe], 
  selector: 'app-root',  
  styleUrl: './app.css',  
  templateUrl: './app.html',  
})
export class App implements OnInit {  
  constructor(private http: HttpClient) {}  

  ngOnInit() {  
    this.http.get<any>('http://127.0.0.1:8000/siniflar').subscribe({  
      next: (cevap) => {  
        this.sinifListesi.set(cevap.siniflar);  
      }
    });
  }

  protected readonly title = signal('duvar-frontend');  
  secilenDosya: File | null = null;  

  dosyaSecildi(event: Event) {  
    const input = event.target as HTMLInputElement;  
    this.secilenDosya = input.files?.[0] ?? null;  

    if (this.secilenDosya) {
      const okuyucu = new FileReader();  
      okuyucu.onload = () => {  
        this.onizlemeUrl.set(okuyucu.result as string);  
      };
      okuyucu.readAsDataURL(this.secilenDosya); 
    } else {
      this.onizlemeUrl.set(null);  
    }
  }

  sonuc = signal<any>(null);  
  hataMesaji = signal<string | null>(null);  
  sinifListesi = signal<string[]>([]);  

  onizlemeUrl = signal<string | null>(null);

  tahminEt() {  
    if (!this.secilenDosya) {  
      this.hataMesaji.set('Lütfen önce bir dosya seçin.');
      return;  
    }

    const formData = new FormData();  
    formData.append('dosya', this.secilenDosya);  

    this.http.post('http://127.0.0.1:8000/predict', formData).subscribe({  
      next: (cevap) => {  
        this.sonuc.set(cevap);  
        this.hataMesaji.set(null);  
      },
      error: (hata) => {  
        this.sonuc.set(null);  
        this.hataMesaji.set(hata.error?.detail ?? 'Bir hata oluştu, sunucuya ulaşılamıyor olabilir.');  // backend'in gönderdiği hata mesajını göster, yoksa genel bir mesaj kullan
      }
    });
  }

  sonucSinifi(): string {  
    const tahmin = this.sonuc()?.tahmin;
    if (tahmin === 'saglam') return 'sonuc-saglam';
    if (tahmin === 'catlak') return 'sonuc-catlak';
    if (tahmin === 'kirik') return 'sonuc-kirik';
    if (tahmin === 'belirsiz') return 'sonuc-belirsiz';
    if (tahmin === 'Duvar Değil') return 'sonuc-duvar-degil';
    return '';
  }
}
