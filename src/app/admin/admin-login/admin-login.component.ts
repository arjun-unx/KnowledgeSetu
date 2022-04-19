import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AngularFirestore} from '@angular/fire/firestore';
import { getMaxListeners } from 'process';
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  alert:string;
  password:any
  authState:any
  email=""
  constructor(private router: Router,private cookieService:CookieService,public firestore:AngularFirestore,public afu:AngularFireAuth) {

    this.afu.authState.subscribe((auth=>{
      this.authState=auth;
    }))
   }

  ngOnInit(): void {
  }

  Submit(){
    console.log(this.email);
    console.log(this.password);
    this.afu.signInWithEmailAndPassword(this.email,this.password).then((user)=>{
      this.firestore.collection('AdminList').ref.where("Uid","==",user.user.uid).get().then(()=>{
        this.authState=user
        console.log(user.user.uid);
        const dateNow=new Date();
        //console.log(dateNow.getHours())
        dateNow.setDate(dateNow.getDate()+1)

        this.cookieService.set('Admin',user.user.uid, dateNow,'/');

        this.router.navigate(['/admin/admin/admin-home']);
      });

    }).catch(error=>{
      throw error
    })
    // if(this.password == "Krash@admin"){

     
      
    // }else{
    //   this.alert="Wrong Password!!!"
    //   this.password=""
    // }


  }
}
