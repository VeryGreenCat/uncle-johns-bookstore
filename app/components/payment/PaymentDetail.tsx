import { Card, Button, Input, Select, Form } from "antd";
import { useState } from "react";

const { Option } = Select;

const PaymentDetail = () => {
  const Amount = 473;
  const totalAmount = 456.65;
  const discount = 6.35;
  const itemCount = 4;

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "บ้าน",
      address: "123 หมู่ 1",
      subDistrict: "แขวงบางรัก",
      district: "เขตบางรัก",
      province: "กรุงเทพฯ",
      postalCode: "10500",
    },
    {
      id: 2,
      name: "ที่ทำงาน",
      address: "456 หมู่ 5",
      subDistrict: "ตำบลสวนหลวง",
      district: "อำเภอสวนหลวง",
      province: "กรุงเทพฯ",
      postalCode: "10250",
    },
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0].id);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [form] = Form.useForm(); // ใช้ Form instance

  const handleEdit = () => {
    const currentAddress = addresses.find(
      (addr) => addr.id === selectedAddressId
    );
    if (currentAddress) {
      form.setFieldsValue(currentAddress); // กรอกค่าที่อยู่ปัจจุบันลงในฟอร์ม
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (isAddingNew) {
        setAddresses([...addresses, { ...values, id: addresses.length + 1 }]);
        setIsAddingNew(false);
      } else {
        setAddresses(
          addresses.map((addr) =>
            addr.id === selectedAddressId
              ? { ...values, id: selectedAddressId }
              : addr
          )
        );
      }
      setIsEditing(false);
    });
  };

  const handleAddNew = () => {
    form.resetFields(); // รีเซ็ตฟอร์มให้เป็นค่าว่าง
    setIsAddingNew(true);
    setIsEditing(true);
  };

  return (
    <div className="flex justify-between space-x-4 mb-4">
      <div className="w-3/5">
        <Card className="p-4 text-center">
          <span className="text-xl font-semibold">QR Code</span>
        </Card>
        <div className="my-4"></div>
        <Card className="p-4 mt-4">
          <span className="block font-bold mb-2">ที่อยู่</span>
          <Select
            className="mb-2 w-full"
            value={selectedAddressId}
            onChange={setSelectedAddressId}
          >
            {addresses.map((addr) => (
              <Option key={addr.id} value={addr.id}>
                {addr.name}
              </Option>
            ))}
          </Select>

          {isEditing ? (
            <Form form={form} layout="vertical" className="mt-4">
              <Form.Item
                name="name"
                label="ชื่อที่อยู่"
                rules={[{ required: true, message: "กรุณากรอกชื่อที่อยู่" }]}
              >
                <Input placeholder="ชื่อที่อยู่" />
              </Form.Item>
              <Form.Item
                name="address"
                label="ที่อยู่"
                rules={[{ required: true, message: "กรุณากรอกที่อยู่" }]}
              >
                <Input placeholder="ที่อยู่" />
              </Form.Item>
              <div className="flex space-x-2">
                <Form.Item
                  name="subDistrict"
                  label="แขวง/ตำบล"
                  className="w-1/2"
                  rules={[{ required: true, message: "กรุณากรอกแขวง/ตำบล" }]}
                >
                  <Input placeholder="แขวง/ตำบล" />
                </Form.Item>
                <Form.Item
                  name="district"
                  label="เขต/อำเภอ"
                  className="w-1/2"
                  rules={[{ required: true, message: "กรุณากรอกเขต/อำเภอ" }]}
                >
                  <Input placeholder="เขต/อำเภอ" />
                </Form.Item>
              </div>
              <div className="flex space-x-2">
                <Form.Item
                  name="province"
                  label="จังหวัด"
                  className="w-1/2"
                  rules={[{ required: true, message: "กรุณากรอกจังหวัด" }]}
                >
                  <Input placeholder="จังหวัด" />
                </Form.Item>
                <Form.Item
                  name="postalCode"
                  label="รหัสไปรษณีย์"
                  className="w-1/2"
                  rules={[{ required: true, message: "กรุณากรอกรหัสไปรษณีย์" }]}
                >
                  <Input placeholder="รหัสไปรษณีย์" />
                </Form.Item>
              </div>
              <Button type="primary" onClick={handleSave} className="mr-2">
                บันทึก
              </Button>
              <Button onClick={() => setIsEditing(false)} className="mr-2">
                ยกเลิก
              </Button>
              {!isAddingNew && (
                <Button onClick={handleAddNew} type="dashed">
                  เพิ่มที่อยู่ใหม่
                </Button>
              )}
            </Form>
          ) : (
            <>
              <span className="block my-2 p-2">
                {
                  addresses.find((addr) => addr.id === selectedAddressId)
                    ?.address
                }
              </span>
              <Button onClick={handleEdit}>แก้ไขที่อยู่</Button>
            </>
          )}
        </Card>
      </div>

      <div className="w-1/4">
        <Card className="p-4">
          <div className="flex justify-between text-lg mb-2">
            <span>จำนวน</span>
            <span>{itemCount}</span>
          </div>
          <div className="flex justify-between text-lg mb-2">
            <span>ราคา</span>
            <span>${Amount}</span>
          </div>
          <div className="flex justify-between text-lg mb-2 text-red-500">
            <span>ส่วนลด</span>
            <span>- ${discount}</span>
          </div>
          <div className="flex justify-between text-lg mt-4 font-bold">
            <span>รวมทั้งหมด</span>
            <span>${totalAmount}</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentDetail;
