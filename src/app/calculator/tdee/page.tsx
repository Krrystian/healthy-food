"use client";
import { tdeeSchema } from '@/app/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import BackgroundPattern from "../../components/BackgroundPattern";

export default function Page() {
  const {data: session} = useSession();
  const [gender, setGender] = useState<string>('male');  
  const [weight, setWeight] = useState<any>('');
  const [height, setHeight] = useState<any>('');
  const [age, setAge] = useState<any>('');
  const [activityLevel, setActivity] = useState<any>('');
  const [tdee, setTdee] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      setMessage("Zaloguj się, aby móc zapisać wynik kalkulatora.");
    }
  }, [session]);

  const {register, handleSubmit, formState: { errors }} = useForm<FieldValues>({
    resolver: zodResolver(tdeeSchema),
    defaultValues: {
      weight: '',
      height: '',
      age: '',
      gender: 'male',
      activityLevel: 1.2,
    }
  })

  const calculateTDEE : SubmitHandler<FieldValues> = async (data) => {
    try{
      const { weight, height,age, gender, activityLevel } = data;
    
      let valueBMR: number;
      if(gender === 'male'){
        valueBMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      }
      else{
        valueBMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      let valueTDEE = parseFloat((valueBMR * activityLevel).toFixed(2));
      setTdee(valueTDEE);
    

      if(session){
        const response = await fetch('/api/calculator', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session.user?.id,
            type: "TDEE",
            weight: weight,
            height: height,
            age: age,
            gender: gender,
            activityLevel: activityLevel,
            result: valueTDEE,
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
    <div className='flex w-screen justify-center px-10 mt-[60px] md:mt-[80px] mb-2'>
      <BackgroundPattern/>
      <div>
        <div className='text-center'>
          <h2 className='text-4xl md:text-7xl text-[#26BDDC] mb-3'>KALKULATOR TDEE</h2>
        </div>
        <div className='bg-gray-100 p-8 rounded-lg shadow-lg'>
          <div className='flex flex-col md:flex-row justify-between'>
            <div className='w-full md:w-1/2 md:pr-4 mb-10 md:mb-0'>
              <h3 className='text-3xl md:text-4xl text-[#009E52] mb-4 text-center md:text-left'>Czym jest TDEE?</h3>
              <p className='text-justify'>TDEE to skrót od angielskiego &quot;Total Daily Energy Expenditure&quot;. Informuje o naszym całkowitym dziennym zapotrzebowaniu energetycznym, biorąc pod uwagę naszą aktywność fizyczną.
                Jest ściśle związany ze wskaźnikiem BMR*, ale dodatkowo mnoży wynik poprzez współczynnik odpowiadający stopniowi naszej sprawności. Zatem wzór na wyznaczenie TDEE wygląda następująco:
                <span className="block text-center font-bold my-2">TDEE = BMR * współczynnik_aktywności</span>
                Współczynniki względem aktywności:<br/>
              </p>
              <table className="border-collapse mt-3 w-full md:w-auto text-center md:text-left">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-1 text-left">Stopień aktywności</th>
                    <th className="border border-gray-300 px-4 py-1 text-left">Współczynnik</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-1">Brak aktywności</td>
                    <td className="border border-gray-300 px-4 py-1">1.2</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-1">Lekko aktywny (1-2 dni)</td>
                    <td className="border border-gray-300 px-4 py-1">1.375</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-1">Umiarkowanie aktywny (3-4 dni)</td>
                    <td className="border border-gray-300 px-4 py-1">1.55</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-1">Bardzo aktywny (5-6 dni)</td>
                    <td className="border border-gray-300 px-4 py-1">1.725</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-1">Super aktywny (7 dni)</td>
                    <td className="border border-gray-300 px-4 py-1">1.9</td>
                  </tr>
                </tbody>
              </table>
              <span className='text-sm'>
                *Jeśli chcesz się dowiedzieć jak wyznaczamy BMR - zapraszamy <a href="http://localhost:3000/calculator/bmr" className='text-[#DC2626]'>tutaj</a>. 
              </span>
            </div>
          
            <div className='w-full md:w-1/2 md:pl-4'>
              <h3 className='text-3xl md:text-4xl text-[#009E52] mb-4 text-center md:text-left'>Oblicz swoje TDEE!</h3>
              <form onSubmit={handleSubmit(calculateTDEE)}>
                <table className='w-full'>
                  <tbody>
                  <tr className='p-2'>
                      <td className='text-left pr-4'><label>Płeć:</label></td>
                      <td>
                        <select {...register('gender', {required: true, onChange: (e) => setGender(e.target.value), })} className='w-full p-2 border border-gray-300 rounded'>
                          <option value="male" className='text-base font-sans'>Mężczyzna</option>
                          <option value="female" className='text-base font-sans'>Kobieta</option>
                        </select>
                      </td>
                    </tr>
                    <tr className='p-2'>
                      <td className='text-left pr-4'><label>Waga (kg):</label></td>
                      <td><input type='text' {...register('weight', {required: true, onChange: (e) => setWeight(e.target.value), })} className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/></td>
                    </tr>
                    <tr className='p-2'>
                      <td className='text-left pr-4'><label>Wzrost (cm):</label></td>
                      <td><input type='text' {...register('height', {required: true, onChange: (e) => setHeight(e.target.value), })} className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/></td>
                    </tr>
                    <tr className='p-2'>
                      <td className='text-left pr-4'><label>Wiek:</label></td>
                      <td><input type='text' {...register('age', {required: true, onChange: (e) => setAge(e.target.value), })} className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/></td>
                    </tr>
                    <tr className='p-2'>
                      <td className='text-left pr-4'><label>Aktywność fizyczna:</label></td>
                      <td>
                        <select {...register('activityLevel', {required: true, onChange: (e) => setActivity(e.target.value), })}  className='w-full p-2 border border-gray-300 rounded'>
                          <option value={1.2} className='text-base font-sans'>Brak aktywności</option>
                          <option value={1.375} className='text-base font-sans'>Lekko aktywny (1-2 dni)</option>
                          <option value={1.55} className='text-base font-sans'>Umiarkowanie aktywny (3-4 dni)</option>
                          <option value={1.725} className='text-base font-sans'>Bardzo aktywny (5-6 dni)</option>
                          <option value={1.9} className='text-base font-sans'>Super aktywny (7 dni)</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className='text-center p-2'>
                        <button type='submit' className='p-2 border-2 border-[#023047] rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-lg font-medium'>
                          Oblicz TDEE
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
              {(tdee !== null || message) && (
                <div className='mt-4 text-center'>
                  <div className='font-semibold'>
                    Twoje TDEE: {tdee}
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

