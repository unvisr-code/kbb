'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Globe,
  Clock,
  Wifi,
  CreditCard,
  Car,
  Phone,
  ChevronDown,
  Share2,
  Heart,
  Navigation,
} from 'lucide-react';
import { getSalonById, getServicesBySalonId } from '@/lib/mock';
import { Salon, Service, REGION_LABELS, AMENITY_LABELS, DAY_LABELS, Amenity } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
import { ServiceCard } from '@/components/customer/ServiceCard';
import { useBookingStore } from '@/stores/bookingStore';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

const AMENITY_ICONS: Record<Amenity, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  card_payment: CreditCard,
  parking: Car,
  english_menu: Globe,
  japanese_menu: Globe,
  chinese_menu: Globe,
  reservation_only: Clock,
  wheelchair_accessible: () => <span className="text-lg">♿</span>,
  child_friendly: () => <span className="text-lg">👶</span>,
};

type TabType = 'services' | 'info' | 'reviews';

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  content: string;
  images?: string[];
  serviceName: string;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 'review-1',
    userName: 'Sarah K.',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 5,
    date: '2025-01-03',
    content: 'Amazing experience! The stylist really understood what I wanted and the result exceeded my expectations. The salon has a very cozy atmosphere and all staff were super friendly. Will definitely come back!',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400',
    ],
    serviceName: 'Premium Hair Cut & Styling',
  },
];

export default function SalonDetailPage() {
  const router = useRouter();
  const params = useParams();
  const salonId = params.salonId as string;

  const [salon, setSalon] = useState<Salon | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>('services');
  const [isHoursExpanded, setIsHoursExpanded] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const { setSelectedSalon, setSelectedService: storeSetService } = useBookingStore();

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);

  useEffect(() => {
    const salonData = getSalonById(salonId);
    if (salonData) {
      setSalon(salonData);
      setSelectedSalon(salonData);
      const servicesData = getServicesBySalonId(salonId);
      setServices(servicesData);
    }
  }, [salonId, setSelectedSalon]);

  const today = new Date().getDay();
  const todayHours = salon?.businessHours.find((h) => h.dayOfWeek === today);
  const isOpenNow = useMemo(() => {
    if (!todayHours || todayHours.isClosed) return false;
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    return currentTime >= todayHours.openTime && currentTime <= todayHours.closeTime;
  }, [todayHours]);

  const handleServiceSelect = (service: Service) => {
    if (selectedService?.id === service.id) {
      setSelectedService(null);
    } else {
      setSelectedService(service);
    }
  };

  const handleContinueBooking = () => {
    if (selectedService) {
      storeSetService(selectedService);
      router.push(`/salons/${salonId}/book?serviceId=${selectedService.id}`);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || !salon) return;

    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        setCurrentImage((prev) => (prev + 1) % salon.images.length);
      } else {
        setCurrentImage((prev) => (prev - 1 + salon.images.length) % salon.images.length);
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    if (!salon) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: salon.name,
          text: salon.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!salon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-neutral-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-40">
      {/* Hero Image Gallery */}
      <section
        className="relative h-[50vh] md:h-[60vh] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
          <img
            src={salon.images[currentImage]}
            alt={salon.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        </motion.div>

        {/* Navigation Header */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4">
          <div className="flex items-center justify-between">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => router.back()}
              className="flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-700" />
            </motion.button>

            <div className="flex items-center gap-2">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onClick={handleShare}
                className="flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg active:scale-95 transition-transform"
              >
                <Share2 className="w-5 h-5 text-neutral-700" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                onClick={handleLike}
                className="flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg active:scale-95 transition-transform"
              >
                <Heart className={cn(
                  'w-5 h-5 transition-colors',
                  isLiked ? 'fill-red-500 text-red-500' : 'text-neutral-700'
                )} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Image Navigation */}
        {salon.images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImage((prev) => (prev - 1 + salon.images.length) % salon.images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-700" />
            </button>
            <button
              onClick={() => setCurrentImage((prev) => (prev + 1) % salon.images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5 text-neutral-700" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {salon.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    idx === currentImage ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
                  )}
                />
              ))}
            </div>
          </>
        )}

        {/* Bottom Info Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 p-6 z-10"
        >
          <div className="flex items-end justify-between">
            <div>
              {salon.isForeignerFriendly && (
                <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-3">
                  <Globe className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs font-medium text-white">Foreigner Friendly</span>
                </div>
              )}
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-white drop-shadow-lg">
                {salon.name}
              </h1>
            </div>
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-lg font-semibold text-white">{salon.rating}</span>
              <span className="text-white/70 text-sm">({salon.reviewCount})</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="relative -mt-6 bg-neutral-50 rounded-t-3xl">
        {/* Salon Info Section */}
        <section className="px-4 pt-6 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Location */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary-500" />
              </div>
              <div className="flex-1">
                <p className="text-neutral-900 font-medium">{salon.address}</p>
                <p className="text-sm text-neutral-500">{REGION_LABELS[salon.region].en}, Seoul</p>
              </div>
              <button
                onClick={() => setShowComingSoon(true)}
                className="flex items-center gap-1.5 text-sm text-primary-500 font-medium px-3 py-2 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Map
              </button>
            </div>

            {/* Description */}
            <p className="text-neutral-600 leading-relaxed mb-4">{salon.description}</p>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mb-4">
              {salon.amenities.map((amenity) => {
                const Icon = AMENITY_ICONS[amenity];
                return (
                  <div
                    key={amenity}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 rounded-lg text-sm text-neutral-600"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{AMENITY_LABELS[amenity].en}</span>
                  </div>
                );
              })}
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
              <button
                onClick={() => setIsHoursExpanded(!isHoursExpanded)}
                className="w-full flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-neutral-400" />
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-neutral-900">Business Hours</span>
                      <span
                        className={cn(
                          'text-xs font-semibold px-2 py-0.5 rounded-full',
                          isOpenNow
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        )}
                      >
                        {isOpenNow ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                    {todayHours && !todayHours.isClosed && (
                      <p className="text-sm text-neutral-500">
                        Today: {todayHours.openTime} - {todayHours.closeTime}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-neutral-400 transition-transform',
                    isHoursExpanded && 'rotate-180'
                  )}
                />
              </button>

              <AnimatePresence>
                {isHoursExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-neutral-100 overflow-hidden"
                  >
                    <div className="p-4 space-y-2">
                      {salon.businessHours.map((hours) => (
                        <div
                          key={hours.dayOfWeek}
                          className={cn(
                            'flex justify-between py-1.5 px-2 rounded',
                            hours.dayOfWeek === today && 'bg-primary-50'
                          )}
                        >
                          <span
                            className={cn(
                              'text-sm',
                              hours.dayOfWeek === today
                                ? 'font-medium text-primary-600'
                                : 'text-neutral-600'
                            )}
                          >
                            {DAY_LABELS[hours.dayOfWeek]}
                          </span>
                          <span
                            className={cn(
                              'text-sm',
                              hours.isClosed
                                ? 'text-neutral-400'
                                : hours.dayOfWeek === today
                                  ? 'font-medium text-primary-600'
                                  : 'text-neutral-900'
                            )}
                          >
                            {hours.isClosed
                              ? 'Closed'
                              : `${hours.openTime} - ${hours.closeTime}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-0 z-20 bg-neutral-50/80 backdrop-blur-lg border-b border-neutral-100">
          <div className="px-4">
            <div className="flex gap-1">
              {(['services', 'info', 'reviews'] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'flex-1 py-4 text-sm font-medium transition-colors relative',
                    activeTab === tab ? 'text-primary-500' : 'text-neutral-500 hover:text-neutral-700'
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="px-4 py-6">
          <AnimatePresence mode="wait">
            {activeTab === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-neutral-900">
                    Services
                  </h2>
                  <span className="text-sm text-neutral-500">{services.length} available</span>
                </div>
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isSelected={selectedService?.id === service.id}
                    onSelect={handleServiceSelect}
                    index={index}
                  />
                ))}
              </motion.div>
            )}

            {activeTab === 'info' && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="bg-white rounded-2xl p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Contact</h3>
                    <a
                      href={`tel:${salon.phone}`}
                      className="flex items-center gap-3 text-neutral-600 hover:text-primary-500 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span>{salon.phone}</span>
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">About</h3>
                    <p className="text-neutral-600 leading-relaxed">{salon.description}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-neutral-900">Reviews</h2>
                  <span className="text-sm text-neutral-500">{MOCK_REVIEWS.length} reviews</span>
                </div>

                {MOCK_REVIEWS.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-4 shadow-sm"
                  >
                    {/* Review Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-neutral-900">{review.userName}</h4>
                          <span className="text-xs text-neutral-400">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'w-3.5 h-3.5',
                                i < review.rating
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-neutral-200'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Service Tag */}
                    <div className="inline-block px-2.5 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full mb-3">
                      {review.serviceName}
                    </div>

                    {/* Review Content */}
                    <p className="text-neutral-600 text-sm leading-relaxed mb-3">
                      {review.content}
                    </p>

                    {/* Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {review.images.map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt={`Review photo ${idx + 1}`}
                            className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* Sticky Bottom CTA */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-neutral-100 p-4 pb-safe-bottom z-40"
        >
          <div className="max-w-lg mx-auto">
            {selectedService ? (
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-500">Selected service</p>
                  <p className="font-semibold text-neutral-900 truncate">{selectedService.name}</p>
                  <p className="text-primary-500 font-medium">{formatPrice(selectedService.price)}</p>
                </div>
                <button
                  onClick={handleContinueBooking}
                  className="px-6 py-3.5 bg-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/25 hover:bg-primary-600 transition-colors"
                >
                  Continue
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-neutral-500 mb-3">Select a service to continue</p>
                <button
                  onClick={() => setActiveTab('services')}
                  className="w-full py-3.5 bg-neutral-100 text-neutral-600 rounded-xl font-semibold hover:bg-neutral-200 transition-colors"
                >
                  View Services
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Coming Soon Modal */}
      <Modal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        size="sm"
        showCloseButton={false}
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-primary-500" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Coming Soon!</h3>
          <p className="text-neutral-500 text-sm mb-6">
            This feature is currently under development.<br />
            Stay tuned for updates!
          </p>
          <Button onClick={() => setShowComingSoon(false)} className="w-full">
            Got it
          </Button>
        </div>
      </Modal>
    </div>
  );
}
