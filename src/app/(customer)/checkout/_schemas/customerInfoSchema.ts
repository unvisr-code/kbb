import { z } from 'zod';

export const customerInfoSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(
      /^[a-zA-Z\s\uAC00-\uD7AF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/,
      'Name contains invalid characters'
    ),
  email: z
    .string()
    .email('Please enter a valid email')
    .max(100, 'Email is too long')
    .transform((val) => val.toLowerCase().trim()),
  phone: z
    .string()
    .regex(/^[0-9]{8,15}$/, 'Phone number must be 8-15 digits')
    .transform((val) => val.replace(/\D/g, '')),
  countryCode: z.string().min(1, 'Please select a country code'),
  specialRequests: z
    .string()
    .max(500, 'Special requests must be less than 500 characters')
    .optional(),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the terms'),
});

export type CustomerInfoForm = z.infer<typeof customerInfoSchema>;

export const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+82', country: 'KR', flag: '🇰🇷' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+65', country: 'SG', flag: '🇸🇬' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
] as const;

export type CountryCode = (typeof countryCodes)[number];
