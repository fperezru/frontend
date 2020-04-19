import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  private success = ['snackbar-ok'];
  private error = ['snackbar-no'];
  constructor(private snackbar: MatSnackBar) { }

  notificationSnackbar(text: string) {
    this.snackbar.open(text, '', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  successSnackbar(text: string) {
    this.snackbar.open(text, '', {
      duration: 3000,
      panelClass: this.success,
    });
  }

  errorSnackbar(text: string) {
    this.snackbar.open(text, '', {
      duration: 3000,
      panelClass: this.error,
    });
  }
}
