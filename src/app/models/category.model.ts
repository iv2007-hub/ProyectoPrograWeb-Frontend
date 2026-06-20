export interface CategoryResponseDto {
  id: string;
  name: string;
  isActive: boolean;
  activeItemCount: number;
}

// Mapea a categorycreateDTo
export interface CategoryCreateDto {
  name: string;
}

// Mapea a categoryupdateDTo
export interface CategoryUpdateDto {
  name: string;
}
