import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  id: string;
  model={
    fullName:"",
    email:"",
    phoneNumber:""
  }
  help={
    Id:"",
    fullName:"",
    email:"",
    phoneNumber:"",
    Date:"",
    Time:"",
    second:"",
    day:"",
    month:"",
    year:"",
    query:""
  }
  message: string;
  alert: string;
  path: string;
  
  constructor(public firestore:AngularFirestore,public cookieService:CookieService,public router:Router) { }

  onSubmit=()=>{
    var current = new Date();
    this.help.Id=this.id;
    this.help.fullName=this.model.fullName;
    this.help.email=this.model.email;
    this.help.phoneNumber=this.model.phoneNumber;
    this.help.Date=current.toLocaleDateString();
    this.help.Time=current.toLocaleTimeString();
    this.help.second=current.getSeconds().toString();
    this.help.day=current.getDate().toString();
    this.help.year=current.getFullYear().toString();
    let month=current.getMonth()+1;
    this.help.month=month.toString();
    this.path=this.help.Id+"_"+this.help.day+"_"+this.help.month+"_"+this.help.year+"_"+this.help.second;
    if(this.help != null || this.help !== undefined){
      this.firestore.collection('HelpQuery').doc(this.path).set(this.help).then((res)=>{
        this.alert="";
        this.message="Your Query is send to admin, Wait For Update from admin";
        setTimeout(() => {
          this.alert="";
          this.message="";
        }, 2000);
      }).catch((error)=>{
        this.message="";
        this.alert=error;
        setTimeout(() => {
          this.alert="";
          this.message="";
        }, 2000);
      })
      // console.log(this.help);
      // console.log(this.path);
    }else{
      this.message="";
      this.alert="All the Fields Required";
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  ngOnInit(): void {
    var cookieCheck:boolean=this.cookieService.check('Learner');
    var cookieCheck1:boolean=this.cookieService.check('Educator');
    if(!cookieCheck && !cookieCheck1){
      this.router.navigate(['/'])
    }else{
      if(cookieCheck){
        this.id=this.cookieService.get('Learner');
        var docref=this.firestore.collection('Students').doc(this.id);

          docref.ref.get().then((doc)=>{
            if(doc.exists){
              this.model.fullName=doc.data()["fullName"]
              this.model.email=doc.data()["email"]
              this.model.phoneNumber=doc.data()["phoneNumber"]
              this.help.fullName=this.model.fullName;
              this.help.email=this.model.email;
              //console.log(this.model)
            }
          })
      }else{
        if(cookieCheck1){
          this.id=this.cookieService.get('Educator')
          var docref=this.firestore.collection('Teacher').doc(this.id);

          docref.ref.get().then((doc) =>{
          if(doc.exists)
          {

            this.model.fullName=doc.data()["fullName"]
            this.model.phoneNumber=doc.data()["phoneNumber"]
            this.model.email=doc.data()["email"]
            this.help.fullName=this.model.fullName;
            this.help.email=this.model.email;
            //console.log(this.model)
          }
        })
        }
      }
    }
    
  }

}
