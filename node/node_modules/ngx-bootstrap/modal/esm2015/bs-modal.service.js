/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, EventEmitter, RendererFactory2, Inject, Optional } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalContainerComponent } from './modal-container.component';
import { CLASS_NAME, modalConfigDefaults, ModalOptions, TRANSITION_DURATIONS, MODAL_CONFIG_DEFAULT_OVERRIDE } from './modal-options.class';
import { BsModalRef } from './bs-modal-ref.service';
export class BsModalService {
    /**
     * @param {?} rendererFactory
     * @param {?} clf
     * @param {?} modalDefaultOption
     */
    constructor(rendererFactory, clf, modalDefaultOption) {
        this.clf = clf;
        this.modalDefaultOption = modalDefaultOption;
        // tslint:disable-next-line:no-any
        this.onShow = new EventEmitter();
        // tslint:disable-next-line:no-any
        this.onShown = new EventEmitter();
        // tslint:disable-next-line:no-any
        this.onHide = new EventEmitter();
        // tslint:disable-next-line:no-any
        this.onHidden = new EventEmitter();
        this.isBodyOverflowing = false;
        this.originalBodyPadding = 0;
        this.scrollbarWidth = 0;
        this.modalsCount = 0;
        this.lastDismissReason = null;
        this.loaders = [];
        this._backdropLoader = this.clf.createLoader(null, null, null);
        this._renderer = rendererFactory.createRenderer(null, null);
        this.config = modalDefaultOption ?
            (Object.assign({}, modalConfigDefaults, modalDefaultOption)) :
            modalConfigDefaults;
    }
    /**
     * Shows a modal
     * @param {?} content
     * @param {?=} config
     * @return {?}
     */
    // tslint:disable-next-line:no-any
    show(content, config) {
        this.modalsCount++;
        this._createLoaders();
        this.config = this.modalDefaultOption ?
            Object.assign({}, modalConfigDefaults, this.modalDefaultOption, config) :
            Object.assign({}, modalConfigDefaults, config);
        this._showBackdrop();
        this.lastDismissReason = null;
        return this._showModal(content);
    }
    /**
     * @param {?=} id
     * @return {?}
     */
    hide(id) {
        if (this.modalsCount === 1 || id == null) {
            this._hideBackdrop();
            this.resetScrollbar();
        }
        this.modalsCount = this.modalsCount >= 1 && id != null ? this.modalsCount - 1 : 0;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this._hideModal(id);
            this.removeLoaders(id);
        }), this.config.animated ? TRANSITION_DURATIONS.BACKDROP : 0);
    }
    /**
     * @return {?}
     */
    _showBackdrop() {
        /** @type {?} */
        const isBackdropEnabled = this.config.backdrop || this.config.backdrop === 'static';
        /** @type {?} */
        const isBackdropInDOM = !this.backdropRef || !this.backdropRef.instance.isShown;
        if (this.modalsCount === 1) {
            this.removeBackdrop();
            if (isBackdropEnabled && isBackdropInDOM) {
                this._backdropLoader
                    .attach(ModalBackdropComponent)
                    .to('body')
                    .show({ isAnimated: this.config.animated });
                this.backdropRef = this._backdropLoader._componentRef;
            }
        }
    }
    /**
     * @return {?}
     */
    _hideBackdrop() {
        if (!this.backdropRef) {
            return;
        }
        this.backdropRef.instance.isShown = false;
        /** @type {?} */
        const duration = this.config.animated ? TRANSITION_DURATIONS.BACKDROP : 0;
        setTimeout((/**
         * @return {?}
         */
        () => this.removeBackdrop()), duration);
    }
    // tslint:disable-next-line:no-any
    /**
     * @param {?} content
     * @return {?}
     */
    _showModal(content) {
        var _a;
        /** @type {?} */
        const modalLoader = this.loaders[this.loaders.length - 1];
        if (this.config && this.config.providers) {
            for (const provider of this.config.providers) {
                modalLoader.provide(provider);
            }
        }
        /** @type {?} */
        const bsModalRef = new BsModalRef();
        /** @type {?} */
        const modalContainerRef = modalLoader
            .provide({ provide: ModalOptions, useValue: this.config })
            .provide({ provide: BsModalRef, useValue: bsModalRef })
            .attach(ModalContainerComponent)
            .to('body');
        bsModalRef.hide = (/**
         * @return {?}
         */
        () => modalContainerRef.instance.hide());
        bsModalRef.setClass = (/**
         * @param {?} newClass
         * @return {?}
         */
        (newClass) => {
            modalContainerRef.instance.config.class = newClass;
        });
        bsModalRef.onHidden = new EventEmitter();
        bsModalRef.onHide = new EventEmitter();
        this.copyEvent(modalLoader.onBeforeHide, bsModalRef.onHide);
        this.copyEvent(modalLoader.onHidden, bsModalRef.onHidden);
        // call 'show' method after assign setClass in bsModalRef.
        // it makes modal component's bsModalRef available to call setClass method
        modalContainerRef.show({
            content,
            isAnimated: this.config.animated,
            initialState: this.config.initialState,
            bsModalService: this,
            id: this.config.id
        });
        modalContainerRef.instance.level = this.getModalsCount();
        bsModalRef.content = modalLoader.getInnerComponent() || null;
        bsModalRef.id = (_a = modalContainerRef.instance.config) === null || _a === void 0 ? void 0 : _a.id;
        return bsModalRef;
    }
    /**
     * @param {?=} id
     * @return {?}
     */
    _hideModal(id) {
        if (id != null) {
            /** @type {?} */
            const indexToRemove = this.loaders.findIndex((/**
             * @param {?} loader
             * @return {?}
             */
            loader => loader.instance.config.id === id));
            /** @type {?} */
            const modalLoader = this.loaders[indexToRemove];
            if (modalLoader) {
                modalLoader.hide(id);
            }
        }
        else {
            this.loaders.forEach((/**
             * @param {?} loader
             * @return {?}
             */
            (loader) => {
                loader.hide(loader.instance.config.id);
            }));
        }
    }
    /**
     * @return {?}
     */
    getModalsCount() {
        return this.modalsCount;
    }
    /**
     * @param {?} reason
     * @return {?}
     */
    setDismissReason(reason) {
        this.lastDismissReason = reason;
    }
    /**
     * @return {?}
     */
    removeBackdrop() {
        this._renderer.removeClass(document.body, CLASS_NAME.OPEN);
        this._backdropLoader.hide();
        this.backdropRef = null;
    }
    /** Checks if the body is overflowing and sets scrollbar width */
    /**
     * \@internal
     * @return {?}
     */
    checkScrollbar() {
        this.isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this.scrollbarWidth = this.getScrollbarWidth();
    }
    /**
     * @return {?}
     */
    setScrollbar() {
        if (!document) {
            return;
        }
        this.originalBodyPadding = parseInt(window
            .getComputedStyle(document.body)
            .getPropertyValue('padding-right') || '0', 10);
        if (this.isBodyOverflowing) {
            document.body.style.paddingRight = `${this.originalBodyPadding +
                this.scrollbarWidth}px`;
        }
    }
    /**
     * @private
     * @return {?}
     */
    resetScrollbar() {
        document.body.style.paddingRight = `${this.originalBodyPadding}px`;
    }
    // thx d.walsh
    /**
     * @private
     * @return {?}
     */
    getScrollbarWidth() {
        /** @type {?} */
        const scrollDiv = this._renderer.createElement('div');
        this._renderer.addClass(scrollDiv, CLASS_NAME.SCROLLBAR_MEASURER);
        this._renderer.appendChild(document.body, scrollDiv);
        /** @type {?} */
        const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this._renderer.removeChild(document.body, scrollDiv);
        return scrollbarWidth;
    }
    /**
     * @private
     * @return {?}
     */
    _createLoaders() {
        /** @type {?} */
        const loader = this.clf.createLoader(null, null, null);
        this.copyEvent(loader.onBeforeShow, this.onShow);
        this.copyEvent(loader.onShown, this.onShown);
        this.copyEvent(loader.onBeforeHide, this.onHide);
        this.copyEvent(loader.onHidden, this.onHidden);
        this.loaders.push(loader);
    }
    /**
     * @private
     * @param {?=} id
     * @return {?}
     */
    removeLoaders(id) {
        if (id != null) {
            /** @type {?} */
            const indexToRemove = this.loaders.findIndex((/**
             * @param {?} loader
             * @return {?}
             */
            loader => loader.instance.config.id === id));
            if (indexToRemove >= 0) {
                this.loaders.splice(indexToRemove, 1);
                this.loaders.forEach((/**
                 * @param {?} loader
                 * @param {?} i
                 * @return {?}
                 */
                (loader, i) => {
                    loader.instance.level = i + 1;
                }));
            }
        }
        else {
            this.loaders.splice(0, this.loaders.length);
        }
    }
    // tslint:disable-next-line:no-any
    /**
     * @private
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    copyEvent(from, to) {
        from.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            to.emit(this.lastDismissReason || data);
        }));
    }
}
BsModalService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
BsModalService.ctorParameters = () => [
    { type: RendererFactory2 },
    { type: ComponentLoaderFactory },
    { type: ModalOptions, decorators: [{ type: Optional }, { type: Inject, args: [MODAL_CONFIG_DEFAULT_OVERRIDE,] }] }
];
if (false) {
    /** @type {?} */
    BsModalService.prototype.config;
    /** @type {?} */
    BsModalService.prototype.onShow;
    /** @type {?} */
    BsModalService.prototype.onShown;
    /** @type {?} */
    BsModalService.prototype.onHide;
    /** @type {?} */
    BsModalService.prototype.onHidden;
    /**
     * @type {?}
     * @protected
     */
    BsModalService.prototype.isBodyOverflowing;
    /**
     * @type {?}
     * @protected
     */
    BsModalService.prototype.originalBodyPadding;
    /**
     * @type {?}
     * @protected
     */
    BsModalService.prototype.scrollbarWidth;
    /**
     * @type {?}
     * @protected
     */
    BsModalService.prototype.backdropRef;
    /**
     * @type {?}
     * @private
     */
    BsModalService.prototype._backdropLoader;
    /**
     * @type {?}
     * @private
     */
    BsModalService.prototype.modalsCount;
    /**
     * @type {?}
     * @private
     */
    BsModalService.prototype.lastDismissReason;
    /**
     * @type {?}
     * @private
     */
    BsModalService.prototype.loaders;
    /**
     * @type {?}
     * @private
     */
    BsModalService.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    BsModalService.prototype.clf;
    /**
     * @type {?}
     * @private
     */
    BsModalService.prototype.modalDefaultOption;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtbW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvbW9kYWwvIiwic291cmNlcyI6WyJicy1tb2RhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsVUFBVSxFQUVWLFlBQVksRUFFWixnQkFBZ0IsRUFDaEIsTUFBTSxFQUNOLFFBQVEsRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQW1CLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDekYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUNMLFVBQVUsRUFDVixtQkFBbUIsRUFDbkIsWUFBWSxFQUNaLG9CQUFvQixFQUNwQiw2QkFBNkIsRUFDOUIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHcEQsTUFBTSxPQUFPLGNBQWM7Ozs7OztJQTJCekIsWUFDRSxlQUFpQyxFQUN6QixHQUEyQixFQUN3QixrQkFBZ0M7UUFEbkYsUUFBRyxHQUFILEdBQUcsQ0FBd0I7UUFDd0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFjOztRQXpCN0YsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDOztRQUUvQyxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7O1FBRWhELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7UUFFL0MsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXZDLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQix3QkFBbUIsR0FBRyxDQUFDLENBQUM7UUFFeEIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFJckIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsc0JBQWlCLEdBQVEsSUFBSSxDQUFDO1FBRTlCLFlBQU8sR0FBK0MsRUFBRSxDQUFDO1FBUS9ELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQzFDLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxDQUNMLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztZQUNoQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLG1CQUFtQixFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlELG1CQUFtQixDQUFDO0lBQ3hCLENBQUM7Ozs7Ozs7O0lBSUQsSUFBSSxDQUFDLE9BQXdDLEVBQUUsTUFBcUI7UUFDbEUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBRTlCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVELElBQUksQ0FBQyxFQUFXO1FBQ2QsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsR0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7O0lBRUQsYUFBYTs7Y0FDTCxpQkFBaUIsR0FDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEtBQUssUUFBUTs7Y0FDckQsZUFBZSxHQUNuQixDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPO1FBRXpELElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRXRCLElBQUksaUJBQWlCLElBQUksZUFBZSxFQUFFO2dCQUN4QyxJQUFJLENBQUMsZUFBZTtxQkFDakIsTUFBTSxDQUFDLHNCQUFzQixDQUFDO3FCQUM5QixFQUFFLENBQUMsTUFBTSxDQUFDO3FCQUNWLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUM7YUFDdkQ7U0FDRjtJQUNILENBQUM7Ozs7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7Y0FDcEMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUsVUFBVTs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7OztJQUVELFVBQVUsQ0FBQyxPQUFZOzs7Y0FDZixXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDekQsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ3hDLEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQzVDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDL0I7U0FDRjs7Y0FFSyxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUU7O2NBQzdCLGlCQUFpQixHQUFHLFdBQVc7YUFDbEMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3pELE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDO2FBQ3RELE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQzthQUMvQixFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2IsVUFBVSxDQUFDLElBQUk7OztRQUFHLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQSxDQUFDO1FBQzFELFVBQVUsQ0FBQyxRQUFROzs7O1FBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7WUFDekMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ3JELENBQUMsQ0FBQSxDQUFDO1FBRUYsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzlDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUU1QyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUQsMERBQTBEO1FBQzFELDBFQUEwRTtRQUMxRSxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7WUFDckIsT0FBTztZQUNQLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDaEMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWTtZQUN0QyxjQUFjLEVBQUUsSUFBSTtZQUNwQixFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1NBQ25CLENBQUMsQ0FBQztRQUNILGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXpELFVBQVUsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLGlCQUFpQixFQUFFLElBQUksSUFBSSxDQUFDO1FBQzdELFVBQVUsQ0FBQyxFQUFFLFNBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDLE1BQU0sMENBQUUsRUFBRSxDQUFDO1FBRXRELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLEVBQVc7UUFDcEIsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFOztrQkFDUixhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1lBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFDOztrQkFDbEYsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQy9DLElBQUksV0FBVyxFQUFFO2dCQUNmLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdEI7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPOzs7O1lBQ2xCLENBQUMsTUFBZ0QsRUFBRSxFQUFFO2dCQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsRUFDRixDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7O0lBRUQsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLE1BQWM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBSUQsY0FBYztRQUNaLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDakQsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FDakMsTUFBTTthQUNILGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDL0IsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksR0FBRyxFQUMzQyxFQUFFLENBQ0gsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUI7Z0JBQzVELElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7O0lBRU8sY0FBYztRQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQztJQUNyRSxDQUFDOzs7Ozs7SUFHTyxpQkFBaUI7O2NBQ2pCLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7O2NBQy9DLGNBQWMsR0FBRyxTQUFTLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxXQUFXO1FBQ3BFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFckQsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFTyxjQUFjOztjQUNkLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FDbEMsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLENBQ0w7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLENBQUM7Ozs7OztJQUVPLGFBQWEsQ0FBQyxFQUFXO1FBQy9CLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTs7a0JBQ1IsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztZQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBQztZQUN4RixJQUFJLGFBQWEsSUFBSSxDQUFDLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPOzs7OztnQkFDbEIsQ0FBQyxNQUFnRCxFQUFFLENBQVMsRUFBRSxFQUFFO29CQUM5RCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxDQUFDLEVBQ0YsQ0FBQzthQUNIO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQzs7Ozs7Ozs7SUFHTyxTQUFTLENBQUMsSUFBdUIsRUFBRSxFQUFxQjtRQUM5RCxJQUFJLENBQUMsU0FBUzs7OztRQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDM0IsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFuUEYsVUFBVTs7OztZQWpCVCxnQkFBZ0I7WUFLUSxzQkFBc0I7WUFNOUMsWUFBWSx1QkFxQ1QsUUFBUSxZQUFJLE1BQU0sU0FBQyw2QkFBNkI7Ozs7SUE1Qm5ELGdDQUFxQjs7SUFHckIsZ0NBQStDOztJQUUvQyxpQ0FBZ0Q7O0lBRWhELGdDQUErQzs7SUFFL0Msa0NBQWlEOzs7OztJQUVqRCwyQ0FBb0M7Ozs7O0lBQ3BDLDZDQUFrQzs7Ozs7SUFFbEMsd0NBQTZCOzs7OztJQUU3QixxQ0FBNEQ7Ozs7O0lBQzVELHlDQUFpRTs7Ozs7SUFDakUscUNBQXdCOzs7OztJQUN4QiwyQ0FBc0M7Ozs7O0lBRXRDLGlDQUFpRTs7Ozs7SUFFakUsbUNBQTZCOzs7OztJQUkzQiw2QkFBbUM7Ozs7O0lBQ25DLDRDQUEyRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0YWJsZSxcbiAgVGVtcGxhdGVSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgUmVuZGVyZXIyLFxuICBSZW5kZXJlckZhY3RvcnkyLFxuICBJbmplY3QsXG4gIE9wdGlvbmFsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXIsIENvbXBvbmVudExvYWRlckZhY3RvcnkgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbXBvbmVudC1sb2FkZXInO1xuaW1wb3J0IHsgTW9kYWxCYWNrZHJvcENvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtYmFja2Ryb3AuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGFsQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIENMQVNTX05BTUUsXG4gIG1vZGFsQ29uZmlnRGVmYXVsdHMsXG4gIE1vZGFsT3B0aW9ucyxcbiAgVFJBTlNJVElPTl9EVVJBVElPTlMsXG4gIE1PREFMX0NPTkZJR19ERUZBVUxUX09WRVJSSURFXG59IGZyb20gJy4vbW9kYWwtb3B0aW9ucy5jbGFzcyc7XG5pbXBvcnQgeyBCc01vZGFsUmVmIH0gZnJvbSAnLi9icy1tb2RhbC1yZWYuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCc01vZGFsU2VydmljZSB7XG4gIC8vIGNvbnN0cnVjdG9yIHByb3BzXG4gIGNvbmZpZzogTW9kYWxPcHRpb25zO1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgb25TaG93OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBvblNob3duOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIG9uSGlkZGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcm90ZWN0ZWQgaXNCb2R5T3ZlcmZsb3dpbmcgPSBmYWxzZTtcbiAgcHJvdGVjdGVkIG9yaWdpbmFsQm9keVBhZGRpbmcgPSAwO1xuXG4gIHByb3RlY3RlZCBzY3JvbGxiYXJXaWR0aCA9IDA7XG5cbiAgcHJvdGVjdGVkIGJhY2tkcm9wUmVmOiBDb21wb25lbnRSZWY8TW9kYWxCYWNrZHJvcENvbXBvbmVudD47XG4gIHByaXZhdGUgX2JhY2tkcm9wTG9hZGVyOiBDb21wb25lbnRMb2FkZXI8TW9kYWxCYWNrZHJvcENvbXBvbmVudD47XG4gIHByaXZhdGUgbW9kYWxzQ291bnQgPSAwO1xuICBwcml2YXRlIGxhc3REaXNtaXNzUmVhc29uOiBhbnkgPSBudWxsO1xuXG4gIHByaXZhdGUgbG9hZGVyczogQ29tcG9uZW50TG9hZGVyPE1vZGFsQ29udGFpbmVyQ29tcG9uZW50PltdID0gW107XG5cbiAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgcHJpdmF0ZSBjbGY6IENvbXBvbmVudExvYWRlckZhY3RvcnksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNT0RBTF9DT05GSUdfREVGQVVMVF9PVkVSUklERSkgcHJpdmF0ZSBtb2RhbERlZmF1bHRPcHRpb246IE1vZGFsT3B0aW9ucykge1xuICAgIHRoaXMuX2JhY2tkcm9wTG9hZGVyID0gdGhpcy5jbGYuY3JlYXRlTG9hZGVyPE1vZGFsQmFja2Ryb3BDb21wb25lbnQ+KFxuICAgICAgbnVsbCxcbiAgICAgIG51bGwsXG4gICAgICBudWxsXG4gICAgKTtcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcbiAgICB0aGlzLmNvbmZpZyA9IG1vZGFsRGVmYXVsdE9wdGlvbiA/XG4gICAgICAoT2JqZWN0LmFzc2lnbih7fSwgbW9kYWxDb25maWdEZWZhdWx0cywgbW9kYWxEZWZhdWx0T3B0aW9uKSkgOlxuICAgICAgbW9kYWxDb25maWdEZWZhdWx0cztcbiAgfVxuXG4gIC8qKiBTaG93cyBhIG1vZGFsICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgc2hvdyhjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgYW55LCBjb25maWc/OiBNb2RhbE9wdGlvbnMpOiBCc01vZGFsUmVmIHtcbiAgICB0aGlzLm1vZGFsc0NvdW50Kys7XG4gICAgdGhpcy5fY3JlYXRlTG9hZGVycygpO1xuICAgIHRoaXMuY29uZmlnID0gdGhpcy5tb2RhbERlZmF1bHRPcHRpb24gP1xuICAgICAgT2JqZWN0LmFzc2lnbih7fSwgbW9kYWxDb25maWdEZWZhdWx0cywgdGhpcy5tb2RhbERlZmF1bHRPcHRpb24sIGNvbmZpZykgOlxuICAgICAgT2JqZWN0LmFzc2lnbih7fSwgbW9kYWxDb25maWdEZWZhdWx0cywgY29uZmlnKTtcblxuICAgIHRoaXMuX3Nob3dCYWNrZHJvcCgpO1xuICAgIHRoaXMubGFzdERpc21pc3NSZWFzb24gPSBudWxsO1xuXG4gICAgcmV0dXJuIHRoaXMuX3Nob3dNb2RhbChjb250ZW50KTtcbiAgfVxuXG4gIGhpZGUoaWQ/OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5tb2RhbHNDb3VudCA9PT0gMSB8fCBpZCA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9oaWRlQmFja2Ryb3AoKTtcbiAgICAgIHRoaXMucmVzZXRTY3JvbGxiYXIoKTtcbiAgICB9XG4gICAgdGhpcy5tb2RhbHNDb3VudCA9IHRoaXMubW9kYWxzQ291bnQgPj0gMSAmJiBpZCAhPSBudWxsID8gdGhpcy5tb2RhbHNDb3VudCAtIDEgOiAwO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5faGlkZU1vZGFsKGlkKTtcbiAgICAgIHRoaXMucmVtb3ZlTG9hZGVycyhpZCk7XG4gICAgfSwgdGhpcy5jb25maWcuYW5pbWF0ZWQgPyBUUkFOU0lUSU9OX0RVUkFUSU9OUy5CQUNLRFJPUCA6IDApO1xuICB9XG5cbiAgX3Nob3dCYWNrZHJvcCgpOiB2b2lkIHtcbiAgICBjb25zdCBpc0JhY2tkcm9wRW5hYmxlZCA9XG4gICAgICB0aGlzLmNvbmZpZy5iYWNrZHJvcCB8fCB0aGlzLmNvbmZpZy5iYWNrZHJvcCA9PT0gJ3N0YXRpYyc7XG4gICAgY29uc3QgaXNCYWNrZHJvcEluRE9NID1cbiAgICAgICF0aGlzLmJhY2tkcm9wUmVmIHx8ICF0aGlzLmJhY2tkcm9wUmVmLmluc3RhbmNlLmlzU2hvd247XG5cbiAgICBpZiAodGhpcy5tb2RhbHNDb3VudCA9PT0gMSkge1xuICAgICAgdGhpcy5yZW1vdmVCYWNrZHJvcCgpO1xuXG4gICAgICBpZiAoaXNCYWNrZHJvcEVuYWJsZWQgJiYgaXNCYWNrZHJvcEluRE9NKSB7XG4gICAgICAgIHRoaXMuX2JhY2tkcm9wTG9hZGVyXG4gICAgICAgICAgLmF0dGFjaChNb2RhbEJhY2tkcm9wQ29tcG9uZW50KVxuICAgICAgICAgIC50bygnYm9keScpXG4gICAgICAgICAgLnNob3coeyBpc0FuaW1hdGVkOiB0aGlzLmNvbmZpZy5hbmltYXRlZCB9KTtcbiAgICAgICAgdGhpcy5iYWNrZHJvcFJlZiA9IHRoaXMuX2JhY2tkcm9wTG9hZGVyLl9jb21wb25lbnRSZWY7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2hpZGVCYWNrZHJvcCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYmFja2Ryb3BSZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5iYWNrZHJvcFJlZi5pbnN0YW5jZS5pc1Nob3duID0gZmFsc2U7XG4gICAgY29uc3QgZHVyYXRpb24gPSB0aGlzLmNvbmZpZy5hbmltYXRlZCA/IFRSQU5TSVRJT05fRFVSQVRJT05TLkJBQ0tEUk9QIDogMDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVtb3ZlQmFja2Ryb3AoKSwgZHVyYXRpb24pO1xuICB9XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgX3Nob3dNb2RhbChjb250ZW50OiBhbnkpOiBCc01vZGFsUmVmIHtcbiAgICBjb25zdCBtb2RhbExvYWRlciA9IHRoaXMubG9hZGVyc1t0aGlzLmxvYWRlcnMubGVuZ3RoIC0gMV07XG4gICAgaWYgKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLnByb3ZpZGVycykge1xuICAgICAgZm9yIChjb25zdCBwcm92aWRlciBvZiB0aGlzLmNvbmZpZy5wcm92aWRlcnMpIHtcbiAgICAgICAgbW9kYWxMb2FkZXIucHJvdmlkZShwcm92aWRlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYnNNb2RhbFJlZiA9IG5ldyBCc01vZGFsUmVmKCk7XG4gICAgY29uc3QgbW9kYWxDb250YWluZXJSZWYgPSBtb2RhbExvYWRlclxuICAgICAgLnByb3ZpZGUoeyBwcm92aWRlOiBNb2RhbE9wdGlvbnMsIHVzZVZhbHVlOiB0aGlzLmNvbmZpZyB9KVxuICAgICAgLnByb3ZpZGUoeyBwcm92aWRlOiBCc01vZGFsUmVmLCB1c2VWYWx1ZTogYnNNb2RhbFJlZiB9KVxuICAgICAgLmF0dGFjaChNb2RhbENvbnRhaW5lckNvbXBvbmVudClcbiAgICAgIC50bygnYm9keScpO1xuICAgIGJzTW9kYWxSZWYuaGlkZSA9ICgpID0+IG1vZGFsQ29udGFpbmVyUmVmLmluc3RhbmNlLmhpZGUoKTtcbiAgICBic01vZGFsUmVmLnNldENsYXNzID0gKG5ld0NsYXNzOiBzdHJpbmcpID0+IHtcbiAgICAgIG1vZGFsQ29udGFpbmVyUmVmLmluc3RhbmNlLmNvbmZpZy5jbGFzcyA9IG5ld0NsYXNzO1xuICAgIH07XG5cbiAgICBic01vZGFsUmVmLm9uSGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgYnNNb2RhbFJlZi5vbkhpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHRoaXMuY29weUV2ZW50KG1vZGFsTG9hZGVyLm9uQmVmb3JlSGlkZSwgYnNNb2RhbFJlZi5vbkhpZGUpO1xuICAgIHRoaXMuY29weUV2ZW50KG1vZGFsTG9hZGVyLm9uSGlkZGVuLCBic01vZGFsUmVmLm9uSGlkZGVuKTtcbiAgICAvLyBjYWxsICdzaG93JyBtZXRob2QgYWZ0ZXIgYXNzaWduIHNldENsYXNzIGluIGJzTW9kYWxSZWYuXG4gICAgLy8gaXQgbWFrZXMgbW9kYWwgY29tcG9uZW50J3MgYnNNb2RhbFJlZiBhdmFpbGFibGUgdG8gY2FsbCBzZXRDbGFzcyBtZXRob2RcbiAgICBtb2RhbENvbnRhaW5lclJlZi5zaG93KHtcbiAgICAgIGNvbnRlbnQsXG4gICAgICBpc0FuaW1hdGVkOiB0aGlzLmNvbmZpZy5hbmltYXRlZCxcbiAgICAgIGluaXRpYWxTdGF0ZTogdGhpcy5jb25maWcuaW5pdGlhbFN0YXRlLFxuICAgICAgYnNNb2RhbFNlcnZpY2U6IHRoaXMsXG4gICAgICBpZDogdGhpcy5jb25maWcuaWRcbiAgICB9KTtcbiAgICBtb2RhbENvbnRhaW5lclJlZi5pbnN0YW5jZS5sZXZlbCA9IHRoaXMuZ2V0TW9kYWxzQ291bnQoKTtcblxuICAgIGJzTW9kYWxSZWYuY29udGVudCA9IG1vZGFsTG9hZGVyLmdldElubmVyQ29tcG9uZW50KCkgfHwgbnVsbDtcbiAgICBic01vZGFsUmVmLmlkID0gbW9kYWxDb250YWluZXJSZWYuaW5zdGFuY2UuY29uZmlnPy5pZDtcblxuICAgIHJldHVybiBic01vZGFsUmVmO1xuICB9XG5cbiAgX2hpZGVNb2RhbChpZD86IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICBjb25zdCBpbmRleFRvUmVtb3ZlID0gdGhpcy5sb2FkZXJzLmZpbmRJbmRleChsb2FkZXIgPT4gbG9hZGVyLmluc3RhbmNlLmNvbmZpZy5pZCA9PT0gaWQpO1xuICAgICAgY29uc3QgbW9kYWxMb2FkZXIgPSB0aGlzLmxvYWRlcnNbaW5kZXhUb1JlbW92ZV07XG4gICAgICBpZiAobW9kYWxMb2FkZXIpIHtcbiAgICAgICAgbW9kYWxMb2FkZXIuaGlkZShpZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9hZGVycy5mb3JFYWNoKFxuICAgICAgICAobG9hZGVyOiBDb21wb25lbnRMb2FkZXI8TW9kYWxDb250YWluZXJDb21wb25lbnQ+KSA9PiB7XG4gICAgICAgICAgbG9hZGVyLmhpZGUobG9hZGVyLmluc3RhbmNlLmNvbmZpZy5pZCk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TW9kYWxzQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5tb2RhbHNDb3VudDtcbiAgfVxuXG4gIHNldERpc21pc3NSZWFzb24ocmVhc29uOiBzdHJpbmcpIHtcbiAgICB0aGlzLmxhc3REaXNtaXNzUmVhc29uID0gcmVhc29uO1xuICB9XG5cbiAgcmVtb3ZlQmFja2Ryb3AoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgQ0xBU1NfTkFNRS5PUEVOKTtcbiAgICB0aGlzLl9iYWNrZHJvcExvYWRlci5oaWRlKCk7XG4gICAgdGhpcy5iYWNrZHJvcFJlZiA9IG51bGw7XG4gIH1cblxuICAvKiogQ2hlY2tzIGlmIHRoZSBib2R5IGlzIG92ZXJmbG93aW5nIGFuZCBzZXRzIHNjcm9sbGJhciB3aWR0aCAqL1xuICAvKiogQGludGVybmFsICovXG4gIGNoZWNrU2Nyb2xsYmFyKCk6IHZvaWQge1xuICAgIHRoaXMuaXNCb2R5T3ZlcmZsb3dpbmcgPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIDwgd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy5zY3JvbGxiYXJXaWR0aCA9IHRoaXMuZ2V0U2Nyb2xsYmFyV2lkdGgoKTtcbiAgfVxuXG4gIHNldFNjcm9sbGJhcigpOiB2b2lkIHtcbiAgICBpZiAoIWRvY3VtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vcmlnaW5hbEJvZHlQYWRkaW5nID0gcGFyc2VJbnQoXG4gICAgICB3aW5kb3dcbiAgICAgICAgLmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlcbiAgICAgICAgLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctcmlnaHQnKSB8fCAnMCcsXG4gICAgICAxMFxuICAgICk7XG5cbiAgICBpZiAodGhpcy5pc0JvZHlPdmVyZmxvd2luZykge1xuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHt0aGlzLm9yaWdpbmFsQm9keVBhZGRpbmcgK1xuICAgICAgICB0aGlzLnNjcm9sbGJhcldpZHRofXB4YDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2V0U2Nyb2xsYmFyKCk6IHZvaWQge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gYCR7dGhpcy5vcmlnaW5hbEJvZHlQYWRkaW5nfXB4YDtcbiAgfVxuXG4gIC8vIHRoeCBkLndhbHNoXG4gIHByaXZhdGUgZ2V0U2Nyb2xsYmFyV2lkdGgoKTogbnVtYmVyIHtcbiAgICBjb25zdCBzY3JvbGxEaXYgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhzY3JvbGxEaXYsIENMQVNTX05BTUUuU0NST0xMQkFSX01FQVNVUkVSKTtcbiAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChkb2N1bWVudC5ib2R5LCBzY3JvbGxEaXYpO1xuICAgIGNvbnN0IHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNoaWxkKGRvY3VtZW50LmJvZHksIHNjcm9sbERpdik7XG5cbiAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGg7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVMb2FkZXJzKCk6IHZvaWQge1xuICAgIGNvbnN0IGxvYWRlciA9IHRoaXMuY2xmLmNyZWF0ZUxvYWRlcjxNb2RhbENvbnRhaW5lckNvbXBvbmVudD4oXG4gICAgICBudWxsLFxuICAgICAgbnVsbCxcbiAgICAgIG51bGxcbiAgICApO1xuICAgIHRoaXMuY29weUV2ZW50KGxvYWRlci5vbkJlZm9yZVNob3csIHRoaXMub25TaG93KTtcbiAgICB0aGlzLmNvcHlFdmVudChsb2FkZXIub25TaG93biwgdGhpcy5vblNob3duKTtcbiAgICB0aGlzLmNvcHlFdmVudChsb2FkZXIub25CZWZvcmVIaWRlLCB0aGlzLm9uSGlkZSk7XG4gICAgdGhpcy5jb3B5RXZlbnQobG9hZGVyLm9uSGlkZGVuLCB0aGlzLm9uSGlkZGVuKTtcbiAgICB0aGlzLmxvYWRlcnMucHVzaChsb2FkZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVMb2FkZXJzKGlkPzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGluZGV4VG9SZW1vdmUgPSB0aGlzLmxvYWRlcnMuZmluZEluZGV4KGxvYWRlciA9PiBsb2FkZXIuaW5zdGFuY2UuY29uZmlnLmlkID09PSBpZCk7XG4gICAgICBpZiAoaW5kZXhUb1JlbW92ZSA+PSAwKSB7XG4gICAgICAgIHRoaXMubG9hZGVycy5zcGxpY2UoaW5kZXhUb1JlbW92ZSwgMSk7XG4gICAgICAgIHRoaXMubG9hZGVycy5mb3JFYWNoKFxuICAgICAgICAgIChsb2FkZXI6IENvbXBvbmVudExvYWRlcjxNb2RhbENvbnRhaW5lckNvbXBvbmVudD4sIGk6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbG9hZGVyLmluc3RhbmNlLmxldmVsID0gaSArIDE7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvYWRlcnMuc3BsaWNlKDAsIHRoaXMubG9hZGVycy5sZW5ndGgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgcHJpdmF0ZSBjb3B5RXZlbnQoZnJvbTogRXZlbnRFbWl0dGVyPGFueT4sIHRvOiBFdmVudEVtaXR0ZXI8YW55Pikge1xuICAgIGZyb20uc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgIHRvLmVtaXQodGhpcy5sYXN0RGlzbWlzc1JlYXNvbiB8fCBkYXRhKTtcbiAgICB9KTtcbiAgfVxufVxuIl19