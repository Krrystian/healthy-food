"use client";
import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';
import axios from 'axios';
import Product from './Product';

const BarcodeScanner: React.FC = () => {
  const [mode, setMode] = useState<'camera' | 'image' | null>(null);
  const [product, setProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const scannerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === 'camera' && scannerRef.current) {
      Quagga.init({
        inputStream: {
          type: 'LiveStream',
          target: scannerRef.current,
          constraints: {
            facingMode: 'environment', // Użycie kamery 
          },
        },
        decoder: {
          readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'upc_reader'],
        },
      }, (err : any) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      });

      Quagga.onDetected(async (result : any) => {
        const code = result.codeResult.code;
        console.log(`Odczytano kod kreskowy: ${code}`);
        await fetchProductData(code);
        Quagga.stop();
      });

      return () => {
        Quagga.stop();
      };
    }
  }, [mode]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Quagga.decodeSingle({
        src: URL.createObjectURL(file),
        numOfWorkers: 0, 
        inputStream: {
          size: 800,
        },
        decoder: {
          readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'upc_reader'],
        },
      }, async (result : any) => {
        if (result && result.codeResult) {
          const code = result.codeResult.code;
          console.log(`Odczytano kod kreskowy z obrazu: ${code}`);
          await fetchProductData(code);
        } else {
          console.error('Nie udało się odczytać kodu kreskowego z obrazu.');
        }
      });
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://pl.openfoodfacts.org/cgi/search.pl`, {
        params: {
          search_terms: searchTerm,
          json: true,
        },
      });
      if (response.data && response.data.products.length > 0) {
        setProduct(response.data.products[0]);
        console.log(response.data.products[0]);
      } else {
        console.log('Nie znaleziono produktu.');
      }
    } catch (error) {
      console.error('Błąd podczas wyszukiwania produktu:', error);
    }
  };
  

  const fetchProductData = async (barcode: string) => {
    try {
      const response = await axios.get(`https://pl.openfoodfacts.org/api/v0/product/${barcode}.json`);
      if (response.data && response.data.product) {
        setProduct(response.data.product);
        console.log(response.data);
        console.log(response.data.product);
      } else {
        console.log('Nie znaleziono produktu dla tego kodu kreskowego.');
      }
    } catch (error) {
      console.error('Błąd podczas pobierania danych produktu:', error);
    }
  };
  

  return (
    <div className='my-[5px] grid grid-cols-2'>
      <div className='w-full'>
      <h3 className='font-semibold text-2xl text-[#009E52]'>Wybierz metodę wyszukiwania:</h3>
      <div className='py-5'>
        <label>Wyszukaj produkt po nazwie lub kodzie</label>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='w-3/4 p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none text-black' />
        <button onClick={handleSearch} className='p-2 m-2 text-white border-2 border-white rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-lg font-medium w-fit'>Szukaj</button>
      </div>

        {!mode && (
          <div>
            <label>Wprowadź zdjęcie kodu kreskowego lub zeskanuj kod za pomocą kamery</label><br/>
            <button onClick={() => setMode('camera')} className='p-2 m-2 text-white border-2 border-white rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-lg font-medium w-fit'>Użyj kamery</button>
            <button onClick={() => setMode('image')} className='p-2 text-white border-2 border-white rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-lg font-medium w-fit'>Prześlij zdjęcie kodu</button>
          </div>
        )}

        {mode === 'camera' && (
          <div>
            <div ref={scannerRef} style={{ width: '100%', height: '400px' }} />
            <button onClick={() => setMode(null)} className='p-2 text-white border-2 border-white rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-lg font-medium w-fit'>Powrót</button>
          </div>
        )}

        {mode === 'image' && (
          <div>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} />
            <button onClick={() => setMode(null)} className='p-2 text-white border-2 border-white rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-lg font-medium w-fit'>Powrót</button>
          </div>
        )}
      </div>


      <div className='w-full'>
        {product && (
          <div>
            <h3 className='font-semibold text-2xl text-[#009E52]'>Informacje o produkcie:</h3>
            <Product product={product}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner;
