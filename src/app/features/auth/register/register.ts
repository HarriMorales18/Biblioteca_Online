import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { AuthService } from '../../../core/services/auth'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  nombre = ''
  apellido = ''
  email = ''
  password = ''

  role = 'ESTUDIANTE'

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  goHome(){
    this.router.navigate([''])
  }

  register(){

  const data = {
    nombre: this.nombre,
    apellido: this.apellido,
    email: this.email,
    password: this.password,
    role: this.role
  }

  this.auth.register(data).subscribe({

    next:()=>{

      alert('Cuenta creada')
      this.router.navigate(['/login'])

    },

    error:(err)=>{

      console.log(err)
      alert('Error al registrar')

    }

  })

}

}