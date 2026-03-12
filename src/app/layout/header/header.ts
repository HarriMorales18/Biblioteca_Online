import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { BookService } from '../../core/services/book'
import { AuthService } from '../../core/services/auth'

@Component({
  selector:'app-header',
  standalone:true,
  imports:[CommonModule, RouterModule, FormsModule],
  templateUrl:'./header.html',
  styleUrl:'./header.css'
})
export class HeaderComponent {

searchText=''

constructor(
private router:Router,
private bookService:BookService,
public authService:AuthService
){}

search(){

if(!this.searchText.trim()) return

this.router.navigate(['/catalog'],{
queryParams:{search:this.searchText}
})

this.searchText=''

}

logout(){

this.authService.logout()

}

}