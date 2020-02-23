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
import { routing } from './app.routing';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';
import LoadingMaskService from './loading-mask/loading-mask.service';
import { LoadingMaskComponent } from './loading-mask/loading-mask.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    LoadingMaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HeaderModule,
    BodyModule,
    routing
  ],
  // entryComponents: [ModalComponent],
  providers: [AuthService, AuthGuard, UserService, LoadingMaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
