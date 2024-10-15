"use client";
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { bmiSchema } from '@/app/lib/zod';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import BackgroundPattern from "../../components/BackgroundPattern";

export default function Page() {
  const {data: session} = useSession();
  const [weight, setWeight] = useState<any>('');
  const [height, setHeight] = useState<any>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [row, setRow] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      setMessage("Zaloguj się, aby móc zapisać wynik kalkulatora.");
    }
  }, [session]);

  const {register, handleSubmit, formState: { errors }} = useForm<FieldValues>({
    resolver: zodResolver(bmiSchema),
    defaultValues: {
      weight: '',
      height: ''
    }
  })
  
  const calculateBMI : SubmitHandler<FieldValues> = async (data) => {
    try{
      const { weight, height } = data;

      const heightInMeters = Number(height) / 100;
      const valueBMI = (Number(weight) / (heightInMeters * heightInMeters)).toFixed(2);
      const bmiVal = parseFloat(valueBMI);
      setBmi(bmiVal);

      let rowToHighlight = null; 
      if(bmiVal < 16) rowToHighlight = 1;
      else if(bmiVal >= 16 && bmiVal <= 16.9) rowToHighlight = 2;
      else if(bmiVal >= 17 && bmiVal<= 18.5) rowToHighlight = 3;
      else if(bmiVal >= 18.5 && bmiVal<= 24.9) rowToHighlight = 4;
      else if(bmiVal >= 25 && bmiVal<= 29.9) rowToHighlight = 5;  
      else if(bmiVal >= 30 && bmiVal<= 34.9) rowToHighlight = 6;
      else if(bmiVal >= 35 && bmiVal <= 39.9) rowToHighlight = 7;
      else rowToHighlight = 8;

      setRow(rowToHighlight);

      if(session){
        const response = await fetch('/api/auth/calculator', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session.user?.id,
            type: "BMI",
            weight: weight,
            height: height,
            result: bmiVal,
          }),
        });

        if (response.ok) {
          setMessage('Wynik został zapisany pomyślnie.');
        } else {
          setMessage('Wystąpił problem podczas zapisywania wyniku.');
        }
      }
     
    } catch{
      console.log(errors)
    }
  }

  return (
    <div className='flex w-screen justify-center px-10 mt-[80px]'>
      <BackgroundPattern/>
      <div>
        <div className='text-center'>
          <h2 className='text-7xl text-[#26BDDC] mb-3'>KALKULATOR BMI</h2>
        </div>
        <div className='bg-gray-100 p-5 rounded-lg shadow-lg'>
          <div className='flex flex-row justify-between'>
            <div className='w-1/2 pr-4'>
              <h3 className='text-4xl text-[#009E52] mb-4'>Czym jest BMI?</h3>
              <p>Wskaźnik BMI to skrót od angielskiego &quot;Body Mass Index&quot;. Informuje nas o stosunku naszej masy ciała (wagi) do wzrostu.
                Kalkulator BMI to zatem przydatne narzędzie, dzięki któremu możemy dowiedzieć się czy nasza waga jest odpowiednia względem naszego wzrostu.
                Wzór na wyznaczenie BMI stworzył Adolphe Quetelet już w 1832 roku i wygląda następująco:<span className="block text-center font-bold my-2">BMI = waga / (wzrost_w_metrach &sup2;)</span>
                Normy BMI:<br/>
              </p>
              <table className="border-collapse mt-3">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-1 text-left">BMI</th>
                    <th className="border border-gray-300 px-4 py-1 text-left">Interpretacja wyniku</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={row === 1 ? 'bg-[#FFB703]' : ''}>
                    <td className="border border-gray-300 px-4 py-1">&lt;16,0</td>
                    <td className="border border-gray-300 px-4 py-1">wygłodzenie</td>
                  </tr>
                  <tr className={row === 2 ? 'bg-[#FFB703]' : ''}>
                    <td className="border border-gray-300 px-4 py-1">16,0 - 16,9</td>
                    <td className="border border-gray-300 px-4 py-1">wychudzenie</td>
                  </tr>
                  <tr className={row === 3 ? 'bg-[#FFB703]' : ''}>
                    <td className="border border-gray-300 px-4 py-1">17,0 - 18,5</td>
                    <td className="border border-gray-300 px-4 py-1">niedowaga</td>
                  </tr>
                  <tr className={row === 4 ? 'bg-[#009E52]' : ''}>
                    <td className="border border-gray-300 px-4 py-1">18,6 - 24,9</td>
                    <td className="border border-gray-300 px-4 py-1">waga prawidłowa</td>
                  </tr>
                  <tr className={row === 5 ? 'bg-[#DC2626]' : ''}>
                    <td className="border border-gray-300 px-4 py-1">25,0 - 29,9</td>
                    <td className="border border-gray-300 px-4 py-1">nadwaga</td>
                  </tr>
                  <tr className={row === 6 ? 'bg-[#DC2626]' : ''}>
                    <td className="border border-gray-300 px-4 py-1">30,0 - 34,9</td>
                    <td className="border border-gray-300 px-4 py-1">otyłość I stopnia</td>
                  </tr>
                  <tr className={row === 7 ? 'bg-[#DC2626]' : ''}>
                    <td className="border border-gray-300 px-4 py-1">35,0 - 39,9</td>
                    <td className="border border-gray-300 px-4 py-1">otyłość II stopnia</td>
                  </tr>
                  <tr className={row === 8 ? 'bg-[#DC2626]' : ''}>
                    <td className="border border-gray-300 px-4 py-1">&ge;40,0</td>
                    <td className="border border-gray-300 px-4 py-1">otyłość III stopnia</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='w-1/2 pl-4'>
              <h3 className='text-4xl text-[#009E52] mb-4'>Oblicz swoje BMI!</h3>
              <form onSubmit={handleSubmit(calculateBMI)}>
                <table className='w-full'>
                  <tbody>
                    <tr className='p-2'>
                      <td className='pr-4 text-left'><label>Waga (kg):</label></td>
                      <td><input type='text' {...register('weight', {required: true, onChange: (e) => setWeight(e.target.value), })}  className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/></td>
                    </tr>
                    <tr className='p-2'>
                      <td className='text-left pr-4'><label>Wzrost (cm):</label></td>
                      <td><input type='text'
                        {...register('height', {required: true, onChange: (e) => setHeight(e.target.value), })} 
                        className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/></td>
                    </tr>
                    <tr>
                      <td colSpan={2} className='text-center p-2'>
                        <button type='submit' className='p-2 border-2 border-[#023047] rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-lg font-medium'>Oblicz BMI</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
              {(bmi !== null || message) && (
                <div className='mt-4 text-center'>
                  <div className='font-semibold'>
                    Twoje BMI: {bmi}
                    <br />
                    {row === 1 || row === 2 || row === 3 ? "Twoje BMI jest zbyt niskie. Zaleca się konsultację z lekarzem."
                      : row === 4 ? "Twoje BMI jest w normie!"
                      : (row === 5 || row === 6 || row === 7 || row === 8)
                      ? "Twoje BMI jest za wysokie. Rozważ zmianę diety i stylu życia."
                      : ""
                    }
                  </div>
                  <div className='text-[#DC2626]'>
                    {message}                
                  </div>
                </div>
              )}
            </div>            
          </div>
        </div>
      </div>
    </div>
  )
}
