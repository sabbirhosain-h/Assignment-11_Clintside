import { CreditCard } from 'lucide-react';
import React, { useState } from 'react';


const Payment = () => {
    const [cardNum ,setCardNum] = useState();
    const [cardName ,setCardName] = useState();
    const [year ,setYear] = useState();
    const [month ,setMonth] = useState();
    const [cvv ,setCvv] = useState();
    

    const handlepayment = (e) => {
         e.preventDefault();

       
        e.target.reset();
    };
    return (
        <div className='grid gap-5 grid-cols-1 lg:grid-cols-2 lg:px-30 lg:py-10 px-10 py-5 max-w-5xl mx-auto'>

                {/* payment summery */}
            <div className='bg-white dark:bg-slate-600  p-5 shadow-xl rounded-2xl  w-full'>
                <h1 className='text-md font-medium text-shadow-black dark:text-white '>Order summery </h1>

                <div className='flex gap-5 items-center'>
                    <img className=' mt-8 h-35 w-35' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s" alt="" />

                    <div>
                        <h1 className='text-xl font-medium text-black dark:text-white'>Boi er Naam</h1>

                        <p className='mt-2 text-md font-md text-slate-800'>Order=#654</p>
                    </div>


                </div>

                <div className='devider mt-8 '></div>

                {/* billing costs */}

                <div className='mt-4 p-2 '>

                    <div className='flex items-center justify-between'>

                        <h1 className='text-lg font-medium text-slate-500 dark:text-slate-800'>Subtotal</h1>

                        <span className='text-lg font-medium text-black'>$15.2</span>

                    </div>
                    <div className='mt-2 flex items-center justify-between'>

                        <h1 className='text-lg font-medium text-slate-500 dark:text-slate-800'>Delivery Fee</h1>

                        <span className='text-lg font-medium text-black'>$15.2</span>

                    </div>
                    <div className='mt-3 flex items-center justify-between'>

                        <h1 className='text-3xl font-medium text-black'>Total</h1>

                        <span className='text-3xl font-medium text-black'>$15.2</span>

                    </div>
                    
                </div>

                <div className='devider mt-8 '></div>

                <div className='mt-5 p-3 bg-slate-100 dark:bg-slate-700 rounded-xl'>
                    <h1 className='text-lg font-medium text-black'>Delivery Address</h1>
                    <p className='text-lg font-medium text-slate-600 dark:text-slate-800'>Khailgaon</p>
                </div>


            </div>

            {/* payment codes */}
            <div className='bg-white dark:bg-slate-600  p-5 shadow-xl rounded-2xl min-h-screen w-full'>
                <h1 className='flex gap-2 text-md font-medium text-shadow-black dark:text-white '>
                    <CreditCard/>
                    Payment Details </h1>

                <form onSubmit={handlepayment} className='mt-5 '>
                    
                    {/* card number */}
                    <label className='labe dark:text-white'>Card Number</label>
                    <input className='input-field input-field:focus dark:text-white'
                    placeholder="123 456 7890"
                    maxLength={19}
                    onChange={(e)=>setCardNum(e.target.value)}
                    type="numberic" />

                    {/* cardholder  name */}
                    <label className='mt-2 labe dark:text-white'>Cardholder Name</label>
                    <input className='input-field input-field:focus dark:text-white'
                    placeholder="Name on card"
                     onChange={(e)=>setCardName(e.target.value)}
                    type="text" />
                    

                    {/* expire month */}
                    <label className='mt-2 labe dark:text-white'>Expiry Month</label>
                    <div className='flex gap-2'>
                        
                    <select 
                     onChange={(e)=>setMonth(e.target.value)}
                     className='input-field input-field:focus dark:text-black'
                    name="" id="">
                        <option value="">Select Month</option>
                        {
             ["01","02","03","04","05","06","07","08","09","10","11","12"].map((m)=> (<option key={m}  value={m}>{m}</option>)               
                        )}
                        
                    </select>
                        
                    </div>

                    {/* expire Year */}
                    <label className='mt-2 labe dark:text-white'>Expiry Year</label>
                    <div className='flex gap-2'>
                        <input className='input-field input-field:focus dark:text-white'
                    placeholder="YYYY"
                       maxLength={4}
                       minLength={4}
                       pattern="\d{4}"
                       inputMode="numeric"
                         type="text"
                    onChange={(e)=>setYear(e.target.value)}
                    />
                        
                    </div>

                    {/* cvv */}
                    <label className='mt-2 labe dark:text-white'>Cvv</label>
                    <input className='input-field input-field:focus dark:text-white'
                    placeholder="123"
                    min={"100"}
                    max={"999"}
                    onChange={(e)=>setCvv(e.target.value)}
                    type="number" />

                    <button type='submit' className='mt-5 px-3 py-2 Primary-btn w-full text-white rounded-2xl'>
                        Pay $2566
                    </button>


                </form>
            </div>
        </div>
    );
};

export default Payment;