import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressBarModule,
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatInputModule,
        MatProgressBarModule,
    ],
    exports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatInputModule,
        MatProgressBarModule,
    ],
})

export class MaterialModule { }
