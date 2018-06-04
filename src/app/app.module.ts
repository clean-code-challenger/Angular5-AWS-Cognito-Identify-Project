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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    FooterComponent,
    NavbarComponent,
    S3SandboxComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ Title, S3SandboxService, DynamodbSandboxService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
