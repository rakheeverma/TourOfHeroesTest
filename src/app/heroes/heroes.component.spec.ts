import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from "./heroes.component";
import { of } from 'rxjs';

import { Hero } from '../hero';

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
          { id: 11, name: 'Dr Nice' },
          { id: 12, name: 'Narco' },
          { id: 13, name: 'Bombasto' },
          { id: 14, name: 'Celeritas' },
          { id: 15, name: 'Magneta' }
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']) 

        component = new HeroesComponent(mockHeroService)  
    });




    it('should create component', () => {
      expect(component).toBeTruthy();
    });



    it('should delete hero from the list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true))
      component.heroes = HEROES;
      component.delete(HEROES[1]);
      expect(component.heroes.length).toBe(4);
      expect(mockHeroService.deleteHero).toHaveBeenCalled();
    });



    it('should deleteHero  service should be called', () => {
      mockHeroService.deleteHero.and.returnValue(of(true))
      component.heroes = HEROES;
      component.delete(HEROES[1]);
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[1]);
    });



    it('should add hero to the list', () => {
      const newHero: Hero = { id: 21, name: 'Iron Man' };

       mockHeroService.addHero.and.returnValue(of(true))
       component.heroes = HEROES;
       component.add('NewIronMen');
       expect(component.heroes.length).toBe(6);
     });
     
     
     it('should addHero service should be called', () => {
      const newHero: Hero = { id: 21, name: 'Iron Man' };

       mockHeroService.addHero.and.returnValue(of(true))
       component.heroes = HEROES;
       component.add('NewIronMen');
       expect(mockHeroService.addHero).toHaveBeenCalled();
     });  
  

});

