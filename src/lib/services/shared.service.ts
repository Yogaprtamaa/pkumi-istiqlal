/**
 * Shared Services Layer
 * Common data access functions for both Portal and Compro ecosystems
 */

import { authService } from '@/lib/api';
import { ECOSYSTEM_CONFIG } from '@/lib/ecosystem-config';

// ============= SUBMISSION SERVICES =============

export interface SubmissionItem {
  id: number;
  title: string;
  author: string;
  email: string;
  type: 'rubrik' | 'khazanah';
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  content: string;
}

export const submissionService = {
  /**
   * Get all submissions (admin only)
   */
  async getAll(ecosystem: string): Promise<SubmissionItem[]> {
    try {
      const response = await fetch(
        `${ECOSYSTEM_CONFIG[ecosystem as keyof typeof ECOSYSTEM_CONFIG]?.apiEndpoint || ''}/submissions`,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return response.json();
    } catch (error) {
      console.error('Error fetching submissions:', error);
      return [];
    }
  },

  /**
   * Get pending submissions
   */
  async getPending(ecosystem: string): Promise<SubmissionItem[]> {
    try {
      const response = await fetch(
        `${ECOSYSTEM_CONFIG[ecosystem as keyof typeof ECOSYSTEM_CONFIG]?.apiEndpoint || ''}/submissions?status=pending`,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return response.json();
    } catch (error) {
      console.error('Error fetching pending submissions:', error);
      return [];
    }
  },

  /**
   * Approve submission
   */
  async approve(submissionId: number, ecosystem: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${ECOSYSTEM_CONFIG[ecosystem as keyof typeof ECOSYSTEM_CONFIG]?.apiEndpoint || ''}/submissions/${submissionId}/approve`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.ok;
    } catch (error) {
      console.error('Error approving submission:', error);
      return false;
    }
  },

  /**
   * Reject submission
   */
  async reject(submissionId: number, reason: string, ecosystem: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${ECOSYSTEM_CONFIG[ecosystem as keyof typeof ECOSYSTEM_CONFIG]?.apiEndpoint || ''}/submissions/${submissionId}/reject`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reason }),
        }
      );
      return response.ok;
    } catch (error) {
      console.error('Error rejecting submission:', error);
      return false;
    }
  },
};

// ============= USER SERVICES =============

export interface UserItem {
  id: number;
  name: string;
  email: string;
  nim: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
}

export const userService = {
  /**
   * Get all users (admin only)
   */
  async getAll(ecosystem: string): Promise<UserItem[]> {
    try {
      const response = await fetch(
        `${ECOSYSTEM_CONFIG[ecosystem as keyof typeof ECOSYSTEM_CONFIG]?.apiEndpoint || ''}/users`,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  /**
   * Update user role
   */
  async updateRole(userId: number, role: string, ecosystem: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${ECOSYSTEM_CONFIG[ecosystem as keyof typeof ECOSYSTEM_CONFIG]?.apiEndpoint || ''}/users/${userId}/role`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role }),
        }
      );
      return response.ok;
    } catch (error) {
      console.error('Error updating user role:', error);
      return false;
    }
  },

  /**
   * Suspend user
   */
  async suspend(userId: number, ecosystem: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${ECOSYSTEM_CONFIG[ecosystem as keyof typeof ECOSYSTEM_CONFIG]?.apiEndpoint || ''}/users/${userId}/suspend`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return response.ok;
    } catch (error) {
      console.error('Error suspending user:', error);
      return false;
    }
  },
};

// ============= ANALYTICS SERVICES =============

export interface AnalyticsData {
  pageViews: number;
  activeUsers: number;
  contentPublished: number;
  growthRate: number;
  monthlyViews: number[];
  contentDistribution: Record<string, number>;
}

export const analyticsService = {
  /**
   * Get overall analytics
   */
  async getOverall(ecosystem: string): Promise<AnalyticsData> {
    try {
      const response = await fetch(
        `${ECOSYSTEM_CONFIG[ecosystem as keyof typeof ECOSYSTEM_CONFIG]?.apiEndpoint || ''}/analytics`,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return response.json();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return {
        pageViews: 0,
        activeUsers: 0,
        contentPublished: 0,
        growthRate: 0,
        monthlyViews: [],
        contentDistribution: {},
      };
    }
  },

  /**
   * Get analytics for specific period
   */
  async getByPeriod(
    ecosystem: string,
    startDate: string,
    endDate: string
  ): Promise<AnalyticsData> {
    try {
      const response = await fetch(
        `${ECOSYSTEM_CONFIG[ecosystem as keyof typeof ECOSYSTEM_CONFIG]?.apiEndpoint || ''}/analytics?start=${startDate}&end=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return response.json();
    } catch (error) {
      console.error('Error fetching period analytics:', error);
      return {
        pageViews: 0,
        activeUsers: 0,
        contentPublished: 0,
        growthRate: 0,
        monthlyViews: [],
        contentDistribution: {},
      };
    }
  },
};

// ============= CONTENT SERVICES =============

export interface ContentItem {
  id: number;
  title: string;
  slug: string;
  author: string;
  type: 'rubrik' | 'khazanah';
  category: string;
  status: 'published' | 'draft' | 'archived';
  views: number;
  likes: number;
  createdAt: string;
  publishedAt?: string;
}

export const contentService = {
  /**
   * Get published content
   */
  async getPublished(ecosystem: string, type?: string): Promise<ContentItem[]> {
    try {
      const query = type ? `?type=${type}` : '';
      const response = await fetch(
        `${ECOSYSTEM_CONFIG[ecosystem as keyof typeof ECOSYSTEM_CONFIG]?.apiEndpoint || ''}/content/published${query}`,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return response.json();
    } catch (error) {
      console.error('Error fetching published content:', error);
      return [];
    }
  },

  /**
   * Get user's drafts
   */
  async getUserDrafts(ecosystem: string, userId: number): Promise<ContentItem[]> {
    try {
      const response = await fetch(
        `${ECOSYSTEM_CONFIG[ecosystem as keyof typeof ECOSYSTEM_CONFIG]?.apiEndpoint || ''}/content/drafts/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return response.json();
    } catch (error) {
      console.error('Error fetching user drafts:', error);
      return [];
    }
  },

  /**
   * Get trending content
   */
  async getTrending(ecosystem: string, limit = 5): Promise<ContentItem[]> {
    try {
      const response = await fetch(
        `${ECOSYSTEM_CONFIG[ecosystem as keyof typeof ECOSYSTEM_CONFIG]?.apiEndpoint || ''}/content/trending?limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      return response.json();
    } catch (error) {
      console.error('Error fetching trending content:', error);
      return [];
    }
  },
};
