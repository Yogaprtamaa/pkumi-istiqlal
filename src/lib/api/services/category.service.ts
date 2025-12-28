/**
 * Category Service
 * Service untuk mengelola categories
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { CategoriesResponse, Category } from '../types';

class CategoryService {
  /**
   * Get all categories
   * @param page - Optional page number for pagination
   */
  async getCategories(page?: number): Promise<Category[]> {
    const url = page
      ? `${API_ENDPOINTS.categories.list}?page=${page}`
      : API_ENDPOINTS.categories.list;

    const response = await apiClient.get<CategoriesResponse>(url);
    return response.data.data;
  }

  /**
   * Get categories response with pagination metadata
   * @param page - Optional page number for pagination
   */
  async getCategoriesWithMeta(page?: number): Promise<CategoriesResponse> {
    const url = page
      ? `${API_ENDPOINTS.categories.list}?page=${page}`
      : API_ENDPOINTS.categories.list;

    return apiClient.get<CategoriesResponse>(url);
  }
}

// Export singleton instance
export const categoryService = new CategoryService();
