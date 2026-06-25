import { Button } from 'kbb';
import { Calendar, Heart, ArrowRight } from 'lucide-react';

const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' };

export const Variants = () => (
  <div style={row}>
    <Button variant="primary">Book Now</Button>
    <Button variant="secondary">View Details</Button>
    <Button variant="outline">See Salons</Button>
    <Button variant="ghost">Skip</Button>
    <Button variant="danger">Cancel Booking</Button>
    <Button variant="success">Confirmed</Button>
  </div>
);

export const Sizes = () => (
  <div style={row}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button size="xl">Extra Large</Button>
  </div>
);

export const SocialLogin = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
    <Button variant="kakao" fullWidth>Continue with Kakao</Button>
    <Button variant="google" fullWidth>Continue with Google</Button>
  </div>
);

export const WithIcons = () => (
  <div style={row}>
    <Button leftIcon={<Calendar size={18} />}>Book Appointment</Button>
    <Button variant="outline" rightIcon={<ArrowRight size={18} />}>Explore Salons</Button>
    <Button variant="ghost" leftIcon={<Heart size={18} />}>Favorite</Button>
  </div>
);

export const States = () => (
  <div style={row}>
    <Button isLoading>Booking…</Button>
    <Button disabled>Unavailable</Button>
    <Button variant="outline" disabled>Fully Booked</Button>
  </div>
);
