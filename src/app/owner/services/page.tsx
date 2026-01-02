'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit3,
  Trash2,
  Clock,
  MoreVertical,
  Image as ImageIcon,
  DollarSign,
  Tag,
  Sparkles,
  X,
} from 'lucide-react';
import { getServicesBySalonId } from '@/lib/mock';
import { Service, SERVICE_CATEGORY_LABELS, DEPOSIT_AMOUNT } from '@/types';
import { formatPrice, formatDuration, cn } from '@/lib/utils';

// Get services for mock salon
const services = getServicesBySalonId('salon-1');

export default function ServicesPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setShowModal(true);
    setMenuOpen(null);
  };

  const handleAdd = () => {
    setEditingService(null);
    setShowModal(true);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">시술 관리</h1>
          <p className="text-neutral-500 mt-1">
            시술 메뉴를 추가하고 관리하세요
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-5 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          시술 추가
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-4 p-4">
              {/* Service Image */}
              <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
                <img
                  src={service.images[0]}
                  alt={service.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {service.isFeatured && (
                  <div className="absolute top-1.5 left-1.5 bg-amber-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    인기
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-primary-500 uppercase tracking-wider">
                      {SERVICE_CATEGORY_LABELS[service.category].kr}
                    </span>
                    <h3 className="font-semibold text-neutral-900 mt-0.5">
                      {service.name}
                    </h3>
                  </div>

                  {/* Menu */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setMenuOpen(menuOpen === service.id ? null : service.id)
                      }
                      className="w-8 h-8 rounded-lg hover:bg-neutral-100 flex items-center justify-center"
                    >
                      <MoreVertical className="w-4 h-4 text-neutral-400" />
                    </button>

                    <AnimatePresence>
                      {menuOpen === service.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 z-10 min-w-[120px]"
                        >
                          <button
                            onClick={() => handleEdit(service)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          >
                            <Edit3 className="w-4 h-4" />
                            수정
                          </button>
                          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                            삭제
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
                  {service.description}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 text-neutral-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs">{formatDuration(service.duration)}</span>
                  </div>
                  <span className="font-semibold text-neutral-900">
                    {formatPrice(service.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 border-t border-neutral-100">
              <div className="p-3 text-center border-r border-neutral-100">
                <p className="text-xs text-neutral-400">이번 달 예약</p>
                <p className="font-semibold text-neutral-900">24건</p>
              </div>
              <div className="p-3 text-center border-r border-neutral-100">
                <p className="text-xs text-neutral-400">매출</p>
                <p className="font-semibold text-neutral-900">
                  {formatPrice(service.price * 24)}
                </p>
              </div>
              <div className="p-3 text-center">
                <p className="text-xs text-neutral-400">평점</p>
                <p className="font-semibold text-neutral-900">4.9</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                <h2 className="text-xl font-bold text-neutral-900">
                  {editingService ? '시술 수정' : '새 시술 추가'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    시술 이미지
                  </label>
                  <div className="border-2 border-dashed border-neutral-200 rounded-xl p-8 text-center hover:border-primary-300 transition-colors cursor-pointer">
                    <ImageIcon className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="text-sm text-neutral-500">
                      클릭하여 이미지 업로드
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      JPG, PNG (최대 5MB)
                    </p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    시술명
                  </label>
                  <input
                    type="text"
                    defaultValue={editingService?.name}
                    placeholder="예: 베이직 젤 네일"
                    className="w-full px-4 py-3 bg-neutral-50 border-0 rounded-xl focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    카테고리
                  </label>
                  <select
                    defaultValue={editingService?.category || ''}
                    className="w-full px-4 py-3 bg-neutral-50 border-0 rounded-xl focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">선택하세요</option>
                    {Object.entries(SERVICE_CATEGORY_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label.kr}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    설명
                  </label>
                  <textarea
                    defaultValue={editingService?.description}
                    placeholder="시술에 대한 설명을 입력하세요"
                    rows={3}
                    className="w-full px-4 py-3 bg-neutral-50 border-0 rounded-xl focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>

                {/* Duration & Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      소요 시간 (분)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="number"
                        defaultValue={editingService?.duration}
                        placeholder="60"
                        className="w-full pl-10 pr-4 py-3 bg-neutral-50 border-0 rounded-xl focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      가격 (원)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="number"
                        defaultValue={editingService?.price}
                        placeholder="50000"
                        className="w-full pl-10 pr-4 py-3 bg-neutral-50 border-0 rounded-xl focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Featured Toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={editingService?.isFeatured}
                    className="w-5 h-5 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-neutral-700">
                    인기 시술로 표시 (상단에 노출)
                  </span>
                </label>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 p-6 border-t border-neutral-100">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-neutral-100 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
                >
                  취소
                </button>
                <button className="flex-1 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors">
                  {editingService ? '저장' : '추가'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Click outside to close menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setMenuOpen(null)}
        />
      )}
    </div>
  );
}
