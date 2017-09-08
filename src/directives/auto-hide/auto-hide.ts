import {Directive, ElementRef, Input, Renderer} from '@angular/core';
import {DeviceProvider} from "../../providers/device/device";

@Directive({
  selector: '[auto-hide]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class AutoHideDirective {

  oldScrollTop: number = 0;
  scrollContent;
  fixScrollContent;
  tabs;

  @Input("header") headerBible: HTMLElement;

  constructor(private renderer: Renderer, private element: ElementRef, private device: DeviceProvider) {

  }

  ngOnInit() {
    this.tabs = document.querySelector("#mainTabs .tabbar");
    this.scrollContent = this.element.nativeElement.getElementsByClassName("scroll-content")[0];
    this.fixScrollContent = this.element.nativeElement.getElementsByClassName("fixed-content")[0];
    this.renderer.setElementStyle(this.tabs, "webkitTransition", "bottom 500ms");
    this.renderer.setElementStyle(this.headerBible, "webkitTransition", "top 500ms");
    this.renderer.setElementStyle(this.scrollContent, "webkitTransition", "margin-top 500ms, margin-bottom 500ms");
    this.renderer.setElementStyle(this.fixScrollContent, "webkitTransition", "margin-top 500ms, margin-bottom 500ms");
  }

  onContentScroll(event) {
    if (!this.device.isWeb) {
      if (event.scrollTop - this.oldScrollTop > 0) {
        this.renderer.setElementStyle(this.tabs, "bottom", "-56px");
        this.renderer.setElementStyle(this.headerBible, "top", "-56px");
        this.renderer.setElementStyle(this.scrollContent, "margin-top", "0");
        this.renderer.setElementStyle(this.scrollContent, "margin-bottom", "0");
        this.renderer.setElementStyle(this.fixScrollContent, "margin-top", "0");
        this.renderer.setElementStyle(this.fixScrollContent, "margin-bottom", "0");
      } else if (event.scrollTop - this.oldScrollTop < 0) {
        this.renderer.setElementStyle(this.tabs, "bottom", "0");
        this.renderer.setElementStyle(this.headerBible, "top", "0");
        this.renderer.setElementStyle(this.scrollContent, "margin-top", "56px");
        this.renderer.setElementStyle(this.scrollContent, "margin-bottom", "56px");
        this.renderer.setElementStyle(this.fixScrollContent, "margin-top", "56px");
        this.renderer.setElementStyle(this.fixScrollContent, "margin-bottom", "56px");
      }
      this.oldScrollTop = event.scrollTop;
    }
  }

}
