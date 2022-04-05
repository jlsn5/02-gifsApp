import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
  private apiKey: string = 'UM3mRb38EOGK5M3tCtb07QLdXuI1oFZT';
  private _historial: string[] = [];


  //Tipo Gif
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){

    //Filtrar si existe y coger los items del local storage
    if( localStorage.getItem('historial') ){
      this._historial = JSON.parse( localStorage.getItem('historial')! );
    }

    this.resultados = JSON.parse( localStorage.getItem('resultados')! );

  }

  //Metodo que busca Gifs
  buscarGifs( query: string = '' ){

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      //Añadiendo a local storage
      localStorage.setItem('historial', JSON.stringify( this._historial ));
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);

    // Peticion HTTP
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
          .subscribe( ( resp ) =>{
            console.log( resp.data );
            this.resultados = resp.data;

            //Para cargar la ultima busqueda en inicio
            localStorage.setItem('resultados', JSON.stringify( this.resultados ));
          });

  }
  //Fin Metodo que busca Gifs

}
