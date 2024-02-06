import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ChangeStatusModal from './ChangeStatusModal';

const UserDetailsTable = ({ users, refetch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
  
    const handleDeleteUser = (id) => {
      axios
        .delete(`http://localhost:5000/userDetails/${id}`)
        .then((res) => {
          if (res.status === 200) {
            toast.success('User Deleted');
            refetch();
          }
        })
        .catch((err) => console.log(err));
    };
  
    const handleSelectedUser = (user) => {
      setSelectedUser(user);
      setIsModalOpen(true);
    };
  
    const handleDateChange = (e) => {
      const newDate = e.target.value;
      setSelectedDate(newDate);
    };
  
    const handleStatusChange = (e) => {
      const newStatus = e.target.value;
      setSelectedStatus(newStatus);
    };
  
    const filteredUsers = users.filter((user) => {
      // Implement your filtering logic based on the filter state
      return (
        user.userName.toLowerCase().includes(filter.toLowerCase()) &&
        (!selectedDate || user.addedDate === selectedDate) &&
        (!selectedStatus || user.status === selectedStatus)
      );
    });
  
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (sortBy) {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
  
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      }
  
      return 0;
    });

    if(users.length < 1){
        return <p>You haven't added any user yet...</p>
    }
  
    return (
      <div className='mt-4'>
        <div className='flex justify-end my-4'>
            <div className='mb-2'>
                <div className='flex flex-col lg:flex-row space-x-2 mb-4'>
                    <label htmlFor=''>Filter: </label>
                    <input
                        type='text'
                        placeholder='UserName'
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className='border border-gray-300 w-[120px] py-2 px-4 rounded-md '
                    />
                    <label htmlFor=''>Pick Date: </label>
                    <input
                        type='date'
                        value={selectedDate}
                        onChange={handleDateChange}
                        className='border border-gray-300 py-2 px-4 w-[170px] rounded-md '
                    />
                    <label htmlFor=''>Status: </label>
                    <select
                        onChange={handleStatusChange}
                        value={selectedStatus || ''}
                        className='border border-gray-300 py-2 px-4 w-[120px] rounded-md '
                    >
                        <option value=''>All</option>
                        <option value='active'>Active</option>
                        <option value='inactive'>Inactive</option>
                    </select>
                </div>

                <div className='flex flex-col lg:flex-row space-x-2'>
                    <label htmlFor=''>Sort: </label>
                    <select
                        onChange={(e) => setSortBy(e.target.value)}
                        value={sortBy || ''}
                        className='border border-gray-300 py-2 px-4 rounded-md w-[150px]'
                    >
                        <option value=''>Default</option>
                        <option value='userName'>UserName</option>
                        <option value='addedDate'>Added Date</option>
                    </select>
                    <label htmlFor=''>Sort Order: </label>
                    <select
                        onChange={(e) => setSortOrder(e.target.value)}
                        value={sortOrder}
                        className='border border-gray-300 py-2 px-4 rounded-md w-[100px]'
                    >
                        <option value='asc'>Asc</option>
                        <option value='desc'>Desc</option>
                    </select>
                </div>
            </div>
        </div>

        {sortedUsers.length < 1 && (
          <p>No matching data for the selected date and status.</p>
        )}
        {sortedUsers.length >= 1 && (
          <div className='overflow-x-auto'>
            <table className='table table-zebra' style={{ tableLayout: 'fixed' }}>
              {/* head */}
              <thead>
                <tr>
                  <th style={{ width: '5%' }}></th>
                  <th style={{ width: '30%' }}>UserName</th>
                  <th style={{ width: '20%' }}>Added Date</th>
                  <th style={{ width: '25%' }}>Status</th>
                  <th style={{ width: '25%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{user.userName}</td>
                    <td>{user.addedDate}</td>
                    <td>
                      <button
                        onClick={() => handleSelectedUser(user)}
                        className='btn btn-success btn-xs w-[40] md:w-[80px] text-white'
                      >
                        {user.status}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className='btn btn-error btn-xs text-white'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ChangeStatusModal
              refetch={refetch}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              selectedUser={selectedUser}
            ></ChangeStatusModal>
          </div>
        )}
      </div>
    );
  };
  
  export default UserDetailsTable;
  