import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service'
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore'
declare var $: any;
@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

  model={
    fullName:"",
    city:"",
    state:"",
    phoneNumber:"",
    password:"",
    email:""

  }
  constructor(private cookieService:CookieService,private router:Router,public firestore:AngularFirestore) { }

  

  ngOnInit(): void {

    
    const cookieCheck:boolean=this.cookieService.check('Educator')
    //console.log(cookieCheck)
    if(!cookieCheck)
    {
      this.router.navigate(['/'])
    }else{

    

    var id=this.cookieService.get('Educator')
    

    var docref=this.firestore.collection('Teacher').doc(id);

    docref.ref.get().then((doc) =>{
      if(doc.exists)
      {
         //this.detail=doc.data();
         this.model.fullName=doc.data()["fullName"]
         this.model.city=doc.data()["city"]
         this.model.state=doc.data()["state"]
         this.model.phoneNumber=doc.data()["phoneNumber"]
         this.model.email=doc.data()["email"]
         this.model.password=doc.data()["password"]
        // console.log(this.detail)
      }
    })

  }
  }

}
