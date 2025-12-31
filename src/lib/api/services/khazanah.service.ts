/**
 * Khazanah Service
 * Service untuk mengelola khazanah data
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { KhazanahResponse, KhazanahItem, KhazanahQueryParams, KhazanahDetailResponse, KhazanahDetail } from '../types';

class KhazanahService {
  /**
   * Build query string from params
   */
  private buildQueryString(params: KhazanahQueryParams): string {
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
   * Get published khazanah with optional filters
   */
  async getPublishedKhazanah(params: KhazanahQueryParams = {}): Promise<KhazanahResponse> {
    const queryString = this.buildQueryString(params);
    const url = `${API_ENDPOINTS.khazanah.published}${queryString}`;

    return apiClient.get<KhazanahResponse>(url);
  }

  /**
   * Get published khazanah items only (without pagination meta)
   */
  async getPublishedKhazanahItems(params: KhazanahQueryParams = {}): Promise<KhazanahItem[]> {
    const response = await this.getPublishedKhazanah(params);
    return response.data.data;
  }

  /**
   * Get khazanah detail by slug
   * @param slug - Khazanah slug
   */
  async getKhazanahBySlug(slug: string): Promise<KhazanahDetail> {
    const url = `${API_ENDPOINTS.khazanah.detail}/${slug}`;
    const response = await apiClient.get<KhazanahDetailResponse>(url);

    // Extract content from trix_rich_texts array
    const khazanahData = response.data;
    if (khazanahData.trix_rich_texts && khazanahData.trix_rich_texts.length > 0) {
      const contentItem = khazanahData.trix_rich_texts.find(item => item.field === 'content');
      if (contentItem) {
        khazanahData.content = contentItem.content;
      }
    }

    return khazanahData;
  }

  /**
   * Get popular khazanah
   */
  async getPopularKhazanah(params: KhazanahQueryParams = {}): Promise<KhazanahItem[]> {
    const queryString = this.buildQueryString(params);
    const url = `${API_ENDPOINTS.khazanah.popular}${queryString}`;
    const response = await apiClient.get<KhazanahResponse>(url);
    return response.data.data;
  }

  /**
   * Get trending khazanah
   * Note: Trending endpoint returns array directly in data, not data.data
   */
  async getTrendingKhazanah(params: KhazanahQueryParams = {}): Promise<KhazanahItem[]> {
    const queryString = this.buildQueryString(params);
    const url = `${API_ENDPOINTS.khazanah.trending}${queryString}`;
    const response = await apiClient.get<{ code: number; status: string; message: string; data: KhazanahItem[] }>(url);
    return response.data; // Langsung return data, bukan data.data
  }

  /**
   * Create new khazanah
   * @param data - FormData containing khazanah data and optional thumbnail
   */
  async createKhazanah(data: FormData): Promise<KhazanahDetail> {
    const url = API_ENDPOINTS.khazanah.create;
    const response = await apiClient.post<KhazanahDetailResponse>(url, data, true);
    return response.data;
  }

  /**
   * Update khazanah
   * @param id - Khazanah ID
   * @param data - FormData containing updated khazanah data
   */
  async updateKhazanah(id: number, data: FormData): Promise<KhazanahDetail> {
    const url = `${API_ENDPOINTS.khazanah.update}/${id}`;
    const response = await apiClient.post<KhazanahDetailResponse>(url, data, true);
    return response.data;
  }

  /**
   * Delete khazanah
   * @param id - Khazanah ID
   */
  async deleteKhazanah(id: number): Promise<void> {
    const url = `${API_ENDPOINTS.khazanah.delete}/${id}`;
    await apiClient.delete(url, true);
  }
}

// Export singleton instance
export const khazanahService = new KhazanahService();
