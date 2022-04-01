import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'UM3mRb38EOGK5M3tCtb07QLdXuI1oFZT';
  private _historial: string[] = [];


  // TODO: Cambiar any por su tipo
  public resultados: any[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){}

  buscarGifs( query: string ){

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    }

    // Peticion HTTP
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=UM3mRb38EOGK5M3tCtb07QLdXuI1oFZT&q=${ query }&limit=10`)
          .subscribe( (resp: any) =>{
            console.log( resp.data );
            this.resultados = resp.data;
          });

  }

}
