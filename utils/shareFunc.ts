export const getUserId = async (email: string) => {
  try {
    const res = await fetch("/api/user/getUserId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail: email }), // Send email in the request body
    });

    const data = await res.json();

    if (res.ok) {
      return data.userId;
    } else {
      return { userId: null, message: data.message };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        userId: null,
        message: "getUserId error: " + error.message,
      };
    } else {
      return { userId: null, message: "Unknown getUserId error" };
    }
  }
};

export const getOrderId = async (userId: string) => {
  try {
    const res = await fetch("/api/cart/getOrderId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });

    const data = await res.json();

    if (res.ok) {
      return data.orderId;
    } else {
      return { orderId: null, message: data.message };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        orderId: null,
        message: "getOrderId error: " + error.message,
      };
    } else {
      return { orderId: null, message: "Unknown getOrderId error" };
    }
  }
};
