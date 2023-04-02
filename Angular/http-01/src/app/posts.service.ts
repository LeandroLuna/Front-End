import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  url = 'https://angularcourse-a2fb9-default-rtdb.firebaseio.com/posts.json'
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string){
    const postData: Post = {title: title, content: content} 
    this.http.post<{name: string}>(this.url, postData, {observe: 'response'}).subscribe(responseData => console.log(responseData), (error) => this.error.next(error.message))
  }

  fetchPosts(){
    let searchParams = new HttpParams()
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom_key', 'custom_key_value');

    return this.http.get<{[key: string]: Post}>(this.url, { headers: new HttpHeaders({"custom-header": "Hello"}), params: searchParams, responseType: 'json'})
    // this.http.get('https://angularcourse-a2fb9-default-rtdb.firebaseio.com/posts.json')
    // .pipe(map((responseData: {[key: string]: Post}) => {
    .pipe(map(responseData => {
      const postsArr: Post[] = []
      for (const key in responseData) {
        if(responseData.hasOwnProperty(key)){
          postsArr.push({...responseData[key], id: key})
        }
      }
      return postsArr;
    }),
    catchError((errorRes) => {
      return throwError(errorRes)
    })
    )
  }

  deletePosts(){
    return this.http.delete(this.url, {observe: 'events', responseType: 'text'}).pipe(tap(event => {
      if(event.type === HttpEventType.Response){
        console.log(event.body)
      } else {
        console.log(event)
      }
    }))
  }
}
