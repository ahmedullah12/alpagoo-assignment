import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

const ChangeStatusModal = ({isModalOpen, setIsModalOpen, selectedUser, refetch}) => {

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChangeStatus = () => {
        const newStatus = selectedUser.status === 'active' ? 'inactive' : 'active';
        const status = {
            status: newStatus
          };

        axios.put(`http://localhost:5000/userDetails/${selectedUser._id}`, status)
        .then(res => {
            if(res.status === 200){
                refetch();
                toast.success("Status Changed")
                setIsModalOpen(false);
            }
        }) 

    }
    return (
        <div>
            <input type="checkbox"  id="status-modal" className="modal-toggle" checked={isModalOpen}
            onChange={() => setIsModalOpen(!isModalOpen)}/>
            <div className="modal w-auto max-w-none">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Do you want to change the status?</h3>

                    <div className="modal-action">
                        <button  onClick={handleChangeStatus} className="btn">Yes</button>
                        <button onClick={handleCloseModal} className="btn">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeStatusModal;