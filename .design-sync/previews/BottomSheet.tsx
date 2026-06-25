import { BottomSheet, Badge, Button } from 'kbb';

const noop = () => {};
const chipRow: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 8 };

export const FilterSheet = () => (
  <BottomSheet isOpen onClose={noop} title="Filter salons">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 8 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#44403c', marginBottom: 8 }}>District</div>
        <div style={chipRow}>
          <Badge variant="outline-primary">Hongdae</Badge>
          <Badge variant="outline">Gangnam</Badge>
          <Badge variant="outline">Myeongdong</Badge>
          <Badge variant="outline">Itaewon</Badge>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#44403c', marginBottom: 8 }}>Service</div>
        <div style={chipRow}>
          <Badge variant="primary">Gel Manicure</Badge>
          <Badge variant="outline">Nail Art</Badge>
          <Badge variant="outline">Pedicure</Badge>
        </div>
      </div>
      <Button fullWidth>Show 24 salons</Button>
    </div>
  </BottomSheet>
);
