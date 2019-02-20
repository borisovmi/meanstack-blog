import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { PostsComponent } from '../components/posts/posts.component';
import { AddPostComponent } from '../components/add-post/add-post.component';
import { AuthGuard } from '../guards/auth.guard';

const appRouter: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'posts/add', component: AddPostComponent, canActivate: [AuthGuard] }
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRouter)
  ]
})
export class AppRoutingModule { }
