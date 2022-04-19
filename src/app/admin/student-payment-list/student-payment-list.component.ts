import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-student-payment-list',
  templateUrl: './student-payment-list.component.html',
  styleUrls: ['./student-payment-list.component.scss']
})
export class StudentPaymentListComponent implements OnInit {

  uploadedlist: any[];
  model={
    Payment:false
  }
  selectedValue: any=[];
  path: string;
  alert: any=[];
  message: any=[];
  constructor(public firestore:AngularFirestore,private router: Router,private cookieService:CookieService) {
    
   }
  
   UpdatePayment=(TeacherId,Class,subject,i)=>{
    this.model.Payment = this.selectedValue;
    // console.log(this.model.Payment)
     this.path=TeacherId+"_"+subject+"_"+Class;
     this.firestore.collection('student_Learning').doc(this.path).update({Payment: this.selectedValue[i],Learning:"true"}).then((res)=>{
       this.alert[i]="";
       this.message[i]="updated sucessfully";
       setTimeout(() => {
         this.message[i]="";
         this.alert[i]="";
       }, 2000);
     }).catch((error)=>{
       this.message[i]="";
       this.alert[i]="error";
       setTimeout(() =>{
         this.message[i]="";
         this.alert[i]="";
       })
     });
    //  console.log(TeacherId);
    //  console.log(Class);
    //  console.log(subejct);
    //  console.log(this.selectedValue);
   }

  ngOnInit(): void {
    if(this.cookieService.check('Admin')){
      this.firestore.collection('student_Learning').valueChanges().subscribe(res=>{
       
        this.uploadedlist=res
        //console.log(this.uploadedlist)
      })
    }else{
      this.router.navigate(['/admin/admin-login']);
    }
   
  }

}
