# API Documentation

Struktur API yang modular dan mudah di-maintenance untuk Portal News.

## Struktur Folder

```
src/lib/api/
├── config.ts           # Konfigurasi API (base URL, endpoints)
├── client.ts           # HTTP client dengan error handling
├── types.ts            # Type definitions
├── services/
│   └── auth.service.ts # Auth service
└── index.ts            # Export semua modules
```

## Cara Penggunaan

### 1. Import Service

```typescript
import { authService } from '@/lib/api';
```

### 2. Login

```typescript
try {
  const response = await authService.login({
    nim: '20230001',
    password: 'password123'
  });

  console.log(response.student); // Data mahasiswa
  console.log(response.token);   // Token untuk auth
} catch (error) {
  if (error instanceof ApiError) {
    console.error(error.message);
    console.error(error.statusCode);
  }
}
```

### 3. Get Profile (dengan auth)

```typescript
try {
  const student = await authService.getProfile();
  console.log(student);
} catch (error) {
  console.error('Token invalid atau expired');
}
```

### 4. Change Password (dengan auth)

```typescript
try {
  await authService.changePassword({
    current_password: 'oldpassword123',
    password: 'newpassword123',
    password_confirmation: 'newpassword123'
  });
  console.log('Password changed successfully');
} catch (error) {
  console.error('Failed to change password');
}
```

### 5. Logout

```typescript
await authService.logout();
```

## Menambahkan Endpoint Baru

### 1. Tambahkan endpoint di `config.ts`

```typescript
export const API_ENDPOINTS = {
  auth: {
    login: '/api/student/login',
    logout: '/api/student/logout',
    profile: '/api/student/profile',
  },
  rubrik: {
    list: '/api/rubrik',
    detail: '/api/rubrik/:id',
    create: '/api/rubrik',
  },
} as const;
```

### 2. Buat types di `types.ts`

```typescript
export interface RubrikRequest {
  title: string;
  content: string;
  category: string;
}

export interface Rubrik {
  id: number;
  title: string;
  content: string;
  author: Student;
  created_at: string;
}
```

### 3. Buat service baru di `services/`

```typescript
// services/rubrik.service.ts
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Rubrik, RubrikRequest } from '../types';

class RubrikService {
  async getList(): Promise<Rubrik[]> {
    const response = await apiClient.get<{ data: Rubrik[] }>(
      API_ENDPOINTS.rubrik.list
    );
    return response.data;
  }

  async create(data: RubrikRequest): Promise<Rubrik> {
    const response = await apiClient.post<{ data: Rubrik }>(
      API_ENDPOINTS.rubrik.create,
      data,
      true // requires auth
    );
    return response.data;
  }
}

export const rubrikService = new RubrikService();
```

### 4. Export di `index.ts`

```typescript
export * from './services/rubrik.service';
```

## Error Handling

API client sudah dilengkapi dengan error handling:

```typescript
try {
  const data = await authService.login({ nim, password });
} catch (error) {
  if (error instanceof ApiError) {
    // API error
    console.log(error.message);    // Error message
    console.log(error.statusCode); // HTTP status code
    console.log(error.data);       // Response data
  } else {
    // Network error atau error lainnya
    console.error(error);
  }
}
```

## Features

- ✅ Automatic token management
- ✅ Request timeout (10 seconds default)
- ✅ Error handling dengan custom ApiError
- ✅ Type-safe dengan TypeScript
- ✅ Modular dan mudah di-extend
- ✅ Automatic Authorization header injection
