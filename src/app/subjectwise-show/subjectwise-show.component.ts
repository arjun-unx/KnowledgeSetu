import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {CookieService} from 'ngx-cookie-service';
import {MainComponent} from '../main/main.component'
import {DataService} from '../services/data.service'
import {SharedService} from '../services/shared.service'

@Component({
  selector: 'app-subjectwise-show',
  templateUrl: './subjectwise-show.component.html',
  styleUrls: ['./subjectwise-show.component.scss']
})
export class SubjectwiseShowComponent implements OnInit {

  constructor(public router:Router,private route:ActivatedRoute,private firestore:AngularFirestore,private cookieService:CookieService,public sharedService:SharedService) {
    console.log(this.Showlist)
  }
  Showlist=[]
  Subject:""
  Class:""
  onModalList:{}
  value:Boolean
  id:any
  model = {
    fullName:"",
    city:"",
    Class:"",
    email:"",
    phoneNumber:"",
    state:""
    
  }
  paymentdetails={
    URL:""
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

    
  
  }




  ngOnInit(): void {
    
    this.Subject=this.route.snapshot.params['subject']
    if(this.cookieService.check('Learner'))
    {

    this.id=this.cookieService.get('Learner')

      this.firestore.collection('Students').doc(this.id).ref.get().then((doc)=>{
        this.model.fullName=doc.data()["fullName"]
          this.model.city=doc.data()["city"]
          this.model.Class=doc.data()["Class"]
          this.model.email=doc.data()["email"]
          this.model.phoneNumber=doc.data()["phoneNumber"]
          this.model.state = doc.data()["state"]
      })

    this.firestore.collection('UploadedVideos').ref.where('Subject','==',this.Subject).get()
         .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          if(this.model.Class==doc.data()['Class'])
          this.Showlist.push(doc.data()) 
          
          });
          })
          .catch((error) => {
          console.log("Error getting documents: ", error);
          });

    

          this.firestore.collection('AdminPayment').ref.get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
              
              this.paymentdetails.URL=doc.data()["URL"]
              
            })
          })

        
        
     }
  }

}
