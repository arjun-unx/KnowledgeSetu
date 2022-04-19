
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-newteacher-list',
  templateUrl: './admin-newteacher-list.component.html',
  styleUrls: ['./admin-newteacher-list.component.scss']
})
export class AdminNewteacherListComponent implements OnInit {

  constructor(public firestore:AngularFirestore, private http:HttpClient,private router: Router,private cookieService:CookieService) { }
  Temp_Teachers=[]
  details={}
  ngOnInit(): void {
    if(this.cookieService.check('Admin')){
      this.firestore.collection('TempTeachers').valueChanges({idField:'id'}).subscribe(val=>{
        this.Temp_Teachers=val;
        //console.log(this.Temp_Teachers)
  
      })
    }else{
      this.router.navigate(['/admin/admin-login']);
    }
    
  }

}
