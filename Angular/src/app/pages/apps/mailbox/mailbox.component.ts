import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

// Ck Editer
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//import Base64UploadAdapter from 'node_modules/@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';


// Sweet Alert
import Swal from 'sweetalert2';

import * as jquery from 'jquery';

import 'select2';

// Email Data Get
import { emailData } from './data';
import { Email } from './mailbox.model';
import { MailService } from './mail.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadAdapter } from './UploadAdapter';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss']
})


/**
 * Mailbox Component
 */
export class MailboxComponent implements OnInit {

  Editor = ClassicEditor;
  emailData!: Email[];
  emailIds: number[] = [];
  isShowMenu: boolean = true;

  mails: any;

  inboxMails: any;
  sentMails: any;
  archiveMails: any;
  draftMails: any;
  trashMails: any;
  spamMails: any;

  currentMail: any;

  avatar: any;

  mailLoginForm!: FormGroup;

  sendMailForm!: FormGroup;


  username: any;
  password: any;

  isMailLoggedIn: Boolean = false;

  selectedFiles: any;
  currentFile!: File;


  @ViewChild("content1", { static: true }) content1!: ElementRef;


  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private mailService: MailService) { }

  ngOnInit(): void {

    this.hide();


    if (localStorage.getItem('isMailLoggedIn') === "false") {
      this.openLogin(this.content1);
    }



    /**
     * Fetches the data
     */
    this.fetchData();

    // Compose Model Hide/Show
    var isShowMenu = false;
    document.querySelectorAll(".email-menu-btn").forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        isShowMenu = true;
        document.getElementById('menusidebar')?.classList.add("menubar-show");
      });
    });
    document.querySelector('.email-wrapper')?.addEventListener('click', function () {
      if (document.querySelector(".email-menu-sidebar")?.classList.contains('menubar-show')) {
        if (!isShowMenu) {
          document.querySelector(".email-menu-sidebar")?.classList.remove("menubar-show");
        }
        isShowMenu = false;
      }
    });


    /**
     * Form Validation
     */
    this.mailLoginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.sendMailForm = this.formBuilder.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      body: ['', [Validators.required]],
      attachment: ['', []]

    });

    this.username = this.mailLoginForm.value.userName;
    this.password = this.mailLoginForm.value.password;


    if (localStorage.getItem('isMailLoggedIn') === "true") {
      let user = localStorage.getItem('mailUsername')
      let pass = localStorage.getItem('mailPassword')
      this.getInboxMails(user, pass);
      this.getSentMails(user, pass);
      this.getArchiveMails(user, pass);
      this.getDraftMails(user, pass);
      this.getTrashMails(user, pass);
      this.getSpamMails(user, pass);
    }
  }

  onReady(editor: any): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new UploadAdapter(loader);
    };
  }


  loginMail() {



    if (this.mailLoginForm.valid) {
      this.username = this.mailLoginForm.value.userName;
      this.password = this.mailLoginForm.value.password;
      this.getInboxMails(this.username, this.password);
      this.modalService.dismissAll();
      localStorage.setItem('isMailLoggedIn', "" + true)
      localStorage.setItem('mailUsername', "" + this.username)
      localStorage.setItem('mailPassword', "" + this.password)
      if (localStorage.getItem('isMailLoggedIn') === "true") {
        let user = localStorage.getItem('mailUsername')
        let pass = localStorage.getItem('mailPassword')
        this.getInboxMails(user, pass);
        this.getSentMails(user, pass);
        this.getArchiveMails(user, pass);
        this.getDraftMails(user, pass);
        this.getTrashMails(user, pass);
        this.getSpamMails(user, pass);
      }
      this.timerLogin();

    }
  }

  timerLogin() {
    let timerInterval: any;

    Swal.fire({
      title: 'Please wait!',

      timer: 5000,
      didOpen: () => {
        const content = Swal.getHtmlContainer();

        Swal.showLoading()

      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    })

  }

  selectFile(event: any) {
    if (event.target.files) {
      this.selectedFiles = event.target.files;
    }
  }

  sendSimpleMail() {

    const formData = new FormData();
    formData.append('from', localStorage.getItem('mailUsername') + "@sapres.de")
    formData.append('password', localStorage.getItem('mailPassword')!)
    formData.append('to', this.sendMailForm.value.to)
    formData.append('subject', this.sendMailForm.value.subject)
    formData.append('body', this.sendMailForm.value.body)
    //formData.append('attachment', this.selectedFiles)

    // formData.append('body',this.sendMailForm.value.body.replace(/<\/?[^>]+(>|$)/g, ""))

    this.mailService.sendSimpleMail(formData).subscribe(
      (data: any) => {
        console.log(data)
        this.modalService.dismissAll()
        Swal.fire({
          title: 'Email sent succssfully',
          icon: 'success',

        })
      }
    )

  }

  sendAttachmentMail() {
    this.currentFile = this.selectedFiles;

    const formData = new FormData();
    formData.append('from', localStorage.getItem('mailUsername') + "@sapres.de")
    formData.append('password', localStorage.getItem('mailPassword')!)
    formData.append('to', this.sendMailForm.value.to)
    formData.append('subject', this.sendMailForm.value.subject)
    formData.append('body', this.sendMailForm.value.body)
    formData.append('attachment', this.selectedFiles)

    // formData.append('body',this.sendMailForm.value.body.replace(/<\/?[^>]+(>|$)/g, ""))

    this.mailService.sendAttachmentMail(formData).subscribe(
      (data: any) => {
        console.log(data)
        this.modalService.dismissAll()
        Swal.fire({
          title: 'Email sent succssfully',
          icon: 'success',

        })
      }
    )

  }

  sendMail(){
    //console.log(this.selectedFiles.length)
   // if(this.selectedFiles.length == 0){
  //    this.sendSimpleMail();
   // }
  //  if(this.selectedFiles != 0) {
      this.sendAttachmentMail();
   // }
  }



  //inbox emails click
  onInbox() {
    this.mails = this.inboxMails;

    document.getElementById("sent")!.setAttribute("class", "");
    document.getElementById("inbox")!.setAttribute("class", "active");
    document.getElementById("draft")!.setAttribute("class", "");
    document.getElementById("trash")!.setAttribute("class", "");
    document.getElementById("spam")!.setAttribute("class", "");
    document.getElementById("archive")!.setAttribute("class", "");

  }

  //Sent emails click
  onSent() {
    this.mails = this.sentMails;

    document.getElementById("sent")!.setAttribute("class", "active");
    document.getElementById("inbox")!.setAttribute("class", "");
    document.getElementById("draft")!.setAttribute("class", "");
    document.getElementById("trash")!.setAttribute("class", "");
    document.getElementById("spam")!.setAttribute("class", "");
    document.getElementById("archive")!.setAttribute("class", "");


  }

  //Archive emails click
  onArchive() {
    this.mails = this.archiveMails;

    document.getElementById("sent")!.setAttribute("class", "");
    document.getElementById("inbox")!.setAttribute("class", "");
    document.getElementById("draft")!.setAttribute("class", "");
    document.getElementById("trash")!.setAttribute("class", "");
    document.getElementById("spam")!.setAttribute("class", "");
    document.getElementById("archive")!.setAttribute("class", "active");


  }

  //Draft emails click
  onDraft() {
    this.mails = this.draftMails;

    document.getElementById("sent")!.setAttribute("class", "");
    document.getElementById("inbox")!.setAttribute("class", "");
    document.getElementById("draft")!.setAttribute("class", "active");
    document.getElementById("trash")!.setAttribute("class", "");
    document.getElementById("spam")!.setAttribute("class", "");
    document.getElementById("archive")!.setAttribute("class", "");

  }

  //Trash emails click
  onTrash() {
    this.mails = this.trashMails;

    document.getElementById("sent")!.setAttribute("class", "");
    document.getElementById("inbox")!.setAttribute("class", "");
    document.getElementById("draft")!.setAttribute("class", "");
    document.getElementById("trash")!.setAttribute("class", "active");
    document.getElementById("spam")!.setAttribute("class", "");
    document.getElementById("archive")!.setAttribute("class", "");
  }

  //Spam emails click
  onSpam() {
    this.mails = this.spamMails;

    document.getElementById("sent")!.setAttribute("class", "");
    document.getElementById("inbox")!.setAttribute("class", "");
    document.getElementById("draft")!.setAttribute("class", "");
    document.getElementById("trash")!.setAttribute("class", "");
    document.getElementById("spam")!.setAttribute("class", "active");
    document.getElementById("archive")!.setAttribute("class", "");

  }





  //Get inbox mails
  getInboxMails(username: any, password: any) {
    this.mailService.getInboxMails(username, password).subscribe(
      (data: any) => {
        this.mails = data
        this.inboxMails = data
        console.log(data)
      },
      (err: any) => {
        console.log("err: ", err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Mailbox Credentials!',
        }).then(res => {
          localStorage.setItem('isMailLoggedIn', "" + false)
          localStorage.removeItem('mailUsername')
          localStorage.removeItem('mailPassword')

          this.openLogin(this.content1);
        })

      }
    )
  }

  //Get sent mails
  getSentMails(username: any, password: any) {
    this.mailService.getSentMails(username, password).subscribe(
      (data: any) => {
        this.sentMails = data
        console.log(data)
      }
    )
  }

  //Get archive mails
  getArchiveMails(username: any, password: any) {
    this.mailService.getArchiveMails(username, password).subscribe(
      (data: any) => {
        this.archiveMails = data
        console.log(data)
      }
    )
  }

  //Get draft mails
  getDraftMails(username: any, password: any) {
    this.mailService.getDraftMails(username, password).subscribe(
      (data: any) => {
        this.draftMails = data
        console.log(data)
      }
    )
  }

  //Get trash mails
  getTrashMails(username: any, password: any) {
    this.mailService.getTrashMails(username, password).subscribe(
      (data: any) => {
        this.trashMails = data
        console.log(data)
      }
    )
  }

  //Get spam mails
  getSpamMails(username: any, password: any) {
    this.mailService.getSpamMails(username, password).subscribe(
      (data: any) => {
        this.spamMails = data
        console.log(data)
      }
    )
  }




















  /**
   * Fetches the data
   */
  private fetchData() {
    document.getElementById('emaildata')?.classList.add('d-none')
    setTimeout(() => {
      document.getElementById('emaildata')?.classList.remove('d-none')
      this.emailData = emailData;
      document.getElementById('mailLoader')?.classList.add('d-none')
    }, 1000);
  }

  /**
  * Open modal
  * @param content content
  */
  open(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  /**
  * Open modal
  * @param content content
  */
  openLogin(content: any) {
    this.modalService.open(content, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
  }

  /**
* on settings button clicked from topbar
*/
  onSettingsButtonClicked(mail: any) {
    document.body.classList.toggle('email-detail-show');
    this.currentMail = mail;
    //console.log(this.currentMail)
    this.avatar = this.currentMail.from.charAt(0).toUpperCase()

  }

  /**
 * Hide the sidebar
 */
  public hide() {
    document.body.classList.remove('email-detail-show');
  }

  /**
 * Confirmation mail model
 */
  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.deleteMail();
        Swal.fire('Deleted!', 'Mail has been deleted.', 'success');
      }
    });
  }

  /***
   * Delete Mail
   */
  deleteMail() {
    const found = this.emailData.some(r => this.emailIds.indexOf(r.id) >= 0);
    if (found) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.emailIds.length; i++) {
        const obj: any = this.emailData.find(o => o.id === this.emailIds[i]);
        this.emailData.splice(this.emailData.indexOf(obj), 1);
      }
    }
    this.emailIds = [];
  }

  /***
   * send mail select multiple mail
   */
  selectMail(event: any, id: any) {
    if (event.target.checked) {
      this.emailIds.push(id);
    } else {
      this.emailIds.splice(this.emailIds.indexOf(id), 1);
    }
  }

  /**
   * Show Mail modal
   * @param content modal content
   */

  showMail() {
    const showMail = document.querySelector('.email-wrapper .email-menu-sidebar');
    if (showMail != null) {
      showMail.classList.add('menubar-show');
    }
  }


  /**
   * SidebarHide modal
   * @param content modal content
   */
  SidebarHide() {
    const recentActivity = document.querySelector('.email-wrapper .email-menu-sidebar');
    if (recentActivity != null) {
      recentActivity.classList.remove('menubar-show');
    }
  }


  mailDetails(mail: any) {
    this.currentMail = mail;
    //console.log(this.currentMail)
    this.avatar = this.currentMail.from.charAt(0).toUpperCase()

  }


}
