import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[] = [];

  constructor(
    private _postsService: PostsService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._postsService.getPosts()
      .subscribe(
        (posts: any) => this.posts = posts,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) this._router.navigate(['/login']);
            if (err.status === 400) {
              localStorage.removeItem('token');
              this._router.navigate(['/login']);
            }
          }
        }
      );

    this._postsService.messages.subscribe(msg => {
      if (msg.action === 'addPost') this.getNewEmitedPost(msg.newPost);
    })
  }

  getNewEmitedPost(newPost): void {
    let posts = [...this.posts];
    posts.push(newPost);
    this.posts = _.orderBy(posts, ['title'], ['asc']);
  }

}
