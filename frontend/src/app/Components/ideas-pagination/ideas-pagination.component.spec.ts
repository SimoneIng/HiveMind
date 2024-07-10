import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaPaginationComponent } from './ideas-pagination.component';

describe('IdeaPaginationComponent', () => {
  let component: IdeaPaginationComponent;
  let fixture: ComponentFixture<IdeaPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeaPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
