import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from  '@angular/router'
import {SharedService} from '../services/shared.service'
import {AngularFirestore} from '@angular/fire/firestore'

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.scss']
})
export class TeacherInfoComponent implements OnInit {

  constructor(public cookieService:CookieService,public router:Router,public sharedShared:SharedService,public firestore:AngularFirestore) { }
model={
  Subject:"",
  TeacherName:"",
  Class:"",
  TeacherFees:"",
  URL:"",
  TeacherId:"",
  paymentURL:"",
  Teacherbio:"",
  AdminFees:""
}

subscribeDetails={}
Message=""
locale:{}
paymentdetails:{
  URL:""
}



Subscribe(){
  this.firestore.collection("student_Learning").doc(this.locale["docid"]).set(this.locale).then(()=>{
       this.Message="Keep Calm!!,Waiting for Payment Approval.Once its done you will able to access the content"
       
     })
}

  ngOnInit(): void {
    window.scrollTo(0,0);

    if(this.cookieService.check('Learner'))
    {

      this.locale= this.sharedShared.getData()
      this.model.Subject=this.locale["Subject"]
      this.model.Class=this.locale["Class"]
      this.model.TeacherFees=this.locale["TeacherFees"]
      //this.model.AdminFees=this.locale["AdminFees"]
      this.model.TeacherId=this.locale["TeacherId"]
      this.model.URL=this.locale["URL"]
      this.model.TeacherName=this.locale["TeacherName"]
      this.model.paymentURL=this.locale["paymentURL"]
      //this.model.Teacherbio=this.locale["aboutme"]

      
     
      if(JSON.stringify(this.locale)==="{}")
      {
        this.router.navigate(['/main-pannel'])
     
      }

    }else
    {
      this.router.navigate(['/'])
    }


   

  }

}
