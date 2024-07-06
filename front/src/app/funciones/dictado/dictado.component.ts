import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-dictado',
  templateUrl: './dictado.component.html',
  styleUrls: ['./dictado.component.css']
})
export class DictationComponent {
  recognition: any;
  transcript: string = '';

  constructor(private zone: NgZone) {
    const { webkitSpeechRecognition }: IWindow = window as any;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.lang = 'es-ES';
    this.recognition.lang = 'en-EN'

    this.recognition.onresult = (event: any) => {
      const transcriptResult = event.results[event.results.length - 1][0].transcript;
      this.zone.run(() => {
        this.transcript += transcriptResult;
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error(event.error);
    };
  }

  startDictation() {
    this.transcript = '';
    this.recognition.start();
  }

  stopDictation() {
    this.recognition.stop();
  }
}

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
