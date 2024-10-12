import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'contacto', component: ContactFormComponent},
  {path: 'carousel', component: CarouselComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
