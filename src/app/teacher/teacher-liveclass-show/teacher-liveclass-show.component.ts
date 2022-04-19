import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-teacher-liveclass-show',
  templateUrl: './teacher-liveclass-show.component.html',
  styleUrls: ['./teacher-liveclass-show.component.scss']
})
export class TeacherLiveclassShowComponent implements OnInit {
  id: string;
  uploadedlist=[]
  Showlist=[]
  path: string;

  constructor(public cookieService:CookieService,public router:Router,public firestore:AngularFirestore) { 
  }

  deleteclass=(subclass,subject,date,Time)=>{
    this.path=this.id+"_"+subclass+"_"+subject+"_"+date+"_"+Time;
    this.firestore.collection('TeacherLiveclass').doc(this.path).delete().then((res)=>{
      window.location.reload();
    });
  }
  ngOnInit(): void {
    const cookieCheck:boolean=this.cookieService.check('Educator')
    //console.log(cookieCheck)
    if(!cookieCheck)
    {
      this.router.navigate(['/'])
    }else{
     this.id=this.cookieService.get('Educator');
     this.firestore.collection('TeacherLiveclass').ref.where('TeacherID','==',this.id).get()
          .then((querySnapshot) => {
           querySnapshot.forEach((doc) => {
           // doc.data() is never undefined for query doc snapshots
           this.Showlist.push( doc.data())
           //console.log(this.Showlist)
           });
        })
        .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    }
  }

}
