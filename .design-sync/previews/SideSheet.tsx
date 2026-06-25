import { SideSheet, Avatar, Badge } from 'kbb';

const noop = () => {};

const item = (label: string, trailing?: string) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f5f5f4', fontSize: 15 }}>
    <span>{label}</span>
    {trailing ? <span style={{ fontSize: 13, color: '#a8a29e' }}>{trailing}</span> : null}
  </div>
);

export const AccountMenu = () => (
  <SideSheet isOpen onClose={noop} title="My Account">
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
        <Avatar name="Sora Kim" size="lg" />
        <div>
          <div style={{ fontWeight: 600, color: '#1c1917' }}>Sora Kim</div>
          <div style={{ fontSize: 13, color: '#78716c' }}>sora@example.com</div>
        </div>
      </div>
      {item('My bookings', '2 upcoming')}
      {item('Favorite salons', '8')}
      {item('Reviews')}
      {item('Payment methods')}
      <div style={{ marginTop: 16 }}>
        <Badge variant="accent" size="sm">English support 24/7</Badge>
      </div>
    </div>
  </SideSheet>
);
