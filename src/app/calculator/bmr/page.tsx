"use client";
import React, { FormEvent, useState } from 'react'

export default function Page() {
  const [gender, setGender] = useState<string>('male');  
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [bmr, setBmr] = useState<number | null>(null);

  const calculateBMR = (e : FormEvent<HTMLFormElement>) : void => {
    e.preventDefault();
    if (height > 0 && weight > 0 && age > 0) {
      let valueBMR: number;
      if(gender === 'male'){
        valueBMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      }
      else{
        valueBMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      setBmr(parseFloat(valueBMR.toFixed(2)));
    }    
  }

  
  return (
    <div className='flex w-screen h-screen justify-center items-center px-10'>
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
              <form onSubmit={calculateBMR}>
                <table className='w-full'>
                  <tbody>
                    <tr className='p-2'>
                      <td className='text-left pr-4'><label>Płeć:</label></td>
                      <td>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} className='w-full p-2 border border-gray-300 rounded'>
                          <option value="male" className='text-base font-sans'>Mężczyzna</option>
                          <option value="female" className='text-base font-sans'>Kobieta</option>
                        </select>
                      </td>
                    </tr>
                    <tr className='p-2'>
                      <td className='text-left pr-4'><label>Waga (kg):</label></td>
                      <td><input type='number' value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} required className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/></td>
                    </tr>
                    <tr className='p-2'>
                      <td className='text-left pr-4'><label>Wzrost (cm):</label></td>
                      <td><input type='number' value={height} onChange={(e) => setHeight(parseFloat(e.target.value))} required className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/></td>
                    </tr>
                    <tr className='p-2'>
                      <td className='text-left pr-4'><label>Wiek:</label></td>
                      <td><input type='number' value={age} onChange={(e) => setAge(parseFloat(e.target.value))} required className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/></td>
                    </tr>
                    <tr>
                      <td colSpan={2} className='text-center p-2'>
                        <button type='submit' className='p-2 border-2 border-[#023047] rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-lg font-medium'>Oblicz BMR</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
              {bmr !== null && (
                <div className='mt-4 text-center'>
                  Twoje BMR: {bmr}
                </div>
              )}
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}

