    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';

    @Injectable()
    export class SendWordService {

        constructor(private http: HttpClient) {

        };

        send(oWord) {
            return this.http.post('/database', {
               english: oWord.sEn,
               russian: oWord.sRu,
               transcription: oWord.sTranscription,
               audioPath: oWord.sAudioPath,
               imagePath: oWord.sImagePath,
               examples: oWord.sExample
            })
        }
    }
