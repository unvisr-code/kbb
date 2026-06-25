import { Avatar } from 'kbb';

const row: React.CSSProperties = { display: 'flex', gap: 12, alignItems: 'center' };

export const Sizes = () => (
  <div style={row}>
    <Avatar name="Jane Doe" size="xs" />
    <Avatar name="Min Su" size="sm" />
    <Avatar name="Sora Kim" size="md" />
    <Avatar name="Alex Park" size="lg" />
    <Avatar name="Yuna Lee" size="xl" />
  </div>
);

export const WithPhoto = () => (
  <div style={row}>
    <Avatar size="lg" name="Sora Kim" src="https://i.pravatar.cc/96?img=5" />
    <Avatar size="lg" name="Min Su" src="https://i.pravatar.cc/96?img=12" />
    <Avatar size="lg" name="No Photo" />
  </div>
);

export const ReviewerInitials = () => (
  <div style={{ ...row, gap: 0 }}>
    {['Jane Doe', 'Min Su', 'Sora Kim', 'Alex Park'].map((n, i) => (
      <div key={n} style={{ marginLeft: i ? -8 : 0, border: '2px solid #fff', borderRadius: 999 }}>
        <Avatar name={n} size="md" />
      </div>
    ))}
  </div>
);
