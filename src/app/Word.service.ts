    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    import { Observable } from 'rxjs';

    @Injectable({
        providedIn: 'root'
    })
    export class WordService {
        
        aWords: any;

        constructor(private http: HttpClient) {

        };

        send(sPath: string, oWord: any): Observable<any> {
            return this.http.put(sPath + `/${oWord.id}`, {
               english: oWord.english,
               russian: oWord.russian,
               transcription: oWord.transcription,
               audioPath: oWord.audioPath,
               imagePath: oWord.imagePath,
               examples: oWord.examples,
               nextRevise: oWord.nextRevise,
               nuberOfRevise: oWord.nuberOfRevise,
               id: oWord.id
            });
        };

        getWords(sPath: string): Observable<any> {
            return this.http.get(sPath);
        };

        getRandomWords(): Observable<any> {
            this.getWords("/words").subscribe(response => {
                this.aWords = response;
            });
            return 
        }

        delete(oWord): void {
            const sId = oWord.id;
            this.http.delete(`/words/${sId}`).subscribe()
        }

        markLearned(oWord): void {
            const sId = oWord.id;
            this.http.post('/learned', oWord).subscribe(() => {
                this.delete(oWord);
            });
        }
    }
