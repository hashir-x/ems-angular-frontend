import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserSchema } from '../users.model';
import { Router } from '@angular/router';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{

  allUsers:UserSchema[]=[]
  searchKey:string=""
  page:number=1
  count:number=0
  tableSize:number=5

  constructor(private api:ApiService){}

  // when usersListComponent page is open all getUserList()
  ngOnInit(): void {
    this.getUserList()
  }

// when users list pge open, display all users list from json file by making an api call : http://localhost:3000/users

  getUserList(){
    this.api.getallusers().subscribe({
      next:(result:any)=>{
        console.log(result);
        this.allUsers = result
      },
      error:(result:any)=>{
        console.log(result);
        alert("An error occurred while fetching data... Please try after some time!!!")
      }
    })
  }

  deleteUser(id:any){
    this.api.deleteUser(id).subscribe({
      next:(res:any)=> {
      console.log("Deleted Successfully");
      this.getUserList()
      },
      error:(err:any)=> {
        alert("Cannot perform the action now... Please try after some time")
      }
    })
  }

  sortById(){
    this.allUsers.sort((a:any,b:any)=>a.id-b.id)
  }

  sortByName(){
    this.allUsers.sort((a:any,b:any)=>a["name"].localeCompare(b["name"]))
  }

  onTableDataChange(event:any){
    this.page = event
  }

  generatePDF(){
    let pdf = new jspdf()
    const head = [['User Id', 'Username', 'Email', 'Status']]
    const body:any = []
    this.allUsers.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.active])
    })
    pdf.setFontSize(16)
    pdf.text("All Employee List",10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save("allusers.pdf")
  }
}
