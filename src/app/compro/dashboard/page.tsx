/**
 * Compro Dashboard
 * Main admin dashboard dengan overview statistik dan quick actions
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  FileText, 
  Users, 
  CheckCircle, 
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEcosystem } from '@/hooks/useEcosystem';

export default function ComproDashboard() {
  const { user } = useAuth();
  const { currentEcosystem } = useEcosystem();

  const stats = [
    {
      label: 'Total Submissions',
      value: '24',
      icon: FileText,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      trend: '+12%',
    },
    {
      label: 'Pending Review',
      value: '8',
      icon: AlertCircle,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      trend: '+3',
    },
    {
      label: 'Approved',
      value: '14',
      icon: CheckCircle,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      trend: '+5',
    },
    {
      label: 'Total Users',
      value: '42',
      icon: Users,
      color: 'from-slate-500 to-slate-600',
      bgColor: 'bg-slate-50',
      trend: '+8',
    },
  ];

  const recentSubmissions = [
    {
      id: 1,
      title: 'Artikel tentang Digital Marketing',
      author: 'Budi Santoso',
      type: 'Rubrik',
      status: 'pending',
      date: '2024-01-20',
    },
    {
      id: 2,
      title: 'Tips Efektif Belajar Programing',
      author: 'Siti Nurhaliza',
      type: 'Khazanah',
      status: 'pending',
      date: '2024-01-19',
    },
    {
      id: 3,
      title: 'Pengalaman Magang di Startup',
      author: 'Ahmad Rizki',
      type: 'Rubrik',
      status: 'approved',
      date: '2024-01-18',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Kompro Dashboard
          </h1>
          <p className="text-slate-600">
            Welcome {user?.name}. Manage submissions and moderation here.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${stat.bgColor} rounded-lg p-6 border border-slate-200`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-xs font-semibold text-emerald-600">
                  {stat.trend} from last month
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Submissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-md border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Recent Submissions</h2>
            <a
              href="/compro/submissions"
              className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold"
            >
              View All →
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Author</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((submission) => (
                  <tr key={submission.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900">{submission.title}</td>
                    <td className="py-3 px-4 text-slate-600">{submission.author}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                        {submission.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          submission.status === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {submission.status === 'pending' ? 'Pending' : 'Approved'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{submission.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <a
            href="/compro/submissions"
            className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <FileText className="w-8 h-8 text-emerald-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">Review Submissions</h3>
            <p className="text-sm text-slate-600">8 pending submissions waiting for review</p>
          </a>

          <a
            href="/compro/users"
            className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <Users className="w-8 h-8 text-slate-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">Manage Users</h3>
            <p className="text-sm text-slate-600">42 total users, manage roles and permissions</p>
          </a>

          <a
            href="/compro/analytics"
            className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <TrendingUp className="w-8 h-8 text-amber-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">View Analytics</h3>
            <p className="text-sm text-slate-600">See usage statistics and trends</p>
          </a>
        </motion.div>

        {/* Development Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <p className="text-blue-900">
            ℹ️ <strong>Development Notice:</strong> This is a dashboard stub page. Full admin functionality 
            including moderation, user management, and analytics will be implemented in the next phase.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
