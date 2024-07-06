import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranscripcionService {

  private http = inject (HttpClient)

  private apiUrl = 'localhost:3000/procesar'; // Cambia esto por la URL de tu API


  postTranscription (transcripcion: string){
    return this.http.post<string>(this.apiUrl, transcripcion);
  }

}
