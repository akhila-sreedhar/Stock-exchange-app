/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * For date range picker there are `BsDaterangepickerConfig` which inherits all properties,
 * except `displayMonths`, for range picker it default to `2`
 */
var BsDatepickerConfig = /** @class */ (function () {
    function BsDatepickerConfig() {
        /**
         * sets use adaptive position
         */
        this.adaptivePosition = false;
        /**
         * sets use UTC date time format
         */
        this.useUtc = false;
        /**
         * turn on/off animation
         */
        this.isAnimated = false;
        /**
         * If true, returns focus to the datepicker / daterangepicker input after date selection
         */
        this.returnFocusToInput = false;
        /**
         * CSS class which will be applied to datepicker container,
         * usually used to set color theme
         */
        this.containerClass = 'theme-green';
        // DatepickerRenderOptions
        this.displayMonths = 1;
        /**
         * Allows to hide week numbers in datepicker
         */
        this.showWeekNumbers = true;
        this.dateInputFormat = 'L';
        // range picker
        this.rangeSeparator = ' - ';
        /**
         * Date format for date range input field
         */
        this.rangeInputFormat = 'L';
        // DatepickerFormatOptions
        this.monthTitle = 'MMMM';
        this.yearTitle = 'YYYY';
        this.dayLabel = 'D';
        this.monthLabel = 'MMMM';
        this.yearLabel = 'YYYY';
        this.weekNumbers = 'w';
        /**
         * Shows 'today' button
         */
        this.showTodayButton = false;
        /**
         * Shows clear button
         */
        this.showClearButton = false;
        /**
         * Positioning of 'today' button
         */
        this.todayPosition = 'center';
        /**
         * Positioning of 'clear' button
         */
        this.clearPosition = 'right';
    }
    BsDatepickerConfig.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ BsDatepickerConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function BsDatepickerConfig_Factory() { return new BsDatepickerConfig(); }, token: BsDatepickerConfig, providedIn: "root" });
    return BsDatepickerConfig;
}());
export { BsDatepickerConfig };
if (false) {
    /**
     * sets use adaptive position
     * @type {?}
     */
    BsDatepickerConfig.prototype.adaptivePosition;
    /**
     * sets use UTC date time format
     * @type {?}
     */
    BsDatepickerConfig.prototype.useUtc;
    /**
     * turn on/off animation
     * @type {?}
     */
    BsDatepickerConfig.prototype.isAnimated;
    /** @type {?} */
    BsDatepickerConfig.prototype.value;
    /** @type {?} */
    BsDatepickerConfig.prototype.isDisabled;
    /**
     * Default min date for all date/range pickers
     * @type {?}
     */
    BsDatepickerConfig.prototype.minDate;
    /**
     * Default max date for all date/range pickers
     * @type {?}
     */
    BsDatepickerConfig.prototype.maxDate;
    /**
     * Default date custom classes for all date/range pickers
     * @type {?}
     */
    BsDatepickerConfig.prototype.dateCustomClasses;
    /**
     * Default tooltip text for all date/range pickers
     * @type {?}
     */
    BsDatepickerConfig.prototype.dateTooltipTexts;
    /**
     * Disable specific days, e.g. [0,6] will disable all Saturdays and Sundays
     * @type {?}
     */
    BsDatepickerConfig.prototype.daysDisabled;
    /**
     * Disable specific dates
     * @type {?}
     */
    BsDatepickerConfig.prototype.datesDisabled;
    /**
     * Show one months for special cases (only for dateRangePicker)
     * 1. maxDate is equal to today's date
     * 2. minDate's month is equal to maxDate's month
     * @type {?}
     */
    BsDatepickerConfig.prototype.displayOneMonthRange;
    /**
     * Enable specific dates
     * @type {?}
     */
    BsDatepickerConfig.prototype.datesEnabled;
    /**
     * Makes dates from other months active
     * @type {?}
     */
    BsDatepickerConfig.prototype.selectFromOtherMonth;
    /**
     * Allows select first date of the week by click on week number
     * @type {?}
     */
    BsDatepickerConfig.prototype.selectWeek;
    /**
     * Allows select daterange as first and last day of week by click on week number (dateRangePicker only)
     * @type {?}
     */
    BsDatepickerConfig.prototype.selectWeekDateRange;
    /**
     * Shows previous and current month, instead of current and next (dateRangePicker only)
     * @type {?}
     */
    BsDatepickerConfig.prototype.showPreviousMonth;
    /**
     * Add class to current day
     * @type {?}
     */
    BsDatepickerConfig.prototype.customTodayClass;
    /**
     * Default mode for all date pickers
     * @type {?}
     */
    BsDatepickerConfig.prototype.minMode;
    /**
     * If true, returns focus to the datepicker / daterangepicker input after date selection
     * @type {?}
     */
    BsDatepickerConfig.prototype.returnFocusToInput;
    /**
     * CSS class which will be applied to datepicker container,
     * usually used to set color theme
     * @type {?}
     */
    BsDatepickerConfig.prototype.containerClass;
    /** @type {?} */
    BsDatepickerConfig.prototype.displayMonths;
    /**
     * Allows to hide week numbers in datepicker
     * @type {?}
     */
    BsDatepickerConfig.prototype.showWeekNumbers;
    /** @type {?} */
    BsDatepickerConfig.prototype.dateInputFormat;
    /** @type {?} */
    BsDatepickerConfig.prototype.rangeSeparator;
    /**
     * Date format for date range input field
     * @type {?}
     */
    BsDatepickerConfig.prototype.rangeInputFormat;
    /**
     * Predefined ranges
     * @type {?}
     */
    BsDatepickerConfig.prototype.ranges;
    /**
     * Max Date Range in days
     * @type {?}
     */
    BsDatepickerConfig.prototype.maxDateRange;
    /** @type {?} */
    BsDatepickerConfig.prototype.monthTitle;
    /** @type {?} */
    BsDatepickerConfig.prototype.yearTitle;
    /** @type {?} */
    BsDatepickerConfig.prototype.dayLabel;
    /** @type {?} */
    BsDatepickerConfig.prototype.monthLabel;
    /** @type {?} */
    BsDatepickerConfig.prototype.yearLabel;
    /** @type {?} */
    BsDatepickerConfig.prototype.weekNumbers;
    /**
     * Shows 'today' button
     * @type {?}
     */
    BsDatepickerConfig.prototype.showTodayButton;
    /**
     * Shows clear button
     * @type {?}
     */
    BsDatepickerConfig.prototype.showClearButton;
    /**
     * Positioning of 'today' button
     * @type {?}
     */
    BsDatepickerConfig.prototype.todayPosition;
    /**
     * Positioning of 'clear' button
     * @type {?}
     */
    BsDatepickerConfig.prototype.clearPosition;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci5jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYm9vdHN0cmFwL2RhdGVwaWNrZXIvIiwic291cmNlcyI6WyJicy1kYXRlcGlja2VyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBYzNDO0lBQUE7Ozs7UUFLRSxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7Ozs7UUFFekIsV0FBTSxHQUFHLEtBQUssQ0FBQzs7OztRQUVmLGVBQVUsR0FBRyxLQUFLLENBQUM7Ozs7UUFzRW5CLHVCQUFrQixHQUFHLEtBQUssQ0FBQzs7Ozs7UUFLM0IsbUJBQWMsR0FBRyxhQUFhLENBQUM7O1FBRy9CLGtCQUFhLEdBQUcsQ0FBQyxDQUFDOzs7O1FBSWxCLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBRXZCLG9CQUFlLEdBQUcsR0FBRyxDQUFDOztRQUV0QixtQkFBYyxHQUFHLEtBQUssQ0FBQzs7OztRQUl2QixxQkFBZ0IsR0FBRyxHQUFHLENBQUM7O1FBYXZCLGVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIsY0FBUyxHQUFHLE1BQU0sQ0FBQztRQUNuQixhQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ2YsZUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixjQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ25CLGdCQUFXLEdBQUcsR0FBRyxDQUFDOzs7O1FBS2xCLG9CQUFlLEdBQUcsS0FBSyxDQUFDOzs7O1FBS3hCLG9CQUFlLEdBQUcsS0FBSyxDQUFDOzs7O1FBS3hCLGtCQUFhLEdBQUcsUUFBUSxDQUFDOzs7O1FBS3pCLGtCQUFhLEdBQUcsT0FBTyxDQUFDO0tBQ3pCOztnQkExSUEsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OzZCQWhCRDtDQXdKQyxBQTFJRCxJQTBJQztTQXZJWSxrQkFBa0I7Ozs7OztJQUU3Qiw4Q0FBeUI7Ozs7O0lBRXpCLG9DQUFlOzs7OztJQUVmLHdDQUFtQjs7SUFDbkIsbUNBQXNCOztJQUN0Qix3Q0FBcUI7Ozs7O0lBSXJCLHFDQUFlOzs7OztJQUlmLHFDQUFlOzs7OztJQUlmLCtDQUFpRDs7Ozs7SUFJakQsOENBQStDOzs7OztJQUkvQywwQ0FBd0I7Ozs7O0lBSXhCLDJDQUF1Qjs7Ozs7OztJQU12QixrREFBK0I7Ozs7O0lBSS9CLDBDQUFzQjs7Ozs7SUFJdEIsa0RBQStCOzs7OztJQUsvQix3Q0FBcUI7Ozs7O0lBS3JCLGlEQUE4Qjs7Ozs7SUFLOUIsK0NBQTRCOzs7OztJQUs1Qiw4Q0FBMEI7Ozs7O0lBSzFCLHFDQUErQjs7Ozs7SUFLL0IsZ0RBQTJCOzs7Ozs7SUFLM0IsNENBQStCOztJQUcvQiwyQ0FBa0I7Ozs7O0lBSWxCLDZDQUF1Qjs7SUFFdkIsNkNBQXNCOztJQUV0Qiw0Q0FBdUI7Ozs7O0lBSXZCLDhDQUF1Qjs7Ozs7SUFLdkIsb0NBQXlCOzs7OztJQUt6QiwwQ0FBc0I7O0lBR3RCLHdDQUFvQjs7SUFDcEIsdUNBQW1COztJQUNuQixzQ0FBZTs7SUFDZix3Q0FBb0I7O0lBQ3BCLHVDQUFtQjs7SUFDbkIseUNBQWtCOzs7OztJQUtsQiw2Q0FBd0I7Ozs7O0lBS3hCLDZDQUF3Qjs7Ozs7SUFLeEIsMkNBQXlCOzs7OztJQUt6QiwyQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBEYXRlcGlja2VyUmVuZGVyT3B0aW9ucyxcbiAgQnNEYXRlcGlja2VyVmlld01vZGUsXG4gIERhdGVwaWNrZXJEYXRlQ3VzdG9tQ2xhc3NlcyxcbiAgRGF0ZXBpY2tlckRhdGVUb29sdGlwVGV4dFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBCc0N1c3RvbURhdGVzIH0gZnJvbSAnLi90aGVtZXMvYnMvYnMtY3VzdG9tLWRhdGVzLXZpZXcuY29tcG9uZW50JztcblxuXG4vKipcbiAqIEZvciBkYXRlIHJhbmdlIHBpY2tlciB0aGVyZSBhcmUgYEJzRGF0ZXJhbmdlcGlja2VyQ29uZmlnYCB3aGljaCBpbmhlcml0cyBhbGwgcHJvcGVydGllcyxcbiAqIGV4Y2VwdCBgZGlzcGxheU1vbnRoc2AsIGZvciByYW5nZSBwaWNrZXIgaXQgZGVmYXVsdCB0byBgMmBcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQnNEYXRlcGlja2VyQ29uZmlnIGltcGxlbWVudHMgRGF0ZXBpY2tlclJlbmRlck9wdGlvbnMge1xuICAvKiogc2V0cyB1c2UgYWRhcHRpdmUgcG9zaXRpb24gKi9cbiAgYWRhcHRpdmVQb3NpdGlvbiA9IGZhbHNlO1xuICAvKiogc2V0cyB1c2UgVVRDIGRhdGUgdGltZSBmb3JtYXQgKi9cbiAgdXNlVXRjID0gZmFsc2U7XG4gIC8qKiB0dXJuIG9uL29mZiBhbmltYXRpb24gKi9cbiAgaXNBbmltYXRlZCA9IGZhbHNlO1xuICB2YWx1ZT86IERhdGUgfCBEYXRlW107XG4gIGlzRGlzYWJsZWQ/OiBib29sZWFuO1xuICAvKipcbiAgICogRGVmYXVsdCBtaW4gZGF0ZSBmb3IgYWxsIGRhdGUvcmFuZ2UgcGlja2Vyc1xuICAgKi9cbiAgbWluRGF0ZT86IERhdGU7XG4gIC8qKlxuICAgKiBEZWZhdWx0IG1heCBkYXRlIGZvciBhbGwgZGF0ZS9yYW5nZSBwaWNrZXJzXG4gICAqL1xuICBtYXhEYXRlPzogRGF0ZTtcbiAgLyoqXG4gICAqIERlZmF1bHQgZGF0ZSBjdXN0b20gY2xhc3NlcyBmb3IgYWxsIGRhdGUvcmFuZ2UgcGlja2Vyc1xuICAgKi9cbiAgZGF0ZUN1c3RvbUNsYXNzZXM6IERhdGVwaWNrZXJEYXRlQ3VzdG9tQ2xhc3Nlc1tdO1xuICAvKipcbiAgICogRGVmYXVsdCB0b29sdGlwIHRleHQgZm9yIGFsbCBkYXRlL3JhbmdlIHBpY2tlcnNcbiAgICovXG4gIGRhdGVUb29sdGlwVGV4dHM/OiBEYXRlcGlja2VyRGF0ZVRvb2x0aXBUZXh0W107XG4gIC8qKlxuICAgKiBEaXNhYmxlIHNwZWNpZmljIGRheXMsIGUuZy4gWzAsNl0gd2lsbCBkaXNhYmxlIGFsbCBTYXR1cmRheXMgYW5kIFN1bmRheXNcbiAgICovXG4gIGRheXNEaXNhYmxlZD86IG51bWJlcltdO1xuICAvKipcbiAgICogRGlzYWJsZSBzcGVjaWZpYyBkYXRlc1xuICAgKi9cbiAgZGF0ZXNEaXNhYmxlZD86IERhdGVbXTtcbiAgLyoqXG4gICAqIFNob3cgb25lIG1vbnRocyBmb3Igc3BlY2lhbCBjYXNlcyAob25seSBmb3IgZGF0ZVJhbmdlUGlja2VyKVxuICAgKiAxLiBtYXhEYXRlIGlzIGVxdWFsIHRvIHRvZGF5J3MgZGF0ZVxuICAgKiAyLiBtaW5EYXRlJ3MgbW9udGggaXMgZXF1YWwgdG8gbWF4RGF0ZSdzIG1vbnRoXG4gICAqL1xuICBkaXNwbGF5T25lTW9udGhSYW5nZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBFbmFibGUgc3BlY2lmaWMgZGF0ZXNcbiAgICovXG4gIGRhdGVzRW5hYmxlZD86IERhdGVbXTtcbiAgLyoqXG4gICAqIE1ha2VzIGRhdGVzIGZyb20gb3RoZXIgbW9udGhzIGFjdGl2ZVxuICAgKi9cbiAgc2VsZWN0RnJvbU90aGVyTW9udGg/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBbGxvd3Mgc2VsZWN0IGZpcnN0IGRhdGUgb2YgdGhlIHdlZWsgYnkgY2xpY2sgb24gd2VlayBudW1iZXJcbiAgICovXG4gIHNlbGVjdFdlZWs/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBbGxvd3Mgc2VsZWN0IGRhdGVyYW5nZSBhcyBmaXJzdCBhbmQgbGFzdCBkYXkgb2Ygd2VlayBieSBjbGljayBvbiB3ZWVrIG51bWJlciAoZGF0ZVJhbmdlUGlja2VyIG9ubHkpXG4gICAqL1xuICBzZWxlY3RXZWVrRGF0ZVJhbmdlPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogU2hvd3MgcHJldmlvdXMgYW5kIGN1cnJlbnQgbW9udGgsIGluc3RlYWQgb2YgY3VycmVudCBhbmQgbmV4dCAoZGF0ZVJhbmdlUGlja2VyIG9ubHkpXG4gICAqL1xuICBzaG93UHJldmlvdXNNb250aD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEFkZCBjbGFzcyB0byBjdXJyZW50IGRheVxuICAgKi9cbiAgY3VzdG9tVG9kYXlDbGFzcz86IHN0cmluZztcblxuICAvKipcbiAgICogRGVmYXVsdCBtb2RlIGZvciBhbGwgZGF0ZSBwaWNrZXJzXG4gICAqL1xuICBtaW5Nb2RlPzogQnNEYXRlcGlja2VyVmlld01vZGU7XG5cbiAgLyoqXG4gICAqIElmIHRydWUsIHJldHVybnMgZm9jdXMgdG8gdGhlIGRhdGVwaWNrZXIgLyBkYXRlcmFuZ2VwaWNrZXIgaW5wdXQgYWZ0ZXIgZGF0ZSBzZWxlY3Rpb25cbiAgICovXG4gIHJldHVybkZvY3VzVG9JbnB1dCA9IGZhbHNlO1xuXG4gIC8qKiBDU1MgY2xhc3Mgd2hpY2ggd2lsbCBiZSBhcHBsaWVkIHRvIGRhdGVwaWNrZXIgY29udGFpbmVyLFxuICAgKiB1c3VhbGx5IHVzZWQgdG8gc2V0IGNvbG9yIHRoZW1lXG4gICAqL1xuICBjb250YWluZXJDbGFzcyA9ICd0aGVtZS1ncmVlbic7XG5cbiAgLy8gRGF0ZXBpY2tlclJlbmRlck9wdGlvbnNcbiAgZGlzcGxheU1vbnRocyA9IDE7XG4gIC8qKlxuICAgKiBBbGxvd3MgdG8gaGlkZSB3ZWVrIG51bWJlcnMgaW4gZGF0ZXBpY2tlclxuICAgKi9cbiAgc2hvd1dlZWtOdW1iZXJzID0gdHJ1ZTtcblxuICBkYXRlSW5wdXRGb3JtYXQgPSAnTCc7XG4gIC8vIHJhbmdlIHBpY2tlclxuICByYW5nZVNlcGFyYXRvciA9ICcgLSAnO1xuICAvKipcbiAgICogRGF0ZSBmb3JtYXQgZm9yIGRhdGUgcmFuZ2UgaW5wdXQgZmllbGRcbiAgICovXG4gIHJhbmdlSW5wdXRGb3JtYXQgPSAnTCc7XG5cbiAgLyoqXG4gICAqIFByZWRlZmluZWQgcmFuZ2VzXG4gICAqL1xuICByYW5nZXM/OiBCc0N1c3RvbURhdGVzW107XG5cbiAgLyoqXG4gICAqIE1heCBEYXRlIFJhbmdlIGluIGRheXNcbiAgICovXG4gIG1heERhdGVSYW5nZT86IG51bWJlcjtcblxuICAvLyBEYXRlcGlja2VyRm9ybWF0T3B0aW9uc1xuICBtb250aFRpdGxlID0gJ01NTU0nO1xuICB5ZWFyVGl0bGUgPSAnWVlZWSc7XG4gIGRheUxhYmVsID0gJ0QnO1xuICBtb250aExhYmVsID0gJ01NTU0nO1xuICB5ZWFyTGFiZWwgPSAnWVlZWSc7XG4gIHdlZWtOdW1iZXJzID0gJ3cnO1xuXG4gIC8qKlxuICAgKiBTaG93cyAndG9kYXknIGJ1dHRvblxuICAgKi9cbiAgc2hvd1RvZGF5QnV0dG9uID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFNob3dzIGNsZWFyIGJ1dHRvblxuICAgKi9cbiAgc2hvd0NsZWFyQnV0dG9uID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uaW5nIG9mICd0b2RheScgYnV0dG9uXG4gICAqL1xuICB0b2RheVBvc2l0aW9uID0gJ2NlbnRlcic7XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uaW5nIG9mICdjbGVhcicgYnV0dG9uXG4gICAqL1xuICBjbGVhclBvc2l0aW9uID0gJ3JpZ2h0Jztcbn1cbiJdfQ==