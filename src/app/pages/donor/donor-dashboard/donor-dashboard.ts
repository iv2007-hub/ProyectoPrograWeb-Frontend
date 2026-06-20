import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationService } from '../../../services/donation';
import { AuthService } from '../../../services/auth.service';
import { DonationPost } from '../../../models/donation-post.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreatePostDialogComponent } from '../../../shared/create-post-dialog/create-post-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-donor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './donor-dashboard.html',
  styleUrl: './donor-dashboard.css',
})
export class DonorDashboard implements OnInit {
  myDonations: DonationPost[] = [];
  isLoading = true;
  errorMessage = '';
  requestsByPost: { [postId: string]: any[] } = {};

  constructor(
    private donationService: DonationService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.donationService.getMyDonations().subscribe({
      next: (data) => {
        this.myDonations = data;
        this.isLoading = false;
        data.forEach((post) => {
          this.donationService.getRequestsByPost(post.id).subscribe({
            next: (requests) => {
              this.requestsByPost[post.id] = requests;
              this.cdr.detectChanges();
            },
          });
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar las donaciones';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onAceptarSolicitud(postId: string, requestId: string): void {
    this.donationService.reservePost(postId, requestId).subscribe({
      next: () => {
        alert('Solicitud aceptada y artículo reservado!');
        this.ngOnInit();
      },
      error: (err) => {
        alert('Error al aceptar la solicitud');
      },
    });
  }
  onCrearPublicacion(): void {
    const dialogRef = this.dialog.open(CreatePostDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  onEliminarPublicacion(postId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Estás seguro que deseas eliminar esta publicación?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.donationService.deletePost(postId).subscribe({
          next: () => {
            this.ngOnInit();
          },
          error: (err) => {
            alert('Error al eliminar la publicación');
          },
        });
      }
    });
  }

  onEditarPublicacion(post: DonationPost): void {
    const dialogRef = this.dialog.open(CreatePostDialogComponent, {
      width: '500px',
      data: post,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
  onCoordinarEntrega(postId: string): void {
    const fecha = prompt('Fecha de entrega (YYYY-MM-DD):');
    const lugar = prompt('Lugar de entrega:');

    if (!fecha || !lugar) return;

    this.donationService.scheduleDelivery(postId, {
      scheduledDate: `${fecha}T10:00:00Z`,
      scheduledLocation: lugar
    }).subscribe({
      next: () => {
        this.dialog.open(ConfirmDialogComponent, {
          data: { message: 'Entrega coordinada correctamente!' }
        });
      },
      error: () => {
        alert('Error al coordinar la entrega');
      }
    });
  }

  onConfirmarEntrega(postId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Confirmas que entregaste el artículo?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.donationService.confirmDelivery(postId).subscribe({
          next: () => {
            this.dialog.open(ConfirmDialogComponent, {
              data: { message: 'Entrega confirmada!' }
            });
            this.ngOnInit();
          },
          error: () => alert('Error al confirmar la entrega')
        });
      }
    });
  }

}
