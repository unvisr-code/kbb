'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Download,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Filter,
  FileText,
} from 'lucide-react';
import { formatPrice, cn } from '@/lib/utils';

// Mock settlement data
const summaryData = {
  totalRevenue: 4850000,
  totalDeposits: 1200000,
  platformFee: 120000,
  netSettlement: 1080000,
  completedBookings: 60,
  pendingSettlement: 280000,
};

const monthlyData = [
  { month: '2024-01', revenue: 3200000, deposits: 800000, fee: 80000, net: 720000 },
  { month: '2024-02', revenue: 4100000, deposits: 1025000, fee: 102500, net: 922500 },
  { month: '2024-03', revenue: 4850000, deposits: 1200000, fee: 120000, net: 1080000 },
];

const recentTransactions = [
  {
    id: 1,
    type: 'deposit',
    description: '예약금 입금',
    customer: '김서연',
    service: '프리미엄 젤 네일',
    amount: 20000,
    date: new Date('2024-03-15'),
  },
  {
    id: 2,
    type: 'settlement',
    description: '정산 완료',
    amount: 180000,
    date: new Date('2024-03-14'),
  },
  {
    id: 3,
    type: 'deposit',
    description: '예약금 입금',
    customer: '이지민',
    service: '네일 아트 풀세트',
    amount: 20000,
    date: new Date('2024-03-14'),
  },
  {
    id: 4,
    type: 'refund',
    description: '예약 취소 환불',
    customer: '박소영',
    amount: -20000,
    date: new Date('2024-03-13'),
  },
  {
    id: 5,
    type: 'deposit',
    description: '예약금 입금',
    customer: 'Sarah Kim',
    service: '베이직 젤 네일',
    amount: 20000,
    date: new Date('2024-03-13'),
  },
];

const formatMonth = (monthStr: string) => {
  const [year, month] = monthStr.split('-');
  return `${year}년 ${parseInt(month)}월`;
};

export default function SettlementPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-03');

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">정산</h1>
          <p className="text-neutral-500 mt-1">수익과 정산 내역을 확인하세요</p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white border border-neutral-200 rounded-xl focus:border-primary-400 outline-none"
          >
            {monthlyData.map((data) => (
              <option key={data.month} value={data.month}>
                {formatMonth(data.month)}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <Download className="w-4 h-4" />
            내보내기
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Total Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-neutral-100 p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-neutral-500">총 매출</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-neutral-900">
            {formatPrice(summaryData.totalRevenue)}
          </p>
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>12% 증가</span>
          </div>
        </motion.div>

        {/* Deposits Received */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-neutral-100 p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-neutral-500">예약금 수령</span>
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-neutral-900">
            {formatPrice(summaryData.totalDeposits)}
          </p>
          <p className="text-sm text-neutral-500 mt-2">
            {summaryData.completedBookings}건 완료
          </p>
        </motion.div>

        {/* Platform Fee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-neutral-100 p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-neutral-500">플랫폼 수수료</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-neutral-900">
            {formatPrice(summaryData.platformFee)}
          </p>
          <p className="text-sm text-neutral-500 mt-2">예약금의 10%</p>
        </motion.div>

        {/* Net Settlement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-br from-primary-500 to-rose-500 rounded-2xl p-5 text-white"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/80">순 정산액</span>
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold">{formatPrice(summaryData.netSettlement)}</p>
          <p className="text-sm text-white/80 mt-2">
            대기 중: {formatPrice(summaryData.pendingSettlement)}
          </p>
        </motion.div>
      </div>

      {/* Monthly Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-neutral-100 p-6 mb-8"
      >
        <h2 className="font-semibold text-neutral-900 mb-6">월별 추이</h2>
        <div className="grid grid-cols-3 gap-4">
          {monthlyData.map((data, index) => (
            <div key={data.month} className="text-center">
              <div className="h-32 bg-neutral-50 rounded-xl relative overflow-hidden mb-3">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-500 to-primary-400 rounded-b-xl transition-all"
                  style={{
                    height: `${(data.net / 1200000) * 100}%`,
                  }}
                />
              </div>
              <p className="text-sm text-neutral-500">{formatMonth(data.month)}</p>
              <p className="font-semibold text-neutral-900">{formatPrice(data.net)}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-2xl border border-neutral-100 overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <h2 className="font-semibold text-neutral-900">최근 거래 내역</h2>
          <button className="text-sm text-primary-500 font-medium hover:text-primary-600">
            전체 보기
          </button>
        </div>

        <div className="divide-y divide-neutral-50">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors"
            >
              {/* Icon */}
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  transaction.type === 'deposit' && 'bg-green-50',
                  transaction.type === 'settlement' && 'bg-blue-50',
                  transaction.type === 'refund' && 'bg-red-50'
                )}
              >
                {transaction.type === 'deposit' && (
                  <ArrowDownRight className="w-5 h-5 text-green-500" />
                )}
                {transaction.type === 'settlement' && (
                  <ArrowUpRight className="w-5 h-5 text-blue-500" />
                )}
                {transaction.type === 'refund' && (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-neutral-900">{transaction.description}</p>
                <p className="text-sm text-neutral-500 truncate">
                  {transaction.customer && `${transaction.customer}`}
                  {transaction.service && ` • ${transaction.service}`}
                </p>
              </div>

              {/* Amount & Date */}
              <div className="text-right">
                <p
                  className={cn(
                    'font-semibold',
                    transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {transaction.amount >= 0 ? '+' : ''}
                  {formatPrice(transaction.amount)}
                </p>
                <p className="text-xs text-neutral-400">
                  {transaction.date.toLocaleDateString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bank Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-neutral-900 rounded-2xl p-6 mt-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-neutral-400 text-sm">정산 계좌</p>
            <p className="text-white font-semibold mt-1">신한은행 110-***-***890</p>
            <p className="text-neutral-400 text-sm mt-1">예금주: 김*영</p>
          </div>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-colors">
            계좌 변경
          </button>
        </div>

        <div className="border-t border-white/10 mt-4 pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-400">다음 정산 예정일</span>
            <span className="text-white font-medium">2024년 3월 20일 (수)</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
