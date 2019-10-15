import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  username = '';
  password = '';
 cpassword = '';

  // tslint:disable-next-line:max-line-length
  constructor(public afAuth: AngularFireAuth, public alertController: AlertController, public router: Router , public user: UserService, public afstore: AngularFirestore)  { }

  ngOnInit() {
  }
  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();
  }

  async register() {
    const { username , password, cpassword } = this
    if (password !== cpassword) {
      this.presentAlert('Error', 'Passwords don\'t match');
      return console.error('Passwords don\'t match');

    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@codedamn.com', password);

      this.afstore.doc(`user/${res.user.uid}`).set({
         username
       });

      this.user.setUser({
        username,
        uid : res.user.uid
      });
      this.presentAlert('Success', 'You are registered!');
      this.router.navigate(['/tabs']);




    } catch (error) {
      console.dir(error);
      this.presentAlert('Error', error.message);
    }
  }
}
