import { Star } from 'lucide-react';

export default function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        let fillPercentage = 0;

        if (rating >= starValue) {
          fillPercentage = 100;
        } else if (rating > starValue - 1) {
          fillPercentage = (rating - (starValue - 1)) * 100;
        }

        return (
          <div key={index} className="relative w-3 h-3 inline-block">
            <Star className="w-3 h-3 text-border-base fill-none absolute top-0 left-0" />
            <div
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star className="w-3 h-3 text-brand-gold fill-brand-gold max-w-none" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
