import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-payment-upload',
  templateUrl: './payment-upload.component.html',
  styleUrls: ['./payment-upload.component.scss']
})
export class PaymentUploadComponent implements OnInit {
  Path: string;
  documentFile: any;
  documentUploadProgress:Observable<number>
  docNumber: number;
  documentURL: any;
  alert:any;
  message:any;
  model={
    name:"",
    number:"",
    email:"",
    URL:""
  }
  adminpaymentid: string;
  constructor(public firestore:AngularFirestore,public storage:AngularFireStorage,private router: Router,private cookieService:CookieService) { }
  
  handlebarcodefile(event){
    this.documentFile=event.target.files[0]
    //console.log(this.documentFile)
    
  }
  onUpload=(form)=>{
    var no=/[0-9]/;
    var file=this.documentFile.name.split('.').slice(0, -1).join('.');
    if(file.localeCompare("adminBarcode")){
      this.alert="File name should be :=> adminBarcode";
    }else{
      if(form.invalid && this.model.number.length != 10){
        this.alert="All Fields Required!!!";
      }else{
        
        
       
        // this.firestore.collection('AdminPayment').doc(this.adminpaymentid).set(this.model);


        /* this code store barcode into storage */
        this.Path="Admin/Payment/Images/"+this.documentFile.name
        const docStorageRef=this.storage.ref(this.Path)
        const docTask=this.storage.upload(this.Path,this.documentFile)
        docTask.snapshotChanges().pipe(
          finalize(()=>{
            docStorageRef.getDownloadURL().subscribe(url=>{
              //console.log(url)
              this.documentURL=url;
              this.model.URL=url;
              /*this code is store admin details into collection */
              this.firestore.collection('AdminPayment').doc(this.adminpaymentid).set(this.model);
            })
          })
        ).subscribe()

        this.documentUploadProgress.subscribe(res=>{
        this.docNumber=res
        })

      

      }
    }

  }

  ngOnInit(): void {
    if(this.cookieService.check('Admin')){
      this.adminpaymentid="zR8JVtqXzYy$xz%K@gezdRTFhanZwE";
       var docref=this.firestore.collection('AdminPayment').doc(this.adminpaymentid);

      docref.ref.get().then((doc) =>{
      if(doc.exists)
      {
         //this.detail=doc.data();
         this.model.name=doc.data()["name"]
         this.model.number=doc.data()["number"]
         this.model.email=doc.data()["email"]
         this.model.URL=doc.data()["URL"]
        //console.log(this.model);
      }
    })
  }else{
    this.router.navigate(['/admin/admin-login']);
  }
    
    
  }

}
