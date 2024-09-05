"use client";
import { bmrSchema } from '@/app/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

export default function Page() {
  const {data: session} = useSession();
  const [gender, setGender] = useState<string>('male');  
  const [weight, setWeight] = useState<any>('');
  const [height, setHeight] = useState<any>('');
  const [age, setAge] = useState<any>('');
  const [bmr, setBmr] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      setMessage("Zaloguj się, aby móc zapisać wynik kalkulatora.");
    }
  }, [session]);

  const {register, handleSubmit, formState: { errors }} = useForm<FieldValues>({
    resolver: zodResolver(bmrSchema),
    defaultValues: {
      weight: '',
      height: '',
      age: '',
      gender: 'male',
    }
  })

  const calculateBMR : SubmitHandler<FieldValues> = async (data) => {
    try{
      const { weight, height, age, gender } = data;
    
      let valueBMR: number;
      if(gender === 'male'){
        valueBMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      }
      else{
        valueBMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      valueBMR = parseFloat(valueBMR.toFixed(2))
      setBmr(valueBMR);
    
    
      if(session){
        const response = await fetch('/api/auth/calculator', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session.user?.id,
            type: "BMR",
            weight: weight,
            height: height,
            age: age,
            gender: gender,
            result: valueBMR,
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
      <div>
        <div className='text-center'>
          <h2 className='text-7xl text-[#26BDDC] mb-3'>KALKULATOR BMR</h2>
        </div>
        <div className='bg-gray-100 p-5 rounded-lg shadow-lg'>
          <div className='flex flex-row justify-between'>
            <div className='w-1/2 pr-4'>
              <h3 className='text-4xl text-[#009E52] mb-4'>Czym jest BMR?</h3>
              <p>BMR to skrót od angielskiego &quot;Basal Metabolic Rate&quot;. Korzystając z kalkulatora BMR możemy dowiedzieć się jakie jest nasze dzienne zapotrzebowanie kaloryczne. 
                Wiedza ta jest niezwykle przydatna, jeśli chcemy odżywiać się zdrowo względem naszego wzrostu, wagi, wieku oraz płci. 
                Wzorów do wyznaczenia BMR jest kilka, jednakże w naszych obliczeniach korzystamy z równań Harrisa-Benedicta, opracowanych w 1984 roku, które wyglądają następująco:
                <br/>Dla mężczyzn:<span className="block text-center font-bold my-2">BMR = 88.362 + (13.397 * waga) + (4.799 * wzrost_w_cm) - (5.677 * wiek)</span>
                Dla kobiet:<span className="block text-center font-bold my-2">BMR = 447.593 + (9.247 * waga) + (3.098 * wzrost_w_cm) - (4.330 * wiek)</span>
              </p>
            </div>

            <div className='w-1/2 pl-4'>
              <h3 className='text-4xl text-[#009E52] mb-4'>Oblicz swoje BMR!</h3>
              <form onSubmit={handleSubmit(calculateBMR)}>
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
                    <tr>
                      <td colSpan={2} className='text-center p-2'>
                        <button type='submit' className='p-2 border-2 border-[#023047] rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-lg font-medium'>Oblicz BMR</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
              {(bmr !== null || message) && (
                <div className='mt-4 text-center'>
                  <div className='font-semibold'>
                    Twoje BMR: {bmr}
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

