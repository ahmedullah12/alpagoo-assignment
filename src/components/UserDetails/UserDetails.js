import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import AddUserDetailsModal from './AddUserDetailsModal';
import { useQuery } from 'react-query';
import axios from 'axios';
import UserDetailsTable from './UserDetailsTable';

const UserDetails = () => {
    const {user} = useContext(AuthContext);

    const {data: users = [], isLoading, refetch} = useQuery({
        queryKey: ["userDetails", user],
        queryFn: async() => {
            const res = await axios.get(`http://localhost:5000/userDetails?email=${user?.email}`);
            const data = await res.data;
            return data;
        }
    });

    if(isLoading){
        return <p>Loading...</p>
    }
    return (
        <div className='w-full md:w-[80%] lg:w-[70%] mx-auto border px-4 py-2'>
            <h3 className='text-center text-2xl font-bold'>Users Details Table</h3>
            {
                !user?.email && <p className='text-black text-xl '>Please <Link to='/login' className='text-primary underline'>Sign In</Link> , to view users details.</p>
            }
            <div className='flex justify-end'>
                    {/* Your "Add" button can go here */}
                    <label htmlFor='addTask-modal' className='btn btn-primary'>Add User</label>
            </div>
            {/* {
                (data.length < 1) && <p className='text-black'>You haven't added any user yet.</p>    
            } */}
            <AddUserDetailsModal refetch={refetch}></AddUserDetailsModal>
            <UserDetailsTable users={users} refetch={refetch}></UserDetailsTable>

        </div>
    );
};

export default UserDetails;