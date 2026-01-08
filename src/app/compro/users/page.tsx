/**
 * Users Management Page
 * Manage user roles, permissions, and access
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Edit, Trash2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const users = [
    {
      id: 1,
      name: 'Budi Santoso',
      nim: '21102001',
      email: 'budi@pkumi.ac.id',
      role: 'contributor',
      status: 'active',
      joinDate: '2024-01-01',
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      nim: '21102002',
      email: 'siti@pkumi.ac.id',
      role: 'contributor',
      status: 'active',
      joinDate: '2024-01-05',
    },
    {
      id: 3,
      name: 'Ahmad Rizki',
      nim: '21102003',
      email: 'ahmad@pkumi.ac.id',
      role: 'reviewer',
      status: 'active',
      joinDate: '2023-12-15',
    },
    {
      id: 4,
      name: 'Dr. Suhartono',
      nim: '19990001',
      email: 'suhartono@pkumi.ac.id',
      role: 'admin',
      status: 'active',
      joinDate: '2023-01-01',
    },
  ];

  const roleColors: Record<string, string> = {
    guest: 'bg-slate-100 text-slate-700',
    user: 'bg-blue-100 text-blue-700',
    contributor: 'bg-emerald-100 text-emerald-700',
    reviewer: 'bg-amber-100 text-amber-700',
    admin: 'bg-red-100 text-red-700',
  };

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
            <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
            <p className="text-slate-600">{users.length} total users</p>
          </div>
        </div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Email</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Role</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Join Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.nim}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{user.email}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          roleColors[user.role] || roleColors.user
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{user.joinDate}</td>
                    <td className="py-4 px-6 space-x-2">
                      <button className="p-2 hover:bg-slate-200 rounded transition inline-block">
                        <Edit className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded transition inline-block">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Development Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <p className="text-blue-900">
            ℹ️ <strong>Development Notice:</strong> User management features including role assignment, 
            permission control, and user deletion will be implemented. Currently showing mock data.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
