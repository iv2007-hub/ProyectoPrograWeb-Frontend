import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DonationService } from '../../../services/donation';
import { DonationPost } from '../../../models/donation-post.model';
import { AuthService } from '../../../services/auth.service';
import { Category } from '../../../models/category.model';
import { DonationRequest } from '../../../models/donation-request.model';
import { Notification } from '../../../models/notification.model';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog';
import { ItemDetailDialogComponent } from '../../../shared/item-detail-dialog/item-detail-dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { Router } from '@angular/router';


@Component({
  selector: 'app-receiver-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    NgClass,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatBadgeModule,
  ],
  templateUrl: './receiver-dashboard.html',
  styleUrl: './receiver-dashboard.css',
})
export class ReceiverDashboard implements OnInit {
  donations: DonationPost[] = [];
  isLoading = true;
  errorMessage = '';
  categories: Category[] = [];
  myRequests: DonationRequest[] = [];
  notifications: Notification[] = [];
  selectedCategory: string = '';
  selectedZone: string = '';
  filteredDonations: DonationPost[] = [];
  hasUnreadNotifications = false;
  postNames: { [key: string]: string } = {};

  constructor(
    private donationService: DonationService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  getCategoryName(categoryId: string): string {
    const category = this.categories.find((c) => c.id === categoryId || c.name === categoryId);
    return category ? category.name : categoryId;
  }

  hasSolicited(postId: string): boolean {
    return this.myRequests.some((r) => r.postId === postId && r.status === 'pendiente');
  }

  applyFilters(): void {
    this.filteredDonations = this.donations.filter((d) => {
      const matchCategory = this.selectedCategory ? d.categoryName === this.selectedCategory : true;
      const matchZone = this.selectedZone
        ? d.zone.toLowerCase().includes(this.selectedZone.toLowerCase())
        : true;
      return matchCategory && matchZone;
    });
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.donationService.getActiveDonations().subscribe({
      next: (data) => {
        this.donations = data;
        this.filteredDonations = data;
        this.isLoading = false;
        // Extraer categorías únicas de las donaciones
        const uniqueCategories = [...new Set(data.map((d) => d.categoryName))];
        this.categories = uniqueCategories.map((name) => ({
          id: name,
          name,
          isActive: true,
          activeItemCount: 0,
        }));
        this.applyFilters();
        this.cdr.detectChanges();
      },
    });

    this.donationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        console.log('Notificaciones:', data);
        this.hasUnreadNotifications = data.some((n) => !n.isRead);
        this.cdr.detectChanges();
      },
    });

    this.donationService.getMyRequests().subscribe({
      next: (data) => {
        this.myRequests = data;
        data.forEach((request) => {
          this.donationService.getPostById(request.postId).subscribe({
            next: (post) => {
              this.postNames[request.postId] = post.itemName;
              this.cdr.detectChanges();
            },
          });
        });
        this.cdr.detectChanges();
      },
    });
  }

  onSolicitar(postId: string): void {
    const receiverId = this.authService.getUserId();
    if (!receiverId) return;

    this.donationService.createRequest(postId, receiverId).subscribe({
      next: () => {
        this.dialog.open(ConfirmDialogComponent, {
          data: { message: 'Solicitud enviada exitosamente!' },
        });
      },
      error: (err) => {
        this.dialog.open(ConfirmDialogComponent, {
          data: { message: 'Ya tienes una solicitud activa para este artículo.' },
        });
      },
    });
  }

  onConfirmarRecepcion(requestId: string): void {
    this.donationService.confirmReception(requestId).subscribe({
      next: () => {
        this.dialog.open(ConfirmDialogComponent, {
          data: { message: 'Recepción confirmada correctamente!' },
        });
      },
      error: (err) => {
        this.dialog.open(ConfirmDialogComponent, {
          data: { message: 'Error al confirmar recepción.' },
        });
      },
    });
  }
  onVerDetalle(item: DonationPost): void {
    this.dialog.open(ItemDetailDialogComponent, {
      data: item,
      width: '400px',
    });
  }
  onNotificationsTabOpen(): void {
    this.hasUnreadNotifications = false;
  }

  onTabChange(event: any): void {
    if (event.index === 2) {
      this.onNotificationsTabOpen();
    }
  }
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
