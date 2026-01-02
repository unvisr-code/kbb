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
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/owner/bookings/requests"
          className="w-10 h-10 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-neutral-900">예약 상세</h1>
          <p className="text-sm text-neutral-500">#{booking.id}</p>
        </div>
      </div>

      {/* Status Alert */}
      {isPending && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <div>
            <p className="font-medium text-amber-800">승인 대기 중</p>
            <p className="text-sm text-amber-600">
              24시간 이내에 승인하지 않으면 자동으로 취소됩니다
            </p>
          </div>
        </motion.div>
      )}

      {/* Customer Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-neutral-100 p-6 mb-6"
      >
        <h2 className="font-semibold text-neutral-900 mb-4">고객 정보</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">이름</p>
              <p className="font-medium text-neutral-900">{booking.customerInfo.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">이메일</p>
              <p className="font-medium text-neutral-900">{booking.customerInfo.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
              <Phone className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">전화번호</p>
              <p className="font-medium text-neutral-900">{booking.customerInfo.phone}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Service Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-neutral-100 p-6 mb-6"
      >
        <h2 className="font-semibold text-neutral-900 mb-4">시술 정보</h2>
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-primary-100 flex items-center justify-center">
            <span className="text-4xl">💅</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-neutral-900 mb-2">
              {service?.name || '시술'}
            </h3>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <span>{service ? formatDuration(service.duration) : '-'}</span>
              <span>•</span>
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
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-neutral-100 p-6 mb-6"
      >
        <h2 className="font-semibold text-neutral-900 mb-4">예약 일시</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-neutral-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-neutral-500 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">날짜</span>
            </div>
            <p className="font-semibold text-neutral-900">
              {formatBookingDate(booking.requestedDate)}
            </p>
          </div>
          <div className="bg-neutral-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-neutral-500 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">시간</span>
            </div>
            <p className="font-semibold text-neutral-900">{booking.requestedTime}</p>
          </div>
        </div>
      </motion.div>

      {/* Special Request */}
      {booking.customerRequest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-neutral-100 p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-neutral-600" />
            <h2 className="font-semibold text-neutral-900">고객 요청사항</h2>
          </div>
          <p className="text-neutral-600 bg-neutral-50 rounded-xl p-4">
            {booking.customerRequest}
          </p>
        </motion.div>
      )}

      {/* Payment Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-neutral-100 p-6 mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-neutral-600" />
          <h2 className="font-semibold text-neutral-900">결제 정보</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">예약금 (결제 완료)</span>
            <span className="font-semibold text-green-600">
              {formatPrice(booking.depositAmount)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">현장 결제 예정</span>
            <span className="font-semibold text-neutral-900">
              {formatPrice(booking.totalPrice - booking.depositAmount)}
            </span>
          </div>
          <div className="border-t border-neutral-100 pt-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-900">총 금액</span>
              <span className="text-lg font-bold text-neutral-900">
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
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <button
            onClick={() => setShowRejectModal(true)}
            disabled={isApproving || isRejecting}
            className="flex-1 py-4 bg-white border-2 border-red-200 text-red-600 font-semibold rounded-2xl hover:bg-red-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <XCircle className="w-5 h-5" />
            거절하기
          </button>
          <button
            onClick={handleApprove}
            disabled={isApproving || isRejecting}
            className="flex-1 py-4 bg-primary-500 text-white font-semibold rounded-2xl hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isApproving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
            )}
            승인하기
          </button>
        </motion.div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-neutral-900 mb-2">
              예약을 거절하시겠습니까?
            </h3>
            <p className="text-neutral-500 mb-4">
              거절 시 고객에게 예약금이 전액 환불됩니다
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="거절 사유를 입력해주세요 (선택)"
              className="w-full p-4 bg-neutral-50 rounded-xl border-0 resize-none h-24 focus:ring-2 focus:ring-primary-500"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-3 bg-neutral-100 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleReject}
                disabled={isRejecting}
                className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isRejecting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
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
