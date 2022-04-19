import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {


  model={
    fullName:"",
    city:"",
    Class:"",
    subject:"",
    school:"",
    email:"",
    phoneNumber:"",
    AlternatePhoneno:"",
    address:"",
    state:"",
    aboutme:"",
    postalcode:""
  }
  //list:string[]
  //name:string;
  alert: any;
  id:any;
  message: string;
  constructor(public cookieService:CookieService,public router:Router,public firestore:AngularFirestore) { }

  onSubmit=(updateform)=>{
    let phoneno = '[0-9]';
    if(updateform.invalid && this.model.phoneNumber == phoneno && this.model.phoneNumber.length == 10){
      this.message="";
      this.alert="All fields required";
    }else{
      this.firestore.collection('Students').doc(this.id).update({
        fullName: this.model.fullName,
        city: this.model.city,
        Class: this.model.Class,
        subject: this.model.subject,
        school: this.model.school,
        AlternatePhoneno: this.model.AlternatePhoneno,
        address: this.model.address,
        state: this.model.state,
        aboutme: this.model.aboutme,
        postalcode: this.model.postalcode
      }).then(()=>{
        this.alert="";
        this.message="update successfully";
        setTimeout("window.location.reload(true);",2000);
      }).catch((error)=>{
        this.message="";
        this.alert=error.message;
      });
    }
  } 
  ngOnInit(): void {
    var cookieCheck:boolean=this.cookieService.check('Learner');
    if(!cookieCheck)
    {
      this.router.navigate(['/'])

    }else{

     this.id=this.cookieService.get('Learner');

      var docref=this.firestore.collection('Students').doc(this.id);

      docref.ref.get().then((doc)=>{
        if(doc.exists){
          this.model.fullName=doc.data()["fullName"]
          this.model.city=doc.data()["city"]
          this.model.Class=doc.data()["Class"]
          this.model.subject=doc.data()["subject"]
          this.model.email=doc.data()["email"]
          this.model.phoneNumber=doc.data()["phoneNumber"]
          this.model.AlternatePhoneno=doc.data()["AlternatePhoneno"]
          this.model.state=doc.data()["state"]
          this.model.school=doc.data()["school"]
          this.model.aboutme=doc.data()["aboutme"]
          this.model.address=doc.data()["address"]
          this.model.postalcode=doc.data()["postalcode"]
          //this.list=this.model.fullName.split(" ");
          //this.name=this.list[0]
          
        }

      })
      
    }
  }

}
