import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.matIconRegistry.addSvgIcon(
            'outline_circle_check',
            this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/outline-check-circle.svg')
        );
        this.matIconRegistry.addSvgIcon(
            'outline_circle',
            this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/outline-circle.svg')
        );
    }

    title = 'hikingTrails';
}
