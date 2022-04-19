import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { StudentLoginComponent } from '../app/student-login/student-login.component';
import { TeacherLoginComponent } from '../app/teacher-login/teacher-login.component';

import { HelpComponent } from './help/help.component';

import { SettingsComponent } from './settings/settings.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LecturePaymentComponent } from './lecture-payment/lecture-payment.component';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { CourseComponent } from './course/course.component';
import { RunningClassComponent } from './running-class/running-class.component';
import { StudentLiveClassComponent } from './student-live-class/student-live-class.component';
import { CourseDocumentComponent } from './course-document/course-document.component';
import { MainComponent } from './main/main.component';

import { SearchTeacherComponent } from './search-teacher/search-teacher.component'
import { SubjectwiseShowComponent } from './subjectwise-show/subjectwise-show.component';
import { TeacherInfoComponent } from './teacher-info/teacher-info.component';
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
// import { FirstComponent } from './standard/first/first.component';
const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'Studentlogin', component: StudentLoginComponent },
  { path: 'Teacherlogin', component: TeacherLoginComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule) },
  { path: 'teacher', loadChildren: () => import('./teacher/teacher.module').then(mod => mod.TeacherModule) },
  // { path: 'standard', loadChildren: () => import('./standard/standard.module').then(mod => mod.StandardModule) },
  { path: 'searchTeacher', component: SearchTeacherComponent },
  { path: 'Subject/:subject', component: SubjectwiseShowComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'first', component: FirstComponent },
  { path: 'second', component: SecondComponent },
  { path: 'third', component: ThirdComponent },
  { path: 'fourth', component: FourthComponent },
  { path: 'fifth', component: FifthComponent },
  { path: 'sixth', component: SixthComponent },
  { path: 'seventh', component: SeventhComponent },
  { path: 'eigth', component: EigthComponent },
  { path: 'ninth', component: NinethComponent },
  { path: 'tenth', component: TenthComponent },
  { path: 'eleventh', component: EleventhComponent },
  { path: 'twelfth', component: TwelfthComponent },

  {
    path: 'student-dashboard', component: StudentDashboardComponent, children: [
      { path: '', redirectTo: 'Profile', pathMatch: 'full' },
      { path: 'Profile', component: StudentProfileComponent },
      {
        path: 'course', component: CourseComponent, children: [
          { path: '', redirectTo: 'Running', pathMatch: 'full' },
          { path: 'Running', component: RunningClassComponent },
          { path: 'show-live', component: StudentLiveClassComponent },
          { path: 'subscribedTeachers', component: SubscribedTeachersComponent }
        ]
      },
      { path: 'help', component: HelpComponent },
      { path: 'course-document', component: CourseDocumentComponent },
    ]
  },
  { path: 'help', component: HelpComponent },
  { path: 'teacherinfo', component: TeacherInfoComponent },
  { path: 'runningcourse', component: RunningClassComponent },
  { path: 'main-pannel', component: MainComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'payment', component: LecturePaymentComponent },
  { path: 'change-Password', component: ChangePasswordComponent },
  { path: 'termscondition', component: TermsandconditonComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '**', component: PagenotfoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
