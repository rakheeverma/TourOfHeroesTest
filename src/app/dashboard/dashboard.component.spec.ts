import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

import { of } from 'rxjs';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService;
  let getHeroesSpy;

  beforeEach(async(() => {
    //fake heroService object with getHeroes spy
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    getHeroesSpy = heroService.getHeroes.and.returnValue( of(HEROES) );
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent
      ],
      imports: [ ],
      providers: [
        { provide: HeroService, useValue: heroService }
      ]
    })
    .compileComponents();


    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  
  it('should be created', () => {
    expect(component).toBeDefined();
  });


 
  it('should display "Top Heroes" heading in h3', () => {
    const dashboardElement: HTMLElement = fixture.nativeElement;
    expect(dashboardElement.textContent).toContain('Top Heroes');
  });



  it('ngOnInit call to getHeroes', () => {
    spyOn(component, 'getHeroes').and.callThrough();
    component.ngOnInit();
    expect(component.getHeroes).toHaveBeenCalled();
  });

  

  it('should call getHeroes', () => {
    expect(getHeroesSpy.calls.any()).toBe(true, 'getHeroes called');
    });



  it('should displays Top 4 heroes on Dashboard', () => {
    const dashboardElement: HTMLElement = fixture.nativeElement;
    const a = dashboardElement.querySelectorAll('a')
    expect(a.length).toEqual(4);

  });
  
  
//TO check if top heroes names are as expected
  xit('should check if expected top heroes is same as rendered to heroes', () => {
    const expectedHerosList = [
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' }
    ];
    
  });

});