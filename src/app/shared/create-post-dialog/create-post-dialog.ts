import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DonationService } from '../../services/donation';
import { AuthService } from '../../services/auth.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-create-post-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './create-post-dialog.html',
  styleUrl: './create-post-dialog.css',
})
export class CreatePostDialogComponent implements OnInit {
  categories: Category[] = [];
  isLoading = false;
  isEditing = false;

  post = {
    itemName: '',
    categoryId: '',
    description: '',
    itemCondition: '',
    zone: '',
    photoUrls: [] as string[]
  };

  constructor(
    public dialogRef: MatDialogRef<CreatePostDialogComponent>,
    private donationService: DonationService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.donationService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        if (this.data) {
          this.isEditing = true;
          this.post = {
            itemName: this.data.itemName,
            categoryId: this.data.categoryId,
            description: this.data.description,
            itemCondition: this.data.itemCondition,
            zone: this.data.zone,
            photoUrls: []
          };
        }
      }
    });
  }

  onSubmit(): void {
    const donorId = this.authService.getUserId();

    const dto = {
      donorId,
      donorName: donorId,
      categoryId: this.post.categoryId,
      itemName: this.post.itemName,
      description: this.post.description,
      itemCondition: this.post.itemCondition,
      zone: this.post.zone,
      photoUrls: []
    };

    if (this.isEditing) {
      this.donationService.updatePost(this.data.id, dto).subscribe({
        next: () => this.dialogRef.close(true),
        error: () => alert('Error al actualizar la publicación')
      });
    } else {
      this.donationService.createPost(dto).subscribe({
        next: () => this.dialogRef.close(true),
        error: () => alert('Error al crear la publicación')
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
