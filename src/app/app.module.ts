import { DynamodbSandboxService } from './dynamodb-sandbox/dynamodb-sandbox.service';
import { S3SandboxService } from './s3-sandbox/s3-sandbox.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { S3SandboxComponent } from './s3-sandbox/s3-sandbox.component';
import { BsModalModule } from 'ng2-bs3-modal';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { ValidationMessagesService } from './shared/validation-messages/validation-messages.service';
import { LoginComponent } from './shared/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ValidationMessagesComponent } from './shared/validation-messages/validation-messages.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    FooterComponent,
    NavbarComponent,
    S3SandboxComponent,
    LoginComponent,
    ValidationMessagesComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BsModalModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    Title,
    S3SandboxService,
    DynamodbSandboxService,
    AuthService,
    AuthGuardService,
    ValidationMessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
