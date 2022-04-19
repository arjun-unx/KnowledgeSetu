import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {
  Showlist:any=[];

  constructor(public firestore:AngularFirestore,private router: Router,private cookieService:CookieService) { }

  ngOnInit(): void {
    if(this.cookieService.check('Admin')){
      this.firestore.collection('Teacher').ref.get()
      .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
       // doc.data() is never undefined for query doc snapshots
       this.Showlist.push(doc.data()) 
      // console.log(this.Showlist)
       
       });
       })
       .catch((error) => {
       console.log("Error getting documents: ", error);
       });
    }else{
      this.router.navigate(['/admin/admin-login']);
    }


  }

}
