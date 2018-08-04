import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class SharedService {
    @Output() change: EventEmitter<boolean> = new EventEmitter();

    toggle(active) {
        this.change.emit(active);
    }
}
