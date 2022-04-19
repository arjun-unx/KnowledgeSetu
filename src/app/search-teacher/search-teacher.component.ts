import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router'
import {SharedService} from '../services/shared.service'

@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.scss']
})
export class SearchTeacherComponent implements OnInit {
Showlist=[]
search:any
id:any
model = {
  fullName:"",
  city:"",
  Class:"",
  email:"",
  phoneNumber:"",
  state:""
  
}
value:Boolean
onModalList=[]
paymentdetails={URL:""}
  constructor(public firestore:AngularFirestore,public cookieService:CookieService,public router:Router,public sharedService:SharedService) { }


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



  ngOnInit(): void {

    if(this.cookieService.check('Learner'))
    {

      this.id=this.cookieService.get('Learner')

      var docref=this.firestore.collection('Students').doc(this.id);

      docref.ref.get().then((doc)=>{
        if(doc.exists){
          this.model.fullName=doc.data()["fullName"]
          this.model.city=doc.data()["city"]
          this.model.Class=doc.data()["Class"]
          this.model.email=doc.data()["email"]
          this.model.phoneNumber=doc.data()["phoneNumber"]
          this.model.state = doc.data()["state"]


      this.firestore.collection('UploadedVideos').ref.get()
         .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.Showlist.push( doc.data())
          //console.log(this.Showlist)
          });
          })
          .catch((error) => {
          console.log("Error getting documents: ", error);
          });

        }
      })

      this.firestore.collection('AdminPayment').ref.get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          
          this.paymentdetails.URL=doc.data()["URL"]
          
        })
      })
          
    }else{
      this.router.navigate(['/'])

    }

  }

}
