import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeliveryService } from '../../../services/delivery.service';
import { DeliveryRecord } from '../../../models/delivery.model';

@Component({
  selector: 'app-delivery-audit-log',
  imports: [CommonModule, FormsModule],
  templateUrl: './delivery-audit-log.html',
  styleUrl: './delivery-audit-log.css',
})
export class DeliveryAuditLog implements OnInit {
  records: DeliveryRecord[] = [];
  loading = true;
  errorMessage = '';

  // texto que el admin escribe para filtrar por usuario
  userIdFilter = '';

  constructor(
    private deliveryService: DeliveryService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  // Trae el log completo (sin filtro)
  loadAll(): void {
    this.userIdFilter = '';
    this.loading = true;
    this.errorMessage = '';

    this.deliveryService.getAll().subscribe({
      next: (data) => {
        this.records = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'No se pudo cargar el log de auditoría.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Trae solo el historial del userId que escribió el admin
  searchByUser(): void {
    if (!this.userIdFilter.trim()) {
      this.loadAll();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.deliveryService.getByUser(this.userIdFilter.trim()).subscribe({
      next: (data) => {
        this.records = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'No se pudo cargar el historial de ese usuario.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
