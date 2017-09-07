import {Directive, ElementRef, Input, Renderer} from '@angular/core';

@Directive({
  selector: '[header-hide]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HeaderHideDirective {

  oldScrollTop: number = 0;
  scrollContent;
  fixScrollContent;
  tabs;

  @Input("header") headerBible: HTMLElement;

  constructor(private renderer: Renderer, private element: ElementRef) {

  }

  ngOnInit() {
    this.scrollContent = this.element.nativeElement.getElementsByClassName("scroll-content")[0];
    this.fixScrollContent = this.element.nativeElement.getElementsByClassName("fixed-content")[0];
    this.renderer.setElementStyle(this.headerBible, "webkitTransition", "top 200ms");
    this.renderer.setElementStyle(this.scrollContent, "webkitTransition", "margin-top 200ms, margin-bottom 200ms");
    this.renderer.setElementStyle(this.fixScrollContent, "webkitTransition", "margin-top 200ms, margin-bottom 200ms");
    this.tabs = document.querySelector("#mainTabs .tabbar");
    this.renderer.setElementStyle(this.tabs, "webkitTransition", "bottom 200ms");
    console.log(this.tabs);

  }

  onContentScroll(event) {
    if (event.scrollTop - this.oldScrollTop > 0) {
      this.renderer.setElementStyle(this.headerBible, "top", "-56px");
      this.renderer.setElementStyle(this.tabs, "bottom", "-56px");
      this.renderer.setElementStyle(this.scrollContent, "margin-top", "0");
      this.renderer.setElementStyle(this.scrollContent, "margin-bottom", "0");
      this.renderer.setElementStyle(this.fixScrollContent, "margin-top", "0");
      this.renderer.setElementStyle(this.fixScrollContent, "margin-bottom", "0");
    } else if (event.scrollTop - this.oldScrollTop < 0) {
      this.renderer.setElementStyle(this.headerBible, "top", "0");
      this.renderer.setElementStyle(this.tabs, "bottom", "0");
      this.renderer.setElementStyle(this.scrollContent, "margin-top", "56px");
      this.renderer.setElementStyle(this.scrollContent, "margin-bottom", "56px");
      this.renderer.setElementStyle(this.fixScrollContent, "margin-top", "56px");
      this.renderer.setElementStyle(this.fixScrollContent, "margin-bottom", "56px");
    }

    this.oldScrollTop = event.scrollTop;
  }

}
