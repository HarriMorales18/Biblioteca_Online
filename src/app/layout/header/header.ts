import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AuthService } from '../../core/services/auth'

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, FormsModule, RouterModule],
	templateUrl: './header.html',
	styleUrl: './header.css'
})
export class Header {

	searchText = ''
	showMenu = false

	constructor(private router: Router, private auth: AuthService) {}

	search(){
		if (this.searchText.trim()){
			this.router.navigate(['/catalog'],{
				queryParams: { search: this.searchText }
			})
		}
	}

	logout(){
		this.auth.logout()
	}

	isLogged(){
		return this.auth.isLogged()
	}

	getUser(){
		return this.auth.user()
	}

	toggleMenu(){
		this.showMenu = !this.showMenu
	}

	closeMenu(){
		this.showMenu = false
	}

	closeMenuDelayed(event:Event){
		// allow routerLink to process first, then close menu
		setTimeout(()=> this.closeMenu(), 0)
	}

}