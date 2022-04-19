import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

/* firebase used library */
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { MatFormFieldModule } from '@angular/material/form-field';

/* teacher component used sevices */
import { TeacherRoutingModule } from './teacher-routing.module';
import { environment } from 'src/environments/environment';


/* import local components */
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { LiveClassesComponent } from './live-classes/live-classes.component';
import { ShowVideoComponent } from './show-video/show-video.component';
import { StudentSubscribeListComponent } from './student-subscribe-list/student-subscribe-list.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherHeaderComponent } from './teacher-header/teacher-header.component';
import { TeacherSettingsComponent } from './teacher-settings/teacher-settings.component';
import { TeacherFooterComponent } from './teacher-footer/teacher-footer.component';
import { TeacherLiveclassShowComponent } from './teacher-liveclass-show/teacher-liveclass-show.component';



@NgModule({
  declarations: [
    UploadVideoComponent,
    LiveClassesComponent,
    ShowVideoComponent,
    StudentSubscribeListComponent,
    TeacherDashboardComponent,
    TeacherProfileComponent,
    TeacherHeaderComponent,
    TeacherSettingsComponent,
    TeacherFooterComponent,
    TeacherLiveclassShowComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule 
  ]
})
export class TeacherModule { }
