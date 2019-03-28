import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ReadUsersComponent } from './read-users/read-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ReadOneUserComponent } from './read-one-user/read-one-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { routing } from './app.routing';
import { UserLoginComponent } from './user-login/user-login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReadFilesComponent } from './read-files/read-files.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './core/material.module';
import { CreateTestComponent } from './create-test/create-test.component';
import { CreateSequenceComponent } from './create-sequence/create-sequence.component';
import { UpdateTestComponent } from './update-test/update-test.component';
import { UpdateSequenceComponent } from './update-sequence/update-sequence.component';
import { DeleteSequenceComponent } from './delete-sequence/delete-sequence.component';
import { DeleteTestComponent } from './delete-test/delete-test.component';
import { FileDropModule } from 'ngx-file-drop';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { CreateTestuserComponent } from './create-testuser/create-testuser.component';
import { CreateSequenceuserComponent } from './create-sequenceuser/create-sequenceuser.component';

import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserService } from './user.service';
import { HeaderComponent } from './header/header.component';
import { TitleComponent } from './titlecomponent/title.component';



const appRoutes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'users', component: ReadUsersComponent },
  { path: 'create-users', component: CreateUserComponent },
  {path:'readFiles/:id/:type/:userID', component:ReadFilesComponent},
  {path:'readFiles/:id/:type', component:ReadFilesComponent},
  { path: 'oneuser/:userID', component:ReadOneUserComponent},
  {path:'createseq', component:CreateSequenceComponent},
  {path:'createSeqUser/:userID', component:CreateSequenceuserComponent},
  {path:'createTest', component:CreateTestComponent},
  {path:'creatTestUser/:userID', component:CreateTestuserComponent},
  {path:'updateUser/:userID',component:UpdateUserComponent},
  {path:'updateSequence', component:UpdateSequenceComponent},
  {path: 'updateTest', component:UpdateTestComponent},
  {path:'deleteUser/:userID', component:DeleteUserComponent},
  {path:'deleteSequence/:id', component:DeleteSequenceComponent},
  {path:'deleteTest/:id', component:DeleteTestComponent},
 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '**', component: PagenotfoundComponent },
  
  /*
  { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
 
  { path: '**', component: PageNotFoundComponent }*/
];


@NgModule({
  declarations: [
    AppComponent,
    ReadUsersComponent,
    CreateUserComponent,
    ReadOneUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    UserLoginComponent,
    PageNotFoundComponent,
    ReadFilesComponent,
    CreateTestComponent,
    CreateSequenceComponent,
    UpdateTestComponent,
    UpdateSequenceComponent,
    DeleteSequenceComponent,
    DeleteTestComponent,
    CreateTestuserComponent,
    CreateSequenceuserComponent,
    PagenotfoundComponent,
    HeaderComponent,
    TitleComponent
  ],
  imports: [
    CommonModule,
    NgtUniversalModule,

    TransferHttpCacheModule,
    HttpClientModule,

    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),

    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FileDropModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: true
    }),
    
  ],
  providers: [UserService],
})
export class AppModule { }
