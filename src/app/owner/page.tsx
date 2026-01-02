import { redirect } from 'next/navigation';

export default function OwnerPage() {
  redirect('/owner/bookings/requests');
}
