import { Component, NgZone, HostListener } from '@angular/core';
import { TranscripcionService } from '../transcripcion.service';
import { CommonModule } from '@angular/common';

// Importamos el servicio para la solicitud
import { RequestSentenceService } from '../../services/request-sentence.service';
import { response } from 'express';
// Importamos el modelo
import { postModel } from '../../shared/models/body_request.model';


@Component({
  selector: 'app-dictation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dictado.component.html',
  styleUrls: ['./dictado.component.css']
})
export class DictationComponent {
  recognition: any;
  transcript: string = '';
  isRecording: boolean = false;
  // Asignamos la variable del modelo
  post_model: postModel = new postModel();

  constructor(private request_service:RequestSentenceService, private zone: NgZone) {
    const { webkitSpeechRecognition }: IWindow = window as any;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.lang = 'es-ES';

    this.recognition.onresult = (event: any) => {
      const transcriptResult = event.results[event.results.length - 1][0].transcript;
      this.zone.run(() => {
        this.transcript += transcriptResult;
        this.post_model.transcripcion = this.transcript
        this.request_service.sendSentence(this.post_model).subscribe({
          next: (transcripcion_completa) => {
            console.log("Enviado")
            alert("Enviado correctamente" + transcripcion_completa);
          },
          error:(error) => {
            console.log("El error es" + JSON.stringify(error));
            alert("Error" + JSON.stringify(error))
          }
        }
        )
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error(event.error);
    };
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space' && !this.isRecording) {
      this.startDictation();
    }
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (event.code === 'Space' && this.isRecording) {
      this.stopDictation();

    }
  }

  startDictation() {
    this.transcript = '';
    this.isRecording = true;
    this.recognition.start();
  }

  stopDictation() {
    setTimeout(() => {
      this.recognition.stop();
      this.isRecording = false;
    }, 2000); // 5000 milisegundos = 5 segundos
  }

  downloadTranscript() {
    const blob = new Blob([this.transcript], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcripcion.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // saveTranscript() {
  //   this.TranscripcionService.saveTranscription(this.transcript).subscribe(
  //     response => {
  //       console.log('Transcripción guardada con éxito:', response);
  //     },
  //     error => {
  //       console.error('Error al guardar la transcripción:', error);
  //     }
  //   );
  // }

}

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

module exports {DictationComponent};















