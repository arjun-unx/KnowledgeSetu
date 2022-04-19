import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {TeacherService} from '../../services/teacher.service';
import { CookieService } from 'ngx-cookie-service';

declare const sendmail: any;
@Component({
  selector: 'app-teacher-approval',
  templateUrl: './teacher-approval.component.html',
  styleUrls: ['./teacher-approval.component.scss']
})
export class TeacherApprovalComponent implements OnInit {

  constructor(public firestore:AngularFirestore,public Storage:AngularFireStorage, private route:ActivatedRoute,private http:HttpClient,private router:Router,
    private teacherservice:TeacherService,private cookieService:CookieService) 
  { 

  }
  detail={
  fullName:"",
  city:"",
  state:"",
  phoneNumber:"",
  email:"",
}
FileURL=[]
file=[]

filesLength:number=0
Teacher_Id:any
downloadData={}
Password:any={}



RegisterTeacher=()=>{
    this.detail["password"]=this.Password;
    this.teacherservice.auth_registerteacher(this.detail)
    this.firestore.collection('Teacher').doc(this.Teacher_Id).set(this.detail).then(res=>{
      this.firestore.collection('TempTeachers').doc(this.Teacher_Id).delete();
    });
    this.router.navigate(['/admin/admin'])
    
    //sendmail(this.Password,this.Teacher_Id)
}

getFilesURL(itemRef)
  {

    return itemRef.getDownloadURL().then(function(url){
      return url

  })

}


  ngOnInit(): void {
    if(this.cookieService.check('Admin')){
      this.Teacher_Id=this.route.snapshot.params['id'];

      //the below variable and code is used to delete the teacher record form data 
     let teacherreject = document.getElementById('Reject');
     teacherreject.addEventListener('click',()=>{
       this.firestore.collection('TempTeachers').doc(this.Teacher_Id).delete();
       this.Storage.storage.ref(this.Teacher_Id).listAll().then(data => { data.items.forEach(item => { item.delete() }); })
     })
     
   
   var docref=this.firestore.collection('TempTeachers').doc(this.Teacher_Id);
   
       docref.ref.get().then((doc) =>{
         if(doc.exists)
         {
            //this.detail=doc.data();
            this.detail.fullName=doc.data()["fullName"]
            this.detail.city=doc.data()["city"]
            this.detail.state=doc.data()["state"]
            this.detail.phoneNumber=doc.data()["phoneNumber"]
            this.detail.email=doc.data()["email"]
           // console.log(this.detail)
         }
       })
   
       //create refress
   var listRef = this.Storage.storage.ref(this.Teacher_Id)
   
   
   // Find all the prefixes and items.
   listRef.listAll()
     .then((res) => {
       res.prefixes.forEach((folderRef) => {
         // All the prefixes under listRef.
         // You may call listAll() recursively on them.
        // console.log(folderRef)
       });
       res.items.forEach((itemRef) => {
   
         // All the items under listRef.
         
         
         //console.log(itemRef)
         this.file.push(itemRef.name)//file name aagaya
         //console.log(this.file)
         this.getFilesURL(itemRef).then(res=>{
           this.FileURL.push(res)
           //console.log(this.FileURL)
         })
   
         
       });
     }).catch((error) => {
       // Uh-oh, an error occurred!
     })
    }else{
      this.router.navigate(['/admin/admin-login']);
    }
   

  }
}
