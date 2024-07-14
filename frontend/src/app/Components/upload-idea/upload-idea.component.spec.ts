import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadIdeaComponent } from './upload-idea.component';

describe('UploadIdeaComponent', () => {
  let component: UploadIdeaComponent;
  let fixture: ComponentFixture<UploadIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadIdeaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
