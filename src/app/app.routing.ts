import { Routes, RouterModule } from '@angular/router';
import { ReadUsersComponent} from './read-users/read-users.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {CreateTestuserComponent} from "./create-testuser/create-testuser.component";


/*import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';*/
//

const appRoutes: Routes = [
  { path: 'users', component: ReadUsersComponent },
  { path: 'login' , component : UserLoginComponent},
  { path: 'about', component : CreateTestuserComponent},
  { path: '**', component: UserLoginComponent }

];

export const routing = RouterModule.forRoot(appRoutes);
