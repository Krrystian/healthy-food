"use client";
import Image from "next/legacy/image";

interface ProductProps {
    product: {
        product_name: string;
        brands: string;
        ingredients_text: string;
        image_url?: string;
        allergens: string;
        nutriments: {
            energy_100g: number;
            carbohydrates_100g: number;
            proteins_100g: number;
            salt_100g: number;
        };
    };
}

const Product: React.FC<ProductProps> = ({ product }) => {
    return (
        <div className="border-2 shadow-lg shadow-black rounded-lg p-2 text-center items-center flex flex-col mx-2">
            <p className='pt-2'><strong>{product.product_name}</strong></p>
            
            {product.image_url ? (
                <div className="relative h-[200px] w-[200px] overflow-hidden rounded-lg flex items-center justify-center">
                    <Image src={product.image_url} alt={product.product_name} layout="fill" className="object-contain" />
                </div>
            ) : (
                <div className="">
                    <p className="text-[#DC2626]">Brak zdjęcia do wyświetlenia</p>
                </div>
            )}
            
            <div className="self-start text-justify">
                <p><strong>Marka:</strong> {product.brands}</p>
                {product.ingredients_text && (
                    <p><strong>Składniki:</strong> {product.ingredients_text}</p>
                )}
                {product.allergens && (
                    <p><strong>Alergeny:</strong> {product.allergens}</p>
                )}
                <h3 className="pt-2 text-md font-semibold text-[#26BDDC]">Wartości odżywcze na 100g produktu:</h3>
                {product.nutriments.energy_100g !== undefined && (
                    <p><strong>Kalorie:</strong> {product.nutriments.energy_100g} kcal</p>
                )}
                
                {product.nutriments.carbohydrates_100g !== undefined && (
                    <p><strong>Węglowodany:</strong> {product.nutriments.carbohydrates_100g} g</p>
                )}
                
                {product.nutriments.proteins_100g !== undefined && (
                    <p><strong>Białko:</strong> {product.nutriments.proteins_100g} g</p>
                )}
                
                {product.nutriments.salt_100g !== undefined && (
                    <p><strong>Sole:</strong> {product.nutriments.salt_100g} g</p>
                )}
            </div>

        </div>
    );
}

export default Product;