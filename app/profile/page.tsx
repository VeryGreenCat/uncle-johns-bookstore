"use client";

import { useState } from "react";
import { Form, Input, Button, Modal, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

const { Option } = Select;

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const [userData, setUserData] = useState({
    name: user?.name,
    surname: user?.surname,
    email: user?.email,
    birthday: user?.birthday,
    gender: user?.gender,
    phoneNumber: user?.phoneNumber,
  });

  const showEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const showPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  const onFinish = (values: any) => {
    setUserData({
      ...values,
      birthDate: values.birthDate?.format("DD/MM/YYYY"),
    });
    setIsEditModalOpen(false);
  };

  const onChangePassword = (values: any) => {
    console.log("New Password:", values);
    setIsPasswordModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-12 w-full max-w-4xl min-h-[400px]">
        <h2 className="text-2xl font-semibold mb-10 text-left">ข้อมูลสมาชิก</h2>

        <div className="grid grid-cols-2 gap-6 text-lg">
          <p>
            <strong>ชื่อ: </strong> {userData?.name + " " + userData?.surname}
          </p>
          <p>
            <strong>อีเมล: </strong> {userData.email}
          </p>
          <p>
            <strong>วันเกิด: </strong>
            {userData?.birthday
              ? new Date(userData.birthday).toLocaleDateString("en-GB")
              : "N/A"}
          </p>
          <p>
            <strong>เพศ: </strong>
            {userData?.gender === "m"
              ? "ชาย"
              : userData?.gender === "f"
              ? "หญิง"
              : "อื่นๆ"}
          </p>
          <p>
            <strong>เบอร์โทร: </strong> {userData.phoneNumber}
          </p>
        </div>

        <div className="mt-10 flex gap-4">
          <Button
            type="default"
            className="flex-1 h-10 px-4 text-sm"
            onClick={showEditModal}
          >
            แก้ไขข้อมูลบัญชี
          </Button>
          <Button
            type="primary"
            className="flex-1 h-10 px-4 text-sm"
            onClick={showPasswordModal}
          >
            เปลี่ยนรหัสผ่าน
          </Button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        title="แก้ไขข้อมูลบัญชี"
        open={isEditModalOpen}
        onCancel={closeEditModal}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            ...userData,
            birthDate: dayjs(userData.birthday, "DD/MM/YYYY"),
          }}
        >
          <div className="flex gap-2">
            <Form.Item label="ชื่อ" name="firstName" className="w-1/2">
              <Input />
            </Form.Item>
            <Form.Item label="นามสกุล" name="lastName" className="w-1/2">
              <Input />
            </Form.Item>
          </div>
          <Form.Item label="อีเมล" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="วันเกิด" name="birthDate">
            <DatePicker format="DD/MM/YYYY" className="w-full" />
          </Form.Item>
          <Form.Item label="เพศ" name="gender">
            <Select>
              <Option value="ชาย">ชาย</Option>
              <Option value="หญิง">หญิง</Option>
              <Option value="อื่นๆ">อื่นๆ</Option>
            </Select>
          </Form.Item>
          <Form.Item label="เบอร์โทร" name="phone">
            <Input />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={closeEditModal}>ยกเลิก</Button>
            <Button type="primary" htmlType="submit">
              บันทึก
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        title="เปลี่ยนรหัสผ่าน"
        open={isPasswordModalOpen}
        onCancel={closePasswordModal}
        footer={null}
      >
        <Form layout="vertical" onFinish={onChangePassword}>
          <Form.Item
            label="รหัสผ่านเดิม"
            name="currentPassword"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่านเดิม" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="รหัสผ่านใหม่"
            name="newPassword"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่านใหม่" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="ยืนยันรหัสผ่านใหม่"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "กรุณายืนยันรหัสผ่านใหม่" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("รหัสผ่านไม่ตรงกัน"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={closePasswordModal}>ยกเลิก</Button>
            <Button type="primary" htmlType="submit">
              บันทึก
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
