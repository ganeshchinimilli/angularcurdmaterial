import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   { path: 'form', component: FormComponent },
//   {path:'home',component:HomeComponent},
//   { path: '', redirectTo: '/home', pathMatch: 'full' },


// ];
const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
