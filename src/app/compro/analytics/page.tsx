/**
 * Analytics Page
 * Platform analytics and statistics
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, TrendingUp, Users, FileText, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
  const metrics = [
    {
      label: 'Page Views',
      value: '12,543',
      trend: '+8.2%',
      icon: Eye,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Active Users',
      value: '1,234',
      trend: '+12.5%',
      icon: Users,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      label: 'Content Published',
      value: '142',
      trend: '+5.3%',
      icon: FileText,
      color: 'from-amber-500 to-amber-600',
    },
    {
      label: 'Growth Rate',
      value: '23.8%',
      trend: '+3.2%',
      icon: TrendingUp,
      color: 'from-slate-500 to-slate-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-12">
          <Link
            href="/compro/dashboard"
            className="p-2 hover:bg-slate-200 rounded-lg transition"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
            <p className="text-slate-600">Platform statistics and usage insights</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">
                      {metric.label}
                    </p>
                    <p className="text-3xl font-bold text-slate-900">
                      {metric.value}
                    </p>
                  </div>
                  <div className={`bg-gradient-to-br ${metric.color} p-3 rounded-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-xs font-semibold text-emerald-600">
                  {metric.trend} this month
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
        >
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">Monthly Views</h3>
            <div className="h-64 bg-slate-50 rounded flex items-center justify-center">
              <p className="text-slate-500">Chart will be rendered here</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">Content Distribution</h3>
            <div className="h-64 bg-slate-50 rounded flex items-center justify-center">
              <p className="text-slate-500">Chart will be rendered here</p>
            </div>
          </div>
        </motion.div>

        {/* Development Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <p className="text-blue-900">
            ℹ️ <strong>Development Notice:</strong> Analytics charts and detailed reports will be 
            implemented using charting libraries (e.g., Chart.js, Recharts). Currently showing mock layouts.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
