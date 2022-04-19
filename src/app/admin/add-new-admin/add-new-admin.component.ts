import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-new-admin',
  templateUrl: './add-new-admin.component.html',
  styleUrls: ['./add-new-admin.component.scss']
})
export class AddNewAdminComponent implements OnInit {
  authState: any;
  alert: string;
  password: string;
  loading: boolean;
  model={
   name:"",
   email:"",
   password:""
  }
  message: string;
  constructor(private router: Router,private cookieService:CookieService,public firestore:AngularFirestore,public afu:AngularFireAuth) { 
    this.afu.authState.subscribe((auth=>{
      this.authState=auth;
    }))
  }

  Submit(){
    if(this.model.email== null || this.model.password==null || this.model.email == undefined || this.model.password == undefined){
      this.alert="All the fields Required!!!"
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }else{
      this.afu.createUserWithEmailAndPassword(this.model.email,this.model.password).then(cred=>{
       return this.firestore.collection('AdminList').doc(cred.user.uid).set(this.model);
      }).then(()=>{
        this.alert="";
        this.message="Created Successfully";
        setTimeout(() => {
          this.alert="";
          this.message="";
        }, 3000);
      }).catch(error=>{
        this.message="error";
      })
    }
  }
  ngOnInit(): void {
    if(this.cookieService.check('Admin')){

    }else{
      this.router.navigate(['/admin/admin-login']);
    }
  }

}
