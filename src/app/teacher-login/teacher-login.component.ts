import { Component, OnInit } from '@angular/core';
import csc from 'country-state-city';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { TeacherUploadsComponent } from '../teacher-uploads/teacher-uploads.component';
import { CookieService } from 'ngx-cookie-service'
import { TeacherService } from '../services/teacher.service';
import { AngularFirestore } from '@angular/fire/firestore';


declare var $: any;
@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.scss']
})
export class TeacherLoginComponent implements OnInit {
  States: any = {}
  Cities: any = {}
  model: any = {}
  loginDetail: any = {}
  alert = ""
  result = {}
  Loading: boolean;
  constructor(private http: HttpClient, private route: Router, public dialog: MatDialog, private cookieService: CookieService,
    private teacherservice: TeacherService, private firestore: AngularFirestore) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.States = csc.getStatesOfCountry("IN");
    //console.log(this.States)

    this.model.fullName = ""
    this.model.email = ""
    this.model.address = ""
    this.model.city = ""
    this.model.state = ""
    this.model.phoneNumber = ""
    this.model.dateofBirth = ""
  }


  getCities = (id) => {
    this.Cities = csc.getCitiesOfState('IN', id)
  }

  onSubmit = (buttonType) => {
    if (buttonType === 'SignUp') {
      //console.log("SignUP hua")
      //console.log(this.model.fullName)

      let DialogRef = this.dialog.open(TeacherUploadsComponent, {
        width: '600px',
        data: this.model
      });
    }

    if (buttonType === 'SignIn') {
      this.Loading = true;
      this.teacherservice.loginWithEmail(this.loginDetail.email, this.loginDetail.password).then(res => {
        this.firestore.collection("Teacher").ref.where("email", "==", this.loginDetail.email).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const dateNow = new Date();
            //console.log(dateNow.getHours())
            dateNow.setDate(dateNow.getDate() + 1)

            this.alert = ""
            this.Loading = false;
            this.cookieService.set('Educator', doc.id, dateNow, '/')
            var items = this.cookieService.get('Id')
            setTimeout(() => { this.route.navigate(['/teacher/teacherDashboard']) }, 1000);

          });
        }).catch(error => {

          this.alert = error.message
        })
      }).catch(error => {
        this.alert = error.message
      })
    }
  }
  ngOnInit(): void {

    const educatorExists: boolean = this.cookieService.check('Educator')
    const studentExist: boolean = this.cookieService.check('Learner')
    //to check if educator or user is already logged in the navigating to there dashboard according to the ..condition
    if (educatorExists) {
      this.route.navigate(['/teacher/teacherDashboard'])
    }
    if (studentExist) {
      this.route.navigate(['/main-pannel'])
    }











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

}
