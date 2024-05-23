import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataAction } from "../../redux/actions/users/userDataActions";
import { getUserDetailAction } from "../../redux/actions/users/singleUserActions";
import { ScreenLoader } from "../commons/ScreenLoader";
import { AdminHeader } from "../commons/AdminHeader";
import { CreateUsers } from "./CreateUsers";
import { FaPlus } from "react-icons/fa";
import { EditUser } from "./EditUsers";
import { Button, Modal } from 'react-bootstrap';
import { toast } from "react-toastify";

export const Users = () => {
  const dispatch = useDispatch();
  const [editUserId, setEditUserId] = useState(null); // State to hold the ID for editing
  const loading = useSelector((state) => state.user_data.loading);
  const userData = useSelector((state) => state.user_data.data);
  
  const registerUserStatusCode = useSelector(state => state.register.statusCode);
  const updateStatusCode = useSelector(state => state.user_update.updateStatusCode);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const manageStatusCodes = () => {
    if(registerUserStatusCode >= 200 && registerUserStatusCode <=299){
      toast.success("Users created successfull", {autoClose:300})
      setShow(false)
    }

    if(updateStatusCode >= 200 && updateStatusCode <=299){
      toast.success("Users updated successfull", {autoClose:300})
      setShowEdit(false)
    }
  }

  useEffect(() => {
    dispatch(getUserDataAction({}));
   
    manageStatusCodes()
  }, [dispatch, registerUserStatusCode, updateStatusCode]);

  const handleOpenEditModal = (id) => {
    setEditUserId(id);
    dispatch(getUserDetailAction(id))
    setShowEdit(true)
  };

  const handleCloseEditModal = () => {
    setEditUserId(null);
    setShowEdit(false)
  }
  return (
    <>
      <ScreenLoader status={loading} />
      <AdminHeader />
      <div className="posts-wrapper">
        <div className="container p-4">
          <div className="d-flex justify-content-between mb-2">
            <h5>Users Management</h5>
           
            <Button variant="primary" onClick={handleShow}>
              <FaPlus /> Add New Users
          </Button>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="">
                  <th scope="col" className="text-start">
                    Name
                  </th>
                  <th scope="col" className="text-center">
                    Role
                  </th>
                  <th scope="col" className="text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData ? (
                  userData?.data?.map((data) => (
                    <tr key={data?.email} className="text-">
                      <td className="text-start">{data?.name}</td>
                      <td className="text-center">{data?.user_type}</td>
                      <td className="text-end">
                        <button onClick={() => handleOpenEditModal(data?.id)} className="btn btn-sm btn-primary me-4">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      {/* Create user modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <CreateUsers />
        </Modal.Body>
      </Modal>

      {/* Edit user modal */}
      <Modal show={showEdit} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <EditUser userId={editUserId} onModalClose={() => setEditUserId(null)} />        
      </Modal.Body>
      </Modal>
    </>
  );
};
