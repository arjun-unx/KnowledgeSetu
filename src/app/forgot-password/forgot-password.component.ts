import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
//   id: string;
//   model = {
//     email: "",
//   }
//   forgotpassword = {
//     Id: "",
//     email: ""
//   }
//   message: string;
//   alert: string;
//   path: string;

//   constructor(public firestore: AngularFirestore, public cookieService: CookieService, public router: Router) { }

//   onSubmit = () => {
//     this.forgotpassword.Id = this.id;
//     this.forgotpassword.email = this.model.email;
//     this.path = this.forgotpassword.Id + "_" + this.forgotpassword.email;
//     if (this.forgotpassword != null || this.forgotpassword !== undefined) {
//       this.firestore.collection('Forgot_Password_Request').doc(this.path).set(this.forgotpassword).then((res) => {
//         this.alert = "";
//         this.message = "Your Query is send to admin, Wait For Update from admin";
//         setTimeout(() => {
//           this.alert = "";
//           this.message = "";
//         }, 2000);
//       }).catch((error) => {
//         this.message = "";
//         this.alert = error;
//         setTimeout(() => {
//           this.alert = "";
//           this.message = "";
//         }, 2000);
//       })
//       // console.log(this.help);
//       // console.log(this.path);
//     } else {
//       this.message = "";
//       this.alert = "All the Fields Required";
//       setTimeout(() => {
//         window.location.reload();
//       }, 2000);
//     }
//   }

//   ngOnInit(): void {
//     var cookieCheck: boolean = this.cookieService.check('Learner');
//     var cookieCheck1: boolean = this.cookieService.check('Educator');
//     if (!cookieCheck && !cookieCheck1) {
//       // this.router.navigate(['/'])
//     } else {
//       if (cookieCheck) {
//         this.id = this.cookieService.get('Learner');
//         var docref = this.firestore.collection('Students').doc(this.id);

//         docref.ref.get().then((doc) => {
//           if (doc.exists) {
//             this.model.email = doc.data()["email"]
//             this.forgotpassword.email = this.model.email;
//             //console.log(this.model)
//           }
//         })
//       } else {
//         if (cookieCheck1) {
//           this.id = this.cookieService.get('Educator')
//           var docref = this.firestore.collection('Teacher').doc(this.id);

//           docref.ref.get().then((doc) => {
//             if (doc.exists) {
//               this.model.email = doc.data()["email"]
//               this.forgotpassword.email = this.model.email;
//               //console.log(this.model)
//             }
//           })
//         }
//       }
//     }

//   }

// }
