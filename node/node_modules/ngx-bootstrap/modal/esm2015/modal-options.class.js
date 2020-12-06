/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, InjectionToken } from '@angular/core';
export class ModalOptions {
}
ModalOptions.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     *  Allow user to ID for the modal. Otherwise, a unique number will be given
     * @type {?}
     */
    ModalOptions.prototype.id;
    /**
     *  Includes a modal-backdrop element. Alternatively,
     *  specify static for a backdrop which doesn't close the modal on click.
     * @type {?}
     */
    ModalOptions.prototype.backdrop;
    /**
     * Closes the modal when escape key is pressed.
     * @type {?}
     */
    ModalOptions.prototype.keyboard;
    /** @type {?} */
    ModalOptions.prototype.focus;
    /**
     * Shows the modal when initialized.
     * @type {?}
     */
    ModalOptions.prototype.show;
    /**
     * Ignore the backdrop click
     * @type {?}
     */
    ModalOptions.prototype.ignoreBackdropClick;
    /**
     * Css class for opened modal
     * @type {?}
     */
    ModalOptions.prototype.class;
    /**
     * Toggle animation
     * @type {?}
     */
    ModalOptions.prototype.animated;
    /**
     * Modal data
     * @type {?}
     */
    ModalOptions.prototype.initialState;
    /**
     * Modal providers
     * @type {?}
     */
    ModalOptions.prototype.providers;
    /**
     * aria-labelledby attribute value to set on the modal window
     * @type {?}
     */
    ModalOptions.prototype.ariaLabelledBy;
    /**
     * aria-describedby attribute value to set on the modal window
     * @type {?}
     */
    ModalOptions.prototype.ariaDescribedby;
}
/** @type {?} */
export const modalConfigDefaults = {
    id: (new Date()).getUTCMilliseconds(),
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: '',
    animated: true,
    initialState: {}
};
/** @type {?} */
export const MODAL_CONFIG_DEFAULT_OVERRIDE = new InjectionToken('override-default-config');
/** @type {?} */
export const CLASS_NAME = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    IN: 'in',
    // bs3
    SHOW: 'show' // bs4
};
/** @type {?} */
export const SELECTOR = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
};
/** @type {?} */
export const TRANSITION_DURATIONS = {
    MODAL: 300,
    BACKDROP: 150
};
/** @type {?} */
export const DISMISS_REASONS = {
    BACKRDOP: 'backdrop-click',
    ESC: 'esc'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtb3B0aW9ucy5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvbW9kYWwvIiwic291cmNlcyI6WyJtb2RhbC1vcHRpb25zLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFrQixjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0UsTUFBTSxPQUFPLFlBQVk7OztZQUR4QixVQUFVOzs7Ozs7O0lBS1QsMEJBQVk7Ozs7OztJQUtaLGdDQUE4Qjs7Ozs7SUFJOUIsZ0NBQW1COztJQUVuQiw2QkFBZ0I7Ozs7O0lBSWhCLDRCQUFlOzs7OztJQUlmLDJDQUE4Qjs7Ozs7SUFJOUIsNkJBQWU7Ozs7O0lBSWYsZ0NBQW1COzs7OztJQUluQixvQ0FBc0I7Ozs7O0lBSXRCLGlDQUE2Qjs7Ozs7SUFJN0Isc0NBQXdCOzs7OztJQUl4Qix1Q0FBeUI7OztBQUczQixNQUFNLE9BQU8sbUJBQW1CLEdBQWlCO0lBQy9DLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsRUFBRTtJQUNyQyxRQUFRLEVBQUUsSUFBSTtJQUNkLFFBQVEsRUFBRSxJQUFJO0lBQ2QsS0FBSyxFQUFFLElBQUk7SUFDWCxJQUFJLEVBQUUsS0FBSztJQUNYLG1CQUFtQixFQUFFLEtBQUs7SUFDMUIsS0FBSyxFQUFFLEVBQUU7SUFDVCxRQUFRLEVBQUUsSUFBSTtJQUNkLFlBQVksRUFBRSxFQUFFO0NBQ2pCOztBQUVELE1BQU0sT0FBTyw2QkFBNkIsR0FDeEMsSUFBSSxjQUFjLENBQWUseUJBQXlCLENBQUM7O0FBRTdELE1BQU0sT0FBTyxVQUFVLEdBQWM7SUFDbkMsa0JBQWtCLEVBQUUseUJBQXlCO0lBQzdDLFFBQVEsRUFBRSxnQkFBZ0I7SUFDMUIsSUFBSSxFQUFFLFlBQVk7SUFDbEIsSUFBSSxFQUFFLE1BQU07SUFDWixFQUFFLEVBQUUsSUFBSTs7SUFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU07Q0FDcEI7O0FBRUQsTUFBTSxPQUFPLFFBQVEsR0FBYTtJQUNoQyxNQUFNLEVBQUUsZUFBZTtJQUN2QixXQUFXLEVBQUUsdUJBQXVCO0lBQ3BDLFlBQVksRUFBRSx3QkFBd0I7SUFDdEMsYUFBYSxFQUFFLG9EQUFvRDtDQUNwRTs7QUFFRCxNQUFNLE9BQU8sb0JBQW9CLEdBQXdCO0lBQ3ZELEtBQUssRUFBRSxHQUFHO0lBQ1YsUUFBUSxFQUFFLEdBQUc7Q0FDZDs7QUFFRCxNQUFNLE9BQU8sZUFBZSxHQUFtQjtJQUM3QyxRQUFRLEVBQUUsZ0JBQWdCO0lBQzFCLEdBQUcsRUFBRSxLQUFLO0NBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBTdGF0aWNQcm92aWRlciwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsYXNzTmFtZSwgRGlzbWlzc1JlYXNvbnMsIFNlbGVjdG9yLCBUcmFuc2l0aW9uRHVyYXRpb25zIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9kYWxPcHRpb25zIHtcbiAgLyoqXG4gICAqICBBbGxvdyB1c2VyIHRvIElEIGZvciB0aGUgbW9kYWwuIE90aGVyd2lzZSwgYSB1bmlxdWUgbnVtYmVyIHdpbGwgYmUgZ2l2ZW5cbiAgICovXG4gIGlkPzogbnVtYmVyO1xuICAvKipcbiAgICogIEluY2x1ZGVzIGEgbW9kYWwtYmFja2Ryb3AgZWxlbWVudC4gQWx0ZXJuYXRpdmVseSxcbiAgICogIHNwZWNpZnkgc3RhdGljIGZvciBhIGJhY2tkcm9wIHdoaWNoIGRvZXNuJ3QgY2xvc2UgdGhlIG1vZGFsIG9uIGNsaWNrLlxuICAgKi9cbiAgYmFja2Ryb3A/OiBib29sZWFuIHwgJ3N0YXRpYyc7XG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG1vZGFsIHdoZW4gZXNjYXBlIGtleSBpcyBwcmVzc2VkLlxuICAgKi9cbiAga2V5Ym9hcmQ/OiBib29sZWFuO1xuXG4gIGZvY3VzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFNob3dzIHRoZSBtb2RhbCB3aGVuIGluaXRpYWxpemVkLlxuICAgKi9cbiAgc2hvdz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBJZ25vcmUgdGhlIGJhY2tkcm9wIGNsaWNrXG4gICAqL1xuICBpZ25vcmVCYWNrZHJvcENsaWNrPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIENzcyBjbGFzcyBmb3Igb3BlbmVkIG1vZGFsXG4gICAqL1xuICBjbGFzcz86IHN0cmluZztcbiAgLyoqXG4gICAqIFRvZ2dsZSBhbmltYXRpb25cbiAgICovXG4gIGFuaW1hdGVkPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE1vZGFsIGRhdGFcbiAgICovXG4gIGluaXRpYWxTdGF0ZT86IE9iamVjdDtcbiAgLyoqXG4gICAqIE1vZGFsIHByb3ZpZGVyc1xuICAgKi9cbiAgcHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXTtcbiAgLyoqXG4gICAqIGFyaWEtbGFiZWxsZWRieSBhdHRyaWJ1dGUgdmFsdWUgdG8gc2V0IG9uIHRoZSBtb2RhbCB3aW5kb3dcbiAgICovXG4gIGFyaWFMYWJlbGxlZEJ5Pzogc3RyaW5nO1xuICAvKipcbiAgICogYXJpYS1kZXNjcmliZWRieSBhdHRyaWJ1dGUgdmFsdWUgdG8gc2V0IG9uIHRoZSBtb2RhbCB3aW5kb3dcbiAgICovXG4gIGFyaWFEZXNjcmliZWRieT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IG1vZGFsQ29uZmlnRGVmYXVsdHM6IE1vZGFsT3B0aW9ucyA9IHtcbiAgaWQ6IChuZXcgRGF0ZSgpKS5nZXRVVENNaWxsaXNlY29uZHMoKSxcbiAgYmFja2Ryb3A6IHRydWUsXG4gIGtleWJvYXJkOiB0cnVlLFxuICBmb2N1czogdHJ1ZSxcbiAgc2hvdzogZmFsc2UsXG4gIGlnbm9yZUJhY2tkcm9wQ2xpY2s6IGZhbHNlLFxuICBjbGFzczogJycsXG4gIGFuaW1hdGVkOiB0cnVlLFxuICBpbml0aWFsU3RhdGU6IHt9XG59O1xuXG5leHBvcnQgY29uc3QgTU9EQUxfQ09ORklHX0RFRkFVTFRfT1ZFUlJJREU6IEluamVjdGlvblRva2VuPE1vZGFsT3B0aW9ucz4gPVxuICBuZXcgSW5qZWN0aW9uVG9rZW48TW9kYWxPcHRpb25zPignb3ZlcnJpZGUtZGVmYXVsdC1jb25maWcnKTtcblxuZXhwb3J0IGNvbnN0IENMQVNTX05BTUU6IENsYXNzTmFtZSA9IHtcbiAgU0NST0xMQkFSX01FQVNVUkVSOiAnbW9kYWwtc2Nyb2xsYmFyLW1lYXN1cmUnLFxuICBCQUNLRFJPUDogJ21vZGFsLWJhY2tkcm9wJyxcbiAgT1BFTjogJ21vZGFsLW9wZW4nLFxuICBGQURFOiAnZmFkZScsXG4gIElOOiAnaW4nLCAvLyBiczNcbiAgU0hPVzogJ3Nob3cnIC8vIGJzNFxufTtcblxuZXhwb3J0IGNvbnN0IFNFTEVDVE9SOiBTZWxlY3RvciA9IHtcbiAgRElBTE9HOiAnLm1vZGFsLWRpYWxvZycsXG4gIERBVEFfVE9HR0xFOiAnW2RhdGEtdG9nZ2xlPVwibW9kYWxcIl0nLFxuICBEQVRBX0RJU01JU1M6ICdbZGF0YS1kaXNtaXNzPVwibW9kYWxcIl0nLFxuICBGSVhFRF9DT05URU5UOiAnLm5hdmJhci1maXhlZC10b3AsIC5uYXZiYXItZml4ZWQtYm90dG9tLCAuaXMtZml4ZWQnXG59O1xuXG5leHBvcnQgY29uc3QgVFJBTlNJVElPTl9EVVJBVElPTlM6IFRyYW5zaXRpb25EdXJhdGlvbnMgPSB7XG4gIE1PREFMOiAzMDAsXG4gIEJBQ0tEUk9QOiAxNTBcbn07XG5cbmV4cG9ydCBjb25zdCBESVNNSVNTX1JFQVNPTlM6IERpc21pc3NSZWFzb25zID0ge1xuICBCQUNLUkRPUDogJ2JhY2tkcm9wLWNsaWNrJyxcbiAgRVNDOiAnZXNjJ1xufTtcbiJdfQ==