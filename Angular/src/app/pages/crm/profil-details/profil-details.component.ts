import { DOCUMENT } from "@angular/common";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { format } from "timeago.js";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SwiperComponent, SwiperDirective } from "ngx-swiper-wrapper";
import { projectList, document } from "../lead-details/data";
import { documentModel, projectListModel } from "../lead-details/lead.model";
import { profilModel } from "../profil/profil";
import { ProfilService } from "../profil/profil.service";
import { OpportunitiesModel } from '../opportunities/list-view/list-view.model';
import { stringify } from "querystring";
import { CallProfilModel } from "./call_profil";

@Component({
  selector: "app-profil-details",
  templateUrl: "./profil-details.component.html",
  styleUrls: ["./profil-details.component.css"],
})
export class ProfilDetailsComponent implements OnInit {
  calls: CallProfilModel[];
  tickets: any;
  call: CallProfilModel = new CallProfilModel();
  opportunities: OpportunitiesModel[];
  callForm: FormGroup;
  projectList!: projectListModel[];
  document!: documentModel[];
  profile: profilModel = new profilModel();
  skills: String[];
  color = [];
  @ViewChild("myname") myname: ElementRef;
  @ViewChild("content", { static: true }) content: ElementRef;
  rande: any;
  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;
  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  id: any;
  src: any;
  blob: Blob;
  fullName: string;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    public service2: ProfilService,
    private modalService: NgbModal,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document5: Document
  ) {}

  ngOnInit(): void {
    /**
     * Fetches the data
     */
    this.fetchData();
    this.activatedroute.paramMap.subscribe((params) => {
      this.id = params.get("id");
      console.log(this.id);
    });
    this.service2.getprofil(this.id).subscribe((profil) => {
      this.profile = profil;
      this.fullName = profil.surname + " " + profil.name;
      console.log(this.fullName);
      this.skills = profil.skills;
      /// console.log( this.skills)
      var myArray = ["primary", "secondary", "success", "danger", "warning"];
      for (var i = 0; i < this.profile.skills.length; i++) {
        this.rande = this.RandArray(myArray);
        let x = { m: this.rande, j: this.profile.skills[i] };
        this.color.push(x);
        ///   console.log(this.color)
      }

      // console.log( window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"})))
      // window.open(window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"})))
    });
    this.callForm = this.formBuilder.group({
      id: [],
      subject: ["", [Validators.required]],
      description: ["", [Validators.required]],
      date: [, [Validators.required]],
      opportunity: [, [Validators.required]],
      statusCall: ["", [Validators.required]],
    });
    this.service2.getopportunity("123").subscribe((data) => {
      this.opportunities = data;
    });
    this.service2.getCalls().subscribe((data) => {
      this.calls = data;
    });
    this.service2.getTickets().subscribe((data) => {
      this.tickets = data;
    });
  }

  format1(date) {
    return format(date);
  }

  downloadPdf(base64String, fileName) {
    // download PDF in IE
    console.log(base64String);
    let byteChar = atob(base64String);
    // Download PDF in Chrome etc.
    const source = `data:application/pdf;base64,${byteChar}`;
    const link = this.document5.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }

  onClickDownloadPdf() {
    ///console.log(this.profile)
    let base64String = this.profile.cv["image"].data;
    let filename = this.profile.fullname;
    this.downloadPdf(base64String, filename);
  }
  /**
   * Fetches the data
   */
  private fetchData() {
    this.projectList = projectList;
    this.document = document;
  }
  _base64ToArrayBuffer(base64) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
  /**
   * Swiper setting
   */
  config = {
    slidesPerView: 1,
    initialSlide: 0,
    spaceBetween: 25,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  };

  /**
   * Swiper card previous set
   */
  previousSlideComp() {
    this.componentRef!.directiveRef!.prevSlide();
  }

  /**
   * Swiper card next set
   */
  nextSlideComp() {
    this.componentRef!.directiveRef!.nextSlide();
  }
  RandArray(array) {
    var rand = (Math.random() * array.length) | 0;
    var rValue = array[rand];
    return rValue;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModel(content: any) {
    this.modalService.open(content, { size: "lg", centered: true });
  }

  saveCall(){
    this.call.subject = this.callForm.value["subject"]
    this.call.description = this.callForm.value["description"]
    this.call.statusCall = this.callForm.value["statusCall"]
    let serializedForm = JSON.stringify(this.call);

    let idOpportu = this.callForm.value["opportunity"];
    let idProfile = this.route.snapshot.params['id'];

    this.service2.saveCall(serializedForm, idOpportu, idProfile).subscribe(() => {
      this.ngOnInit();
    });
  }
}
