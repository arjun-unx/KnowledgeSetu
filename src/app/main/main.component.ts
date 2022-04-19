import { Component, OnInit,AfterViewInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router'
import {AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {DataService} from '../services/data.service'
import {SharedService} from '../services/shared.service';

declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  id: string;
  Showlist=[]
  onModalList={
    id:"",
    Class:"",
    Subject:"",
    Fees:"",
    Name:"",
    URL:""

  }

  model = {
    fullName:"",
    city:"",
    Class:"",
    email:"",
    phoneNumber:"",
    state:""
    
  }

  VideoJSON={
    Class:"",
    DocumentPath:"",
    DocumentURL:"",
    Fees:"",
    Name:"",
    Subject:"",
    VideoPath:"",
    VideoURL:"",
    id:""
  }


  runningcourse={
    URL:"",
    Payment:"",
    Subject:"",
    TeacherName:"",
    Class:""
  }

  list:string[]
  name:string
  paymentdetails={
    URL:""
  }
  Message:string
  class:string
  learning:boolean=false
  value:Boolean


  constructor(public cookieService:CookieService,public router:Router,public firestore:AngularFirestore,public dataService:DataService,public sharedService:SharedService) {
   
  }

  

request_And_Check_Payment(){
  const studentlearning = {
    StudentId: this.id,
    TeacherId: this.onModalList["id"],
    Class: this.onModalList["Class"],
    Subject: this.onModalList["Subject"],
    TeacherName:this.onModalList["Name"],
    TeacherFees:this.onModalList["AdminFees"],
    URL:this.onModalList["VideoURL"],
    Payment: false,
    StudentName:this.model.fullName,
    Email:this.model.email,
    StudentPhone:this.model.phoneNumber,
    classid:this.onModalList["id"]+"_"+this.onModalList["Subject"]+"_"+this.onModalList["Class"],
    docid:this.id+"_"+this.onModalList["Subject"]+"_"+this.onModalList["Class"],
    paymentURL:this.paymentdetails.URL
  }
  this.sharedService.setData(studentlearning)
  this.router.navigate(['/teacherinfo'])
  // this.firestore.collection("student_Learning").doc(docid).set(studentlearning).then(()=>{
  //   this.Message="Keep Calm!!,Waiting for Payment Approval.Once its done you will able to access the content"
  //   setTimeout(()=>this.Message="",3000)
  // })
}

check_If_Already_Paid(models)
{
  return this.firestore.collection('student_Learning').doc(this.id+"_"+models.Subject+"_"+models.Class).ref.get().then((doc)=>{
    if(doc.exists){
      if(doc.data()['Payment']==true && doc.data()["URL"]==models.VideoURL){
        this.value=true
      }
      else{
        this.value=false
      }
    }else{
      this.value=false

    }
  })

}

  SetData(models){
  this.onModalList=models
  
  this.check_If_Already_Paid(models).then(()=>{
    if(this.value)
    {
      this.router.navigate(['/student-dashboard/course'])
    }
    else{
      this.request_And_Check_Payment()  
    }
  })
  
  //console.log(this.onModalList)
  
}


  ngOnInit() {
    //window.location.reload()
    window.scrollTo(0,0);

    var cookieCheck:boolean=this.cookieService.check('Learner');
    if(!cookieCheck)
    {
      this.router.navigate(['/'])

    }
    else{

      this.id=this.cookieService.get('Learner');

      var docref=this.firestore.collection('Students').doc(this.id);

      docref.ref.get().then((doc)=>{
        if(doc.exists){
          this.model.fullName=doc.data()["fullName"]
          this.model.city=doc.data()["city"]
          this.model.Class=doc.data()["Class"]
          this.model.email=doc.data()["email"]
          this.model.phoneNumber=doc.data()["phoneNumber"]
          this.model.state = doc.data()["state"]
          this.list = this.model.fullName.split(" ");
          this.name = this.list[0]
          
          this.firestore.collection('UploadedVideos').ref.get()
         .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.Showlist.push(doc.data())
          
          //console.log(this.Showlist)
          
          });
          })
          .catch((error) => {
          console.log("Error getting documents: ", error);
          });

         

        }

      })
    }
    // const change =document.getElementById('change');
    // change.addEventListener('click',() => {
    //   this.src = '../../assets/check-circle.svg';
    // });
    // $(document).ready(function(){
    //   $('.main-carousel').flickity({
    //     cellAlign: 'left',
    //     lazyLoad: true,
    //     pageDots: false,
    //     freeScroll: true, 
    //     wrapAround: true

    //   });
    // });
    $(window).load(function(){
      $('.main-carousel').flickity({
            cellAlign: 'left',
            lazyLoad: true,
            pageDots: false,
            freeScroll: true, 
            wrapAround: true
    
        });
    })

   this.firestore.collection('AdminPayment').ref.get().then((querySnapshot)=>{
     querySnapshot.forEach((doc)=>{
       
       this.paymentdetails.URL=doc.data()["URL"]
       
     })
   })
  }

}
