"use client";

import { useEffect, useState } from "react";
import { Form, Input, Button, Modal, DatePicker, Select, message } from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

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

  const [loadingEditModal, setLoadingEditModal] = useState(false);
  const [loadingPasswordModal, setLoadingPasswordModal] = useState(false);
  const showEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const showPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  // Sync userData to localStorage whenever it changes
  useEffect(() => {
    if (userData && !localStorage.getItem("userData")) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]); // Only run this effect when userData changes

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []); // This effect runs only once when the component mounts

  const handleEditSubmit = async (values: User) => {
    setLoadingEditModal(true);
    try {
      const response = await fetch("/api/profile/edit-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          currentEmail: userData.email,
        }),
      });

      const serverResponse = await response.json();

      if (response.ok) {
        message.success(serverResponse.message);

        const updatedData = {
          ...values,
          birthday: values.birthday,
        };
        setUserData(updatedData);

        localStorage.setItem("userData", JSON.stringify(updatedData));
      } else {
        message.error(serverResponse.error);
      }
    } catch (error) {
      console.error("Edit profile error:", error);
      message.error("An error occurred during edit profile.");
    } finally {
      setLoadingEditModal(false);
      setIsEditModalOpen(false);
    }
  };

  const handleChangePasswordSubmit = async (values: User) => {
    setLoadingPasswordModal(true);

    try {
      const response = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          password: values.password, // Ensure password is included
        }),
      });

      const serverResponse = await response.json();

      if (response.ok) {
        message.success(serverResponse.message);
      } else {
        message.error(serverResponse.error);
      }
    } catch (error) {
      console.error("Change password error:", error);
      message.error("An error occurred during change password.");
    } finally {
      setLoadingPasswordModal(false);
      setIsPasswordModalOpen(false);
    }
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
            {userData?.gender}
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
          onFinish={handleEditSubmit}
          initialValues={{
            ...userData,
            birthday: userData?.birthday
              ? dayjs(userData.birthday)
              : dayjs(null),
            gender: userData.gender,
          }}
        >
          <div className="flex gap-2">
            <Form.Item
              label="ชื่อ"
              name="name"
              className="w-1/2"
              rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="นามสกุล"
              name="surname"
              className="w-1/2"
              rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            label="อีเมล"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "กรุณากรอกอีเมลที่ถูกต้อง",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="วันเดือนปีเกิด"
            name="birthday"
            rules={[{ required: true, message: "กรุณาเลือกวันเกิด" }]}
          >
            <DatePicker
              placeholder="dd/mm/yyyy"
              format={"DD/MM/YYYY"}
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label="เพศ"
            name="gender"
            rules={[{ required: true, message: "กรุณาเลือกเพศ" }]}
          >
            <Select>
              <Option value="ชาย">ชาย</Option>
              <Option value="หญิง">หญิง</Option>
              <Option value="อื่นๆ">อื่นๆ</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="เบอร์โทรศัพท์"
            name="phoneNumber"
            rules={[
              { required: true, message: "กรุณากรอกเบอร์โทรศัพท์" },
              {
                pattern: /^\d{10}$/,
                message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={closeEditModal}>ยกเลิก</Button>
            <Button type="primary" htmlType="submit" loading={loadingEditModal}>
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
        <Form layout="vertical" onFinish={handleChangePasswordSubmit}>
          <Form.Item
            label="รหัสผ่านเดิม"
            name="currentPassword"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่านเดิม" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="รหัสผ่านใหม่"
            name="password" // fix temporary
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่านใหม่" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="ยืนยันรหัสผ่านใหม่"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "กรุณายืนยันรหัสผ่านใหม่" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
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
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingPasswordModal}
            >
              บันทึก
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
