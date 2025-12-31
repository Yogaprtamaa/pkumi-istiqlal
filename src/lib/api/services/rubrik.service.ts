/**
 * Rubrik Service
 * Service untuk mengelola rubrik data
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { RubrikResponse, RubrikItem, RubrikQueryParams, RubrikDetailResponse, RubrikDetail } from '../types';

class RubrikService {
  /**
   * Build query string from params
   */
  private buildQueryString(params: RubrikQueryParams): string {
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
    // Only append search if it has at least 3 characters
    if (params.search !== undefined && params.search.trim().length >= 3) {
      queryParams.append('search', params.search.trim());
    }
    if (params.page !== undefined) {
      queryParams.append('page', params.page.toString());
    }

    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * Get published rubrik with optional filters
   * @param params - Query parameters including search (min 3 chars), category_id, per_page, all, page
   */
  async getPublishedRubrik(params: RubrikQueryParams = {}): Promise<RubrikResponse> {
    const queryString = this.buildQueryString(params);
    const url = `${API_ENDPOINTS.rubrik.published}${queryString}`;

    return apiClient.get<RubrikResponse>(url);
  }

  /**
   * Get published rubrik items only (without pagination meta)
   */
  async getPublishedRubrikItems(params: RubrikQueryParams = {}): Promise<RubrikItem[]> {
    const response = await this.getPublishedRubrik(params);
    return response.data.data;
  }

  /**
   * Get rubrik detail by slug
   * @param slug - Rubrik slug
   */
  async getRubrikBySlug(slug: string): Promise<RubrikDetail> {
    const url = `${API_ENDPOINTS.rubrik.detail}/${slug}`;
    const response = await apiClient.get<RubrikDetailResponse>(url);

    // Extract content from trix_rich_texts array
    const rubrikData = response.data;
    if (rubrikData.trix_rich_texts && rubrikData.trix_rich_texts.length > 0) {
      const contentItem = rubrikData.trix_rich_texts.find(item => item.field === 'content');
      if (contentItem) {
        rubrikData.content = contentItem.content;
      }
    }

    return rubrikData;
  }

  /**
   * Get popular rubrik
   */
  async getPopularRubrik(params: RubrikQueryParams = {}): Promise<RubrikItem[]> {
    const queryString = this.buildQueryString(params);
    const url = `${API_ENDPOINTS.rubrik.popular}${queryString}`;
    const response = await apiClient.get<RubrikResponse>(url);
    return response.data.data;
  }

  /**
   * Get trending rubrik
   * Note: Trending endpoint returns array directly in data, not data.data
   */
  async getTrendingRubrik(params: RubrikQueryParams = {}): Promise<RubrikItem[]> {
    const queryString = this.buildQueryString(params);
    const url = `${API_ENDPOINTS.rubrik.trending}${queryString}`;
    const response = await apiClient.get<{ code: number; status: string; message: string; data: RubrikItem[] }>(url);
    return response.data; // Langsung return data, bukan data.data
  }

  /**
   * Create new rubrik
   * @param data - FormData containing rubrik data and optional thumbnail
   */
  async createRubrik(data: FormData): Promise<RubrikDetail> {
    const url = API_ENDPOINTS.rubrik.create;
    const response = await apiClient.post<RubrikDetailResponse>(url, data, true);
    return response.data;
  }

  /**
   * Update rubrik
   * @param id - Rubrik ID
   * @param data - FormData containing updated rubrik data
   */
  async updateRubrik(id: number, data: FormData): Promise<RubrikDetail> {
    const url = `${API_ENDPOINTS.rubrik.update}/${id}`;
    const response = await apiClient.post<RubrikDetailResponse>(url, data, true);
    return response.data;
  }

  /**
   * Delete rubrik
   * @param slug - Rubrik slug
   */
  async deleteRubrik(slug: string): Promise<void> {
    const url = `${API_ENDPOINTS.rubrik.delete}/${slug}`;
    await apiClient.delete(url, true);
  }

  /**
   * Unpublish rubrik (change status from published to draft)
   * @param slugOrId - Rubrik slug or ID
   */
  async unpublishRubrik(slugOrId: string | number): Promise<RubrikDetail> {
    const url = `${API_ENDPOINTS.rubrik.unpublish}/${slugOrId}/unpublish`;
    const response = await apiClient.post<RubrikDetailResponse>(url, {}, true);
    return response.data;
  }

  /**
   * Archive rubrik
   * @param slugOrId - Rubrik slug or ID
   */
  async archiveRubrik(slugOrId: string | number): Promise<RubrikDetail> {
    const url = `${API_ENDPOINTS.rubrik.archive}/${slugOrId}/archive`;
    const response = await apiClient.post<RubrikDetailResponse>(url, {}, true);
    return response.data;
  }
}

// Export singleton instance
export const rubrikService = new RubrikService();
