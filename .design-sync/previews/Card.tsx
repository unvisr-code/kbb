import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Button } from 'kbb';

export const SalonCard = () => (
  <Card variant="interactive" padding="none" style={{ width: 320, overflow: 'hidden' }}>
    <div style={{ height: 150, background: 'linear-gradient(135deg,#fce7eb,#c7fff3)' }} />
    <div style={{ padding: 16 }}>
      <CardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardTitle>Glow Nail Studio</CardTitle>
          <Badge variant="primary" size="sm">★ 4.9</Badge>
        </div>
        <CardDescription>Hongdae · English-speaking · Gel &amp; Nail Art</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button size="sm" fullWidth>Book from ₩45,000</Button>
      </CardFooter>
    </div>
  </Card>
);

export const Variants = () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <Card variant="default" style={{ width: 190 }}>
      <CardTitle>Default</CardTitle>
      <CardDescription>Bordered surface for most content.</CardDescription>
    </Card>
    <Card variant="elevated" style={{ width: 190 }}>
      <CardTitle>Elevated</CardTitle>
      <CardDescription>Soft shadow, no border.</CardDescription>
    </Card>
    <Card variant="outlined" style={{ width: 190 }}>
      <CardTitle>Outlined</CardTitle>
      <CardDescription>Heavier 2px outline.</CardDescription>
    </Card>
  </div>
);

export const BookingSummary = () => (
  <Card style={{ width: 340 }}>
    <CardHeader>
      <CardTitle>Booking Summary</CardTitle>
      <CardDescription>Saturday, Jun 28 · 2:00 PM</CardDescription>
    </CardHeader>
    <CardContent>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 14 }}>
        <span>Gel Manicure</span><span>₩40,000</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 14, borderTop: '1px solid #f5f5f4' }}>
        <span>Nail Art (2 fingers)</span><span>₩10,000</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button fullWidth>Confirm Booking · ₩50,000</Button>
    </CardFooter>
  </Card>
);
