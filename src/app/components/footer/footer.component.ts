import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  whatsapp=environment.whatsapprlt
  constructor(private router: Router){

  }

  contactForm(){
      this.router.navigate(['/contacto'])
  }
}
