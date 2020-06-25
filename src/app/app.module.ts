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
import { ModalComponent } from './shared/modal/modal.component';
import { FormsModule } from '@angular/forms';
import LoadingMaskService from './shared/loading-mask/loading-mask.service';
import { LoadingMaskComponent } from './shared/loading-mask/loading-mask.component';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import AppService from './app.service';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
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
