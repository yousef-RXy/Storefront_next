import Image from 'next/image';
import { StarRating } from './ui';

const capitalizeCategoryFirstLetter = cat => {
  const str = cat.split(' ')[0].split("'")[0];
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function ProductCard({ product, priority }) {
  const { title, price, image, category, rating } = product;

  return (
    <div className="relative flex flex-col bg-card-bg border border-border-base rounded-xl overflow-hidden hover:border-brand-gold/60 transition-colors h-full">
      <div className="p-4 bg-image-bg flex items-center justify-center h-48 relative">
        <Image
          src={image}
          alt={title}
          priority={priority}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4"
        />
      </div>

      <div className="absolute right-2 top-2 bg-card-bg p-2 rounded-lg flex items-center justify-center z-10">
        <span className="text-xs font-semibold tracking-wider text-gray-400 leading-none">
          {capitalizeCategoryFirstLetter(category)}
        </span>
      </div>

      <div className="flex flex-col grow px-4 py-2">
        <h3 className="text-sm font-medium text-neutral-200 line-clamp-2 mb-2 grow">
          {title}
        </h3>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border-base">
          {rating && (
            <div className="flex items-center gap-1">
              <StarRating rating={rating.rate} />
              <span className="text-xs text-gray-400 font-medium">
                {rating.rate}
              </span>
              <span className="text-[11px] text-gray-600">
                ({rating.count})
              </span>
            </div>
          )}

          <span className="text-lg font-bold text-brand-gold">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
