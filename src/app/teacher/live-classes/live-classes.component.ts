import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-live-classes',
  templateUrl: './live-classes.component.html',
  styleUrls: ['./live-classes.component.scss']
})
export class LiveClassesComponent implements OnInit {
  requiredForm: FormGroup;
  id:any;
  model={
    TeacherID:"",
    fullName:"",
    class:"",
    Subjectname:"",
    classtopic:"",
    classLink:"",
    Date:"",
    time:"",
    Classid:""
  }
  alert: string;
  message: string;
  Showlist: any=[];
  ClassData: any=[];
  actualData: any=[];
  path: string;
  constructor(private cookieService:CookieService,private http:HttpClient,private router:Router,
    public firestore:AngularFirestore,private fb: FormBuilder) { this.onSubmit;}

  /*this is below function is used to change the data dynamically in select tag */
  SubjectSelect(Class){
    this.ClassData=[];
    this.Showlist.forEach((obj) => {
      if(obj.Class == Class){
        this.ClassData.push(obj);
      }
    });
  }  

  selectcontent(Class,Subjectname){
    this.actualData=[];
    this.ClassData.forEach((obj) => {
      if(obj.Class == Class && obj.Subejct == Subjectname){
        this.actualData.push(obj);
        //this.uploadDetails.Fees=this.actualData.Fess;
      }
    });
    //console.log(this.actualData);
  }
  onSubmit=(liveform)=>{
    if(liveform.invalid){
      this.message="";
      this.alert="All field required";
    }else{
      this.model.TeacherID = this.id;
        this.path=this.id+"_"+this.model.class+"_"+this.model.Subjectname+"_"+this.model.Date+"_"+this.model.time;
        this.model.Classid = this.id+"_"+this.model.Subjectname+"_"+this.model.class;
        this.firestore.collection('TeacherLiveclass').doc(this.path).set(this.model).then((res)=>{
          this.alert="";
          this.message="submitted successfully";
          setTimeout(() => {
            this.message="";
          }, 1000);
        }).catch((error)=>{
          this.alert=error;
        });
    }

  }
  ngOnInit(): void {
    const cookieCheck:boolean=this.cookieService.check('Educator')
    if(!cookieCheck)
    {
      this.router.navigate(['/'])
    }else{
      this.id=this.cookieService.get('Educator')
      var docref=this.firestore.collection('Teacher').doc(this.id);

      docref.ref.get().then((doc) =>{
      if(doc.exists)
      {
         //this.detail=doc.data();
         this.model.fullName=doc.data()["fullName"]
         this.firestore.collection('TeacherClasses').ref.where('TeacherId','==',this.id).get()
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
    }
  }

}
