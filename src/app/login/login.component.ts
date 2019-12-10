import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { User } from './user.model'
import { LoginService } from '../shared/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  loadedUsers: User[] = [];
  user: User;
  isLoading = false;


  constructor(private fb: FormBuilder,
              private loginService: LoginService) { }

  ngOnInit() {
    this.isLoading = true;
    this.loginService.fetchUsers().subscribe( data => {
      this.isLoading = false;
      this.loadedUsers = data;
    })
    this.loginFormGroup = this.fb.group({
      login: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
  }

  get loginControl() {
    return this.loginFormGroup.get('login');
  }

  get passwordControl() {
    return  this.loginFormGroup.get('password')
  }

  onSubmit() {
    this.loginService.onAuthUser(this.loadedUsers, this.getUser())
  }

  onRegister() {
    this.loginService.onAddUser(this.getUser()).subscribe(data => console.log(data))
    this.loginService.fetchUsers().subscribe( data => {
      this.isLoading = false;
      this.loadedUsers = data;
    })
  }

  getUser() {
    this.user =  {
      login: this.loginControl.value,
      password: this.passwordControl.value,
      id: Math.floor(Math.random()*100)
    }
    return this.user
  }
}
