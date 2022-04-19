import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app";


@Component({
  selector: 'app-forgot-password-request',
  templateUrl: './forgot-password-request.component.html',
  styleUrls: ['./forgot-password-request.component.scss']
})
export class ForgotPasswordRequestComponent implements OnInit {
  authState: any = null;
  uploadedlist: any[];
  studentlist: any[];
  // model={
  //   adminfees:"",
  //   totalfees:""
  // }
  selectedValue: any = [];
  studentValue: any = [];

  selectlist: any = [];
  studselectlist: any = [];

  path: string;
  paths: string;

  alert: any = [];
  message: any = [];
  updatePath: string;
  check: boolean = true;
  doubt: boolean = true;
  constructor(public afu: AngularFireAuth, public firestore: AngularFirestore, private router: Router, private cookieService: CookieService) {
    this.afu.authState.subscribe((auth => {
      this.authState = auth;
    }))
  }

  UpdatePayment = (model, i) => {
    const user = firebase.auth().currentUser;
    user.updatePassword(this.selectedValue[i]).then(() => {
      this.firestore.collection('Teacher').ref.where("email", "==", model.email).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.firestore.collection('Teacher').doc(doc.id).update({
            password: this.selectedValue[i],
            // Adminpayment: true
          }).then(res => {
            this.alert[i] = "";
            this.message[i] = "updated sucessfully";
            setTimeout(() => {
              this.alert[i] = "";
              this.message[i] = "";
              window.location.reload()
            }, 2000);
          }).catch((error) => {
            this.message[i] = "";
            this.alert[i] = "error";
            setTimeout(() => {
              this.alert[i] = "";
              this.message[i] = "";
            }, 2000);
          })
        })
      })
    })
  }
  StudentPayment = (stds, j) => {
    this.firestore.collection('Students').ref.where("email", "==", stds.email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.firestore.collection('Students').doc(doc.id).update({
          password: this.studentValue[j],
          // Adminpayment: true
        }).then(res => {
          this.alert[j] = "";
          this.message[j] = "updated sucessfully";
          setTimeout(() => {
            this.alert[j] = "";
            this.message[j] = "";
            window.location.reload()
          }, 2000);
        }).catch((error) => {
          this.message[j] = "";
          this.alert[j] = "error";
          setTimeout(() => {
            this.alert[j] = "";
            this.message[j] = "";
          }, 2000);
        })
      })
    })

  }

  ngOnInit(): void {
    if (this.cookieService.check('Admin')) {
      this.firestore.collection('Teacher').valueChanges().subscribe(res => {
        this.uploadedlist = res
        this.uploadedlist.forEach((data) => {
          if (this.selectlist.length == 0) {
            this.selectlist.push(data);
          } else {
            // this.check=true;
            this.selectlist.forEach(element => {
              if (element["email"] === data["email"]) {
                this.check = false;
              }
            });
            if (this.check) {
              this.selectlist.push(data);
              //console.log(this.selectedValue)
            } else {
              this.check = true;
            }
          }
        })
      })
      this.firestore.collection('Students').valueChanges().subscribe(obj => {
        this.studentlist = obj
        this.studentlist.forEach((data) => {
          if (this.studselectlist.length == 0) {
            this.studselectlist.push(data);
          } else {
            // this.check=true;
            this.studselectlist.forEach(ele => {
              if (ele["email"] === data["email"]) {
                this.doubt = false;
              }
            });
            if (this.doubt) {
              this.studselectlist.push(data);
              //console.log(this.selectedValue)
            } else {
              this.doubt = true;
            }
          }
        })
      })
    } else {
      this.router.navigate(['/admin/admin-login']);
    }

  }

}