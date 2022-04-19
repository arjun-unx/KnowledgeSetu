import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(public firestore:AngularFirestore, private http:HttpClient,private cookieService:CookieService,private router:Router) { }
  Teachers=[]
  students=[]
  lengthstudents:number
  lengthteachers:number
  ngOnInit(): void {

    if(this.cookieService.check('Admin'))
    {
    this.firestore.collection('Teacher').valueChanges({idField:'id'}).subscribe(val=>{
      this.Teachers=val;    
      this.lengthteachers=this.Teachers.length
    })

    this.firestore.collection('Students').valueChanges({idField:'id'}).subscribe(val=>{
      this.students=val;
      this.lengthstudents=this.students.length
    })
  }
  else{
    this.router.navigate(['/admin/admin-login'])

  }
}

}
