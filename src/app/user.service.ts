import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';

// tslint:disable-next-line:class-name
interface user {
    username: string;
    uid: string;
}

@Injectable()
export class UserService {

    public constructor(public afAuth: AngularFireAuth) {
    }
    private user: user;

    // tslint:disable-next-line:no-shadowed-variable
    setUser(user: user) {
        this.user = user;

    }
    getUID(): string {
        return this.user.uid;

    }

  /**  getUsername(): string {
        return this.user.username;
    }

    reAuth(username: string, password: string) {
        // tslint:disable-next-line:max-line-length
        return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username + '@codedamn.com', password));
    }

    updatePassword(newpassword: string) {
        return this.afAuth.auth.currentUser.updatePassword(newpassword);
    }

    updateEmail(newemail: string) {
        return this.afAuth.auth.currentUser.updateEmail(newemail + '@codedamn.com');
    }

    async isAuthenticated() {
        if (this.user) { return true;
        }

        // tslint:disable-next-line:no-shadowed-variable
        const user = await this.afAuth.authState.pipe(first()).toPromise();

        if (user) {
            this.setUser({
                username: user.email.split('@')[0],
                uid: user.uid
            });

            return true;
        }
        return false;
    }*/

    
}
