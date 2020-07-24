import { TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { HeroService } from './hero.service';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { Data } from '@angular/router';

const mockUrl = 'api/heroes';

const testData: Hero[] = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' }
];

describe('HeroService', () => {
  let heroService: HeroService;
  let httpClientSpy: { get: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  

  beforeEach(() => {
    const heroStub = { id: {} };
    const messageServiceStub = {
      messages: <Array<string>>[],
      add(message: string) {
        this.messages.push(message);
      }
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: testData, useValue: heroStub },
        { provide: MessageService, useValue: messageServiceStub }
      ]
     });

    httpTestingController = TestBed.get(HttpTestingController);
    heroService = TestBed.get(HeroService);
  });


  beforeEach(() => {
    heroService = TestBed.get(HeroService);
  });


  afterEach(() => {
    httpTestingController.verify();
  });


////TEST CASES BEGINS 


  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });



  it('should get list of heroes to display', () => {    
    heroService.getHeroes().subscribe((Data) => {
        expect(Data).toBe(testData,'This is expected heroes');
        expect(Data.length).toEqual(4);
        expect(Data.length).toEqual(testData.length);
      }
    );
    const req = httpTestingController.expectOne(mockUrl);

    expect(req.request.method).toEqual('GET');
    req.flush(testData);  
  });




  it('should return hero by valid ID',() => {
    const heroStub: Hero = TestBed.get(testData);
    const id = 11;

    heroService.getHero(id).subscribe((response) => {
      expect(response).toEqual(heroStub);
    });
    const req = httpTestingController.expectOne(`${mockUrl}/11`);
    expect(req.request.method).toEqual('GET');
    req.flush(heroStub);
    httpTestingController.verify();

  });



  it('should add a new Hero to the server', () => {
    const newHero: Hero = { id: 21, name: 'Iron Man' };

    heroService.addHero(newHero).subscribe((addedHero) => {
      expect(addedHero).toEqual(newHero);
    });
    const req = httpTestingController.expectOne(mockUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(newHero);

  });



  it('should delete the hero by ID from the server', () => {
    const heroStub: Hero = TestBed.get(testData);
    const id = 12;

    heroService.deleteHero(id).subscribe((response) => {
      expect(response).toEqual(heroStub);
    });
    const req = httpTestingController.expectOne(`${mockUrl}/12`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(heroStub);
  });



  it('should update the hero by on the server', () => {
    const heroStub: Hero = TestBed.get(testData);

    heroService.updateHero(heroStub).subscribe((response) => {
      expect(response).toEqual(heroStub);
    });
    const req = httpTestingController.expectOne(mockUrl);
      expect(req.request.method).toEqual('PUT');
      req.flush(heroStub);

      const messageService = TestBed.get(MessageService);
      expect(messageService.messages[0]).toContain("updated hero id");
  });





});
