'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CreditCard,
  Loader2,
} from 'lucide-react';
import { getBookingById, getServiceById } from '@/lib/mock';
import { formatPrice, formatDuration } from '@/lib/utils';

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId as string;

  const booking = getBookingById(bookingId);
  const service = booking ? getServiceById(booking.serviceId) : null;

  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleApprove = async () => {
    setIsApproving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push('/owner/bookings/confirmed');
  };

  const handleReject = async () => {
    setIsRejecting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push('/owner/bookings/requests');
  };

  const formatBookingDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  if (!booking) {
    return (
      <div className="p-8 text-center">
        <p className="text-neutral-500">예약을 찾을 수 없습니다</p>
      </div>
    );
  }

  const isPending = booking.status === 'waiting_confirmation';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto pb-28 sm:pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 lg:mb-8">
        <Link
          href="/owner/bookings/requests"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
        </Link>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-neutral-900">예약 상세</h1>
          <p className="text-xs sm:text-sm text-neutral-500">#{booking.id}</p>
        </div>
      </div>

      {/* Status Alert */}
      {isPending && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ willChange: 'transform, opacity' }}
          className="bg-amber-50 border border-amber-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 flex items-start sm:items-center gap-2.5 sm:gap-3"
        >
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <p className="font-medium text-amber-800 text-sm sm:text-base">승인 대기 중</p>
            <p className="text-xs sm:text-sm text-amber-600">
              24시간 이내에 승인하지 않으면 자동으로 취소됩니다
            </p>
          </div>
        </motion.div>
      )}

      {/* Customer Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ willChange: 'transform, opacity' }}
        className="bg-white rounded-xl sm:rounded-2xl border border-neutral-100 p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6"
      >
        <h2 className="font-semibold text-sm sm:text-base text-neutral-900 mb-3 sm:mb-4">고객 정보</h2>
        <div className="space-y-2.5 sm:space-y-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs lg:text-sm text-neutral-500">이름</p>
              <p className="font-medium text-sm sm:text-base text-neutral-900">{booking.customerInfo.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs lg:text-sm text-neutral-500">이메일</p>
              <p className="font-medium text-sm sm:text-base text-neutral-900 truncate">{booking.customerInfo.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs lg:text-sm text-neutral-500">전화번호</p>
              <p className="font-medium text-sm sm:text-base text-neutral-900">{booking.customerInfo.phone}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Service Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        style={{ willChange: 'transform, opacity' }}
        className="bg-white rounded-xl sm:rounded-2xl border border-neutral-100 p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6"
      >
        <h2 className="font-semibold text-sm sm:text-base text-neutral-900 mb-3 sm:mb-4">시술 정보</h2>
        <div className="flex gap-3 sm:gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 bg-primary-100 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl">💅</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-neutral-900 mb-1 sm:mb-2">
              {service?.name || '시술'}
            </h3>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-500">
              <span>{service ? formatDuration(service.duration) : '-'}</span>
              <span className="hidden sm:inline">•</span>
              <span className="font-medium text-neutral-900">
                {formatPrice(booking.totalPrice)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Date & Time Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ willChange: 'transform, opacity' }}
        className="bg-white rounded-xl sm:rounded-2xl border border-neutral-100 p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6"
      >
        <h2 className="font-semibold text-sm sm:text-base text-neutral-900 mb-3 sm:mb-4">예약 일시</h2>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
          <div className="bg-neutral-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-500 mb-1">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">날짜</span>
            </div>
            <p className="font-semibold text-xs sm:text-sm lg:text-base text-neutral-900">
              {formatBookingDate(booking.requestedDate)}
            </p>
          </div>
          <div className="bg-neutral-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-500 mb-1">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs lg:text-sm">시간</span>
            </div>
            <p className="font-semibold text-xs sm:text-sm lg:text-base text-neutral-900">{booking.requestedTime}</p>
          </div>
        </div>
      </motion.div>

      {/* Special Request */}
      {booking.customerRequest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
          className="bg-white rounded-xl sm:rounded-2xl border border-neutral-100 p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6"
        >
          <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
            <h2 className="font-semibold text-sm sm:text-base text-neutral-900">고객 요청사항</h2>
          </div>
          <p className="text-xs sm:text-sm lg:text-base text-neutral-600 bg-neutral-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
            {booking.customerRequest}
          </p>
        </motion.div>
      )}

      {/* Payment Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ willChange: 'transform, opacity' }}
        className="bg-white rounded-xl sm:rounded-2xl border border-neutral-100 p-4 sm:p-5 lg:p-6 mb-6 sm:mb-8"
      >
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
          <h2 className="font-semibold text-sm sm:text-base text-neutral-900">결제 정보</h2>
        </div>
        <div className="space-y-2.5 sm:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-neutral-500">예약금 (결제 완료)</span>
            <span className="font-semibold text-xs sm:text-sm lg:text-base text-green-600">
              {formatPrice(booking.depositAmount)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-neutral-500">현장 결제 예정</span>
            <span className="font-semibold text-xs sm:text-sm lg:text-base text-neutral-900">
              {formatPrice(booking.totalPrice - booking.depositAmount)}
            </span>
          </div>
          <div className="border-t border-neutral-100 pt-2.5 sm:pt-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm sm:text-base text-neutral-900">총 금액</span>
              <span className="text-base sm:text-lg font-bold text-neutral-900">
                {formatPrice(booking.totalPrice)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      {isPending && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{ willChange: 'transform, opacity' }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-neutral-100 sm:static sm:border-0 sm:bg-transparent sm:p-0 flex gap-3 sm:gap-4 pb-safe-bottom sm:pb-0"
        >
          <button
            onClick={() => setShowRejectModal(true)}
            disabled={isApproving || isRejecting}
            className="flex-1 py-3 sm:py-4 bg-white border-2 border-red-200 text-red-600 font-semibold rounded-xl sm:rounded-2xl hover:bg-red-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
          >
            <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            거절하기
          </button>
          <button
            onClick={handleApprove}
            disabled={isApproving || isRejecting}
            className="flex-1 py-3 sm:py-4 bg-primary-500 text-white font-semibold rounded-xl sm:rounded-2xl hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
          >
            {isApproving ? (
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
            승인하기
          </button>
        </motion.div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ willChange: 'transform, opacity' }}
            className="bg-white rounded-t-2xl sm:rounded-3xl p-5 sm:p-6 max-w-md w-full pb-safe-bottom"
          >
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1.5 sm:mb-2">
              예약을 거절하시겠습니까?
            </h3>
            <p className="text-sm sm:text-base text-neutral-500 mb-3 sm:mb-4">
              거절 시 고객에게 예약금이 전액 환불됩니다
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="거절 사유를 입력해주세요 (선택)"
              className="w-full p-3 sm:p-4 bg-neutral-50 rounded-lg sm:rounded-xl border-0 resize-none h-20 sm:h-24 focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
            />
            <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2.5 sm:py-3 bg-neutral-100 text-neutral-700 font-semibold rounded-lg sm:rounded-xl hover:bg-neutral-200 transition-colors text-sm sm:text-base"
              >
                취소
              </button>
              <button
                onClick={handleReject}
                disabled={isRejecting}
                className="flex-1 py-2.5 sm:py-3 bg-red-500 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {isRejecting ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  '거절하기'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
