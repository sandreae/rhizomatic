import * as Edit from './edit/edit_controller'
import * as List from './list/list_controller'
import * as Login from './login/login_controller'
import * as New from './new/new_controller'
import * as Home from './home/home_controller'
import UsersRouter from './users_router'
import {gc} from '../radio'

var UsersApp = {}
UsersApp.Edit = Edit
UsersApp.List = List
UsersApp.Login = Login
UsersApp.New = New
UsersApp.Home = Home

var UsersRadio = Marionette.Object.extend({
  channelName: 'gc',
  radioEvents: {
    'user:edit': 'editUser',
    'users:list': 'listUsers',
    'user:new': 'newUser',
    'user:showLogin': 'showLogin',
    'user:home': 'showHome',
    'user:loggedIn': 'showHome',
  },

  editUser: function(id){
    UsersApp.Edit.Controller.editUser(id)
    Platform.navigate('users/' + id + '/edit');
  },

  showLogin: function(){
    UsersApp.Login.Controller.showLogin();
  },

  listUsers: function(){
    // if (gc.request('isAuth')){
    UsersApp.List.Controller.listUsers();
    Platform.navigate('users')
    // } else {
    //  gc.request('user:login')
    //,
  },
  newUser: function(id){
    UsersApp.New.Controller.newUser();
    Platform.navigate('newuser');
  },
  showHome: function(){
    UsersApp.Home.Controller.showHome();
  },
})

UsersApp.Radio = new UsersRadio()
UsersApp.Router = new UsersRouter({controller: UsersApp.Radio})

export {UsersApp}
