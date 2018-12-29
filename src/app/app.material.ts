import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSidenavModule,
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
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSidenavModule,
    ],
    exports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatInputModule,
        MatProgressBarModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSidenavModule
    ],
})

export class MaterialModule { }
