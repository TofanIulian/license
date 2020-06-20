import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  @Input() singleFile: boolean = false;
  @Input() dropzoneText: string = "Set 'dropzoneText'";
  @Output() filesUrls = new EventEmitter<string[]>();

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  isHovering: boolean;

  files: UploadedFile[] = [];
  urls: string[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    if(this.singleFile) {

      this.files.push({file: files.item(0)});

    } else {

      for (let i = 0; i < files.length; i++) {
        this.files.push({file: files.item(i)});
      }

    }
    
    this.startUpload();
  }


  startUpload() {

    for (let i = 0; i < this.files.length; i++) {
      // The storage path
      const path = `test/${Date.now()}_${this.files[i].file.name}`;

      // Reference to storage bucket
      const ref = this.storage.ref(path);

      // The main task
      this.files[i].task = this.storage.upload(path, this.files[i].file);

      // Progress monitoring
      this.files[i].percentage = this.files[i].task.percentageChanges();

      this.files[i].snapshot   = this.files[i].task.snapshotChanges().pipe(
        tap(console.log),
        // The file's download URL
        finalize( async() =>  {
          this.files[i].downloadURL = await ref.getDownloadURL().toPromise();

          this.urls.push(this.files[i].downloadURL);
          if(this.urls.length == this.files.length)
            this.filesUrls.emit(this.urls)
          

          // this.db.collection('files').add( { downloadURL: this.files[i].downloadURL, path });
        }),
      );
    }

  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}

export interface UploadedFile {
  file: File;
  task?: AngularFireUploadTask;
  percentage?: Observable<number>;
  snapshot?: Observable<any>;
  downloadURL?: string;
}