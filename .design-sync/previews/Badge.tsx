import { Badge } from 'kbb';

const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' };

export const Variants = () => (
  <div style={row}>
    <Badge variant="default">Default</Badge>
    <Badge variant="primary">Popular</Badge>
    <Badge variant="accent">New</Badge>
    <Badge variant="success">Available</Badge>
    <Badge variant="warning">Few left</Badge>
    <Badge variant="danger">Fully booked</Badge>
    <Badge variant="info">English OK</Badge>
    <Badge variant="outline">Walk-in</Badge>
    <Badge variant="outline-primary">Featured</Badge>
  </div>
);

export const Sizes = () => (
  <div style={row}>
    <Badge variant="primary" size="sm">Small</Badge>
    <Badge variant="primary" size="md">Medium</Badge>
    <Badge variant="primary" size="lg">Large</Badge>
  </div>
);

export const SalonTags = () => (
  <div style={row}>
    <Badge variant="primary" size="sm">★ 4.9</Badge>
    <Badge variant="accent" size="sm">Gel</Badge>
    <Badge variant="accent" size="sm">Nail Art</Badge>
    <Badge variant="info" size="sm">English-speaking</Badge>
    <Badge variant="warning" size="sm">2 slots left</Badge>
  </div>
);
