import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Owner, Customer } from '@/types';

interface AuthState {
  // Owner auth
  owner: Owner | null;
  isOwnerAuthenticated: boolean;

  // Customer auth (optional)
  customer: Customer | null;
  isCustomerAuthenticated: boolean;

  // Actions
  setOwner: (owner: Owner | null) => void;
  setCustomer: (customer: Customer | null) => void;
  logoutOwner: () => void;
  logoutCustomer: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      owner: null,
      isOwnerAuthenticated: false,
      customer: null,
      isCustomerAuthenticated: false,

      setOwner: (owner) =>
        set({
          owner,
          isOwnerAuthenticated: owner !== null,
        }),

      setCustomer: (customer) =>
        set({
          customer,
          isCustomerAuthenticated: customer !== null,
        }),

      logoutOwner: () =>
        set({
          owner: null,
          isOwnerAuthenticated: false,
        }),

      logoutCustomer: () =>
        set({
          customer: null,
          isCustomerAuthenticated: false,
        }),

      clearAuth: () =>
        set({
          owner: null,
          isOwnerAuthenticated: false,
          customer: null,
          isCustomerAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Mock owner for development
export const mockOwner: Owner = {
  id: 'owner-001',
  email: 'owner@bloom.com',
  name: '김민지',
  phone: '010-1234-5678',
  salonId: 'salon-001',
  provider: 'kakao',
  providerId: 'kakao-123',
  isOnboarded: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-15T00:00:00Z',
};
