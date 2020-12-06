/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CLASS_NAME, DISMISS_REASONS, ModalOptions, TRANSITION_DURATIONS } from './modal-options.class';
import { isBs3 } from 'ngx-bootstrap/utils';
export class ModalContainerComponent {
    /**
     * @param {?} options
     * @param {?} _element
     * @param {?} _renderer
     */
    constructor(options, _element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this.isShown = false;
        this.isModalHiding = false;
        this.clickStartedInContent = false;
        this.config = Object.assign({}, options);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.isAnimated) {
            this._renderer.addClass(this._element.nativeElement, CLASS_NAME.FADE);
        }
        this._renderer.setStyle(this._element.nativeElement, 'display', 'block');
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.isShown = true;
            this._renderer.addClass(this._element.nativeElement, isBs3() ? CLASS_NAME.IN : CLASS_NAME.SHOW);
        }), this.isAnimated ? TRANSITION_DURATIONS.BACKDROP : 0);
        if (document && document.body) {
            if (this.bsModalService.getModalsCount() === 1) {
                this.bsModalService.checkScrollbar();
                this.bsModalService.setScrollbar();
            }
            this._renderer.addClass(document.body, CLASS_NAME.OPEN);
        }
        if (this._element.nativeElement) {
            this._element.nativeElement.focus();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClickStarted(event) {
        this.clickStartedInContent = event.target !== this._element.nativeElement;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClickStop(event) {
        /** @type {?} */
        const clickedInBackdrop = event.target === this._element.nativeElement && !this.clickStartedInContent;
        if (this.config.ignoreBackdropClick ||
            this.config.backdrop === 'static' ||
            !clickedInBackdrop) {
            this.clickStartedInContent = false;
            return;
        }
        this.bsModalService.setDismissReason(DISMISS_REASONS.BACKRDOP);
        this.hide();
    }
    /**
     * @return {?}
     */
    onPopState() {
        this.hide();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onEsc(event) {
        if (!this.isShown) {
            return;
        }
        // tslint:disable-next-line:deprecation
        if (event.keyCode === 27 || event.key === 'Escape') {
            event.preventDefault();
        }
        if (this.config.keyboard &&
            this.level === this.bsModalService.getModalsCount()) {
            this.bsModalService.setDismissReason(DISMISS_REASONS.ESC);
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.isShown) {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    hide() {
        if (this.isModalHiding || !this.isShown) {
            return;
        }
        this.isModalHiding = true;
        this._renderer.removeClass(this._element.nativeElement, isBs3() ? CLASS_NAME.IN : CLASS_NAME.SHOW);
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.isShown = false;
            if (document &&
                document.body &&
                this.bsModalService.getModalsCount() === 1) {
                this._renderer.removeClass(document.body, CLASS_NAME.OPEN);
            }
            this.bsModalService.hide(this.config.id);
            this.isModalHiding = false;
        }), this.isAnimated ? TRANSITION_DURATIONS.MODAL : 0);
    }
}
ModalContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'modal-container',
                template: `
    <div [class]="'modal-dialog' + (config.class ? ' ' + config.class : '')" role="document">
      <div class="modal-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
                host: {
                    class: 'modal',
                    role: 'dialog',
                    tabindex: '-1',
                    '[attr.aria-modal]': 'true',
                    '[attr.aria-labelledby]': 'config.ariaLabelledBy',
                    '[attr.aria-describedby]': 'config.ariaDescribedby'
                }
            }] }
];
/** @nocollapse */
ModalContainerComponent.ctorParameters = () => [
    { type: ModalOptions },
    { type: ElementRef },
    { type: Renderer2 }
];
ModalContainerComponent.propDecorators = {
    onClickStarted: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    onClickStop: [{ type: HostListener, args: ['mouseup', ['$event'],] }],
    onPopState: [{ type: HostListener, args: ['window:popstate',] }],
    onEsc: [{ type: HostListener, args: ['window:keydown.esc', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    ModalContainerComponent.prototype.config;
    /** @type {?} */
    ModalContainerComponent.prototype.isShown;
    /** @type {?} */
    ModalContainerComponent.prototype.level;
    /** @type {?} */
    ModalContainerComponent.prototype.isAnimated;
    /** @type {?} */
    ModalContainerComponent.prototype.bsModalService;
    /**
     * @type {?}
     * @private
     */
    ModalContainerComponent.prototype.isModalHiding;
    /**
     * @type {?}
     * @private
     */
    ModalContainerComponent.prototype.clickStartedInContent;
    /**
     * @type {?}
     * @protected
     */
    ModalContainerComponent.prototype._element;
    /**
     * @type {?}
     * @private
     */
    ModalContainerComponent.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvbW9kYWwvIiwic291cmNlcyI6WyJtb2RhbC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBR1osU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxVQUFVLEVBQ1YsZUFBZSxFQUNmLFlBQVksRUFDWixvQkFBb0IsRUFDckIsTUFBTSx1QkFBdUIsQ0FBQztBQUUvQixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFvQjVDLE1BQU0sT0FBTyx1QkFBdUI7Ozs7OztJQVNsQyxZQUFZLE9BQXFCLEVBQ1gsUUFBb0IsRUFDdEIsU0FBb0I7UUFEbEIsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUN0QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBVHhDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFJUixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QiwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFLcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQzNCLFVBQVUsQ0FBQyxJQUFJLENBQ2hCLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFDM0IsU0FBUyxFQUNULE9BQU8sQ0FDUixDQUFDO1FBQ0YsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2Qs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QyxRQUFRLENBQUM7MEJBS3BDLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7eUJBZ0JsQyxZQUFZLFNBQUMsaUJBQWlCO29CQUs5QixZQUFZLFNBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7SUF2RTlDLHlDQUFxQjs7SUFDckIsMENBQWdCOztJQUNoQix3Q0FBYzs7SUFDZCw2Q0FBb0I7O0lBQ3BCLGlEQUErQjs7Ozs7SUFDL0IsZ0RBQThCOzs7OztJQUM5Qix3REFBc0M7Ozs7O0lBRzFCLDJDQUE4Qjs7Ozs7SUFDOUIsNENBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDTEFTU19OQU1FLFxuICBESVNNSVNTX1JFQVNPTlMsXG4gIE1vZGFsT3B0aW9ucyxcbiAgVFJBTlNJVElPTl9EVVJBVElPTlNcbn0gZnJvbSAnLi9tb2RhbC1vcHRpb25zLmNsYXNzJztcbmltcG9ydCB7IEJzTW9kYWxTZXJ2aWNlIH0gZnJvbSAnLi9icy1tb2RhbC5zZXJ2aWNlJztcbmltcG9ydCB7IGlzQnMzIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21vZGFsLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiJ21vZGFsLWRpYWxvZycgKyAoY29uZmlnLmNsYXNzID8gJyAnICsgY29uZmlnLmNsYXNzIDogJycpXCIgcm9sZT1cImRvY3VtZW50XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbW9kYWwnLFxuICAgIHJvbGU6ICdkaWFsb2cnLFxuICAgIHRhYmluZGV4OiAnLTEnLFxuICAgICdbYXR0ci5hcmlhLW1vZGFsXSc6ICd0cnVlJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdjb25maWcuYXJpYUxhYmVsbGVkQnknLFxuICAgICdbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XSc6ICdjb25maWcuYXJpYURlc2NyaWJlZGJ5J1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBjb25maWc6IE1vZGFsT3B0aW9ucztcbiAgaXNTaG93biA9IGZhbHNlO1xuICBsZXZlbDogbnVtYmVyO1xuICBpc0FuaW1hdGVkOiBib29sZWFuO1xuICBic01vZGFsU2VydmljZTogQnNNb2RhbFNlcnZpY2U7XG4gIHByaXZhdGUgaXNNb2RhbEhpZGluZyA9IGZhbHNlO1xuICBwcml2YXRlIGNsaWNrU3RhcnRlZEluQ29udGVudCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE1vZGFsT3B0aW9ucyxcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF9lbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzQW5pbWF0ZWQpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKFxuICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIENMQVNTX05BTUUuRkFERVxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAnZGlzcGxheScsXG4gICAgICAnYmxvY2snXG4gICAgKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaXNTaG93biA9IHRydWU7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhcbiAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICBpc0JzMygpID8gQ0xBU1NfTkFNRS5JTiA6IENMQVNTX05BTUUuU0hPV1xuICAgICAgKTtcbiAgICB9LCB0aGlzLmlzQW5pbWF0ZWQgPyBUUkFOU0lUSU9OX0RVUkFUSU9OUy5CQUNLRFJPUCA6IDApO1xuICAgIGlmIChkb2N1bWVudCAmJiBkb2N1bWVudC5ib2R5KSB7XG4gICAgICBpZiAodGhpcy5ic01vZGFsU2VydmljZS5nZXRNb2RhbHNDb3VudCgpID09PSAxKSB7XG4gICAgICAgIHRoaXMuYnNNb2RhbFNlcnZpY2UuY2hlY2tTY3JvbGxiYXIoKTtcbiAgICAgICAgdGhpcy5ic01vZGFsU2VydmljZS5zZXRTY3JvbGxiYXIoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksIENMQVNTX05BTUUuT1BFTik7XG4gICAgfVxuICAgIGlmICh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2tTdGFydGVkKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5jbGlja1N0YXJ0ZWRJbkNvbnRlbnQgPSBldmVudC50YXJnZXQgIT09IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNldXAnLCBbJyRldmVudCddKVxuICBvbkNsaWNrU3RvcChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGNsaWNrZWRJbkJhY2tkcm9wID0gZXZlbnQudGFyZ2V0ID09PSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgJiYgIXRoaXMuY2xpY2tTdGFydGVkSW5Db250ZW50O1xuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLmlnbm9yZUJhY2tkcm9wQ2xpY2sgfHxcbiAgICAgIHRoaXMuY29uZmlnLmJhY2tkcm9wID09PSAnc3RhdGljJyB8fFxuICAgICAgIWNsaWNrZWRJbkJhY2tkcm9wXG4gICAgKSB7XG4gICAgICB0aGlzLmNsaWNrU3RhcnRlZEluQ29udGVudCA9IGZhbHNlO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuYnNNb2RhbFNlcnZpY2Uuc2V0RGlzbWlzc1JlYXNvbihESVNNSVNTX1JFQVNPTlMuQkFDS1JET1ApO1xuICAgIHRoaXMuaGlkZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnBvcHN0YXRlJylcbiAgb25Qb3BTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmhpZGUoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLmVzYycsIFsnJGV2ZW50J10pXG4gIG9uRXNjKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzU2hvd24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcgfHwgZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZy5rZXlib2FyZCAmJlxuICAgICAgdGhpcy5sZXZlbCA9PT0gdGhpcy5ic01vZGFsU2VydmljZS5nZXRNb2RhbHNDb3VudCgpXG4gICAgKSB7XG4gICAgICB0aGlzLmJzTW9kYWxTZXJ2aWNlLnNldERpc21pc3NSZWFzb24oRElTTUlTU19SRUFTT05TLkVTQyk7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1Nob3duKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBoaWRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzTW9kYWxIaWRpbmcgfHwgIXRoaXMuaXNTaG93bikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmlzTW9kYWxIaWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKFxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgaXNCczMoKSA/IENMQVNTX05BTUUuSU4gOiBDTEFTU19OQU1FLlNIT1dcbiAgICApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pc1Nob3duID0gZmFsc2U7XG4gICAgICBpZiAoXG4gICAgICAgIGRvY3VtZW50ICYmXG4gICAgICAgIGRvY3VtZW50LmJvZHkgJiZcbiAgICAgICAgdGhpcy5ic01vZGFsU2VydmljZS5nZXRNb2RhbHNDb3VudCgpID09PSAxXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgQ0xBU1NfTkFNRS5PUEVOKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYnNNb2RhbFNlcnZpY2UuaGlkZSh0aGlzLmNvbmZpZy5pZCk7XG4gICAgICB0aGlzLmlzTW9kYWxIaWRpbmcgPSBmYWxzZTtcbiAgICB9LCB0aGlzLmlzQW5pbWF0ZWQgPyBUUkFOU0lUSU9OX0RVUkFUSU9OUy5NT0RBTCA6IDApO1xuICB9XG59XG4iXX0=