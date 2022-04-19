import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-running-class',
  templateUrl: './running-class.component.html',
  styleUrls: ['./running-class.component.scss']
})
export class RunningClassComponent implements OnInit {
  id: string;
  list=[]
  Showlist=[]
  SubscribeList=[]
  constructor(public cookieService:CookieService,public router:Router,public firestore:AngularFirestore) { 
   
console.log(this.SubscribeList)
  }

  ngOnInit(): void {

    var check:Boolean=this.cookieService.check('Learner')
    if(!check)
    {
      this.router.navigate(['/'])
    }
    else
    {
      var id=this.cookieService.get('Learner')
      this.firestore.collection('student_Learning').ref.where('StudentId','==',id).get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          this.list.push(doc.data())
          
        })
      })

      

    }

   
  }

}
