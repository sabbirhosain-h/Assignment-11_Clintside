import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';
import { ImageUp } from 'lucide-react';
import useImageUpload from '../../Hooks/useImageUpload ';
import useSecure from '../../Hooks/useSecure';


const Profile = () => {
    const { user, setUser, Update } = useContext(AuthContext);
    const [name, setName] = useState(user.displayName || "")
    const [imageFile, setImageFile] = useState(null);
    const uploadImage = useImageUpload();
    const [role,setRole] = useState([]);
    const [loading, setLoading] = useState(true);

    const secure = useSecure();

     useEffect(() => {
        const fetchRole = async () => {
          try {
            const res = await secure.get("/Role");
            setRole(res.data);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchRole();
      }, [secure]);



    const chnageUpdate = async (e) => {
    e.preventDefault();
    const newName = e.target.userName.value;

    try {
      
       

        const imageUrl = await uploadImage(imageFile, user.photoURL);
        await Update({ displayName: newName, photoURL: imageUrl }); 
        setUser({ ...user, displayName: newName, photoURL: imageUrl });

        toast("Profile Updated", {
            duration: 4000,
            position: "bottom-right",
            style: { background: '#1e293b', color: '#fff' },
        });

    } catch (err) {
        console.error(err);
        toast("Update failed", {
            duration: 4000,
            position: "bottom-right",
            style: { background: '#1e293b', color: '#fff' },
        });
    }
};





    return (
        <div className='dark:bg-slate-800'>
            <h1 className='text-4xl font-bold dark:text-white'>My Profile</h1>
            <p className='text-md font-medium text-gray-500'>Manage your account information</p>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5'>

                {/* image and role */}

                <div className='rounded-lg bg-white p-5 dark:bg-slate-700'>

                    <span className='text-lg font-normal'>Profile Information</span>

                    <div className=' flex flex-col items-center mt-8'>

                        <img className='h-35 w-35 rounded-full mb-3' src={user.photoURL} alt={user.displayName} />

                        <h3 className="text-xl font-semibold mb-2">{user.displayName}</h3>

                        <p className="text-muted-foreground mb-2">{user.email}</p>

                        <span className='bg-blue-800 text-white px-2 py-1 rounded-2xl'>
                            {role}
                        </span>
                    </div>
                </div>

                <div className='lg:col-span-2 rounded-lg  w-full bg-white p-5 dark:bg-slate-700'>

                    <span className='text-lg font-normal'>Update Profile</span>

                    <form onSubmit={chnageUpdate} className='mt-5'>

                        {/* name */}
                        <label className='block label dark:text-gray-300'>Full Name</label>
                        <input
                            className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                            value={name}
                            id='userName'
                            onChange={(e) => setName(e.target.value)}
                            type="text" />

                        {/* email */}
                        <label className='block label  dark:text-gray-300'>Email</label>
                        <input
                            className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                            value={user.email}
                            readOnly
                            type="email" />
                        <span className='text-sm font-light ml-3 dark:text-amber-50'>Email Cannot be Changed**</span>

                        {/* image url */}
                        <label className='block label  dark:text-gray-300'>Upload Image</label>
                        <div className='cursor-pointer input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                            <label className="flex justify-start items-center gap-3 cursor-pointer">
                                <ImageUp className="w-10 h-10 shrink-0" />
                                <span className="text-sm">
                                    {imageFile ? imageFile.name : "Upload book cover image"}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                />
                            </label>
                        </div>


                       

                        {/* Role */}
                        <label className='block label  dark:text-gray-300'>Role</label>
                        <input
                            className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                            value={role}
                            readOnly
                            type="text" />
                        <span className='text-sm font-light ml-3 dark:text-amber-50'>Only Admin can change Role**</span>

                        <button type='submit' className='w-full Primary-btn px-3 py-2 mt-4 rounded-2xl text-white'>
                            Update Profile
                        </button>
                    </form>
                </div>

            </div>

        </div>
    );
};

export default Profile;