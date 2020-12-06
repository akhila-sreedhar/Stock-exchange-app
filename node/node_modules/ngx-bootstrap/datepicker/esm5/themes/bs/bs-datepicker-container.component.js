/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __values } from "tslib";
import { Component, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { take } from 'rxjs/operators';
import { getFullYear, getMonth } from 'ngx-bootstrap/chronos';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { datepickerAnimation } from '../../datepicker-animations';
import { BsDatepickerAbstractComponent } from '../../base/bs-datepicker-container';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
var BsDatepickerContainerComponent = /** @class */ (function (_super) {
    __extends(BsDatepickerContainerComponent, _super);
    function BsDatepickerContainerComponent(_renderer, _config, _store, _element, _actions, _effects, _positionService) {
        var _this = _super.call(this) || this;
        _this._config = _config;
        _this._store = _store;
        _this._element = _element;
        _this._actions = _actions;
        _this._positionService = _positionService;
        _this.valueChange = new EventEmitter();
        _this.animationState = 'void';
        _this._subs = [];
        _this._effects = _effects;
        _renderer.setStyle(_element.nativeElement, 'display', 'block');
        _renderer.setStyle(_element.nativeElement, 'position', 'absolute');
        return _this;
    }
    Object.defineProperty(BsDatepickerContainerComponent.prototype, "value", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._effects.setValue(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BsDatepickerContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._positionService.setOptions({
            modifiers: { flip: { enabled: this._config.adaptivePosition } },
            allowedPositions: ['top', 'bottom']
        });
        this._positionService.event$
            .pipe(take(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._positionService.disable();
            if (_this._config.isAnimated) {
                _this.animationState = _this.isTopPosition ? 'animated-up' : 'animated-down';
                return;
            }
            _this.animationState = 'unanimated';
        }));
        this.isOtherMonthsActive = this._config.selectFromOtherMonth;
        this.containerClass = this._config.containerClass;
        this.showTodayBtn = this._config.showTodayButton;
        this.todayPos = this._config.todayPosition;
        this.clearPos = this._config.clearPosition;
        this.showClearBtn = this._config.showClearButton;
        this._effects
            .init(this._store)
            // intial state options
            .setOptions(this._config)
            // data binding view --> model
            .setBindings(this)
            // set event handlers
            .setEventHandlers(this)
            .registerDatepickerSideEffects();
        // todo: move it somewhere else
        // on selected date change
        this._subs.push(this._store
            /* tslint:disable-next-line: no-any */
            .select((/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.selectedDate; }))
            /* tslint:disable-next-line: no-any */
            .subscribe((/**
         * @param {?} date
         * @return {?}
         */
        function (date) { return _this.valueChange.emit(date); })));
    };
    Object.defineProperty(BsDatepickerContainerComponent.prototype, "isTopPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this._element.nativeElement.classList.contains('top');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BsDatepickerContainerComponent.prototype.positionServiceEnable = /**
     * @return {?}
     */
    function () {
        this._positionService.enable();
    };
    /**
     * @param {?} day
     * @return {?}
     */
    BsDatepickerContainerComponent.prototype.daySelectHandler = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
        if (!day) {
            return;
        }
        /** @type {?} */
        var isDisabled = this.isOtherMonthsActive ? day.isDisabled : (day.isOtherMonth || day.isDisabled);
        if (isDisabled) {
            return;
        }
        this._store.dispatch(this._actions.select(day.date));
    };
    /**
     * @param {?} day
     * @return {?}
     */
    BsDatepickerContainerComponent.prototype.monthSelectHandler = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
        if (!day || day.isDisabled) {
            return;
        }
        this._store.dispatch(this._actions.navigateTo({
            unit: {
                month: getMonth(day.date),
                year: getFullYear(day.date)
            },
            viewMode: 'day'
        }));
    };
    /**
     * @param {?} day
     * @return {?}
     */
    BsDatepickerContainerComponent.prototype.yearSelectHandler = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
        if (!day || day.isDisabled) {
            return;
        }
        this._store.dispatch(this._actions.navigateTo({
            unit: {
                year: getFullYear(day.date)
            },
            viewMode: 'month'
        }));
    };
    /**
     * @return {?}
     */
    BsDatepickerContainerComponent.prototype.setToday = /**
     * @return {?}
     */
    function () {
        this._store.dispatch(this._actions.select(new Date()));
    };
    /**
     * @return {?}
     */
    BsDatepickerContainerComponent.prototype.clearDate = /**
     * @return {?}
     */
    function () {
        this._store.dispatch(this._actions.select(undefined));
    };
    /**
     * @return {?}
     */
    BsDatepickerContainerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        try {
            for (var _b = __values(this._subs), _c = _b.next(); !_c.done; _c = _b.next()) {
                var sub = _c.value;
                sub.unsubscribe();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this._effects.destroy();
    };
    BsDatepickerContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bs-datepicker-container',
                    providers: [BsDatepickerStore, BsDatepickerEffects],
                    template: "<!-- days calendar view mode -->\n<div class=\"bs-datepicker\" [ngClass]=\"containerClass\" *ngIf=\"viewMode | async\">\n  <div class=\"bs-datepicker-container\"\n    [@datepickerAnimation]=\"animationState\"\n    (@datepickerAnimation.done)=\"positionServiceEnable()\">\n    <!--calendars-->\n    <div class=\"bs-calendar-container\" [ngSwitch]=\"viewMode | async\" role=\"application\">\n      <!--days calendar-->\n      <div *ngSwitchCase=\"'day'\" class=\"bs-media-container\">\n        <bs-days-calendar-view\n          *ngFor=\"let calendar of daysCalendar | async\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          [options]=\"options | async\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"dayHoverHandler($event)\"\n          (onHoverWeek)=\"weekHoverHandler($event)\"\n          (onSelect)=\"daySelectHandler($event)\">\n        </bs-days-calendar-view>\n      </div>\n\n      <!--months calendar-->\n      <div *ngSwitchCase=\"'month'\" class=\"bs-media-container\">\n        <bs-month-calendar-view\n          *ngFor=\"let calendar of monthsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"monthHoverHandler($event)\"\n          (onSelect)=\"monthSelectHandler($event)\">\n        </bs-month-calendar-view>\n      </div>\n\n      <!--years calendar-->\n      <div *ngSwitchCase=\"'year'\" class=\"bs-media-container\">\n        <bs-years-calendar-view\n          *ngFor=\"let calendar of yearsCalendar | async\"\n          [class.bs-datepicker-multiple]=\"(daysCalendar | async)?.length > 1\"\n          [calendar]=\"calendar\"\n          (onNavigate)=\"navigateTo($event)\"\n          (onViewMode)=\"setViewMode($event)\"\n          (onHover)=\"yearHoverHandler($event)\"\n          (onSelect)=\"yearSelectHandler($event)\">\n        </bs-years-calendar-view>\n      </div>\n    </div>\n\n    <!--applycancel buttons-->\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"false\">\n      <button class=\"btn btn-success\" type=\"button\">Apply</button>\n      <button class=\"btn btn-default\" type=\"button\">Cancel</button>\n    </div>\n\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"showTodayBtn || showClearBtn\">\n      <div class=\"btn-today-wrapper\"\n           [class.today-left]=\"todayPos === 'left'\"\n           [class.today-right]=\"todayPos === 'right'\"\n           [class.today-center]=\"todayPos === 'center'\"\n           *ngIf=\"showTodayBtn\">\n        <button class=\"btn btn-success\" (click)=\"setToday()\">Today</button>\n      </div>\n\n        <div class=\"btn-clear-wrapper\"\n        [class.clear-left]=\"clearPos === 'left'\"\n        [class.clear-right]=\"clearPos === 'right'\"\n        [class.clear-center]=\"clearPos === 'center'\"\n        *ngIf=\"showClearBtn\">\n           <button class=\"btn btn-success\" (click)=\"clearDate()\">Clear</button>\n        </div>\n    </div>\n\n  </div>\n\n  <!--custom dates or date ranges picker-->\n  <div class=\"bs-datepicker-custom-range\" *ngIf=\"customRanges?.length > 0\">\n    <bs-custom-date-view\n      [selectedRange]=\"chosenRange\"\n      [ranges]=\"customRanges\"\n      (onSelect)=\"setRangeOnCalendar($event)\">\n    </bs-custom-date-view>\n  </div>\n</div>\n",
                    host: {
                        class: 'bottom',
                        '(click)': '_stopPropagation($event)',
                        role: 'dialog',
                        'aria-label': 'calendar'
                    },
                    animations: [datepickerAnimation]
                }] }
    ];
    /** @nocollapse */
    BsDatepickerContainerComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: BsDatepickerConfig },
        { type: BsDatepickerStore },
        { type: ElementRef },
        { type: BsDatepickerActions },
        { type: BsDatepickerEffects },
        { type: PositioningService }
    ]; };
    return BsDatepickerContainerComponent;
}(BsDatepickerAbstractComponent));
export { BsDatepickerContainerComponent };
if (false) {
    /** @type {?} */
    BsDatepickerContainerComponent.prototype.valueChange;
    /** @type {?} */
    BsDatepickerContainerComponent.prototype.animationState;
    /** @type {?} */
    BsDatepickerContainerComponent.prototype._subs;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerContainerComponent.prototype._config;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerContainerComponent.prototype._store;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerContainerComponent.prototype._element;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerContainerComponent.prototype._actions;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerContainerComponent.prototype._positionService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsidGhlbWVzL2JzL2JzLWRhdGVwaWNrZXItY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWxHLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRWhFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXRFO0lBWW9ELGtEQUE2QjtJQVcvRSx3Q0FDRSxTQUFvQixFQUNaLE9BQTJCLEVBQzNCLE1BQXlCLEVBQ3pCLFFBQW9CLEVBQ3BCLFFBQTZCLEVBQ3JDLFFBQTZCLEVBQ3JCLGdCQUFvQztRQVA5QyxZQVNFLGlCQUFPLFNBS1I7UUFaUyxhQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixZQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUN6QixjQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3BCLGNBQVEsR0FB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QUNkLFlBQVksRUFBRSxVQUFVO3FCQUN6QjtvQkFDRCxVQUFVLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDbEM7Ozs7Z0JBM0JnRSxTQUFTO2dCQVVqRSxrQkFBa0I7Z0JBSWxCLGlCQUFpQjtnQkFkTixVQUFVO2dCQVlyQixtQkFBbUI7Z0JBQ25CLG1CQUFtQjtnQkFQbkIsa0JBQWtCOztJQXFLM0IscUNBQUM7Q0FBQSxBQTNKRCxDQVlvRCw2QkFBNkIsR0ErSWhGO1NBL0lZLDhCQUE4Qjs7O0lBT3pDLHFEQUEyRDs7SUFDM0Qsd0RBQXdCOztJQUV4QiwrQ0FBMkI7Ozs7O0lBR3pCLGlEQUFtQzs7Ozs7SUFDbkMsZ0RBQWlDOzs7OztJQUNqQyxrREFBNEI7Ozs7O0lBQzVCLGtEQUFxQzs7Ozs7SUFFckMsMERBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT25Jbml0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBnZXRGdWxsWWVhciwgZ2V0TW9udGggfSBmcm9tICduZ3gtYm9vdHN0cmFwL2Nocm9ub3MnO1xuaW1wb3J0IHsgUG9zaXRpb25pbmdTZXJ2aWNlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZyc7XG5cbmltcG9ydCB7IGRhdGVwaWNrZXJBbmltYXRpb24gfSBmcm9tICcuLi8uLi9kYXRlcGlja2VyLWFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQnNEYXRlcGlja2VyQWJzdHJhY3RDb21wb25lbnQgfSBmcm9tICcuLi8uLi9iYXNlL2JzLWRhdGVwaWNrZXItY29udGFpbmVyJztcbmltcG9ydCB7IEJzRGF0ZXBpY2tlckNvbmZpZyB9IGZyb20gJy4uLy4uL2JzLWRhdGVwaWNrZXIuY29uZmlnJztcbmltcG9ydCB7IENhbGVuZGFyQ2VsbFZpZXdNb2RlbCwgRGF5Vmlld01vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzJztcbmltcG9ydCB7IEJzRGF0ZXBpY2tlckFjdGlvbnMgfSBmcm9tICcuLi8uLi9yZWR1Y2VyL2JzLWRhdGVwaWNrZXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJFZmZlY3RzIH0gZnJvbSAnLi4vLi4vcmVkdWNlci9icy1kYXRlcGlja2VyLmVmZmVjdHMnO1xuaW1wb3J0IHsgQnNEYXRlcGlja2VyU3RvcmUgfSBmcm9tICcuLi8uLi9yZWR1Y2VyL2JzLWRhdGVwaWNrZXIuc3RvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdicy1kYXRlcGlja2VyLWNvbnRhaW5lcicsXG4gIHByb3ZpZGVyczogW0JzRGF0ZXBpY2tlclN0b3JlLCBCc0RhdGVwaWNrZXJFZmZlY3RzXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2JzLWRhdGVwaWNrZXItdmlldy5odG1sJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYm90dG9tJyxcbiAgICAnKGNsaWNrKSc6ICdfc3RvcFByb3BhZ2F0aW9uKCRldmVudCknLFxuICAgIHJvbGU6ICdkaWFsb2cnLFxuICAgICdhcmlhLWxhYmVsJzogJ2NhbGVuZGFyJ1xuICB9LFxuICBhbmltYXRpb25zOiBbZGF0ZXBpY2tlckFuaW1hdGlvbl1cbn0pXG5leHBvcnQgY2xhc3MgQnNEYXRlcGlja2VyQ29udGFpbmVyQ29tcG9uZW50IGV4dGVuZHMgQnNEYXRlcGlja2VyQWJzdHJhY3RDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgc2V0IHZhbHVlKHZhbHVlOiBEYXRlKSB7XG4gICAgdGhpcy5fZWZmZWN0cy5zZXRWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuICBhbmltYXRpb25TdGF0ZSA9ICd2b2lkJztcblxuICBfc3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgY29uc3RydWN0b3IoXG4gICAgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBCc0RhdGVwaWNrZXJDb25maWcsXG4gICAgcHJpdmF0ZSBfc3RvcmU6IEJzRGF0ZXBpY2tlclN0b3JlLFxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfYWN0aW9uczogQnNEYXRlcGlja2VyQWN0aW9ucyxcbiAgICBfZWZmZWN0czogQnNEYXRlcGlja2VyRWZmZWN0cyxcbiAgICBwcml2YXRlIF9wb3NpdGlvblNlcnZpY2U6IFBvc2l0aW9uaW5nU2VydmljZVxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2VmZmVjdHMgPSBfZWZmZWN0cztcblxuICAgIF9yZW5kZXJlci5zZXRTdHlsZShfZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsICdibG9jaycpO1xuICAgIF9yZW5kZXJlci5zZXRTdHlsZShfZWxlbWVudC5uYXRpdmVFbGVtZW50LCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3Bvc2l0aW9uU2VydmljZS5zZXRPcHRpb25zKHtcbiAgICAgIG1vZGlmaWVyczogeyBmbGlwOiB7IGVuYWJsZWQ6IHRoaXMuX2NvbmZpZy5hZGFwdGl2ZVBvc2l0aW9uIH0gfSxcbiAgICAgIGFsbG93ZWRQb3NpdGlvbnM6IFsndG9wJywgJ2JvdHRvbSddXG4gICAgfSk7XG5cbiAgICB0aGlzLl9wb3NpdGlvblNlcnZpY2UuZXZlbnQkXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZSgxKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uU2VydmljZS5kaXNhYmxlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5pc0FuaW1hdGVkKSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IHRoaXMuaXNUb3BQb3NpdGlvbiA/ICdhbmltYXRlZC11cCcgOiAnYW5pbWF0ZWQtZG93bic7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gJ3VuYW5pbWF0ZWQnO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmlzT3RoZXJNb250aHNBY3RpdmUgPSB0aGlzLl9jb25maWcuc2VsZWN0RnJvbU90aGVyTW9udGg7XG4gICAgdGhpcy5jb250YWluZXJDbGFzcyA9IHRoaXMuX2NvbmZpZy5jb250YWluZXJDbGFzcztcbiAgICB0aGlzLnNob3dUb2RheUJ0biA9IHRoaXMuX2NvbmZpZy5zaG93VG9kYXlCdXR0b247XG4gICAgdGhpcy50b2RheVBvcyA9IHRoaXMuX2NvbmZpZy50b2RheVBvc2l0aW9uO1xuICAgIHRoaXMuY2xlYXJQb3MgPSB0aGlzLl9jb25maWcuY2xlYXJQb3NpdGlvbjtcbiAgICB0aGlzLnNob3dDbGVhckJ0biA9IHRoaXMuX2NvbmZpZy5zaG93Q2xlYXJCdXR0b247XG4gICAgdGhpcy5fZWZmZWN0c1xuICAgICAgLmluaXQodGhpcy5fc3RvcmUpXG4gICAgICAvLyBpbnRpYWwgc3RhdGUgb3B0aW9uc1xuICAgICAgLnNldE9wdGlvbnModGhpcy5fY29uZmlnKVxuICAgICAgLy8gZGF0YSBiaW5kaW5nIHZpZXcgLS0+IG1vZGVsXG4gICAgICAuc2V0QmluZGluZ3ModGhpcylcbiAgICAgIC8vIHNldCBldmVudCBoYW5kbGVyc1xuICAgICAgLnNldEV2ZW50SGFuZGxlcnModGhpcylcbiAgICAgIC5yZWdpc3RlckRhdGVwaWNrZXJTaWRlRWZmZWN0cygpO1xuXG4gICAgLy8gdG9kbzogbW92ZSBpdCBzb21ld2hlcmUgZWxzZVxuICAgIC8vIG9uIHNlbGVjdGVkIGRhdGUgY2hhbmdlXG4gICAgdGhpcy5fc3Vicy5wdXNoKFxuICAgICAgdGhpcy5fc3RvcmVcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbnkgKi9cbiAgICAgICAgLnNlbGVjdCgoc3RhdGU6IGFueSkgPT4gc3RhdGUuc2VsZWN0ZWREYXRlKVxuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFueSAqL1xuICAgICAgICAuc3Vic2NyaWJlKChkYXRlOiBhbnkpID0+IHRoaXMudmFsdWVDaGFuZ2UuZW1pdChkYXRlKSlcbiAgICApO1xuICB9XG5cbiAgZ2V0IGlzVG9wUG9zaXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3RvcCcpO1xuICB9XG5cbiAgcG9zaXRpb25TZXJ2aWNlRW5hYmxlKCk6IHZvaWQge1xuICAgIHRoaXMuX3Bvc2l0aW9uU2VydmljZS5lbmFibGUoKTtcbiAgfVxuXG4gIGRheVNlbGVjdEhhbmRsZXIoZGF5OiBEYXlWaWV3TW9kZWwpOiB2b2lkIHtcbiAgICBpZiAoIWRheSkge1xuICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaXNEaXNhYmxlZCA9IHRoaXMuaXNPdGhlck1vbnRoc0FjdGl2ZSA/IGRheS5pc0Rpc2FibGVkIDogKGRheS5pc090aGVyTW9udGggfHwgZGF5LmlzRGlzYWJsZWQpO1xuXG4gICAgaWYgKGlzRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl9hY3Rpb25zLnNlbGVjdChkYXkuZGF0ZSkpO1xuICB9XG5cbiAgbW9udGhTZWxlY3RIYW5kbGVyKGRheTogQ2FsZW5kYXJDZWxsVmlld01vZGVsKTogdm9pZCB7XG4gICAgaWYgKCFkYXkgfHwgZGF5LmlzRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChcbiAgICAgIHRoaXMuX2FjdGlvbnMubmF2aWdhdGVUbyh7XG4gICAgICAgIHVuaXQ6IHtcbiAgICAgICAgICBtb250aDogZ2V0TW9udGgoZGF5LmRhdGUpLFxuICAgICAgICAgIHllYXI6IGdldEZ1bGxZZWFyKGRheS5kYXRlKVxuICAgICAgICB9LFxuICAgICAgICB2aWV3TW9kZTogJ2RheSdcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHllYXJTZWxlY3RIYW5kbGVyKGRheTogQ2FsZW5kYXJDZWxsVmlld01vZGVsKTogdm9pZCB7XG4gICAgaWYgKCFkYXkgfHwgZGF5LmlzRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChcbiAgICAgIHRoaXMuX2FjdGlvbnMubmF2aWdhdGVUbyh7XG4gICAgICAgIHVuaXQ6IHtcbiAgICAgICAgICB5ZWFyOiBnZXRGdWxsWWVhcihkYXkuZGF0ZSlcbiAgICAgICAgfSxcbiAgICAgICAgdmlld01vZGU6ICdtb250aCdcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHNldFRvZGF5KCk6IHZvaWQge1xuICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKHRoaXMuX2FjdGlvbnMuc2VsZWN0KG5ldyBEYXRlKCkpKTtcbiAgfVxuXG4gIGNsZWFyRGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl9hY3Rpb25zLnNlbGVjdCh1bmRlZmluZWQpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGZvciAoY29uc3Qgc3ViIG9mIHRoaXMuX3N1YnMpIHtcbiAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICB0aGlzLl9lZmZlY3RzLmRlc3Ryb3koKTtcbiAgfVxufVxuIl19