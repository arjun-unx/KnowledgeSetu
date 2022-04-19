import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-student-subscribe-list',
  templateUrl: './student-subscribe-list.component.html',
  styleUrls: ['./student-subscribe-list.component.scss']
})
export class StudentSubscribeListComponent implements OnInit {

  constructor(public firestore:AngularFirestore,public cookieService:CookieService,public router:Router) { }
  list=[]
  TId:any


  Approve_Student(models,i){
    console.log(models)
    this.list.splice(i,1)
    this.firestore.collection('Subscribed_Teachers').add(models).then(()=>{
      this.firestore.collection('Student_Request_List').ref.where('StudentId','==',models.StudentId).get().then(querySnapshot=>{
        querySnapshot.forEach((doc)=>{
          doc.ref.delete().then(()=>{
          });
        })  
      })
    })
  }

  fetchData(){
    var id=this.cookieService.get('Educator')
    this.TId=id
    this.firestore.collection('Student_Request_List').ref.where('TeacherId','==',id).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data());
            this.list.push(doc.data())
            
        });
        console.log(this.list)
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    console.log(this.list)
  }

  ngOnInit(): void {

    if(this.cookieService.check('Educator'))
    {
    this.fetchData()
  }
  else
  {
    this.router.navigate(['/'])
    
  }
}

}
