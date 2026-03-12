import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoanService } from '../../core/services/loan'


@Component({
  selector: 'app-admin-loans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-loans.html',
  styleUrl: './admin-loans.css'
})
export class AdminLoans implements OnInit{

loans:any[]=[]

constructor(private loanService:LoanService){}

ngOnInit(){

this.loadLoans()

}

loadLoans(){

this.loanService.getAllLoans().subscribe((res:any)=>{

this.loans=res.data

})

}

returnBook(id:string){

this.loanService.returnLoan(id).subscribe({

next:()=>{

alert("Libro devuelto correctamente")

this.loadLoans()

},

error:()=>{

alert("Error al devolver el libro")

}

})

}

}