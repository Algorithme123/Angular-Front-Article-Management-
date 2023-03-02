import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article';



@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {



  constructor(private http:HttpClient) { }



//%e Ruperation de tous les articles

  getAllUrl = 'http://localhost:3002/Article/getAll';

  getAll():Observable <Array<Article>>{
    // return this._http.get(`${this.getAllUrl}`);
    return this.http.get<Array<Article>>(this.getAllUrl);


  }



// Sauvegarder une article


saveUrl = 'http://localhost:3002/Article/add';
ajoutArticle(data: any):Observable<any>
{
  console.log(data,"Savegarder Effectuer")

  return this.http.post(`${this.saveUrl}`,data)
}

// Suppression des donnees

deleteUrl = 'http://localhost:3002/Article/delete';


supprimerArticle(id : any):Observable<any>
{
  let ids=id;

  return this.http.delete(`${this.deleteUrl}/${ids}`);
}



modificationArticle (id : number , article : Article) : Observable<Article>{
  return this.http.put<Article>('http://localhost:3002/Article/update/'+id ,article)
}

// recuperation d'article par ID




}
