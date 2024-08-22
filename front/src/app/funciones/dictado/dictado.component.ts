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

// Utilizaremos la API de reconocimiento de voz del navegador (especificamiente webkitSpeechRecognition) que convertira la voz a texto en tiempo real

export class DictationComponent {
    // recognition es una instacia de webkitSpeechRecognition para manejar el reconocmiento de voz
  recognition: any;
    // transcript es una cadena de texto que almacena la transcipcion del reocnomiento en formato de cadena
  transcript: string = '';
    // isRecording es un booleano que indica si el reconocimiento de voz esta activo o no
  isRecording: boolean = false;
  // Asignamos la variable del modelo
  post_model: postModel = new postModel();

  constructor(private request_service:RequestSentenceService, private zone: NgZone) {
    const { webkitSpeechRecognition }: IWindow = window as any;
    // Verificamos si el navegador soporta la API de reconocimiento de voz
    this.recognition = new webkitSpeechRecognition();
    // Configuramos la instancia de reconocimiento para que sea continuo y en español
    this.recognition.continuous = true;
    // Configuramos la instancia de reconocimiento para que no muestre resultados intermedios
    this.recognition.interimResults = false;
    // Configuramos la instancia de reconocimiento para que el lenguaje sea
    this.recognition.lang = 'es-ES';

    // Evento que se ejecuta cuando se obtiene un resultado del reconocimiento de voz
    this.recognition.onresult = (event: any) => {
      // Obtenemos el resultado de la transcripcion
      const transcriptResult = event.results[event.results.length - 1][0].transcript;
      // Actualizamos la transcripcion en la vista
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

    // Evento que se ejecuta cuando se produce un error en el reconocimiento de voz
    this.recognition.onerror = (event: any) => {
      console.error(event.error);
    };
  }

  // Evento que se ejecuta cuando se presiona una tecla
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // Si se presiona la tecla espacio y no se esta grabando, se inicia el reconocimiento de voz
    if (event.code === 'Space' && !this.isRecording) {
      this.startDictation();
    }
  }

  // Evento que se ejecuta cuando se suelta una tecla
  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    // Si se suelta la tecla espacio y se esta grabando, se detiene el reconocimiento de voz
    if (event.code === 'Space' && this.isRecording) {
      this.stopDictation();

    }
  }

  // Inicia el reconocimiento de voz
  startDictation() {
    this.transcript = '';
    this.isRecording = true;
    this.recognition.start();
  }

  // Detiene el reconocimiento de voz
  stopDictation() {
    setTimeout(() => {
      this.recognition.stop();
      this.isRecording = false;
    }, 2000); // 2000 milisegundos = 2 segundos
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















