import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      message.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/postevent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      message.success('File uploaded successfully');
    } catch (error) {
      message.error('Error uploading file');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <Form>
        <Form.Item label="File">
          <Input type="file" onChange={handleFileChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>Upload Image</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FileUpload;
