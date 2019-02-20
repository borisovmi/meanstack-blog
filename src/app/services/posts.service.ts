import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { WebsocketService } from './web-socket.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  messages: Subject<any>;

  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
    private _websocketService: WebsocketService
  ) {
    this.messages = <Subject<any>>_websocketService.connect();
  }

  getPosts() {
    return this._http.get(`${environment.baseApi}/posts`);
  }

  addPost(post) {
    return this._http.post(`${environment.baseApi}/posts`, post);
  }
}
