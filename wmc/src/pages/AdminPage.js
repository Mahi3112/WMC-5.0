import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { Modal, Button, Table, Form, Input, message, DatePicker } from "antd";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import moment from 'moment';
import { AddItemAction, DeleteItemAction } from '../actions/AdminPageAction';
import styled from 'styled-components';

const { confirm } = Modal;


const AdminPageWrapper = styled.div`
  background: linear-gradient(135deg, #150917 0%, #2C142C 100%);
  color: #fff;
  min-height: 100vh;
  padding: 40px 20px;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #fff;
`;

const SubTitle = styled.h3`
  font-size: 24px;
  color: #e0e0e0;
  margin-top: 10px;
`;

const ActionButton = styled(Button)`
  margin-top: 10px;
  background: linear-gradient(145deg, #3E1A3A, #2C142C);
  border: none;
`;

const StyledTable = styled(Table)`
  .ant-table {
    background: linear-gradient(145deg, #3E1A3A, #2C142C);
  }

  .ant-table-thead > tr > th {
    background: linear-gradient(145deg, #3E1A3A, #2C142C);
    color: #e0e0e0;
  }

  .ant-table-tbody > tr > td {
    background: linear-gradient(145deg, #3E1A3A, #2C142C);
    color: #d0d0d0;
  }

 
`;


const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: linear-gradient(145deg, #3E1A3A, #2C142C);
    border: 1px solid #e91e63;
  }

  .ant-modal-header {
    background: transparent;
    border-bottom: none;
  }

  .ant-modal-title {
    color: #fff;
  }

  

  .ant-btn-primary {
    background: #e91e63;
    border-color: #e91e63;
  }

  .ant-modal-footer {
    background: transparent;
    border-top: none;
  }
`;

const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    color: #e0e0e0;
  }

  .ant-form-item-control-input {
    background: linear-gradient(145deg, #3E1A3A, #2C142C);
  }
`;
const AdminPage = () => {
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const { data } = await axios.get("/events/getevent", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch({ type: "HIDE_LOADING" });
      dispatch({ type: "SET_ITEMS", payload: data });
    } catch (error) {
      console.error("Error fetching items:", error);
      dispatch({ type: "HIDE_LOADING" });
    }
  };

  const handleDelete = (item) => {
    confirm({
      title: 'Are you sure you want to delete this item?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          await axios.delete(`/events/deleteevent/${item._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          dispatch(DeleteItemAction(item));
          message.success('Item Deleted Successfully');
        } catch (error) {
          message.error('Something went wrong while deleting the item');
          console.error('Error deleting item:', error);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleSubmit = async (values) => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error('No token found');
      return;
    }

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('date', values.date.toISOString());
    formData.append('location', values.location);
  
    if (fileList.length > 0) {
      formData.append('posterImage', fileList[0].originFileObj);
    }
  
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    };

    try {
      if (editItem) {
        await axios.put(`/events/editevent/${editItem._id}`, formData, config);
        message.success('Item Updated Successfully');
      } else {
        const response = await axios.post("/events/postevent", formData, config);
        dispatch(AddItemAction(response.data));
        message.success('Item Added Successfully');
      }

      getAllItems();
      setPopupModal(false);
      setEditItem(null);
      setFileList([]);
    } catch (error) {
      console.error("Error saving item:", error.response ? error.response.data : error.message);
      message.error('Something went wrong while saving the item');
    } finally {
      dispatch({ type: "HIDE_LOADING" });
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date) => moment(date).format('YYYY-MM-DD')
    },
    {
      title: 'Location',
      dataIndex: 'location',
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <div>
          <EditOutlined
            style={{ cursor: 'pointer', marginRight: 8, color: '#fff' }}
            onClick={() => {
              setEditItem(record);
              setPopupModal(true);
            }}
          />
          <DeleteOutlined
            style={{ cursor: 'pointer', color: '#fff' }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <AdminPageWrapper>
      <Header>
        <Title>Welcome back Admin!!</Title>
        <SubTitle>Event Management</SubTitle>
        <ActionButton type='primary' onClick={() => setPopupModal(true)}>Add Event</ActionButton>
      </Header>
      <StyledTable
        columns={columns}
        dataSource={items}
        loading={loading}
        bordered
        rowKey='_id'
      />

      <StyledModal
        title={`${editItem ? 'Edit Event' : 'Add New Event'}`}
        open={popupModal}
        onCancel={() => { setEditItem(null); setPopupModal(false); }}
        footer={null}
      >
        <StyledForm
          layout='vertical'
          initialValues={editItem ? { ...editItem, date: moment(editItem.date) } : {}}
          onFinish={handleSubmit}
        >
          <Form.Item name='title' label='Title' rules={[{ required: true, message: 'Please input the title' }]}>
            <Input />
          </Form.Item>
          <Form.Item name='description' label='Description' rules={[{ required: true, message: 'Please input the description' }]}>
            <Input />
          </Form.Item>
          <Form.Item name='date' label='Date' rules={[{ required: true, message: 'Please input the date' }]}>
            <DatePicker format='YYYY-MM-DD' />
          </Form.Item>
          <Form.Item name='location' label='Location' rules={[{ required: true, message: 'Please input the location' }]}>
            <Input />
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <Button type='primary' htmlType='submit'>Save</Button>
          </div>
        </StyledForm>
      </StyledModal>
    </AdminPageWrapper>
  );
};

export default AdminPage;
