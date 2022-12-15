import { ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { Directive, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  @Input() defaultColor = "transparent"
  @Input('appBetterHighlight') highlightColor = "yellow"
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef  , private renderer: Renderer2) { }

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
      // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'yellow');
  }

  @HostListener('mouseenter') mouseover(data: Event){
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'yellow');
    this.backgroundColor = this.highlightColor
  }

  @HostListener('mouseleave') mouseout(data: Event){
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor
  }
}
