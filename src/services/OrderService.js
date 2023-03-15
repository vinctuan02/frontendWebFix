import { axiosJWT } from "./UserService"

// export const createProduct = async (data) => {
//   const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
//   return res.data
// // }
// http://localhost:3001/api/order/get-order-details/639724669c6dda4fa11edcde
export const createOrder = async (data,access_token) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create`, data, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const getOrderByUserId = async (id,access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-order-details/${id}`, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}
