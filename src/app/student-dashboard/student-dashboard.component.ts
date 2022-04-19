import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router'
import {AngularFirestore} from '@angular/fire/firestore';

declare var $: any;
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  constructor(public cookieService:CookieService,public router:Router,public firestore:AngularFirestore) { }


model={
  fullName:"",
  city:"",
  Class:"",
  email:"",
  phoneNumber:"",
  state:""
}


  ngOnInit(): void {
    var cookieCheck:boolean=this.cookieService.check('Learner');
    if(!cookieCheck)
    {
      this.router.navigate(['/'])

    }else{

      var id=this.cookieService.get('Learner');

      var docref=this.firestore.collection('Students').doc(id);

      docref.ref.get().then((doc)=>{
        if(doc.exists){
          this.model.fullName=doc.data()["fullName"]
          this.model.city=doc.data()["city"]
          this.model.Class=doc.data()["Class"]
          this.model.email=doc.data()["email"]
          this.model.phoneNumber=doc.data()["phoneNumber"]
          this.model.state=doc.data()["state"]
        }

      })



    }
    
  }

}
