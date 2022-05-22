import { tap } from 'rxjs/operators';

export function latestByDate<
  TItems extends Array<{ createdAt: string }> = Array<{ createdAt: string }>,
>() {
  return tap<TItems>((items) =>
    items.sort((a, b) => {
      const d1 = new Date(a.createdAt);
      const d2 = new Date(b.createdAt);
      return d2.getTime() - d1.getTime();
    }),
  );
}
