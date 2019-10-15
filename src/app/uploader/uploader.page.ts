import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/user.service';
import { firestore } from 'firebase/app';
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {
  imageURL: string;
  noFace: boolean;
  desc: string;
  constructor(public http: HttpClient, public afstore: AngularFirestore , public user: UserService) { }

  ngOnInit() {
  }
  createPost() {

          const image = this.imageURL;
          const desc = this.desc;
          this.afstore.doc(`user/${this.user.getUID()}`).update({
            posts: firestore.FieldValue.arrayUnion({
              image , desc
            })
          });
        }


  fileChanged(event) {
    const files = event.target.files;
    const data = new FormData();

    data.append('file', files[0]);
    data.append('UPLOADCARE_STORE', '1');
    data.append('UPLOADCARE_PUB_KEY', 'aa32af95a9d099e371af');

    this.http.post('https://upload.uploadcare.com/base/', data)
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe(event => {
        console.log(event);
        this.imageURL = event.file;
      });
  }
}
