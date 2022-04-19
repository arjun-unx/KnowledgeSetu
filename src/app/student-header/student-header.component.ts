import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service'
import {Router} from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {StudentAuthService} from '../services/student-auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import { resetFakeAsyncZone } from '@angular/core/testing';
import {FormControl} from '@angular/forms'



@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.scss']
})
export class StudentHeaderComponent implements OnInit {

  constructor(private studentAuthService:StudentAuthService,public firestore:AngularFirestore, private cookieService:CookieService,private router:Router,private http:HttpClient) {
    
   }

  search:any
  student_Id:string
  alert:string
  model={
    TeacherId:"",
    StudentId:"",
    StudentName:"",
    Class:"",
    Email:"",
    PhoneNumber:""

  }
  documents=[]
  
  logout=()=>{
    this.studentAuthService.signOut()
    }

    reset(){
      this.model.TeacherId=""
      setTimeout(()=>this.alert="",1000) 
      var id=document.getElementById("Close")
      id.addEventListener('close',res=>{
        console.log("Clicked")
      })
    }

  requestTeacher(){
    this.firestore.collection('Student_Request_List').add(this.model).then(res=>{
      this.alert="Request Successfull"
      this.reset()
    }).catch(error=>{
      this.alert=error.message
    })

  }
    
   



  ngOnInit(): void {

    this.student_Id=this.cookieService.get('Learner')

    this.firestore.collection('Students').doc(this.cookieService.get('Learner')).ref.get().then((doc)=>{

      this.model.StudentName=doc.data()["fullName"]
      this.model.Class=doc.data()["Class"]
      this.model.Email=doc.data()["email"]
      this.model.PhoneNumber=doc.data()["phoneNumber"]
      this.model.StudentId=this.student_Id
    })

    this.firestore.collection('Teacher').ref.get().then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        this.documents.push(doc.id)
        
      })
    })


  }

}
