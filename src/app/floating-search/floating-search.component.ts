import { CommonModule } from '@angular/common';  
import { Component, OnInit } from '@angular/core';
import { D3Service } from '../../d3.service';
import { ApiService } from '../../api-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchResult } from '../search-result';
import { Observable, onErrorResumeNext } from 'rxjs';
import { CompileTemplateMetadata } from '@angular/compiler';

@Component({
  selector: 'app-floating-search',
  templateUrl: './floating-search.component.html',
  styleUrls: ['./floating-search.component.css']
})
export class FloatingSearchComponent implements OnInit {
  searchResult: SearchResult ;
  searchForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private d3Service : D3Service,
              private apiService : ApiService,
              private formBuilder: FormBuilder) {
                this.searchResult = <SearchResult>{};
              }

  get f() { return this.searchForm.controls; }
  onSubmit() {
        this.submitted = true;
        if (this.searchForm.invalid) {
            return;
        }

        this.loading = true;
        this.apiService.searchCheapestRoute(this.f.from.value,this.f.to.value)
        .subscribe(res => {
          this.searchResult = <SearchResult>res;
          this.d3Service.drawSVGData(this.searchResult.geoJson);
          this.d3Service.updatePath(this.searchResult.geoJson);
          this.submitted = false;
          this.loading = false;
        });    
    }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required]
  });
  }

}
