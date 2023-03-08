import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-type-entretien',
  templateUrl: './type-entretien.component.html',
  styleUrls: ['./type-entretien.component.scss']
})

export class TypeEntretienComponent implements OnInit {

  isControled: boolean = true;
  isProgrammed: boolean = true;
  detailGroup!: FormGroup;
  isSuccess: boolean = false;
  details: any[] = [];
  isUpdate: boolean = false;
  index: number;

  constructor(
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.detailGroup = this.builder.group({
      designation: ['', Validators.required],
      estControle: [''],
      duree: ['']
    });
  }

  onAddDetail() {
    const detail = {
      designation: this.detailGroup.get('designation').value,
      estControle: this.detailGroup.get('estControle').value,
      duree: this.detailGroup.get('estControle').value ? this.detailGroup.get('duree').value : ''
    };
    if (!this.isUpdate) {
      this.details.push(detail);
    }
    else {
      this.details.splice(this.index, 0, detail);
      this.details.splice(this.index + 1, 1);
    }

    this.isSuccess = true;
    this.detailGroup.reset()
  }

  onUpdateDetail(detail: any) {
    this.isUpdate = true;
    this.isSuccess = false;
    this.index = this.details.indexOf(detail);

    this.detailGroup.patchValue({
      designation: detail.designation,
      estControle: detail.estControle,
      duree: detail.duree,
    })    
  }

  onRemoveDetail(index: number) {
    this.details.splice(index, 1);
  }

}
