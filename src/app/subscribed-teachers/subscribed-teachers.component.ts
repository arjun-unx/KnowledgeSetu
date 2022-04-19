import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-subscribed-teachers',
  templateUrl: './subscribed-teachers.component.html',
  styleUrls: ['./subscribed-teachers.component.scss']
})
export class SubscribedTeachersComponent implements OnInit {

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
      this.firestore.collection('Subscribed_Teachers').ref.where('StudentId','==',id).get().then(querySnapshot=>{
        querySnapshot.forEach((doc)=>{
          this.firestore.collection('UploadedVideos').ref.where('id','==',doc.data()['TeacherId']).get().then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
              this.SubscribeList.push(doc.data())
            })
          })
        })
      })
    }


  }

}
