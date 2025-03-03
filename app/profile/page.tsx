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

        <div className="flex justify-end gap-5 mt-40">
          <Button icon={<LockOutlined />} type="default">
            เปลี่ยนรหัสผ่าน
          </Button>
          <Button icon={<EditOutlined />} type="primary">
            แก้ไขข้อมูลบัญชี
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default profile;
