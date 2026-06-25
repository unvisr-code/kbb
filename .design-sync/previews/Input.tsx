import { Input } from 'kbb';
import { Mail, Search, Lock } from 'lucide-react';

const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16, width: 320 };

export const Default = () => (
  <div style={col}>
    <Input label="Full name" placeholder="Jane Doe" />
    <Input label="Email" type="email" placeholder="you@example.com" leftIcon={<Mail size={18} />} />
  </div>
);

export const States = () => (
  <div style={col}>
    <Input label="Email" defaultValue="jane@@example" error="Please enter a valid email" leftIcon={<Mail size={18} />} />
    <Input label="Phone" placeholder="+82 10-1234-5678" hint="We'll text your booking confirmation" />
    <Input label="Password" type="password" placeholder="••••••••" disabled leftIcon={<Lock size={18} />} />
  </div>
);

export const SearchField = () => (
  <div style={{ width: 320 }}>
    <Input placeholder="Search salons in Hongdae…" leftIcon={<Search size={18} />} />
  </div>
);
