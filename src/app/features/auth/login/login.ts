import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { Router } from '@angular/router'
import { AuthService } from '../../../core/services/auth'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = ''
  password = ''

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login(){

  const credentials = {
    email: this.email,
    password: this.password
  }

  this.auth.login(credentials).subscribe({

    next: (res:any) => {

      const token = res.data.token

      this.auth.saveToken(token)

      // obtener el usuario para saber el rol
      this.auth.getCurrentUser().subscribe((user:any)=>{

        this.auth.user.set(user.data)

        const role = user.data.role

        if(role === 'ADMIN'){

          this.router.navigate(['/manage-books'])

        }else{

          this.router.navigate(['/dashboard'])

        }

      })

    },

    error:(err)=>{

      console.log(err)
      alert('Credenciales incorrectas')

    }

  })

}

}