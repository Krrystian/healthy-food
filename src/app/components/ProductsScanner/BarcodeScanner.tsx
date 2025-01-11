"use client";
import React, { useRef, useState } from 'react';
import Quagga from 'quagga';
import axios from 'axios';
import Product from './Product';
import Image from "next/legacy/image";
import { motion } from "framer-motion";
import Loader from './Loader';

const BarcodeScanner: React.FC = () => {
  const [products, setProduct] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMessage('');
    setSearchTerm('');
    setProduct([]);
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
          setSearchMessage('Nie udało się odczytać kodu kreskowego z obrazu.');
        }
      });
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setProduct([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
  }
  
    try {
      const response = await axios.get(`https://pl.openfoodfacts.org/cgi/search.pl`, {
        params: {
          search_terms: searchTerm,
          json: true,
          countries_tags: "poland",
        },
      });
      if (response.data && response.data.products.length > 0) {
        const topResults = response.data.products.slice(0, 10);
        setProduct(topResults);
        setSearchMessage('*Jeśli szukany produkt dalej nie znajduje się na liście, spróbuj podać dokładniejszą nazwę lub wyszukać go za pomocą kodu lub zdjęcia kodu kreskowego.');
        console.log(topResults);
      } else {
        setSearchMessage('Nie znaleziono produktu.');
        
      }
    } catch (error) {
      console.error('Błąd podczas wyszukiwania produktu:', error);
      setSearchMessage('Nastąpił błąd podczas wyszukiwania produktu. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductData = async (barcode: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://pl.openfoodfacts.org/api/v0/product/${barcode}.json`);
      if (response.data && response.data.product) {
        const product = response.data.product;
        if (product.countries_tags && product.countries_tags.includes('en:poland')) {
          setProduct((prevProducts:any) => {
            if (!prevProducts.some((existingProduct: any) => existingProduct.code === barcode)) {
                return [product]; // dodanie nowego produktu
            } else {
                return prevProducts; // zwrócenie poprzedniej tablicy, jeśli barcode był taki sam (w sytuacji dodania dwa razy tego samego zdjęcia)
            }
        });            
        console.log(response.data.product);
        } else {
            setSearchMessage('Produkt nie jest dostępny w Polsce.');
        }
    } else {
        setSearchMessage('Nie znaleziono produktu dla tego kodu kreskowego.');
    }
    } catch (error) {
      console.error('Błąd podczas pobierania danych produktu:', error);
      setSearchMessage('Nastąpił błąd podczas pobierania danych produktu. Spróbuj ponownie.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className='my-[5px] grid grid-cols-1 md:grid-cols-2 md:gap-4 text-center md:text-left'>
      <div className='w-full'>
        <h3 className='font-semibold text-xl md:text-2xl text-[#009E52]'>Wyszukaj produkt:</h3>
        <div className='py-2 md:py-5'>
          <label>Wyszukaj produkt po nazwie lub kodzie:</label>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Wprowadź dane'
            className='w-2/3 p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none text-black'
          />
          <button onClick={handleSearch} className='p-2 m-2 text-white border-2 border-white rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-lg font-medium w-fit'>
            Szukaj
          </button>
        </div>

        <div >
          <label>Prześlij zdjęcie kodu kreskowego:</label><br />
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload}
            className='p-2 mt-2 text-white border-2 border-white rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-lg font-medium w-[300px]'
          />
        </div>


        {searchMessage && ( 
          <div className='mt-10'>
            <h2 className="text-md md:text-xl xl:text-2xl font-semibold text-[#FB8500] mt-2">{searchMessage}</h2>
          </div>
        )}
      </div>
      

      <div className='w-full mt-10 md:mt-0'>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : products.length > 0 ? (
          <div>
            <h3 className='font-semibold text-xl md:text-2xl text-[#009E52] mb-4'>Wyniki wyszukiwania:</h3>
            <motion.div
              className="flex overflow-x-scroll no-scrollbar space-x-4"
              drag="x"
              dragConstraints={{ left: -1000, right: 0 }}
            >
              {products.map((product: any, index: any) => (
                <motion.div key={index} className="flex-none w-full">
                  <Product product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="relative h-[300px] md:h-[500px] w-full transform transition-transform duration-300 hover:scale-105">
            <Image src="/lupe.png" layout="fill" className="object-contain" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner;



/*
//ewentualnie z kamerą
"use client";
import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';
import axios from 'axios';
import Product from './Product';
import Image from "next/legacy/image";
import { motion } from "framer-motion";

const BarcodeScanner: React.FC = () => {
  const [mode, setMode] = useState<'camera' | 'image' | null>(null);
  const [products, setProduct] = useState<any>([]);
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
          countries_tags: "poland",
        },
      });
      if (response.data && response.data.products.length > 0) {
        const topResults = response.data.products.slice(0, 10);
        setProduct(topResults);
        console.log(topResults);
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
        const product = response.data.product;
        if (product.countries_tags && product.countries_tags.includes('en:poland')) {
          setProduct(response.data.product);
        //console.log(response.data);
        console.log(response.data.product);
        } else {
          console.log('Produkt nie jest dostępny w Polsce.');
        }
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
        {products.length > 0 ? (
          <div>
            <h3 className='font-semibold text-2xl text-[#009E52] mb-4'>Wyniki wyszukiwania:</h3>
            <motion.div 
              className="flex overflow-x-scroll hide-scrollbar space-x-4"
              drag="x"
              dragConstraints={{ left: -1000, right: 0 }}
              
            >
              {products.map((product: any, index: any) => (
                <motion.div key={index} className="flex-none w-full">
                  <Product product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="relative h-[500px] w-full transform transition-transform duration-300 hover:scale-105">
            <Image src="/lupe.png" layout="fill" className="object-contain" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner;
*/