/**
 * Submissions Review Page
 * List of all submissions awaiting review/approval
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Eye, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function SubmissionsPage() {
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);

  const submissions = [
    {
      id: 1,
      title: 'Artikel tentang Digital Marketing Terkini',
      author: 'Budi Santoso',
      nim: '21102001',
      type: 'Rubrik',
      category: 'Teknologi',
      status: 'pending',
      date: '2024-01-20',
      preview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 2,
      title: 'Tips Efektif Belajar Programing untuk Pemula',
      author: 'Siti Nurhaliza',
      nim: '21102002',
      type: 'Khazanah',
      category: 'Edukasi',
      status: 'pending',
      date: '2024-01-19',
      preview: 'Belajar programming bisa menjadi mudah jika kita mengikuti langkah-langkah...',
    },
    {
      id: 3,
      title: 'Pengalaman Magang di Startup Indonesia',
      author: 'Ahmad Rizki',
      nim: '21102003',
      type: 'Rubrik',
      category: 'Karir',
      status: 'pending',
      date: '2024-01-18',
      preview: 'Pengalaman saya magang di startup lokal selama 3 bulan sangat berharga...',
    },
    {
      id: 4,
      title: 'Metodologi Penelitian Kualitatif',
      author: 'Dr. Suhartono',
      nim: '19990001',
      type: 'Khazanah',
      category: 'Penelitian',
      status: 'pending',
      date: '2024-01-17',
      preview: 'Penelitian kualitatif merupakan salah satu metodologi yang penting dalam...',
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
            <h1 className="text-3xl font-bold text-slate-900">Review Submissions</h1>
            <p className="text-slate-600">{submissions.length} submissions pending review</p>
          </div>
        </div>

        {/* Submissions Grid */}
        <div className="space-y-4">
          {submissions.map((submission, index) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Content */}
                <div className="md:col-span-2">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">
                        {submission.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        by {submission.author} ({submission.nim})
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {submission.preview}
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded">
                      {submission.type}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded">
                      {submission.category}
                    </span>
                    <span className="text-xs text-slate-500">{submission.date}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setSelectedSubmission(submission.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg font-medium transition">
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition">
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <p className="text-blue-900">
            ℹ️ <strong>Development Notice:</strong> Full approval/rejection functionality with comments 
            and history tracking will be implemented. Currently showing mock data.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
