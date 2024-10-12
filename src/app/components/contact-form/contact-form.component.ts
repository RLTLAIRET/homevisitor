import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Input() producto:any={};
  forma:any=FormGroup;
  url=environment.correoUrl;
  constructor( private http: HttpClient,
               private router: Router,
               private fb:FormBuilder,
               ) {
               this.crearFormulario()
               this.CargarFormulario() 
            
              
              }

  ngOnInit(): void {
   
  }

  onSubmit() {
     if (this.forma.invalid){
      Swal.fire('Error', 'Debe completar los campos del formulario!', 'error') 
     return
  }
      
  const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    
  this.http.post(`${this.url}enviarcontacto.php`, this.forma.value, {responseType :"text"}).subscribe(resp=>{
      if (resp="El Mensaje ha sido Enviado"){
          Swal.fire('Gracias por Escribir', 'El Mensaje ha sido Enviado!', 'success')
      } else {
         Swal.fire('Error', 'El Mensaje no fue entregado!', 'error') 
      }
  });
   this.router.navigate(['/home']);
  }

  crearFormulario(){
      this.forma = this.fb.group({
        nombre   :['', [Validators.required,Validators.minLength(5)]],
        telefono :['', [Validators.required,Validators.minLength(9)]],
        correo   :['', [Validators.required,Validators.email]],
        asunto   :['', [Validators.required,Validators.minLength(5)]],
        mensaje  :['', [Validators.required,Validators.minLength(10)]]
      });
  }  
  CargarFormulario(){
        this.forma.reset({
          nombre: "",
          correo: "",
          asunto: "",
          telefono : "",
          mensaje : ""
        })
  }
  get nombreValido(){
      return  this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get correoValido(){
      return  this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  get telefonoValido(){
      return  this.forma.get('telefono').invalid && this.forma.get('telefono').touched;
  }
  get mensajeValido(){
      return  this.forma.get('mensaje').invalid && this.forma.get('mensaje').touched;
  }
  }