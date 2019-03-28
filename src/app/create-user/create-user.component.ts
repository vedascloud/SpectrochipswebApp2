import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import {RoleService} from "../role.service";
import {Role} from "../role";
import { Observable} from 'rxjs';
import { User } from '../user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [UserService,RoleService]
})

// component for creating a product record
export class CreateUserComponent {

  // our angular form
  create_user_form: FormGroup;
  authenticationFlag: boolean = true;
  // @Output will tell the parent component (AppComponent) that an event happened in this component
  @Output() show_read_users_event = new EventEmitter();
  @Input() username;
  // list of roles
  roles: Role[];
  public loading = false;
  // initialize 'product service', 'category service' and 'form builder'
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private route: Router,
    formBuilder: FormBuilder

  ) {
    // based on our html form, build our angular form
    this.create_user_form = formBuilder.group({
      userID: ["", Validators.required],
      username: ["", Validators.required],
      role_id: ["", Validators.required]
    });
  }

  // user clicks 'create' button
  createUser() {
    this.loading = true;
    // send data to server
    this.userService.createUser(this.create_user_form.value)
      .subscribe(
        user => {
          // show an alert to tell the user if product was created or not
          console.log(user);
          
          if(user.result == 'error'){
            this.loading = false;
            this.authenticationFlag = false;
          }else{
            // go back to list of users
            this.loading = false;
            this.readUsers();
          }
        },
        error => console.log(error)
      );
  }

  // user clicks the 'read products' button
  readUsers(){
    console.log('username pass service..',this.username);
    this.show_read_users_event.emit({ title: "Testers List", username:this.username });
    this.route.navigateByUrl('users');
  }

  // what to do when this component were initialized
  ngOnInit() {
    // read categories from database
   // this.loading = true;
    this.roleService.readRoles()
      .subscribe(roles => {this.roles = roles['records']; this.loading=false});
  }
}
