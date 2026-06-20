import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DonationPost } from '../../models/donation-post.model';

@Component({
  selector: 'app-item-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.itemName }}</h2>
    <mat-dialog-content>
      <p><strong>Categoría:</strong> {{ data.categoryName }}</p>
      <p><strong>Descripción:</strong> {{ data.description }}</p>
      <p><strong>Estado del artículo:</strong> {{ data.itemCondition }}</p>
      <p><strong>Zona de entrega:</strong> {{ data.zone }}</p>
      <p><strong>Donante:</strong> {{ data.donorName }}</p>
      <p><strong>Publicado:</strong> {{ data.createdAt | date: 'dd/MM/yyyy' }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-raised-button color="primary" (click)="dialogRef.close()">Cerrar</button>
    </mat-dialog-actions>
  `,
})
export class ItemDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ItemDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DonationPost,
  ) {}
}
