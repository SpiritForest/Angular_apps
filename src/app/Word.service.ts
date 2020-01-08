    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

    @Injectable()
    export class WordService {

        constructor(private http: HttpClient) {

        };

        send(oWord) {
            
            if (oWord)

            return this.http.post('/words', {
               english: oWord.english,
               russian: oWord.russian,
               transcription: oWord.transcription,
               audioPath: oWord.audioPath,
               imagePath: oWord.imagePath,
               examples: oWord.examples,
               nextRevise: oWord.nextRevise,
               nuberOfRevised: oWord.nuberOfRevise
            })
        }

        getWords(sPath: string): Observable<any> {
            return this.http.get(sPath);
        }
    }
