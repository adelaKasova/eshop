
// We'll use heroicons or custom svg. Since I didn't install heroicons, I'll use SVG directly to be self-contained.

interface RatingProps {
    rating: number; // 0-5
}

export const Rating = ({ rating }: RatingProps) => {
    // Round to nearest 0.5
    const roundedRating = Math.round(rating * 2) / 2;

    return (
        <div className="flex items-center space-x-0.5">
            {[1, 2, 3, 4, 5].map((star) => {
                // Full star
                if (roundedRating >= star) {
                    return (
                        <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    );
                }
                // Half star logic implies we'd need a half-star SVG or check vs star-0.5
                // For simplicity in this SVG set, let's treat partial as full or use a background fill trick.
                // Actually, let's just stick to full/empty for simplicity unless specifically asked for half-star visual precision with SVGs.
                // But let's try to be precise:

                const isHalf = roundedRating >= star - 0.5;

                return (
                    <div key={star} className="relative w-4 h-4">
                        {/* Empty background */}
                        <svg className="w-full h-full text-gray-300 absolute" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {/* Fill overlay if full or half */}
                        {(roundedRating >= star || isHalf) && (
                            <div className={`overflow-hidden absolute top-0 left-0 h-full ${roundedRating >= star ? 'w-full' : 'w-1/2'}`}>
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
