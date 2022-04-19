import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* firebase used library */
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

/* admin component used sevices */
import { AdminRoutingModule } from './admin-routing.module';
import { environment } from 'src/environments/environment';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

/*admin pannel local component start  */
import { AddNewAdminComponent } from './add-new-admin/add-new-admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNewteacherListComponent } from './admin-newteacher-list/admin-newteacher-list.component';
import { TeacherApprovalComponent } from './teacher-approval/teacher-approval.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { LearnerDetailsComponent } from './learner-details/learner-details.component';
import { PaymentUploadComponent } from './payment-upload/payment-upload.component';
import { TeacherPaymentComponent } from './teacher-payment/teacher-payment.component';
import { StudentPaymentListComponent } from './student-payment-list/student-payment-list.component';
import { HelpComponent } from './help/help.component';
import { ForgotPasswordRequestComponent } from './forgot-password-request/forgot-password-request.component';
import { EbooksComponent } from './ebooks/ebooks.component';

@NgModule({
  declarations: [
    AddNewAdminComponent,
    AdminDashboardComponent,
    AdminHomeComponent,
    AdminLoginComponent,
    AdminNewteacherListComponent,
    TeacherApprovalComponent,
    TeacherDetailsComponent,
    LearnerDetailsComponent,
    PaymentUploadComponent,
    TeacherPaymentComponent,
    StudentPaymentListComponent,
    ForgotPasswordRequestComponent,
    HelpComponent,
    EbooksComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ]
})
export class AdminModule { }
