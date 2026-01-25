'use client';

import { Product } from '@/types/product';
import { Rating } from '../Rating/Rating';
import { BuyButton } from '../BuyButton/BuyButton';
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
}

// Simple HTML entity decode helper for this component level
const decodeHtml = (html: string) => {
    return html.replace(/&nbsp;/g, ' ').replace(/&gt;/g, '>').replace(/&lt;/g, '<');
};

export const ProductCard = ({ product }: ProductCardProps) => {
    const stockColor = product.avail_color ? `#${product.avail_color}` : '#666666';

    return (
        <article className="
      group flex flex-col h-full p-4 bg-white border border-transparent 
      transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:z-10
    ">
            <div className="flex justify-center mb-4 h-48 relative">
                <Image
                    src={product.img}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain max-h-full"
                    unoptimized // Alza images are external
                />
            </div>

            <div className="flex flex-col flex-grow">
                <h3 className="text-base font-semibold mb-2 line-clamp-2 min-h-[3rem]" title={product.name}>
                    {product.name}
                </h3>

                <div className="mb-2">
                    <Rating rating={product.rating} />
                </div>

                <p className="text-sm text-text-light mb-2 line-clamp-3 leading-snug min-h-[3.75rem]">
                    {decodeHtml(product.spec)}
                </p>

                {product.promo_cnt > 0 && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2 self-start font-medium">
                        + ZDARMA
                    </span>
                )}

                <div className="mt-auto mb-2 flex flex-col">
                    <span className="text-price text-xl font-bold">
                        {decodeHtml(product.price)}
                    </span>
                    {product.cprice && (
                        <span className="text-price-original text-sm line-through">
                            {decodeHtml(product.cprice)}
                        </span>
                    )}
                </div>

                <div className="flex mb-2">
                    <div className="w-full">
                        <BuyButton />
                    </div>
                </div>

                <div
                    className="text-sm font-medium text-right min-h-[1.25rem]"
                    style={{ color: stockColor }}
                >
                    {decodeHtml(product.avail)}
                </div>
            </div>
        </article>
    );
};
