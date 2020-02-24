import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './header/header.module';
import { MaterialModule } from './material.module';
import { BodyModule } from './body/body.module';
import UserService from './user/user.service';
import AuthService from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';
import LoadingMaskService from './loading-mask/loading-mask.service';
import { LoadingMaskComponent } from './loading-mask/loading-mask.component';
import { ConfirmComponent } from './confirm/confirm.component';
import AppService from './app.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    LoadingMaskComponent,
    ConfirmComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HeaderModule,
    BodyModule
  ],
  providers: [AppService, AuthService, AuthGuard, UserService, LoadingMaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
