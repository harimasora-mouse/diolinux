import {Component, Input, Renderer, ElementRef, AfterViewInit} from '@angular/core';

/*
  Generated class for the PageContent component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'page-content',
  templateUrl: 'page-content.html'
})
export class PageContentComponent implements AfterViewInit {

  @Input('content') rawContent: string;

  private nativeElement : Node;

  constructor(private renderer : Renderer, private element : ElementRef) {
    console.log('Hello PageContent Component');
    this.nativeElement = element.nativeElement;
  }

  ngAfterViewInit () {
    let rootElement = this.renderer.createElement(this.nativeElement, 'div');
    rootElement.innerHTML = this.rawContent;

    let imgElements = rootElement.querySelectorAll('img');

    //Remove first image
    let firstImg = imgElements[0];
    let arr = []; arr.push(firstImg);
    this.renderer.detachView(arr);

    //Put the first image on top
    let imgTemplate = `<img src="` + firstImg.getAttribute('src') + `"/>`;
    rootElement.innerHTML = imgTemplate + rootElement.innerHTML;
    // let topImage = this.renderer.createElement(rootElement, 'img');
    // this.renderer.setElementAttribute(topImage, 'src', firstImg.getAttribute('src'))
  }

}
