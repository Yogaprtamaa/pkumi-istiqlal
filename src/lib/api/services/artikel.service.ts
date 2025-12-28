/**
 * Artikel Service
 * Service untuk mengelola artikel data
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { ArtikelResponse, ArtikelItem, ArtikelQueryParams } from '../types';

class ArtikelService {
  /**
   * Build query string from params
   */
  private buildQueryString(params: ArtikelQueryParams): string {
    const queryParams = new URLSearchParams();

    if (params.category_id !== undefined) {
      queryParams.append('category_id', params.category_id.toString());
    }
    if (params.per_page !== undefined) {
      queryParams.append('per_page', params.per_page.toString());
    }
    if (params.all !== undefined) {
      queryParams.append('all', params.all.toString());
    }
    if (params.search !== undefined && params.search.trim() !== '') {
      queryParams.append('search', params.search.trim());
    }
    if (params.page !== undefined) {
      queryParams.append('page', params.page.toString());
    }

    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * Get published artikel with optional filters
   */
  async getPublishedArtikel(params: ArtikelQueryParams = {}): Promise<ArtikelResponse> {
    const queryString = this.buildQueryString(params);
    const url = `${API_ENDPOINTS.artikel.published}${queryString}`;

    return apiClient.get<ArtikelResponse>(url);
  }

  /**
   * Get published artikel items only (without pagination meta)
   */
  async getPublishedArtikelItems(params: ArtikelQueryParams = {}): Promise<ArtikelItem[]> {
    const response = await this.getPublishedArtikel(params);
    return response.data.data;
  }
}

// Export singleton instance
export const artikelService = new ArtikelService();
