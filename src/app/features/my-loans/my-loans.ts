import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoanService } from '../../core/services/loan'


@Component({
  selector:'app-my-loans',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./my-loans.html',
  styleUrl:'./my-loans.css'
})
export class MyLoans implements OnInit{

loans:any[]=[]

constructor(private loanService:LoanService){}

ngOnInit(){

this.loadLoans()

}

loadLoans(){

this.loanService.getMyLoans().subscribe((res:any)=>{

this.loans = res.data

})

}

}