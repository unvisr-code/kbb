'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Store,
  MapPin,
  Clock,
  Image as ImageIcon,
  Phone,
  Globe,
  CheckCircle2,
  Upload,
  Plus,
  X,
} from 'lucide-react';
import { REGION_LABELS, AMENITY_LABELS } from '@/types';

const steps = [
  { id: 1, title: '기본 정보', description: '샵 이름과 연락처' },
  { id: 2, title: '위치 정보', description: '주소와 영업시간' },
  { id: 3, title: '샵 소개', description: '이미지와 설명' },
  { id: 4, title: '완료', description: '검토 후 등록' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: '',
    address: '',
    description: '',
    amenities: [] as string[],
    isForeignerFriendly: true,
  });

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/owner/bookings/requests');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={prevStep}
                className="w-10 h-10 rounded-full bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 text-neutral-600" />
              </button>
            ) : (
              <div className="w-10" />
            )}

            <div className="text-center">
              <h1 className="font-display text-lg font-semibold text-neutral-900">
                샵 등록
              </h1>
              <p className="text-xs text-neutral-500">
                {currentStep} / {steps.length} 단계
              </p>
            </div>

            <div className="w-10" />
          </div>

          {/* Progress */}
          <div className="flex gap-2 mt-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex-1 h-1 rounded-full transition-all ${
                  step.id <= currentStep ? 'bg-primary-500' : 'bg-neutral-200'
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <Store className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  기본 정보를 입력해주세요
                </h2>
                <p className="text-neutral-500">
                  고객에게 보여질 샵의 기본 정보입니다
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    샵 이름 *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="예: 블라썸 네일 살롱"
                    className="w-full px-4 py-4 bg-white border-2 border-neutral-100 rounded-xl focus:border-primary-400 focus:ring-0 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    연락처 *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="02-1234-5678"
                      className="w-full pl-12 pr-4 py-4 bg-white border-2 border-neutral-100 rounded-xl focus:border-primary-400 focus:ring-0 outline-none transition-all"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-4 p-4 bg-accent-50 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isForeignerFriendly}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isForeignerFriendly: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-neutral-300 text-accent-500 focus:ring-accent-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-accent-600" />
                      <span className="font-medium text-neutral-900">
                        외국인 친화 샵
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500 mt-0.5">
                      영어 소통이 가능하거나 외국인 손님을 환영합니다
                    </p>
                  </div>
                </label>
              </div>
            </motion.div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  위치와 영업시간
                </h2>
                <p className="text-neutral-500">
                  고객이 샵을 쉽게 찾을 수 있도록 해주세요
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    지역 *
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) =>
                      setFormData({ ...formData, region: e.target.value })
                    }
                    className="w-full px-4 py-4 bg-white border-2 border-neutral-100 rounded-xl focus:border-primary-400 focus:ring-0 outline-none transition-all"
                  >
                    <option value="">지역을 선택하세요</option>
                    {Object.entries(REGION_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label.kr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    상세 주소 *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="예: 강남구 신사동 123-45 2층"
                    className="w-full px-4 py-4 bg-white border-2 border-neutral-100 rounded-xl focus:border-primary-400 focus:ring-0 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    영업시간 *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="time"
                        defaultValue="10:00"
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-neutral-100 rounded-xl focus:border-primary-400"
                      />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="time"
                        defaultValue="20:00"
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-neutral-100 rounded-xl focus:border-primary-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Description */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  샵을 소개해주세요
                </h2>
                <p className="text-neutral-500">
                  멋진 사진과 설명으로 고객의 관심을 끌어보세요
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    샵 사진 (최대 5장)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="aspect-square bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-200 hover:border-primary-300 flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <Plus className="w-6 h-6 text-neutral-400" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    샵 소개
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="샵의 특징과 강점을 소개해주세요"
                    rows={4}
                    className="w-full px-4 py-4 bg-white border-2 border-neutral-100 rounded-xl focus:border-primary-400 focus:ring-0 outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    편의시설
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(AMENITY_LABELS).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleAmenity(key)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                          formData.amenities.includes(key)
                            ? 'bg-primary-500 text-white'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {label.kr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Complete */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30"
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
              </motion.div>

              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                등록이 완료되었습니다!
              </h2>
              <p className="text-neutral-500 mb-8">
                이제 시술을 등록하고 예약을 받을 준비가 되었어요
              </p>

              <div className="bg-neutral-50 rounded-2xl p-6 text-left space-y-4">
                <h3 className="font-semibold text-neutral-900">다음 단계</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-600">1</span>
                    </div>
                    <span className="text-neutral-700">시술 메뉴 등록하기</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                      <span className="text-sm font-bold text-neutral-600">2</span>
                    </div>
                    <span className="text-neutral-500">예약 가능 시간 설정</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                      <span className="text-sm font-bold text-neutral-600">3</span>
                    </div>
                    <span className="text-neutral-500">첫 예약 받기</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={nextStep}
            className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2"
          >
            {currentStep === 4 ? '시술 등록하러 가기' : '다음 단계'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
