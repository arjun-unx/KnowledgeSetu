import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  uploadedlist: any[];
  alert: any=[];
  message: any=[];
  path: any;
  constructor(public firestore:AngularFirestore,private router: Router,private cookieService:CookieService) { }

  UpdatePayment(model){
    this.path=model.Id+"_"+model.day+"_"+model.month+"_"+model.year+"_"+model.second;
    this.firestore.collection('HelpQuery').doc(this.path).delete();
  }

  ngOnInit(): void {
    if(this.cookieService.check('Admin')){
      this.firestore.collection('HelpQuery').valueChanges().subscribe(res=>{
        this.uploadedlist=res
      })
    }else{
      this.router.navigate(['/admin/admin-login']);
    }
    
  }

}
