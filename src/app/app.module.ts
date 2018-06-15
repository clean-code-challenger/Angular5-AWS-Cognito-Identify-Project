import { DynamodbSandboxService } from './shared/dynamodb-sandbox/dynamodb-sandbox.service';
import { S3SandboxService } from './shared/s3-sandbox/s3-sandbox.service';
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
import { S3SandboxComponent } from './shared/s3-sandbox/s3-sandbox.component';
import { BsModalModule } from 'ng2-bs3-modal';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { ValidationMessagesService } from './shared/validation-messages/validation-messages.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationMessagesComponent } from './shared/validation-messages/validation-messages.component';
import { CallbackComponent } from './shared/callback/callback.component';
import { GreetingsAppComponent } from './greetings-app/greetings-app.component';
import { UiSwitchModule } from 'ngx-toggle-switch';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    FooterComponent,
    NavbarComponent,
    S3SandboxComponent,
    ValidationMessagesComponent,
    CallbackComponent,
    GreetingsAppComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BsModalModule,
    ReactiveFormsModule,
    UiSwitchModule
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
