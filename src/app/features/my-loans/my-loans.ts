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

  // If navigation state contains a new loan, show it immediately
  const state:any = history.state || {}
  if(state.newLoan){
    this.loadLoans()
    setTimeout(()=>{
      const exists = this.loans.find(l=>l.id === state.newLoan.id)
      if(!exists){
        this.loans.unshift(state.newLoan)
      }
    }, 250)
  } else {
    this.loadLoans()
  }

}

loadLoans(){

this.loanService.getMyLoans().subscribe((res:any)=>{

this.loans = res.data

})

}

}