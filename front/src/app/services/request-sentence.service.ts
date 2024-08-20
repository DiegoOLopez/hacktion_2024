import { Injectable, inject } from '@angular/core';

// Importamos la libreria http client para realizar solicitudes http
import { HttpClient } from '@angular/common/http';
import { postModel } from '../shared/models/body_request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestSentenceService {
  private http = inject(HttpClient);

  private apiURL = 'http://localhost:3000/enunciado';

  sendSentence(data: postModel){
    return this.http.post<postModel>(this.apiURL, data);
  }
  constructor() { }
}
