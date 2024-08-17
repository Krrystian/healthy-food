"use client";
import React, { FormEvent, useState } from 'react'

export default function Page() {
  const [gender, setGender] = useState<string>('male');  
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [activity, setActivity] = useState<number>(1.2);
  const [tdee, setTdee] = useState<number | null>(null);

  const calculateTDEE = (e : FormEvent<HTMLFormElement>) : void => {
    e.preventDefault();
    if (height > 0 && weight > 0 && age > 0) {
      let valueBMR: number;
      if(gender === 'male'){
        valueBMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      }
      else{
        valueBMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      setTdee(parseFloat((valueBMR * activity).toFixed(2)));
    }    
  }

  return (
    <div className='flex w-screen justify-center px-10 mt-24'>
      <div>
        <div className='text-center'>
          <h2 className='text-7xl text-[#26BDDC] mb-3'>KALKULATOR TDEE</h2>
        </div>
        <div className='bg-gray-100 p-8 rounded-lg shadow-lg'>
          <div className='flex flex-row justify-between'>
            <div className='w-1/2 pr-4'>
              <h3 className='text-4xl text-[#009E52] mb-4'>Czym jest TDEE?</h3>
              <p>TDEE to skrót od angielskiego &quot;Total Daily Energy Expenditure&quot;. Informuje o naszym całkowitym dziennym zapotrzebowaniu energetycznym, biorąc pod uwagę naszą aktywność fizyczną.
                Jest ściśle związany ze wskaźnikiem BMR*, ale dodatkowo mnoży wynik poprzez współczynnik odpowiadający stopniowi naszej sprawności. Zatem wzór na wyznaczenie TDEE wygląda następująco:
                <span className="block text-center font-bold my-2">TDEE = BMR * współczynnik_aktywności</span>
                Współczynniki względem aktywności:<br/>
              </p>
              <table className="border-collapse mt-3">
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
          
            <div className='w-1/2 pl-4'>
              <h3 className='text-4xl text-[#009E52] mb-4'>Oblicz swoje TDEE!</h3>
              <form onSubmit={calculateTDEE}>
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
                    <tr className='p-2'>
                      <td className='text-left pr-4'><label>Aktywność fizyczna:</label></td>
                      <td>
                        <select value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))} className='w-full p-2 border border-gray-300 rounded'>
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
              {tdee !== null && (
                <div className='mt-4 text-center'>
                  Twoje TDEE: {tdee}
                </div>
              )}
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
  
}

