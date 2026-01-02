'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, User, Mail, MessageSquare, Check, Shield, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBookingStore } from '@/stores/bookingStore';
import {
  FloatingInput,
  BookingSummaryCard,
  CountryCodePicker,
  CheckoutFooter,
} from './_components';
import {
  customerInfoSchema,
  type CustomerInfoForm,
} from './_schemas/customerInfoSchema';

export default function CheckoutPage() {
  const router = useRouter();
  const { selectedSalon, selectedService, selectedDate, selectedTime, setCustomerInfo } =
    useBookingStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CustomerInfoForm>({
    resolver: zodResolver(customerInfoSchema),
    mode: 'onChange',
    defaultValues: {
      countryCode: '+82',
      agreeToTerms: false,
    },
  });

  const watchedValues = watch();

  // Redirect if no booking data
  useEffect(() => {
    if (!selectedSalon || !selectedService || !selectedDate || !selectedTime) {
      router.push('/');
    }
  }, [selectedSalon, selectedService, selectedDate, selectedTime, router]);

  const onSubmit = (data: CustomerInfoForm) => {
    setCustomerInfo({
      name: data.name,
      email: data.email,
      phone: data.phone,
      countryCode: data.countryCode,
    });
    router.push('/payment');
  };

  if (!selectedSalon || !selectedService) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 via-white to-neutral-50 pb-36">
      {/* Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-60 h-60 bg-accent-100/30 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/salons/${selectedSalon.id}/book?serviceId=${selectedService.id}`}
              className="w-10 h-10 rounded-full bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </Link>

            <div className="flex-1">
              <h1 className="font-display text-lg font-semibold text-neutral-900">
                Your Information
              </h1>
              <p className="text-xs text-neutral-500">Step 2 of 3</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1">
                <div
                  className={cn(
                    'h-1 rounded-full transition-all duration-500',
                    step <= 2 ? 'bg-primary-500' : 'bg-neutral-200'
                  )}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-primary-400">Date & Time</span>
            <span className="text-xs font-medium text-primary-600">Your Info</span>
            <span className="text-xs text-neutral-400">Payment</span>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Booking Summary Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <BookingSummaryCard
            salon={selectedSalon}
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
          />
        </motion.section>

        {/* Social Login Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-sm text-neutral-500 text-center mb-4">
            Quick fill with your account
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-neutral-100 rounded-2xl hover:border-neutral-200 hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-medium text-neutral-700">Continue with Google</span>
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              or fill manually
            </span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>
        </motion.section>

        {/* Customer Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Name */}
          <FloatingInput
            label="Full Name"
            icon={User}
            {...register('name')}
            value={watchedValues.name || ''}
            error={errors.name?.message}
          />

          {/* Email */}
          <FloatingInput
            label="Email Address"
            icon={Mail}
            type="email"
            {...register('email')}
            value={watchedValues.email || ''}
            error={errors.email?.message}
          />

          {/* Phone with Country Code */}
          <CountryCodePicker
            value={watchedValues.countryCode || '+82'}
            phoneValue={watchedValues.phone || ''}
            onChange={(code) => setValue('countryCode', code)}
            onPhoneChange={(e) => setValue('phone', e.target.value.replace(/\D/g, ''))}
            error={errors.phone?.message}
          />

          {/* Special Requests */}
          <div className="relative">
            <div className="flex items-start gap-3 px-4 py-4 bg-white rounded-2xl border-2 border-neutral-100 hover:border-neutral-200 focus-within:border-primary-400 focus-within:shadow-lg focus-within:shadow-primary-500/10 transition-all duration-300">
              <MessageSquare className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
              <textarea
                {...register('specialRequests')}
                placeholder="Special requests (optional)"
                rows={3}
                className="flex-1 bg-transparent outline-none text-neutral-900 placeholder:text-neutral-400 resize-none"
              />
            </div>
            <p className="text-xs text-neutral-400 mt-2 ml-4">
              Let us know about allergies, preferences, or special occasions
            </p>
          </div>

          {/* Terms Agreement */}
          <motion.label
            whileTap={{ scale: 0.98 }}
            className="flex items-start gap-3 p-4 bg-white rounded-2xl border-2 border-neutral-100 hover:border-neutral-200 cursor-pointer transition-all"
          >
            <div className="relative mt-0.5">
              <input type="checkbox" {...register('agreeToTerms')} className="sr-only" />
              <motion.div
                className={cn(
                  'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all',
                  watchedValues.agreeToTerms
                    ? 'bg-primary-500 border-primary-500'
                    : 'border-neutral-300'
                )}
                whileTap={{ scale: 0.9 }}
              >
                {watchedValues.agreeToTerms && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-neutral-700">
                I agree to the{' '}
                <span className="text-primary-500 font-medium">Terms of Service</span> and{' '}
                <span className="text-primary-500 font-medium">Cancellation Policy</span>
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Your deposit is fully refundable if the salon declines your booking
              </p>
            </div>
          </motion.label>

          {errors.agreeToTerms && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs ml-4"
            >
              {errors.agreeToTerms.message}
            </motion.p>
          )}
        </motion.form>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6 mt-8 py-4"
        >
          <div className="flex items-center gap-2 text-neutral-400">
            <Shield className="w-4 h-4" />
            <span className="text-xs">Secure Payment</span>
          </div>
          <div className="w-px h-4 bg-neutral-200" />
          <div className="flex items-center gap-2 text-neutral-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs">Instant Confirmation</span>
          </div>
        </motion.div>
      </main>

      {/* Sticky Bottom CTA */}
      <CheckoutFooter
        servicePrice={selectedService.price}
        isValid={isValid}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
  );
}
