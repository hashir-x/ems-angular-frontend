import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserSchema } from '../modules/users/users.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url:string="http://localhost:3000"

  constructor(private http:HttpClient) { }

  adminDetails(){
    // api call to http://localhost:3000/users/1
    return this.http.get(`${this.base_url}/users/1`)
  }

  // get all users
  getallusers(){
    // api call to http://localhost:3000/users
    return this.http.get(`${this.base_url}/users`)
  }

  // adduser
  addUser(user:UserSchema){
    // api cal to http://localhost:3000/users
    return this.http.post(`${this.base_url}/users`,user)
  }

  // get existing user

  getexistinguser(id:any){
    // api call to http://localhost:3000/users/id
    return this.http.get(`${this.base_url}/users/${id}`)
  }

  // update user
  updateuser(id:any,data:UserSchema){
    // api call to http://localhost:3000/users/id
    return this.http.put(`${this.base_url}/users/${id}`,data)
  }

  // delete user
  deleteUser(id:any){
    // api call to http://localhost:3000/user/id
    return this.http.delete(`${this.base_url}/users/${id}`)
  }

  // updateadmin
  updateAdmin(adminBody:UserSchema){
    return this.http.put(`${this.base_url}/users/1`,adminBody)
  }
}
