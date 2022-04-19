import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';


declare var $: any;
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public firestore:AngularFirestore, private http:HttpClient,private cookieService:CookieService,private router:Router) { }
  Temp_Teachers=[]
  details={}
  no:number;


Logout(){

  this.cookieService.delete('Admin','/')
 // window.location.reload()
  this.router.navigate(['/admin/admin-login'])


}


  ngOnInit(): void {
    if(this.cookieService.check('Admin')){
      this.firestore.collection('TempTeachers').valueChanges({idField:'id'}).subscribe(val=>{
        this.Temp_Teachers=val;
        //console.log(this.Temp_Teachers)
        this.no=this.Temp_Teachers.length
      })
    }else{
      this.router.navigate(['/admin/admin-login']);
    }
    
    /*this code for toggle the side bar */
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    $("#menu-toggle1").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

}
