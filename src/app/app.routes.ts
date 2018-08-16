import { GradesComponent } from './shared/grades/grades.component';
import { QrReaderComponent } from './shared/qr-reader/qr-reader.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { S3SandboxComponent } from './shared/s3-sandbox/s3-sandbox.component';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { AuthGuardService as AuthGuard } from './shared/auth/auth-guard.service';
import { CallbackComponent } from './shared/callback/callback.component';
import { AttendanceComponent } from './shared/qr-reader/attendance/attendance.component';

// Route Configuration
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'about', component: AboutComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 's3-sandbox', component: S3SandboxComponent, canActivate: [AuthGuard] },
    { path: 'qr-reader', component: QrReaderComponent, canActivate: [AuthGuard] },
    { path: 'qr-reader/attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
    { path: 'grades', component: GradesComponent, canActivate: [AuthGuard] },
    { path: 'grades/:id', component: GradesComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
