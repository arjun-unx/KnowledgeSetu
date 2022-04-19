import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-teacher-payment',
  templateUrl: './teacher-payment.component.html',
  styleUrls: ['./teacher-payment.component.scss']
})
export class TeacherPaymentComponent implements OnInit {
  uploadedlist: any[];
  // model={
  //   adminfees:"",
  //   totalfees:""
  // }
  selectedValue: any=[];
  selectlist: any=[];
  path: string;
  alert: any=[];
  message: any=[];
  updatePath: string;
  check: boolean=true;
  constructor(public firestore:AngularFirestore,private router: Router,private cookieService:CookieService) {}
  
   UpdatePayment=(model,i)=>{
    this.firestore.collection('UploadedVideos').ref.where("Classid","==",model.Classid).get().then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        this.firestore.collection('UploadedVideos').doc(doc.id).update({
          AdminFees:this.selectedValue[i],
          Adminpayment:true
        }).then(res=>{
          this.alert[i]="";
          this.message[i]="updated sucessfully";
          setTimeout(() => {
            this.alert[i]="";
          this.message[i]="";
          window.location.reload()
          }, 2000);
        }).catch((error)=>{
          this.message[i]="";
          this.alert[i]="error";
          setTimeout(() => {
            this.alert[i]="";
          this.message[i]="";
          }, 2000);
        })
      })
    })

   }

  ngOnInit(): void {
    if(this.cookieService.check('Admin')){
      this.firestore.collection('UploadedVideos').valueChanges().subscribe(res=>{
        this.uploadedlist=res
        this.uploadedlist.forEach((data)=>{
          if(this.selectlist.length == 0){
            this.selectlist.push(data);
          }else{
            // this.check=true;
            this.selectlist.forEach(element => {
              if(element["Classid"] === data["Classid"]){
                this.check=false;
              }
            });
            if(this.check){
              this.selectlist.push(data);
              //console.log(this.selectedValue)
            }else{
              this.check=true;
            }
          }
        })
      })
  }else{
    this.router.navigate(['/admin/admin-login']);
  }
    
  }

}
