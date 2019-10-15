import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   username = 'goda';
   password = '123456';
  constructor(public afAuth: AngularFireAuth, public router: Router, public user: UserService , public afstore: AngularFirestore) { }

  ngOnInit() {
  }
  async login() {
    const { username, password } = this
    try {
      // kind of a hack.
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@gmail.com', password);

      if (res.user) {
                this.user.setUser({
                  username,
                  uid : res.user.uid
                });
                this.router.navigate(['/tabs']);
          }
    } catch (err) {
      console.dir(err);
      if (err.code === 'auth/user-not-found') {
        console.log('User not found');
      }
    }
  }
}
