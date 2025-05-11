import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { HealthProduct } from '@/data/healthProducts';

interface ProductAdProps {
  product: HealthProduct;
}

const ProductAd: React.FC<ProductAdProps> = ({ product }) => {
  return (
    <div className="flex flex-col bg-white/90 rounded-lg shadow-sm border border-primary/20 p-3 my-2 max-w-sm">
      <div className="flex items-center gap-3">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-20 h-16 object-cover rounded-md"
        />
        <div>
          <h4 className="font-medium text-gray-900">{product.name}</h4>
          <p className="text-xs text-gray-600">Sponsored</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-700 mt-2">{product.description}</p>
      
      <a 
        href={product.purchaseLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="mt-2"
      >
        <Button variant="outline" size="sm" className="w-full text-xs flex items-center justify-center gap-1">
          Learn More <ExternalLink className="h-3 w-3" />
        </Button>
      </a>
    </div>
  );
};

export default ProductAd;
