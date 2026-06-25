import { Modal, ModalFooter, Button } from 'kbb';

const noop = () => {};

export const BookingConfirm = () => (
  <Modal isOpen onClose={noop} title="Confirm your booking" description="Glow Nail Studio · Hongdae">
    <div style={{ fontSize: 14, color: '#57534e', lineHeight: 1.7 }}>
      <p>Gel Manicure with nail art (2 fingers)</p>
      <p style={{ marginTop: 6 }}>Saturday, June 28 · 2:00 PM</p>
      <p style={{ marginTop: 10, fontWeight: 600, color: '#1c1917' }}>Total ₩50,000</p>
    </div>
    <ModalFooter>
      <Button variant="ghost" onClick={noop}>Cancel</Button>
      <Button onClick={noop}>Confirm</Button>
    </ModalFooter>
  </Modal>
);
