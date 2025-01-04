"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import BackgroundPattern from "../../components/BackgroundPattern";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            gender: "male",
            height: '',
            age: '',
            weight: '',
            targetWeight: '',
            activity: 1.2,
            foodIntolerances: ['brak'], 
            optionalDiseases: ['brak'], 
            foodAvoidance: ['nic'], 
            allergies: '',
            mealTime: '',
            mealRegularity: 'yes',
            mealQuantity: '3',
            habits: 'nic'
        }
    });
    

    const onSubmit = async (data: any) => {
        let dietGoal = [0, 0, 0];
        const currentWeight = parseFloat(data.weight);
        const targetWeight = parseFloat(data.targetWeight);
    
        if (targetWeight > currentWeight) {
            dietGoal = [1, 0, 0]; // przytyc
        } else if (targetWeight < currentWeight) {
            dietGoal = [0, 1, 0]; // schudnac
        } else {
            dietGoal = [0, 0, 1]; // utrzymac wage
        }
    
        const intolerancesOptions = ['brak', 'fruktoza', 'gluten', 'laktoza'];
        let foodIntolerances = intolerancesOptions.map(option =>
            data.foodIntolerances?.includes(option) ? 1 : 0
        );
        if (!foodIntolerances?.includes(1)){
            foodIntolerances = [1, 0, 0, 0];
        } else if(foodIntolerances[0] === 1 && foodIntolerances?.slice(1).includes(1)){
            foodIntolerances[0] = 0;
        }
    
        const diseasesOptions = ['brak', 'cukrzyca_t1', 'cukrzyca_t2', 'choroby_pokarmowe'];
        let optionalDiseases = diseasesOptions.map(option =>
            data.optionalDiseases?.includes(option) ? 1 : 0
        );
        if (!optionalDiseases?.includes(1)) {
            optionalDiseases = [1, 0, 0, 0];
        } else if (optionalDiseases[0] === 1 && optionalDiseases.slice(1).includes(1)) {
            optionalDiseases[0] = 0;
        }
    
        const avoidanceOptions = ['nic', 'gluten', 'mieso', 'nabial', 'odzwierzece', 'ryby', 'tluste'];
        let foodAvoidance = avoidanceOptions.map(option =>
            data.foodAvoidance?.includes(option) ? 1 : 0
        );
        if (!foodAvoidance?.includes(1)){
            foodAvoidance = [1, 0, 0, 0, 0, 0, 0];
        } else if(foodAvoidance[0] === 1 && foodAvoidance?.slice(1).includes(1)){
            foodAvoidance[0] = 0;
        }
        
        const response = await axios.post('/api/diet/getDietType', {
            ...data,
            dietGoal,
            foodIntolerances,
            optionalDiseases,
            foodAvoidance
        });

        console.log(response.data.result)
        const resultString = response.data.result.join(",")
        window.open("/diet/result/"+resultString, "_blank")
        //router.push("/diet/result/"+resultString)
    };
    

    return (
        <div className='flex w-screen justify-center px-10 mt-[80px]'>
            <BackgroundPattern />
            <div className='bg-gray-100 p-8 rounded-lg shadow-lg my-[5px] text-sm md:text-base'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <table className='w-full'>
                        <tbody>
                            <tr className='py-4'>
                                <td colSpan={2} className='text-xl font-medium text-center'>Podstawowe informacje</td>
                            </tr>
                            <tr>
                                <td colSpan={2}><hr className='my-4 border-gray-300' /></td>
                            </tr>
                            <tr className='py-4'>
                                <td className='text-left pr-4'><label>Płeć:</label></td>
                                <td>
                                    <select {...register('gender', { required: true })} className='w-full p-2 border border-gray-300 rounded'>
                                        <option value="male" className='text-sm md:text-base font-sans'>Mężczyzna</option>
                                        <option value="female" className='text-sm md:text-base font-sans'>Kobieta</option>
                                    </select>
                                    {errors.gender && <span className="text-red-500">To pole jest wymagane</span>}
                                </td>
                            </tr>
                            <tr className='py-4'>
                                <td className='text-left pr-4'><label>Wzrost (cm):</label></td>
                                <td>
                                    <input type='text' {...register('height', { required: true })} className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none' />
                                    {errors.height && <span className="text-red-500">To pole jest wymagane</span>}
                                </td>
                            </tr>
                            <tr className='py-4'>
                                <td className='text-left pr-4'><label>Wiek:</label></td>
                                <td>
                                    <input type='text' {...register('age', { required: true })} className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none' />
                                    {errors.age && <span className="text-red-500">To pole jest wymagane</span>}
                                </td>
                            </tr>
                            <tr className='py-4'>
                                <td className='text-left pr-4'><label>Waga (kg):</label></td>
                                <td>
                                    <input type='text' {...register('weight', { required: true })} className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none' />
                                    {errors.weight && <span className="text-red-500">To pole jest wymagane</span>}
                                </td>
                            </tr>
                            <tr className='py-4'>
                                <td className='text-left pr-4'><label>Waga docelowa (kg):</label></td>
                                <td>
                                    <input type='text' {...register('targetWeight', { required: true })} className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none' />
                                    {errors.targetWeight && <span className="text-red-500">To pole jest wymagane</span>}
                                </td>
                            </tr>
                            <tr className='py-4'>
                                <td className='text-left pr-4'><label>Aktywność fizyczna:</label></td>
                                <td>
                                    <select {...register('activity', { required: true })} className='w-full p-2 border border-gray-300 rounded'>
                                        <option value={1.2} className='text-sm md:text-base font-sans'>Brak aktywności</option>
                                        <option value={1.375} className='text-sm md:text-base font-sans'>Lekko aktywny (1-2 dni)</option>
                                        <option value={1.55} className='text-sm md:text-base font-sans'>Umiarkowanie aktywny (3-4 dni)</option>
                                        <option value={1.725} className='text-sm md:text-base font-sans'>Bardzo aktywny (5-6 dni)</option>
                                        <option value={1.9} className='text-sm md:text-base font-sans'>Super aktywny (7 dni)</option>
                                    </select>
                                    {errors.activity && <span className="text-red-500">To pole jest wymagane</span>}
                                </td>
                            </tr>
                            <tr className='py-4'>
                                <td colSpan={2}><hr className='my-4 border-gray-300' /></td>
                            </tr>
                            <tr className='py-4'>
                                <td>Nietolerancje pokarmowe:</td>
                                <td>
                                    <div>
                                        <label className='block text-sm md:text-base font-sans'>
                                            <input type='checkbox' value='brak' className='mr-2 accent-[#009E52]' {...register('foodIntolerances')} />
                                            Brak</label>
                                        <label className='block text-sm md:text-base font-sans'>
                                            <input type='checkbox' value='gluten' className='mr-2 accent-[#009E52]' {...register('foodIntolerances')} />
                                            Gluten</label>
                                        <label className='block text-sm md:text-base font-sans'>
                                            <input type='checkbox' value='laktoza' className='mr-2 accent-[#009E52]' {...register('foodIntolerances')} />
                                            Laktoza</label>
                                        <label className='block text-sm md:text-base font-sans'>
                                            <input type='checkbox' value='fruktoza' className='mr-2 accent-[#009E52]' {...register('foodIntolerances')} />
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
                                        <label className='block text-sm md:text-base font-sans'>
                                            <input type='checkbox' value='brak' className='mr-2 accent-[#009E52]' {...register('optionalDiseases')} />
                                            Brak</label>
                                        <label className='block text-sm md:text-base font-sans'>
                                            <input type='checkbox' value='cukrzyca_t1' className='mr-2 accent-[#009E52]' {...register('optionalDiseases')} />
                                            Cukrzyca typu 1</label>
                                        <label className='block text-sm md:text-base font-sans'>
                                            <input type='checkbox' value='cukrzyca_t2' className='mr-2 accent-[#009E52]' {...register('optionalDiseases')} />
                                            Cukrzyca typu 2</label>
                                        <label className='block text-sm md:text-base font-sans'>
                                            <input type='checkbox' value='choroby_pokarmowe' className='mr-2 accent-[#009E52]' {...register('optionalDiseases')} />
                                            Choroby układu pokarmowego</label>
                                    </div>
                                </td>
                            </tr>
                            <tr className='py-4'>
                                <td colSpan={2}><hr className='my-4 border-gray-300' /></td>
                            </tr>
                            <tr className='py-4'>
                                <td>Alergie:</td>
                                <td>
                                    <input type='text' {...register('allergies')} className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none' />
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
                                <td><input type='text' {...register('mealTime')} className='w-full p-2 border border-gray-300 rounded focus:border-[#009E52] focus:outline-none'/></td>
                            </tr>
                            <tr className='py-4'>
                                <td className='text-left pr-4'><label>Czy jadasz regularnie posiłki?</label></td>
                                <td>
                                    <select {...register('mealRegularity', { required: true })} className='w-full p-2 border border-gray-300 rounded'>
                                        <option value="yes" className='text-sm md:text-base font-sans'>Tak</option>
                                        <option value="no" className='text-sm md:text-base font-sans'>Nie</option>
                                    </select>
                                </td>
                            </tr>
                            <tr className='py-4'>
                                <td className='text-left pr-4'><label>Preferowana ilość posiłków dziennie:</label></td>
                                <td>
                                    <select {...register('mealQuantity', { required: true })}  className='w-full p-2 border border-gray-300 rounded'>
                                        <option value="3" className='text-sm md:text-base font-sans'>3</option>
                                        <option value="4" className='text-sm md:text-base font-sans'>4</option>
                                        <option value="5" className='text-sm md:text-base font-sans'>5</option>
                                        <option value="6" className='text-sm md:text-base font-sans'>6</option>
                                        <option value="more" className='text-sm md:text-base font-sans'>Więcej</option>
                                    </select>
                                </td>
                            </tr>
                            <tr className='py-4'>
                                <td colSpan={2}><hr className='my-4 border-gray-300'/></td>
                            </tr>
                            <tr className='py-4'>
                                <td>Czy unikasz jakichś produktów?</td>
                                <td>
                                    <div>
                                        <label className='block text-sm md:text-base font-sans'>
                                            <input type='checkbox' value='nic' className='mr-2 accent-[#009E52]' {...register('foodAvoidance')} />
                                            Nie</label>
                                        <label className='block text-sm md:text-base font-sans'>
                                            <input type='checkbox' value='mieso' className='mr-2 accent-[#009E52]' {...register('foodAvoidance')} />
                                            Mięso</label>
                                        <label className='block text-sm md:text-base font-sans'>
                                            <input type='checkbox' value='ryby' className='mr-2 accent-[#009E52]' {...register('foodAvoidance')} />
                                            Ryby i owoce morza</label>
                                        <label className='block text-sm md:text-base font-sans'>
                                            <input type='checkbox' value='nabial' className='mr-2 accent-[#009E52]' {...register('foodAvoidance')} />
                                            Nabiał</label>
                                        <label className='block text-sm md:text-base font-sans'>
                                            <input type='checkbox' value='odzwierzece' className='mr-2 accent-[#009E52]' {...register('foodAvoidance')} />
                                            Produkty pochodzenia zwierzęcego</label>
                                        <label className='block text-sm md:text-base font-sans'>
                                            <input type='checkbox' value='tluste' className='mr-2 accent-[#009E52]' {...register('foodAvoidance')} />
                                            Produkty wysokotłuszczowe (smażone, tłuste)</label>
                                        <label className='block text-sm md:text-base font-sans'>
                                            <input type='checkbox' value='gluten' className='mr-2 accent-[#009E52]' {...register('foodAvoidance')} />
                                            Gluten</label>
                                        </div>
                                </td>
                            </tr>
                            <tr className='py-4'>
                                <td>Czy masz jakieś nawyki żywieniowe, które chciał(a)byś zmienić?</td>
                                <td>
                                    <select {...register('habits', { required: true })} className='w-full p-2 border border-gray-300 rounded'>
                                        <option value="nic" className='text-sm md:text-base font-sans'>Nie</option>
                                        <option value="podjadanie" className='text-sm md:text-base font-sans'>Podjadanie między posiłkami</option>
                                        <option value="nieregularnie" className='text-sm md:text-base font-sans'>Nieregularne posiłki</option>
                                        <option value="malo_wody" className='text-sm md:text-base font-sans'>Picie za mało wody</option>
                                        <option value="duze_porcje" className='text-sm md:text-base font-sans'>Jedzenie za dużych porcji</option>                                
                                    </select>
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
    );
}