"use client";

import { Card, Button } from "antd";
import { LockOutlined, EditOutlined } from "@ant-design/icons";

import { useSession } from "next-auth/react";

const profile = () => {
  const { data: session } = useSession();
  const userData = session?.user;
  // console.log(session);

  return (
    <div className="flex justify-center items-center min-h-screen min-w-full mx-auto bg-#E8D1A7 p-10">
      <Card
        title={<h2 className="text-xl font-bold">ข้อมูลสมาชิก</h2>}
        className="w-[800px] h-[500px]"
      >
        <div className="mb-4 text-lg border-b pb-2 text-gray-700 font-semibold">
          ข้อมูลบัญชี
        </div>
        <div className="space-y-3">
          <div className="flex text-base">
            <span className="font-semibold w-40">ชื่อ-นามสกุล</span>
            <span>{userData?.name + " " + userData?.surname}</span>
          </div>
          <div className="flex text-base">
            <span className="font-semibold w-40">อีเมล</span>
            <span>{userData?.email}</span>
          </div>
          <div className="flex text-base">
            <span className="font-semibold w-40">วันเกิด</span>
            <span>
              {userData?.birthday
                ? new Date(userData.birthday).toLocaleDateString("en-GB")
                : "N/A"}
            </span>
          </div>
          <div className="flex text-base">
            <span className="font-semibold w-40">เพศ</span>
            <span>
              {userData?.gender === "m"
                ? "ชาย"
                : userData?.gender === "f"
                ? "หญิง"
                : "อื่นๆ"}
            </span>
          </div>
          <div className="flex text-base">
            <span className="font-semibold w-40">เบอร์โทร</span>
            <span>{userData?.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <Button
            type="default"
            className="flex-1 h-10 px-4 text-sm"
            // onClick={showEditModal}
          >
            แก้ไขข้อมูลบัญชี
          </Button>
          <Button
            type="primary"
            className="flex-1 h-10 px-4 text-sm"
            // onClick={showPasswordModal}
          >
            เปลี่ยนรหัสผ่าน
          </Button>
        </div>
      </Card>

      {/* Edit Profile Modal
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
            birthDate: dayjs(userData.birthDate, "DD/MM/YYYY"),
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
      </Modal> */}

      {/* Change Password Modal
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
      </Modal> */}
    </div>
  );
};

export default profile;
