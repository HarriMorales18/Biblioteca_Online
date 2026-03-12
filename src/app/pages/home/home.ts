import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

@Component({
selector:'app-home',
standalone:true,
imports:[CommonModule, FormsModule, RouterModule],
templateUrl:'./home.html',
styleUrl:'./home.css'
})
export class HomeComponent {

searchText:string=''

books=[

{
titulo:'Clean Code',
autor:'Robert C. Martin',
cover:'/images/clean-code.png'
},

{
titulo:'Design Patterns',
autor:'Erich Gamma',
cover:'/images/design-patterns.png'
},

{
titulo:'Introduction to Algorithms',
autor:'Thomas H. Cormen',
cover:'/images/introduction-to-algorithms.png'
},

{
titulo:'Java Complete Reference',
autor:'Herbert Schildt',
cover:'/images/java-complete-reference.png'
},

{
titulo:'Database System Concepts',
autor:'Silberschatz',
cover:'/images/database-system-concepts.png'
},

{
titulo:'Artificial Intelligence',
autor:'Stuart Russell',
cover:'/images/artificial-intelligence.png'
},

{
titulo:'Computer Networks',
autor:'Tanenbaum',
cover:'/images/computer-networks.png'
},

{
titulo:'Operating System Concepts',
autor:'Silberschatz',
cover:'/images/operating-system-concepts.png'
}

]

constructor(private router:Router){}

search(){

if(this.searchText.trim()){

this.router.navigate(['/catalog'],{
queryParams:{search:this.searchText}
})

}

}

goCatalog(){

this.router.navigate(['/catalog'])

}

}