import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {TeacherService} from '../services/teacher.service'
import {Router} from '@angular/router';

import {AngularFirestore,AngularFirestoreCollection} from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage'

@Component({
  selector: 'app-teacher-uploads',
  templateUrl: './teacher-uploads.component.html',
  styleUrls: ['./teacher-uploads.component.scss']
})
export class TeacherUploadsComponent implements OnInit {
  TenthResult: any;
  TwelvethResult: any;
  GraduationDegree: any;
  otherDegree: any;
  ICTDegree: any;
  PHDorPHILDegree: any;
  PostGraduationDegree: any;
  bedordldDegree: any;
  TETorCTETDegree: any;


  //detailsRef:AngularFirestoreCollection<Teacher_Detail>
  //details:Observable<Teacher_Detail[]>

  constructor(public firestore:AngularFirestore,public storage:AngularFireStorage  ,public router:Router, public teacherService:TeacherService, public thisDialogRef:MatDialogRef<TeacherUploadsComponent>,@Inject(MAT_DIALOG_DATA) public data:JSON) {
    this.models=this.data
    console.log(this.models)
    
  }
  models={}
  firebaseDetails=[]

  ngOnInit(): void 
  {
    this.firestore.collection('TempTeachers').valueChanges({idField:'id'}).subscribe(val=>{
      this.firebaseDetails=val;
      //console.log(this.firebaseDetails)
    })
    console.log(this.models["email"])
    this.dOC_iD=this.models["fullName"]+"_"+this.models["phoneNumber"]   
  }
  ResumeFile:File;
  Documentfiles:FileList
  message:string
  formData:FormData=new FormData();
  dOC_iD:string
handleResumeFile(event) //handling Resume File
{
  this.ResumeFile=event.target.files[0]
  //console.log(this.ResumeFile)
  var path="Teachers/"+"/"+this.dOC_iD+"/"+this.ResumeFile.name
  this.formData.append('Resume',this.ResumeFile)
  this.storage.upload(path,this.ResumeFile).then(res=>{
    console.log(res)
    console.log('Uploaded');
  })
  
}
handletenthresult(event){
  this.TenthResult=event.target.files[0]
  //console.log(this.TenthResult)
  var path="Teachers/"+"/"+this.dOC_iD+"/"+this.TenthResult.name
  this.formData.append('TenthResult',this.TenthResult)
  this.storage.upload(path,this.TenthResult).then(res=>{
    console.log(res)
    console.log('Uploaded');
  })
  
}
handletewelvethresult(event){
  this.TwelvethResult=event.target.files[0]
  //console.log(this.TwelvethResult)
  var path="Teachers/"+"/"+this.dOC_iD+"/"+this.TwelvethResult.name
  this.formData.append('TwelvethResult',this.TwelvethResult)
  this.storage.upload(path,this.TwelvethResult).then(res=>{
    console.log(res)
    console.log('Uploaded');
  })
}
handlegraduationdegree(event){
  this.GraduationDegree=event.target.files[0]
  //console.log(this.GraduationDegree)
  var path="Teachers/"+"/"+this.dOC_iD+"/"+this.GraduationDegree.name
  this.formData.append('GraduationDegree',this.GraduationDegree)
  this.storage.upload(path,this.GraduationDegree).then(res=>{
    console.log(res)
    console.log('Uploaded');
  })
}
handlePostgraduationdegree(event){
  this.PostGraduationDegree=event.target.files[0]
  //console.log(this.PostGraduationDegree)
  var path="Teachers/"+"/"+this.dOC_iD+"/"+this.PostGraduationDegree.name
  this.formData.append('PostGraduationDegree',this.PostGraduationDegree)
  this.storage.upload(path,this.GraduationDegree).then(res=>{
    console.log(res)
    console.log('Uploaded');
  })
}
handlebedordlddegree(event){
  this.bedordldDegree=event.target.files[0]
  //console.log(this.bedordldDegree)
  var path="Teachers/"+"/"+this.dOC_iD+"/"+this.bedordldDegree.name
  this.formData.append('bedordldDegree',this.bedordldDegree)
  this.storage.upload(path,this.bedordldDegree).then(res=>{
    console.log(res)
    console.log('Uploaded');
  })
}
handlePHDorPHILdegree(event){
  this.PHDorPHILDegree=event.target.files[0]
  //console.log(this.PHDorPHILDegree)
  var path="Teachers/"+"/"+this.dOC_iD+"/"+this.PHDorPHILDegree.name
  this.formData.append('PHD/PHILDegree',this.PHDorPHILDegree)
  this.storage.upload(path,this.PHDorPHILDegree).then(res=>{
    console.log(res)
    console.log('Uploaded');
  })
}
handleTETorCTETdegree(event){
  this.TETorCTETDegree=event.target.files[0]
  //console.log(this.PHDorPHILDegree)
  var path="Teachers/"+"/"+this.dOC_iD+"/"+this.TETorCTETDegree.name
  this.formData.append('TETorCTETDegree',this.TETorCTETDegree)
  this.storage.upload(path,this.TETorCTETDegree).then(res=>{
    console.log(res)
    console.log('Uploaded');
  })
}
handleICTdegree(event){
  this.ICTDegree=event.target.files[0]
  //console.log(this.ICTDegree)
  var path="Teachers/"+"/"+this.dOC_iD+"/"+this.ICTDegree.name
  this.formData.append('ICTDegree',this.ICTDegree)
  this.storage.upload(path,this.ICTDegree).then(res=>{
    console.log(res)
    console.log('Uploaded');
  })
}
handleotherdegree(event){
  this.otherDegree=event.target.files[0]
  //console.log(this.otherDegree)
  var path="Teachers/"+"/"+this.dOC_iD+"/"+this.otherDegree.name
  this.formData.append('OtherDegree',this.otherDegree)
  this.storage.upload(path,this.otherDegree).then(res=>{
    console.log(res)
    console.log('Uploaded');
  })
}
// handleDocumentFile(event) //Handling Document File
// { 
//   var path: string
//   var files:FileList=event.target.files
//   for(var i=0;i<files.length;i++)
//   {

//     path=this.dOC_iD+"/"+files[i].name
//     this.formData.append('Documents',files[i])
//     this.storage.upload(path,files[i]).then(res=>{
//       console.log(res)
//       console.log("Uploaded")
//     })

//   } 
// }


Exists()
{
  var i = null;
        for (i = 0; this.firebaseDetails.length> i; i += 1) {
          console.log(this.firebaseDetails[i].email)
            if (this.firebaseDetails[i].email === this.models["email"] || this.firebaseDetails[i].phoneNumber===this.models["phoneNumber"]){
                return true;
            }
        }
        return false;
}
  onConfirm()
  {
    console.log(this.formData.has('Resume'))
    if(this.formData.has('Resume') && this.formData.has('TenthResult') && this.formData.has('TwelvethResult') && this.formData.has('GraduationDegree'))
    {     
      if(!this.Exists())
      {
      this.teacherService.register_TempTeacher(this.models,this.dOC_iD).
       then(res=>{
         console.log(res)
          this.message="Verification Pending"
          setTimeout(()=>this.thisDialogRef.close(),3000);
          setTimeout(()=>{this.router.navigate(['/Teacherlogin'])},2000)
       }).catch(error=>{
         console.log(error)
         this.message=error;
       })
       

      }
      else{

        this.message="Already Registered";
        setTimeout(()=>this.thisDialogRef.close(),3000);
        setTimeout(()=>this.router.navigate(['/Teacherlogin']),2000)

      }
    }
    else{
      this.message="Please select the files"
    }
  }

  onCancel(){
    this.thisDialogRef.close();
    console.log(this.models)
  }
  
  

  

}
