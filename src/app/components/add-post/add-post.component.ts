import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  title: string = '';
  article: string = '';
  errorMessage: string = '';

  constructor(
    private _postsService: PostsService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit({ value, valid }): void {
    this._postsService.addPost(value).subscribe(
      (post: any) => this._router.navigate(['/posts']),
      err => this.errorMessage = err.error
    );
  }

}
