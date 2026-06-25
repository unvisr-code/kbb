import { Select } from 'kbb';

const districts = [
  { value: 'hongdae', label: 'Hongdae' },
  { value: 'gangnam', label: 'Gangnam' },
  { value: 'myeongdong', label: 'Myeongdong' },
  { value: 'itaewon', label: 'Itaewon' },
];
const services = [
  { value: 'mani', label: 'Gel Manicure' },
  { value: 'pedi', label: 'Gel Pedicure' },
  { value: 'art', label: 'Nail Art' },
  { value: 'care', label: 'Basic Care' },
];
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16, width: 320 };

export const Default = () => (
  <div style={col}>
    <Select label="District" placeholder="Choose a district" options={districts} />
    <Select label="Service" options={services} defaultValue="mani" />
  </div>
);

export const States = () => (
  <div style={col}>
    <Select label="District" placeholder="Choose a district" options={districts} error="Please select a district" />
    <Select label="Service" options={services} hint="You can change this later" defaultValue="art" />
    <Select label="Time slot" options={[{ value: 'x', label: 'Fully booked' }]} disabled defaultValue="x" />
  </div>
);
