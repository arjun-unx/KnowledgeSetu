import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { TeacherUploadsComponent } from './teacher-uploads/teacher-uploads.component';

import { CookieService } from 'ngx-cookie-service';

import { StudentCourseDocumentsComponent } from './student-course-documents/student-course-documents.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';

import { TeacherFooterComponent } from './teacher-footer/teacher-footer.component';

import { HelpComponent } from './help/help.component';

import { HeaderComponent } from './header/header.component';


import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { SettingsComponent } from './settings/settings.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LecturePaymentComponent } from './lecture-payment/lecture-payment.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentLiveClassComponent } from './student-live-class/student-live-class.component';
import { MainComponent } from './main/main.component';
import { CourseDocumentComponent } from './course-document/course-document.component';
import { RunningClassComponent } from './running-class/running-class.component';
import { CourseComponent } from './course/course.component';
import { StudentHeaderComponent } from './student-header/student-header.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter'

import { FlickityModule } from 'ngx-flickity';
import { SearchTeacherComponent } from './search-teacher/search-teacher.component';
import { TeacherInfoComponent } from './teacher-info/teacher-info.component';
import { SubjectwiseShowComponent } from './subjectwise-show/subjectwise-show.component';
import { TermsandconditonComponent } from './termsandconditon/termsandconditon.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SubscribedTeachersComponent } from './subscribed-teachers/subscribed-teachers.component';
import { BlogComponent } from './blog/blog.component';
import { FirstComponent } from './standard/first/first.component';
import { SecondComponent } from './standard/second/second.component';
import { ThirdComponent } from './standard/third/third.component';
import { FourthComponent } from './standard/fourth/fourth.component';
import { FifthComponent } from './standard/fifth/fifth.component';
import { SixthComponent } from './standard/sixth/sixth.component';
import { SeventhComponent } from './standard/seventh/seventh.component';
import { EigthComponent } from './standard/eigth/eigth.component';
import { NinethComponent } from './standard/nineth/nineth.component';
import { TenthComponent } from './standard/tenth/tenth.component';
import { EleventhComponent } from './standard/eleventh/eleventh.component';
import { TwelfthComponent } from './standard/twelfth/twelfth.component';



const material = [
  MatGridListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentLoginComponent,
    TeacherLoginComponent,
    StudentRegisterComponent,
    TeacherRegisterComponent,
    TeacherUploadsComponent,

    StudentProfileComponent,
    StudentLiveClassComponent,
    StudentDashboardComponent,
    SearchTeacherComponent,
    StudentCourseDocumentsComponent,
    StudentCoursesComponent,

    TeacherFooterComponent,
    CourseDocumentComponent,
    MainComponent,
    HelpComponent,
    RunningClassComponent,
    CourseComponent,
    StudentHeaderComponent,
    HeaderComponent,

    SettingsComponent,
    ForgotPasswordComponent,
    LecturePaymentComponent,

    ChangePasswordComponent,
    PagenotfoundComponent,
    SearchTeacherComponent,
    TeacherInfoComponent,
    SubjectwiseShowComponent,
    TermsandconditonComponent,
    PrivacyComponent,
    SubscribedTeachersComponent,
    BlogComponent,
    FirstComponent,
    SecondComponent, 
    ThirdComponent, 
    FourthComponent, 
    FifthComponent, 
    SixthComponent, 
    SeventhComponent, 
    EigthComponent, 
    NinethComponent, 
    TenthComponent, 
    EleventhComponent, 
    TwelfthComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FlickityModule,
    Ng2SearchPipeModule,

  ],
  entryComponents: [
    TeacherUploadsComponent
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
