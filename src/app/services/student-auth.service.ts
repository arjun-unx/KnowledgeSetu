import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class StudentAuthService {
  authState:any=null;
  constructor(private afu:AngularFireAuth,private router:Router,public firestore:AngularFirestore,public cookieService:CookieService) { 
    this.afu.authState.subscribe((auth=>{
      this.authState=auth;
    }))
  }

  //student registration called from the studentlogin.component.ts file
  studentRegisterWithEmail(model,id)
  { //password:string,email:string
    return this.afu.createUserWithEmailAndPassword(model.email,model.password).then((user)=>
    {
      this.authState=user
      console.log(this.authState);
      
      /*below code is for making collection of each student is firebase > firestore */
      
      // angularfire functions 
      var docRef=this.firestore.collection('Students'); 
       return docRef.doc(id).set(model).then(res=>{
         
          console.log(res);  
      }); 
    }).catch(error=>{
      console.log(error)
      throw error;
    })
  }

  // this is the function for student login called from the studentlogin.component.ts
  studentLoginWithEmail(email:string,password:string)
  {
    return this.afu.signInWithEmailAndPassword(email,password).then((user)=>{
      this.authState=user
      console.log("Auth State"+this.authState)
    }).catch(error=>{

      console.log(error)
      throw error;
    })
  }

  //this function is used for logout the student from the pannel
  //called when student click on the logout button

  deleteCookie(){
    this.cookieService.delete('Learner','/');
   }
  signOut()
  {

    this.afu.signOut()
    this.deleteCookie()
    this.router.navigate(['/']);
  }

}


