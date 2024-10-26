"use client";
import Image from "next/legacy/image";

interface ProductProps {
    product: {
        product_name: string;
        brands: string;
        ingredients_text: string;
        image_url: string;
    };
}

const Product: React.FC<ProductProps> = ({ product }) => {
    return (
        <div>
            <p className='pt-2'><strong>{product.product_name}</strong></p>
            <div className="relative h-[200px] w-[200px]">
                <Image src={product.image_url} alt={product.product_name} layout="fill" className="object-contain rounded-lg shadow-lg" />
            </div>
            <p><strong>Marka:</strong> {product.brands}</p>
            <p><strong>Składniki:</strong> {product.ingredients_text}</p>
        </div>
    );
}

export default Product;