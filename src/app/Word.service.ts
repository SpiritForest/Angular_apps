    import {
      HttpClient
    } from '@angular/common/http';
    import {
      Injectable
    } from '@angular/core';
    import {
      Observable
    } from 'rxjs';
    import {
      oWord
    } from './models/oWord';

    @Injectable({
      providedIn: 'root'
    })
    export class WordService {

      aWords: any;

      constructor(private http: HttpClient) {

      };

      send(sPath: string, oWord: oWord): Observable < any > {
        return this.http.put(sPath + `/${oWord.id}`, oWord);
      };

      getWords(sPath: string): Observable < any > {
        return this.http.get(sPath);
      };

      getRandomWords(): Observable < any > {
        this.getWords("/words").subscribe(response => {
          this.aWords = response;
        });
        return
      }

      delete(oWord: oWord): void {
        this.http.delete(`/words/${oWord.id}`).subscribe()
      }

      markLearned(oWord: oWord): void {
        this.http.post(`/learned/`, oWord).subscribe(
          () => {
            this.delete(oWord);
          }
        );
      }
    }
