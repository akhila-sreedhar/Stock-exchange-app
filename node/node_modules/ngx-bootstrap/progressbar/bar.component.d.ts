import { OnDestroy, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ProgressbarComponent } from './progressbar.component';
export declare class BarComponent implements OnInit, OnDestroy {
    private el;
    private renderer;
    max: number;
    /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
    get type(): string;
    set type(v: string);
    /** current value of progress bar */
    get value(): number;
    set value(v: number);
    get setBarWidth(): number;
    addClass: boolean;
    get isBs3(): boolean;
    striped: boolean;
    animate: boolean;
    percent: number;
    progress: ProgressbarComponent;
    protected _value: number;
    protected _type: string;
    private _prevType;
    constructor(el: ElementRef, progress: ProgressbarComponent, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    recalculatePercentage(): void;
    private applyTypeClasses;
}
