import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


/* import component form local */
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TeacherSettingsComponent } from './teacher-settings/teacher-settings.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { LiveClassesComponent } from './live-classes/live-classes.component';
import { ShowVideoComponent } from './show-video/show-video.component';
import { StudentSubscribeListComponent } from './student-subscribe-list/student-subscribe-list.component';
import { TeacherLiveclassShowComponent } from './teacher-liveclass-show/teacher-liveclass-show.component';
import { TermsandconditonComponent } from '../termsandconditon/termsandconditon.component';
import { PrivacyComponent } from '../privacy/privacy.component';


const routes: Routes = [
  {path:'uploadVideo',component:UploadVideoComponent},
  {path:'teacherDashboard',component:TeacherDashboardComponent}, 
  {path:'Profile',component:TeacherProfileComponent},
  {path:'liveClass',component:LiveClassesComponent},
  {path:'teacher-setting',component:TeacherSettingsComponent},
  {path:'showVideo',component:ShowVideoComponent},
  {path:'studentSubscribeList',component:StudentSubscribeListComponent},
  {path:'classshow',component:TeacherLiveclassShowComponent},
  {path:'termscondition',component:TermsandconditonComponent },
  {path:'privacy',component:PrivacyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
