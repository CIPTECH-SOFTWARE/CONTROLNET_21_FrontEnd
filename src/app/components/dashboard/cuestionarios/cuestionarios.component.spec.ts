import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionariosComponent } from './cuestionarios.component';

describe('CuestionariosComponent', () => {
  let component: CuestionariosComponent;
  let fixture: ComponentFixture<CuestionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
