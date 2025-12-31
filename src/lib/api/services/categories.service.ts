/**
 * Categories Service
 * Service untuk mengelola categories data
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { CategoriesResponse, Category } from '../types';

class CategoriesService {
  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get<CategoriesResponse>(API_ENDPOINTS.categories.list);
    return response.data.data;
  }
}

// Export singleton instance
export const categoriesService = new CategoriesService();
