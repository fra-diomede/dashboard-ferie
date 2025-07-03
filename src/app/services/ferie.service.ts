import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'https://script.google.com/macros/s/AKfycbxs9mNnr9lFWTOP2IrY0260dRiuhw64kUF3ijNr6d0GN7TQ3wKUPFJEwrf4ELnTYXev/exec';

@Injectable({ providedIn: 'root' })
export class FerieService {
  constructor(private http: HttpClient) {}

  getFerie() {
    return this.http.get<any[]>(`${BASE_URL}?action=ferie`);
  }

  getFestivi() {
    return this.http.get<any[]>(`${BASE_URL}?action=festivi`);
  }

  getPonti() {
    return this.http.get<any[]>(`${BASE_URL}?action=ponti`);
  }

  addFerie(ferie: any) {
    return this.http.post(`${BASE_URL}`, ferie);
  }

  updateFerie(ferie: any) {
    return this.http.put(`${BASE_URL}`, ferie);
  }

  deleteFerie(id: number) {
    return this.http.delete(`${BASE_URL}?id=${id}`);
  }
}
