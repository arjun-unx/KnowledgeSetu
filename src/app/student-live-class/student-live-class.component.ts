import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-student-live-class',
  templateUrl: './student-live-class.component.html',
  styleUrls: ['./student-live-class.component.scss']
})
export class StudentLiveClassComponent implements OnInit {
  Showlist:any=[]
  id: string;
  classid: any;
  studentpayment: any;
  constructor(public cookieService:CookieService,public router:Router,public firestore:AngularFirestore) { }

  ngOnInit(): void {
    var cookieCheck:boolean=this.cookieService.check('Learner');
    if(!cookieCheck)
    {
      this.router.navigate(['/'])

    }
    else{
      this.id=this.cookieService.get('Learner');
      this.firestore.collection('student_Learning').ref.where('StudentId','==',this.id).get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          this.classid=doc.data()["classid"]
          this.studentpayment=doc.data()["Payment"]
          //console.log(this.classid)
          if(this.classid !== undefined && this.studentpayment === true){
            this.firestore.collection('TeacherLiveclass').ref.where('Classid','==',this.classid).get().then((querySnapshot)=>{
              querySnapshot.forEach((ref)=>{
                this.Showlist.push(ref.data());
                //console.log(this.Showlist);
              })
            })
          }
          
        })
      })
    }
  }

}
