import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const AddUserDetailsModal = ({ refetch }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleAddUser = (data) => {
    const details = {
      userName: data.name,
      addedDate: data.date,
      status: "active",
      addedUserEmail: user?.email,
    };


    axios.post("http://localhost:5000/userDetails", details)
      .then(res => {
        if (res.data.acknowledged) {
          toast.success("User Added");
          setModalOpen(false);
          reset();
          refetch();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <input type="checkbox" className="modal-toggle" id='addTask-modal' checked={modalOpen}
        onChange={() => setModalOpen(!modalOpen)} />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="addTask-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold mb-8">Enter User Details</h3>
          <form onSubmit={handleSubmit(handleAddUser)} className="grid grid-cols-1 gap-y-3" action="">
            <input
              {...register("name", { required: "User Name is required" })}
              className={`input input-bordered w-full max-w-xs ${errors.name ? 'input-error' : ''}`}
              type="text" placeholder='Enter User Name' />
            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
            <label className="form-control">
              <span className="label-text mb-1">Added Date</span>
              <input
                {...register("date", { required: "Date is required." })}
                type="date"
                className={`input input-bordered max-w-xs ${errors.date ? 'input-error' : ''}`}
              />
            </label>
            {errors.date && <span className="text-red-600">{errors.date.message}</span>}
            <button className='btn btn-primary' type='submit'>Add</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUserDetailsModal;
