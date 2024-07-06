import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranscripcionService {

  private apiUrl = 'http://localhost:3000/enunciado'; // Asegúrate de usar http:// en la URL

  constructor(private http: HttpClient) {}

  postTranscription(transcripcion: string): Observable<string> {
    return this.http.post<string>(this.apiUrl, { transcripcion });
  }
}
