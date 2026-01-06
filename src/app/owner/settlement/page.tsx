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
  Building2,
  Check,
} from 'lucide-react';
import { formatPrice, cn } from '@/lib/utils';
import { BottomSheet } from '@/components/ui/BottomSheet';

const BANKS = [
  '신한은행',
  '국민은행',
  '우리은행',
  '하나은행',
  '농협은행',
  '기업은행',
  '카카오뱅크',
  '토스뱅크',
];

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
  { month: '2025-10', revenue: 2800000, deposits: 700000, fee: 70000, net: 630000 },
  { month: '2025-11', revenue: 3100000, deposits: 775000, fee: 77500, net: 697500 },
  { month: '2025-12', revenue: 3500000, deposits: 875000, fee: 87500, net: 787500 },
  { month: '2026-01', revenue: 3200000, deposits: 800000, fee: 80000, net: 720000 },
  { month: '2026-02', revenue: 4100000, deposits: 1025000, fee: 102500, net: 922500 },
  { month: '2026-03', revenue: 4850000, deposits: 1200000, fee: 120000, net: 1080000 },
];

const recentTransactions = [
  {
    id: 1,
    type: 'deposit',
    description: '예약금 입금',
    customer: '김서연',
    service: '프리미엄 젤 네일',
    amount: 20000,
    date: new Date('2026-03-15'),
  },
  {
    id: 2,
    type: 'settlement',
    description: '정산 완료',
    amount: 180000,
    date: new Date('2026-03-14'),
  },
  {
    id: 3,
    type: 'deposit',
    description: '예약금 입금',
    customer: '이지민',
    service: '네일 아트 풀세트',
    amount: 20000,
    date: new Date('2026-03-14'),
  },
  {
    id: 4,
    type: 'refund',
    description: '예약 취소 환불',
    customer: '박소영',
    amount: -20000,
    date: new Date('2026-03-13'),
  },
  {
    id: 5,
    type: 'deposit',
    description: '예약금 입금',
    customer: 'Sarah Kim',
    service: '베이직 젤 네일',
    amount: 20000,
    date: new Date('2026-03-13'),
  },
];

const formatMonth = (monthStr: string) => {
  const [year, month] = monthStr.split('-');
  return `${year}년 ${parseInt(month)}월`;
};

export default function SettlementPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('2026-03');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [transactionFilter, setTransactionFilter] = useState<'all' | 'deposit' | 'settlement' | 'refund'>('all');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const filteredTransactions = transactionFilter === 'all'
    ? recentTransactions
    : recentTransactions.filter((t) => t.type === transactionFilter);
  const [bankAccount, setBankAccount] = useState({
    bank: '신한은행',
    accountNumber: '110-123-456890',
    accountHolder: '김소영',
  });
  const [formData, setFormData] = useState({
    bank: '',
    accountNumber: '',
    accountHolder: '',
  });

  const handleOpenAccountModal = () => {
    setFormData({
      bank: bankAccount.bank,
      accountNumber: bankAccount.accountNumber,
      accountHolder: bankAccount.accountHolder,
    });
    setIsAccountModalOpen(true);
  };

  const handleSaveAccount = () => {
    if (formData.bank && formData.accountNumber && formData.accountHolder) {
      setBankAccount(formData);
      setIsAccountModalOpen(false);
    }
  };

  const maskAccountNumber = (num: string) => {
    if (num.length <= 6) return num;
    return num.slice(0, 3) + '-***-***' + num.slice(-3);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4 mb-5 sm:mb-6 lg:mb-8">
        <div className="flex items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">정산</h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 sm:mt-1">수익과 정산 내역을 확인하세요</p>
          </div>

          {/* Period Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white border border-neutral-200 rounded-lg sm:rounded-xl focus:border-primary-400 outline-none text-xs sm:text-sm"
            >
              {monthlyData.map((data) => (
                <option key={data.month} value={data.month}>
                  {formatMonth(data.month)}
                </option>
              ))}
            </select>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors text-sm">
              <Download className="w-4 h-4" />
              내보내기
            </button>
            <button className="sm:hidden flex items-center justify-center w-9 h-9 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 mb-5 sm:mb-6 lg:mb-8">
        {/* Total Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ willChange: 'transform, opacity' }}
          className="bg-white rounded-xl sm:rounded-2xl border border-neutral-100 p-4 sm:p-5 lg:p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm text-neutral-500 font-medium">총 매출</span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900">
            {formatPrice(summaryData.totalRevenue)}
          </p>
          <div className="flex items-center gap-1.5 mt-2 sm:mt-3 text-green-600 text-xs sm:text-sm font-medium">
            <ArrowUpRight className="w-4 h-4" />
            <span>12% 증가</span>
          </div>
        </motion.div>

        {/* Deposits Received */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.03 }}
          style={{ willChange: 'transform, opacity' }}
          className="bg-white rounded-xl sm:rounded-2xl border border-neutral-100 p-4 sm:p-5 lg:p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm text-neutral-500 font-medium">예약금 수령</span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            </div>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900">
            {formatPrice(summaryData.totalDeposits)}
          </p>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 sm:mt-3">
            {summaryData.completedBookings}건 완료
          </p>
        </motion.div>

        {/* Platform Fee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          style={{ willChange: 'transform, opacity' }}
          className="bg-white rounded-xl sm:rounded-2xl border border-neutral-100 p-4 sm:p-5 lg:p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm text-neutral-500 font-medium">플랫폼 수수료</span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
            </div>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900">
            {formatPrice(summaryData.platformFee)}
          </p>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 sm:mt-3">예약금의 10%</p>
        </motion.div>

        {/* Net Settlement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.09 }}
          style={{ willChange: 'transform, opacity' }}
          className="bg-gradient-to-br from-primary-500 to-rose-500 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-white shadow-lg shadow-primary-500/20"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm text-white/90 font-medium">순 정산액</span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold">{formatPrice(summaryData.netSettlement)}</p>
          <p className="text-xs sm:text-sm text-white/80 mt-2 sm:mt-3">
            대기 중: {formatPrice(summaryData.pendingSettlement)}
          </p>
        </motion.div>
      </div>

      {/* Monthly Chart - Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        style={{ willChange: 'transform, opacity' }}
        className="bg-white rounded-xl sm:rounded-2xl border border-neutral-100 p-4 sm:p-6 mb-5 sm:mb-6 lg:mb-8 shadow-sm"
      >
        <h2 className="font-bold text-base sm:text-lg text-neutral-900 mb-4 sm:mb-5">월별 정산 추이</h2>

        {/* Line Chart */}
        <div className="relative">
          {(() => {
            const maxNet = Math.max(...monthlyData.map(d => d.net));
            const minNet = Math.min(...monthlyData.map(d => d.net));
            const range = maxNet - minNet || 1;
            const padding = range * 0.15;
            const chartHeight = 150;
            const marginXPercent = 4; // percentage

            const points = monthlyData.map((data, index) => {
              const xPercent = monthlyData.length === 1
                ? 50
                : marginXPercent + (index / (monthlyData.length - 1)) * (100 - marginXPercent * 2);
              const yPercent = 10 + ((maxNet - data.net + padding) / (range + padding * 2)) * 80;
              return { xPercent, yPercent, data, index };
            });

            return (
              <div className="relative">
                {/* Chart area */}
                <div className="flex gap-2 sm:gap-3">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-between text-[10px] sm:text-xs text-neutral-400 flex-shrink-0 h-[130px] sm:h-[150px] lg:h-[170px] py-2">
                    <span>{(maxNet / 10000).toFixed(0)}만</span>
                    <span>{((maxNet + minNet) / 2 / 10000).toFixed(0)}만</span>
                    <span>{(minNet / 10000).toFixed(0)}만</span>
                  </div>

                  {/* Chart Container */}
                  <div
                    className="flex-1 min-w-0 relative h-[130px] sm:h-[150px] lg:h-[170px]"
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    {/* Grid lines using CSS */}
                    <div className="absolute inset-0" style={{ left: `${marginXPercent}%`, right: `${marginXPercent}%` }}>
                      <div className="absolute w-full border-t border-neutral-100" style={{ top: '10%' }} />
                      <div className="absolute w-full border-t border-neutral-100" style={{ top: '50%' }} />
                      <div className="absolute w-full border-t border-neutral-100" style={{ top: '90%' }} />
                    </div>

                    {/* SVG for line and area - use viewBox for proper scaling */}
                    <svg
                      className="absolute inset-0 w-full h-full overflow-visible"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>

                      {/* Area fill */}
                      <polygon
                        points={`${points.map(p => `${p.xPercent},${p.yPercent}`).join(' ')} ${points[points.length - 1].xPercent},90 ${points[0].xPercent},90`}
                        fill="url(#areaGradient)"
                      />

                      {/* Line */}
                      <polyline
                        points={points.map(p => `${p.xPercent},${p.yPercent}`).join(' ')}
                        fill="none"
                        stroke="#ec4899"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>

                    {/* Data points using absolute positioned divs */}
                    {points.map((point) => (
                      <div
                        key={point.index}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{
                          left: `${point.xPercent}%`,
                          top: `${point.yPercent}%`,
                        }}
                        onMouseEnter={() => setHoveredPoint(point.index)}
                      >
                        <div
                          className={cn(
                            'rounded-full bg-white border-[3px] border-primary-500 transition-all duration-150',
                            hoveredPoint === point.index ? 'w-4 h-4' : 'w-3 h-3'
                          )}
                        />
                      </div>
                    ))}

                    {/* Tooltip */}
                    {hoveredPoint !== null && (
                      <div
                        className="absolute z-20 bg-neutral-900 text-white px-3 py-2 rounded-lg shadow-lg text-xs sm:text-sm pointer-events-none transform -translate-x-1/2 -translate-y-full whitespace-nowrap"
                        style={{
                          left: `${points[hoveredPoint].xPercent}%`,
                          top: `${points[hoveredPoint].yPercent - 8}%`,
                        }}
                      >
                        <p className="font-semibold">{formatMonth(points[hoveredPoint].data.month)}</p>
                        <div className="mt-1.5 space-y-0.5">
                          <p className="text-neutral-300">매출: {formatPrice(points[hoveredPoint].data.revenue)}</p>
                          <p className="text-neutral-300">예약금: {formatPrice(points[hoveredPoint].data.deposits)}</p>
                          <p className="text-neutral-300">수수료: -{formatPrice(points[hoveredPoint].data.fee)}</p>
                          <p className="text-pink-300 font-medium pt-1 border-t border-neutral-700">정산: {formatPrice(points[hoveredPoint].data.net)}</p>
                        </div>
                        {/* Arrow */}
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-neutral-900" />
                      </div>
                    )}
                  </div>
                </div>

                {/* X-axis labels */}
                <div className="flex justify-between mt-2 ml-8 sm:ml-10" style={{ paddingLeft: `${marginXPercent}%`, paddingRight: `${marginXPercent}%` }}>
                  {monthlyData.map((data) => (
                    <span key={data.month} className="text-[10px] sm:text-xs text-neutral-500">
                      {parseInt(data.month.split('-')[1])}월
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Monthly Summary Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mt-4 sm:mt-5 pt-4 border-t border-neutral-100">
          {monthlyData.map((data, index) => {
            const prevData = index > 0 ? monthlyData[index - 1] : null;
            const change = prevData ? ((data.net - prevData.net) / prevData.net * 100).toFixed(1) : null;

            return (
              <div key={data.month} className="text-center p-2 sm:p-3 bg-neutral-50 rounded-lg sm:rounded-xl">
                <p className="text-[10px] sm:text-xs text-neutral-500 mb-1">
                  {parseInt(data.month.split('-')[1])}월
                </p>
                <p className="text-xs sm:text-sm font-bold text-neutral-900">
                  {(data.net / 10000).toFixed(0)}만
                </p>
                {change && (
                  <p className={cn(
                    'text-[10px] sm:text-xs font-medium mt-0.5',
                    parseFloat(change) >= 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    {parseFloat(change) >= 0 ? '+' : ''}{change}%
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{ willChange: 'transform, opacity' }}
        className="bg-white rounded-xl sm:rounded-2xl border border-neutral-100 overflow-hidden shadow-sm"
      >
        <div className="p-4 sm:p-6 border-b border-neutral-100">
          <h2 className="font-bold text-base sm:text-lg text-neutral-900 mb-4">최근 거래 내역</h2>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {[
              { key: 'all', label: '전체', count: recentTransactions.length },
              { key: 'deposit', label: '입금', count: recentTransactions.filter(t => t.type === 'deposit').length },
              { key: 'settlement', label: '정산', count: recentTransactions.filter(t => t.type === 'settlement').length },
              { key: 'refund', label: '환불', count: recentTransactions.filter(t => t.type === 'refund').length },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTransactionFilter(item.key as typeof transactionFilter)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5',
                  transactionFilter === item.key
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                )}
              >
                {item.label}
                <span className={cn(
                  'px-1.5 py-0.5 rounded-full text-[10px]',
                  transactionFilter === item.key
                    ? 'bg-white/20'
                    : 'bg-neutral-200'
                )}>
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-neutral-50">
          {filteredTransactions.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-neutral-500 text-sm">해당 유형의 거래가 없습니다</p>
            </div>
          ) : filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-neutral-50 transition-colors"
            >
              {/* Icon */}
              <div
                className={cn(
                  'w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0',
                  transaction.type === 'deposit' && 'bg-green-50',
                  transaction.type === 'settlement' && 'bg-blue-50',
                  transaction.type === 'refund' && 'bg-red-50'
                )}
              >
                {transaction.type === 'deposit' && (
                  <ArrowDownRight className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                )}
                {transaction.type === 'settlement' && (
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                )}
                {transaction.type === 'refund' && (
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs sm:text-sm lg:text-base text-neutral-900">{transaction.description}</p>
                <p className="text-[10px] sm:text-xs lg:text-sm text-neutral-500 truncate">
                  {transaction.customer && `${transaction.customer}`}
                  {transaction.service && ` • ${transaction.service}`}
                </p>
              </div>

              {/* Amount & Date */}
              <div className="text-right flex-shrink-0">
                <p
                  className={cn(
                    'font-semibold text-xs sm:text-sm lg:text-base',
                    transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {transaction.amount >= 0 ? '+' : ''}
                  {formatPrice(transaction.amount)}
                </p>
                <p className="text-[10px] sm:text-xs text-neutral-400">
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
        transition={{ delay: 0.18 }}
        style={{ willChange: 'transform, opacity' }}
        className="bg-neutral-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6"
      >
        <div className="flex items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-neutral-400 text-[10px] sm:text-xs lg:text-sm">정산 계좌</p>
            <p className="text-white font-semibold text-sm sm:text-base mt-0.5 sm:mt-1">
              {bankAccount.bank} {maskAccountNumber(bankAccount.accountNumber)}
            </p>
            <p className="text-neutral-400 text-[10px] sm:text-xs lg:text-sm mt-0.5 sm:mt-1">
              예금주: {bankAccount.accountHolder.charAt(0)}*{bankAccount.accountHolder.slice(-1)}
            </p>
          </div>
          <button
            onClick={handleOpenAccountModal}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-colors flex-shrink-0"
          >
            계좌 변경
          </button>
        </div>

        <div className="border-t border-white/10 mt-3 sm:mt-4 pt-3 sm:pt-4">
          <div className="flex items-center justify-between text-[10px] sm:text-xs lg:text-sm">
            <span className="text-neutral-400">다음 정산 예정일</span>
            <span className="text-white font-medium">2026년 3월 20일 (금)</span>
          </div>
        </div>
      </motion.div>

      {/* Account Change BottomSheet */}
      <BottomSheet
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        title="정산 계좌 변경"
      >
        <div className="space-y-4">
          {/* Bank Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              은행 선택
            </label>
            <div className="grid grid-cols-4 gap-2">
              {BANKS.map((bank) => (
                <button
                  key={bank}
                  onClick={() => setFormData({ ...formData, bank })}
                  className={cn(
                    'px-2 py-2 rounded-lg text-xs font-medium transition-colors',
                    formData.bank === bank
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  )}
                >
                  {bank}
                </button>
              ))}
            </div>
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              계좌번호
            </label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              placeholder="계좌번호 입력 (- 없이)"
              className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:border-primary-400 outline-none transition-all"
            />
          </div>

          {/* Account Holder */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              예금주
            </label>
            <input
              type="text"
              value={formData.accountHolder}
              onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
              placeholder="예금주명 입력"
              className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:border-primary-400 outline-none transition-all"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveAccount}
            disabled={!formData.bank || !formData.accountNumber || !formData.accountHolder}
            className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-300 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            계좌 저장
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}
