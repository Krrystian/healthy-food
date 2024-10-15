"use client";
import React, { useState } from 'react'
import BackgroundPattern from "../../components/BackgroundPattern";

export default function Page() {
    const [gender, setGender] = useState<string>('male');  
    const [weight, setWeight] = useState<any>('');
    const [targetWeight, setTargetWeight] = useState<any>('');
    const [height, setHeight] = useState<any>('');
    const [age, setAge] = useState<any>('');

  return (
    <div className='flex w-screen justify-center px-10 mt-[80px]'>
        <BackgroundPattern/>
        <div className='bg-gray-100 p-8 rounded-lg shadow-lg my-[5px]'>
            <form>
                <table className='w-full'>
                    <tbody>
                        <tr className='py-4'>
                            <td colSpan={2} className='text-xl font-medium text-center'>Podstawowe informacje</td>
                        </tr>
                        <tr>
                            <td colSpan={2}><hr className='my-4 border-gray-300'/></td>
                        </tr>
                        <tr className='py-4'>
                            <td className='text-left pr-4'><label>Płeć:</label></td>
                            <td>
                                <select value={ gender } required className='w-full p-2 border border-gray-300 rounded'>
                                    <option value="male" className='text-base font-sans'>Mężczyzna</option>
                                    <option value="female" className='text-base font-sans'>Kobieta</option>
                                </select>
                            </td>
                        </tr>
                        <tr className='py-4'>
                            <td className='text-left pr-4'><label>Wzrost (cm):</label></td>
                            <td><input type='text' className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/></td>
                        </tr>
                        <tr className='py-4'>
                            <td className='text-left pr-4'><label>Wiek:</label></td>
                            <td><input type='text' className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/></td>
                        </tr>
                        <tr className='py-4'>
                            <td className='text-left pr-4'><label>Waga (kg):</label></td>
                            <td><input type='text' className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/></td>
                        </tr>
                        <tr className='py-4'>
                            <td className='text-left pr-4'><label>Waga docelowa (kg):</label></td>
                            <td><input type='text' className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><hr className='my-4 border-gray-300'/></td>
                        </tr>
                        <tr className='py-4'>
                            <td className='text-left pr-4'><label>Cel diety:</label></td>
                            <td>
                                <select required className='w-full p-2 border border-gray-300 rounded'>
                                    <option value="lossWeight" className='text-base font-sans'>Schudnąć</option>
                                    <option value="maintainWeight" className='text-base font-sans'>Utrzymać wagę</option>
                                    <option value="gainWeight" className='text-base font-sans'>Przybrać na wadze</option>
                                </select>
                            </td>
                        </tr>
                        <tr className='py-4'>
                            <td className='text-left pr-4'><label>Aktywność fizyczna:</label></td>
                            <td>
                                <select  className='w-full p-2 border border-gray-300 rounded'>
                                <option value={1.2} className='text-base font-sans'>Brak aktywności</option>
                                <option value={1.375} className='text-base font-sans'>Lekko aktywny (1-2 dni)</option>
                                <option value={1.55} className='text-base font-sans'>Umiarkowanie aktywny (3-4 dni)</option>
                                <option value={1.725} className='text-base font-sans'>Bardzo aktywny (5-6 dni)</option>
                                <option value={1.9} className='text-base font-sans'>Super aktywny (7 dni)</option>
                                </select>
                            </td>
                        </tr>
                        <tr className='py-4'>
                            <td colSpan={2}><hr className='my-4 border-gray-300'/></td>
                        </tr>
                        <tr className='py-4'>
                            <td className='text-left pr-4'>Rodzaj diety:</td>
                            <td>
                                <div>
                                    <label className='block text-base font-sans'>
                                        <input type='checkbox' value='Standardowa' className='mr-2 accent-[#009E52]' />
                                        Standardowa</label>
                                    <label className='block text-base font-sans'>
                                        <input type='checkbox' value='Wegetariańska' className='mr-2 accent-[#009E52]' />
                                        Wegetariańska</label>
                                    <label className='block text-base font-sans'>
                                        <input type='checkbox' value='Wegańska' className='mr-2 accent-[#009E52]' />
                                        Wegańska</label>
                                    <label className='block text-base font-sans'>
                                        <input type='checkbox' value='Pescowegetariańska' className='mr-2 accent-[#009E52]' />
                                        Pescowegetariańska (wegetariańska z rybami)</label>
                                    <label className='block text-base font-sans'>
                                        <input type='checkbox' value='Dieta niskotłuszczowa' className='mr-2 accent-[#009E52]' />
                                        Dieta niskotłuszczowa</label>
                                    <label className='block text-base font-sans'>
                                        <input type='checkbox' value='Dieta bezglutenowa' className='mr-2 accent-[#009E52]' />
                                        Dieta bezglutenowa</label>
                                    <label className='block text-base font-sans'>
                                        <input type='checkbox' value='Dieta niskowęglowodanowa' className='mr-2 accent-[#009E52]' />
                                        Dieta niskowęglowodanowa</label>
                                    <label className='block text-base font-sans'>
                                        <input type='checkbox' value='Dieta wysokobiałkowa' className='mr-2 accent-[#009E52]' />
                                        Dieta wysokobiałkowa</label>
                                </div>
                            </td>
                        </tr>
                        <tr className='py-4'>
                            <td colSpan={2}><hr className='my-4 border-gray-300'/></td>
                        </tr>
                        <tr className='py-4'>
                            <td>Nietolerancje pokarmowe:</td>
                            <td>
                                <div>
                                    <label className='block text-base font-sans'>
                                        <input type='checkbox' value='' className='mr-2 accent-[#009E52]' />
                                        Gluten</label>
                                    <label className='block text-base font-sans'>
                                        <input type='checkbox' value='' className='mr-2 accent-[#009E52]' />
                                        Laktoza</label>
                                    <label className='block text-base font-sans'>
                                        <input type='checkbox' value='' className='mr-2 accent-[#009E52]' />
                                        Fruktoza</label>
                                    </div>
                            </td>
                        </tr>
                        <tr className='py-4'>
                            <td colSpan={2}><hr className='my-4 border-gray-300'/></td>
                        </tr>
                        <tr className='py-4'>
                            <td>Opcjonalne choroby:</td>
                            <td>
                                <div>
                                    <label className='block text-base font-sans'>
                                        <input type='checkbox' value='' className='mr-2 accent-[#009E52]' />
                                        Cukrzyca typu 1</label>
                                    <label className='block text-base font-sans'>
                                        <input type='checkbox' value='' className='mr-2 accent-[#009E52]' />
                                        Cukrzyca typu 2</label>
                                    <label className='block text-base font-sans'>
                                        <input type='checkbox' value='' className='mr-2 accent-[#009E52]' />
                                        Choroby układu pokarmowego</label>
                                    <label className='block text-base font-sans'>
                                        <input type='checkbox' value='' className='mr-2 accent-[#009E52]' />
                                        Inne: <input type='text' className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/></label>
                                </div>
                            </td>
                        </tr>
                        <tr className='py-4'>
                            <td colSpan={2}><hr className='my-4 border-gray-300'/></td>
                        </tr>
                        <tr className='py-4'>
                            <td>Alergie:</td>
                            <td>
                            <input type='text' className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/>
                            </td>
                        </tr>
                        <tr className='py-4'>
                            <td colSpan={2}><hr className='my-4 border-gray-300'/></td>
                        </tr>
                        <tr className='py-4'>
                            <td colSpan={2} className='text-xl font-medium text-center'>Dodatkowe informacje</td>
                        </tr>
                        <tr className='py-4'>
                            <td className='text-left pr-4'><label>Preferowane godziny posiłków:</label></td>
                            <td><input type='text' className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/></td>
                        </tr>
                        <tr className='py-4'>
                            <td className='text-left pr-4'><label>Czy jadasz regularnie posiłki?</label></td>
                            <td>
                                <select value='' required className='w-full p-2 border border-gray-300 rounded'>
                                    <option value="yes" className='text-base font-sans'>Tak</option>
                                    <option value="no" className='text-base font-sans'>Nie</option>
                                </select>
                            </td>
                        </tr>
                        <tr className='py-4'>
                            <td className='text-left pr-4'><label>Preferowana ilość posiłków dziennie:</label></td>
                            <td>
                                <select value='' required className='w-full p-2 border border-gray-300 rounded'>
                                    <option value="3" className='text-base font-sans'>3</option>
                                    <option value="4" className='text-base font-sans'>4</option>
                                    <option value="5" className='text-base font-sans'>5</option>
                                    <option value="6" className='text-base font-sans'>6</option>
                                    <option value="more" className='text-base font-sans'>Więcej</option>
                                </select>
                            </td>
                        </tr>
                        <tr className='py-4'>
                            <td colSpan={2}><hr className='my-4 border-gray-300'/></td>
                        </tr>
                        <tr className='py-4'>
                            <td>Czy unikasz jakichś produktów?</td>
                            <td>
                                <input type='text' className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/>
                            </td>
                        </tr>
                        <tr className='py-4'>
                            <td>Czy masz jakieś ulubione produkty lub dania?</td>
                            <td>
                                <input type='text' className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/>
                            </td>
                        </tr>
                        <tr className='py-4'>
                            <td>Czy masz jakieś nawyki żywieniowe, które chciał(a)byś zmienić?</td>
                            <td>
                                <input type='text' className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/>
                            </td>
                        </tr>
                        <tr className='py-4'>
                            <td colSpan={2} className='text-center p-2'>
                                <button type='submit' className='p-2 border-2 border-[#023047] rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-lg font-medium'>Poznaj dietę</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        
    </div>
  )
}
