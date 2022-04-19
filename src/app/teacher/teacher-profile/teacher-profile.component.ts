import { Component, OnInit } from '@angular/core';
import csc from 'country-state-city';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent implements OnInit {
  id: any;
  message: any;
  alert: any;
  model = {
    fullName: "",
    city: "",
    state: "",
    dob: "",
    phoneNumber: "",
    email: "",
    address: "",
    aboutme: "",
    workfield: ""
  }
  States: any = {}
  Cities: any = {}
  constructor(private cookieService: CookieService, private router: Router,
    public firestore: AngularFirestore, public dialog: MatDialog) {
    this.States = csc.getStatesOfCountry("IN");
  }
  getCities = (id) => {
    this.Cities = csc.getCitiesOfState('IN', id)
  }
  onSubmit = (updateform) => {
    let phoneno = '[0-9]';
    if (updateform.invalid && this.model.phoneNumber == phoneno && this.model.phoneNumber.length == 10) {
      this.message = "";
      this.alert = "All fields required";
    } else {
      this.firestore.collection('Teacher').doc(this.id).update({
        fullName: this.model.fullName,
        email: this.model.email,
        city: this.model.city,
        state: this.model.state,
        dob: this.model.dob,
        address: this.model.address,
        aboutme: this.model.aboutme,
        workfield: this.model.workfield
      }).then(() => {
        this.alert = "";
        this.message = "update successfully";
        setTimeout("window.location.reload(true);", 2000);
      }).catch((error) => {
        this.message = "";
        this.alert = error.message;
      });
    }
  }
  ngOnInit(): void {
    const cookieCheck: boolean = this.cookieService.check('Educator')
    //console.log(cookieCheck)
    if (!cookieCheck) {
      this.router.navigate(['/'])
    } else {
      this.id = this.cookieService.get('Educator')
      var docref = this.firestore.collection('Teacher').doc(this.id);

      docref.ref.get().then((doc) => {
        if (doc.exists) {
          //this.detail=doc.data();
          this.model.fullName = doc.data()["fullName"]
          this.model.dob = doc.data()["dob"]
          this.model.city = doc.data()["city"]
          this.model.state = doc.data()["state"]
          this.model.phoneNumber = doc.data()["phoneNumber"]
          this.model.email = doc.data()["email"]
          this.model.address = doc.data()["address"]
          this.model.aboutme = doc.data()["aboutme"]
          this.model.workfield = doc.data()["workfield"]
          // console.log(this.detail)
        }
      })
    }
  }

}

