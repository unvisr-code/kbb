'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Store, Shield, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export default function OwnerLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<'kakao' | 'google' | null>(null);

  const handleLogin = async (provider: 'kakao' | 'google') => {
    setIsLoading(provider);
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push('/owner/bookings/requests');
  };

  const features = [
    {
      icon: Store,
      title: '손쉬운 샵 관리',
      description: '직관적인 대시보드로 샵 정보와 시술 메뉴를 관리하세요',
    },
    {
      icon: Clock,
      title: '실시간 예약 알림',
      description: '새로운 예약 요청을 즉시 확인하고 승인/거절하세요',
    },
    {
      icon: Shield,
      title: '안전한 정산',
      description: '투명한 수수료와 빠른 정산 시스템을 제공합니다',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex flex-col">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-600/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row">
        {/* Left Side - Branding */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-white">
                  K-Beauty
                </h1>
                <p className="text-xs text-neutral-400">For Business</p>
              </div>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              당신의 네일샵,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-rose-400">
                글로벌 고객
              </span>
              과 만나세요
            </h2>

            <p className="text-lg text-neutral-400 mb-12 max-w-md">
              K-Beauty 파트너가 되어 전 세계 고객들에게 당신의 서비스를 선보이세요.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-neutral-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-[480px] flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-sm"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                  파트너 로그인
                </h3>
                <p className="text-neutral-500">
                  소셜 계정으로 간편하게 시작하세요
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                {/* Kakao Login */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLogin('kakao')}
                  disabled={isLoading !== null}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] font-semibold rounded-2xl transition-colors disabled:opacity-70"
                >
                  {isLoading === 'kakao' ? (
                    <div className="w-5 h-5 border-2 border-[#191919]/30 border-t-[#191919] rounded-full animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.76 1.84 5.18 4.6 6.54-.2.74-.72 2.68-.82 3.1-.13.5.18.5.38.36.16-.1 2.46-1.66 3.44-2.34.78.12 1.58.18 2.4.18 5.52 0 10-3.48 10-7.84S17.52 3 12 3z" />
                    </svg>
                  )}
                  카카오로 계속하기
                </motion.button>

                {/* Google Login */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLogin('google')}
                  disabled={isLoading !== null}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-white hover:bg-neutral-50 border-2 border-neutral-200 text-neutral-700 font-semibold rounded-2xl transition-colors disabled:opacity-70"
                >
                  {isLoading === 'google' ? (
                    <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                  ) : (
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
                  )}
                  Google로 계속하기
                </motion.button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-neutral-200" />
                <span className="text-xs text-neutral-400">또는</span>
                <div className="flex-1 h-px bg-neutral-200" />
              </div>

              {/* New Partner */}
              <Link
                href="/owner/onboarding"
                className="block w-full py-4 text-center bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-2xl transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  새로운 파트너 등록
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              {/* Terms */}
              <p className="text-xs text-neutral-400 text-center mt-6">
                로그인하면{' '}
                <Link href="#" className="text-primary-500 hover:underline">
                  서비스 이용약관
                </Link>
                과{' '}
                <Link href="#" className="text-primary-500 hover:underline">
                  개인정보처리방침
                </Link>
                에 동의하게 됩니다.
              </p>
            </div>

            {/* Customer Link */}
            <p className="text-center text-neutral-400 text-sm mt-6">
              고객으로 예약하시려면?{' '}
              <Link href="/" className="text-primary-400 hover:text-primary-300 font-medium">
                고객 페이지로 이동
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
