import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Document } from "../models/document.model";
import { DocumentService } from "../web-socket.service";
import { startWith } from "rxjs/operators";

@Component({
  selector: "app-document",
  templateUrl: "./document.component.html",
  styleUrls: ["./document.component.scss"],
})
export class DocumentComponent implements OnInit, OnDestroy {
  document: Document;
  private docSub: Subscription;

  constructor(private $documentService: DocumentService) {}

  ngOnInit() {
    this.docSub = this.$documentService.currentDocument
      .pipe(
        startWith({
          id: "",
          doc: "Select an existing document or create a new one to get started",
        })
      )
      .subscribe((document: Document) => (this.document = document));
  }

  ngOnDestroy() {
    this.docSub.unsubscribe();
  }

  editDoc() {
    this.$documentService.editDocument(this.document);
  }
}
