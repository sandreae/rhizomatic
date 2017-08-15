import * as Edit from './edit/edit_controller'
import * as List from './list/list_controller'
import * as Login from './login/login_controller'
import * as New from './new/new_controller'
import * as Home from './home/home_controller'
import * as Profile from './profile/profile_controller'
import * as Password from './password/password_controller'
import UsersRouter from './users_router'
import {gc} from '../radio'

var UsersApp = {}
UsersApp.Edit = Edit
UsersApp.List = List
UsersApp.Login = Login
UsersApp.New = New
UsersApp.Home = Home
UsersApp.Password = Password
UsersApp.Profile = Profile

var UsersRadio = Marionette.Object.extend({
  channelName: 'gc',
  radioEvents: {
    'user:edit': 'editUser',
    'users:list': 'listUsers',
    'user:new': 'newUser',
    'user:showLogin': 'showLogin',
    'user:home': 'showHome',
    'user:loggedIn': 'showHome',
    'user:profile': 'showProfile',
    'user:password': 'showPassword',
  },

  editUser: function(id){
    UsersApp.Edit.Controller.editUser(id)
    Platform.navigate('users/' + id + '/edit');
  },

  showLogin: function(){
    UsersApp.Login.Controller.showLogin();
    Platform.navigate('user/login');
  },

  listUsers: function(){
    // if (gc.request('isAuth')){
    UsersApp.List.Controller.listUsers();
    Platform.navigate('users')
  },

  newUser: function(id){
    UsersApp.New.Controller.newUser();
    Platform.navigate('user/new');
  },

  showHome: function(){
    UsersApp.Home.Controller.showHome();
  },

  showProfile: function(){
    UsersApp.Profile.Controller.showProfile();
    Platform.navigate('user/profile');
  },

  showPassword: function(){
    UsersApp.Password.Controller.showPassword();
    Platform.navigate('user/changepassword');
  },
})

UsersApp.Radio = new UsersRadio()
UsersApp.Router = new UsersRouter({controller: UsersApp.Radio})

export {UsersApp}
