import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth'
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  authState: any;




  constructor(public firestore:AngularFirestore, private afu: AngularFireAuth,private router:Router,public cookieService:CookieService) {
    this.afu.authState.subscribe((auth=>{
      this.authState=auth;
    }))

   }
   auth_registerteacher(models){
     return this.afu.createUserWithEmailAndPassword(models.email,models.password).then((user)=>{
      this.authState=user
     }).catch(error=>{
      throw error
    })

   }
   loginWithEmail(email,password){
     return this.afu.signInWithEmailAndPassword(email,password).then((user)=>{
       this.authState=user
     }).catch(error=>{
       throw error
     })
   }
   register_TempTeacher(models,id)
   {
     
   
    models["email"]=models.email.toLowerCase();

    //this.Teacher_Exists(models)
     var docRef=this.firestore.collection('TempTeachers');
      return docRef.doc(id).set(models).then(res=>{
        console.log(res)
        
      });
   }

   

   uploadResumeFile(file,id)
   {
    console.log(file+"==>"+id)
   }
   uploadDocuments(files,id)
   {
     console.log(files+"==>"+id)
   }

   Teacher_Exists(models){
    /*this.firestore.collection("TempTeachers").ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.Json_data.push(JSON.stringify(doc.data()))
          //console.log(doc.id +"==>"+ JSON.stringify(doc.data()))
      });
  }).catch(error=>{
    console.log(error)
  })*/
    //console.log("JSON ARRAY"+JSON.stringify(this.Json_data))

    /*this.firestore.collection("TempTeachers").ref.where("email", "==", models.email)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id.length, " => ", Object.keys(doc.data()).length);
            
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });*/
   }
   signOut(){
     this.afu.signOut()
    this.deleteCookie();
     this.router.navigate(['/Teacherlogin'])
   }


   deleteCookie(){
    this.cookieService.delete('Educator','/');
   }
   get_Details()
   {
    var docref=this.firestore.collection('TempTeachers').doc('oxRzYtULUWQKssyvtIHj');

    docref.ref.get().then((doc) =>{
      if(doc.exists)
      {
         console.log(doc.data());
      }
    })
   }
}
