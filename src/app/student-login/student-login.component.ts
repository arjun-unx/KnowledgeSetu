import { Component, OnInit } from '@angular/core';
import csc from 'country-state-city';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { StudentAuthService } from '../services/student-auth.service';
import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'

declare var $: any;
@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss']
})
export class StudentLoginComponent implements OnInit {

  States: any
  Cities: any
  model: any = {}
  loginDetail: any = {}
  alert: string
  result = {}
  message: string
  studentDetails = []
  Loading: boolean
  value: boolean
  showMe: boolean

  constructor(private studentAuthService: StudentAuthService, private firestore: AngularFirestore, private router: Router, private cookieService: CookieService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.States = csc.getStatesOfCountry("IN");
    //console.log(this.States)

  }

  Exist() {
    var i = null;
    for (i = 0; this.studentDetails.length > i; i += 1) {
      console.log(this.studentDetails[i].email)
      if (this.studentDetails[i].email === this.model["email"] || this.studentDetails[i].phoneNumber === this.model["phoneNumber"]) {
        return true;
      }
    }
    return false;

  }

  onSubmit = (buttonType) => {


    if (buttonType == 'SignUp') {
      //console.log(this.model.password)
      if (this.model.password != null && this.model.email != null) {
        if (!this.Exist()) {

          const doc_id = this.model.fullName + "_" + this.model.phoneNumber

          this.studentAuthService.studentRegisterWithEmail(this.model, doc_id).then(() => {
            //this.model.password,this.model.email
            this.message = "Successfully Registered";
            this.router.navigate(['/main-pannel']);
          }).catch(_error => {

            this.router.navigate(['/Studentlogin']);
          })
        }
        else {
          this.message = "You are already registered!!"
        }
      }
      else {
        this.alert = "Fill All the credentials"
      }
    }
    if (buttonType == 'SignIn') {
      this.Loading = true
      if (this.loginDetail.email != null && this.loginDetail.password != null) {
        this.studentAuthService.studentLoginWithEmail(this.loginDetail.email, this.loginDetail.password).then(() => {
          this.firestore.collection('Students').ref.where("email", "==", this.loginDetail.email)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                if (doc.exists) {
                  const dateNow = new Date();
                  //console.log(dateNow.getHours())
                  dateNow.setDate(dateNow.getDate() + 1)

                  this.alert = ""
                  this.Loading = false;
                  this.cookieService.set('Learner', doc.id, dateNow, '/')
                  setTimeout(() => this.router.navigate(['/main-pannel']), 1000)
                  this.value = true
                }

              });
            })


            .catch((error) => {
              console.log("Error getting documents: ", error);
            })
          if (this.value == false)
            this.alert = "It seems that user does not exists"
        }).catch(_error => {

          this.alert = _error.message;
          this.router.navigate(['/Studentlogin']);
        })
      }
      else {
        this.alert = "Fill All the credentials";
      }
    }

  }


  getCities = (id) => {
    this.Cities = csc.getCitiesOfState('IN', id)
  }


  ngOnInit(): void {

    const educatorExists: boolean = this.cookieService.check('Educator')
    const studentExist: boolean = this.cookieService.check('Learner')
    //to check if educator or user is already logged in the navigating to there dashboard according to the ..condition
    if (educatorExists) {
      this.router.navigate(['/teacher/teacherDashboard'])
    }
    if (studentExist) {
      this.router.navigate(['/main-pannel'])
    }





    this.firestore.collection('Students').valueChanges({ idField: 'id' }).subscribe(val => {
      this.studentDetails = val;

    })

    var active = document.querySelector('#pills-home-tab');
    var active1 = document.querySelector('#pills-profile-tab');
    var signin = document.querySelector('#pills-signin');
    var signup = document.querySelector('#pills-profile');
    //the below var for the loader
    $(document).ready(function () {
      $('.bton').click(function () {
        $('#loading').removeClass('display_off');
        $('#loading').addClass('load');
        setTimeout(function () {
          $('#loading').removeClass('load');
          $('#loading').addClass('display_off');
        }, 3700);
      });
    });

    active.addEventListener('click', function () {
      active.classList.add('act');
      signin.classList.add('show');
      signin.classList.add('active');
      signup.classList.remove('show');
      signup.classList.remove('active');
      active1.classList.remove('act');
    });

    active1.addEventListener('click', function () {
      active1.classList.add('act');
      signin.classList.remove('show');
      signin.classList.remove('active');
      signup.classList.add('show');
      signup.classList.add('active');
      active.classList.remove('act');
    });

  }
  toogleTag(result: boolean) {
    this.showMe = !result
  }

}
