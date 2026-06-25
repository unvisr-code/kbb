import { Skeleton, SkeletonCard, SkeletonList } from 'kbb';

export const Shapes = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <Skeleton variant="circular" width={48} height={48} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton variant="text" width={200} height={16} />
      <Skeleton variant="text" width={140} height={12} />
    </div>
    <Skeleton variant="rounded" width={80} height={48} />
  </div>
);

export const SalonCardLoading = () => (
  <div style={{ width: 280 }}>
    <SkeletonCard />
  </div>
);

export const ReviewListLoading = () => (
  <div style={{ width: 320 }}>
    <SkeletonList count={3} />
  </div>
);
