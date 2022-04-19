import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  model={
    newemail:"",
    email:"",
  }
  alert:any;
  user: any;
  message:any;
  id: string;
  constructor(private cookieService:CookieService,private router:Router,public firestore:AngularFirestore,private afu: AngularFireAuth) { }
  onSubmit=()=>{
    if(this.model.newemail === this.model.email){
      //this.user=firebase.default.auth().currentUser;
      this.alert="";
      this.message="Please Open Mail and click on the link and do change the Password";
    //   this.user=this.afu.currentUser
    //   this.user.updatePassword(this.model.email).then(function() {
    //   this.message="Please Open Mail and click on the link and do change the Password";
    // }).catch(function(error) {
    //     this.alert=error.message;
    // });
    }else{
      this.alert="Please Enter Your Correct Email";
      this.message="";
    }
  }

  ngOnInit(): void {
    var cookieCheck:boolean=this.cookieService.check('Learner');
    if(!cookieCheck)
    {
      this.router.navigate(['/'])

    }
    else{

      this.id=this.cookieService.get('Learner');
      var docref=this.firestore.collection('Students').doc(this.id);

      docref.ref.get().then((doc) =>{
        if(doc.exists)
        {
           this.model.email=doc.data()["email"]
          // console.log(this.detail)
        }
      })
    }
  }

}
