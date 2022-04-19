import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* admin local components */
import { AddNewAdminComponent } from './add-new-admin/add-new-admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNewteacherListComponent } from './admin-newteacher-list/admin-newteacher-list.component';
import { LearnerDetailsComponent } from './learner-details/learner-details.component';
import { TeacherApprovalComponent } from './teacher-approval/teacher-approval.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { PaymentUploadComponent } from './payment-upload/payment-upload.component';
import { TeacherPaymentComponent } from './teacher-payment/teacher-payment.component';
import { StudentPaymentListComponent } from './student-payment-list/student-payment-list.component';
import { HelpComponent } from './help/help.component';
import { ForgotPasswordRequestComponent } from './forgot-password-request/forgot-password-request.component';
import { EbooksComponent } from './ebooks/ebooks.component';
const routes: Routes = [
  { path: 'admin-login', component: AdminLoginComponent },
  {
    path: 'admin', component: AdminDashboardComponent, children: [
      { path: '', redirectTo: 'admin-home', pathMatch: 'full' },
      { path: 'admin-home', component: AdminHomeComponent },
      { path: 'learner-list', component: LearnerDetailsComponent },
      { path: 'teacher-list', component: TeacherDetailsComponent },
      { path: 'approveTeacher/:id', component: TeacherApprovalComponent },
      { path: 'newteacher-list', component: AdminNewteacherListComponent },
      { path: 'new-admin', component: AddNewAdminComponent },
      { path: 'payment', component: PaymentUploadComponent },
      { path: 'teacher-payment-handle', component: TeacherPaymentComponent },
      { path: 'student-payment-list', component: StudentPaymentListComponent },
      { path: 'help', component: HelpComponent },
      { path: 'forgotpassword', component: ForgotPasswordRequestComponent },
      { path: 'ebooks', component: EbooksComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
