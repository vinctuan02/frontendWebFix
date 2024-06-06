import React from 'react';
import './style.css'; // Đảm bảo rằng bạn tạo file CSS và import nó
import { useLocation } from 'react-router-dom';

const Invoice = () => {
    const location = useLocation()
    const { state } = location
    const { user, orders } = state

    console.log("state: ", state)

    // Tính toán các giá trị cần thiết
    let sumPrice = 0;
    let sumDiscount = 0;
    let sumTotalCost = 0;

    orders.forEach(order => {
        const discountedPrice = order.price - (order.price * (order.discount / 100));
        sumPrice += order.price;
        sumDiscount += (order.price - discountedPrice);
        sumTotalCost += discountedPrice * order.amount;
    });


    // Hiển thị thông tin trong bảng invoice-summary
    return (
        <div className="invoice-container">
            <div className="invoice-header">
                <h1 >HÓA ĐƠN GIAO HÀNG</h1>
                <p><strong>Cửa hàng:</strong> Đồng Hồ Thông Minh Hà Đông</p>
                <p><strong>Địa chỉ:</strong> Số 10 Trần Phú, Hà Đông, Hà Nội</p>
                <p><strong>Số điện thoại:</strong> 0347588988</p>
                <p><strong>Email:</strong> vinctuan02@gmail.com</p>
            </div>
            <div className="invoice-details">
                <p><strong>Khách hàng:</strong> {user?.name}</p>
                <p><strong>Địa chỉ giao hàng:</strong> {user?.address}</p>
                <p><strong>Số điện thoại:</strong> {user?.phone}</p>
            </div>
            <table className="invoice-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá (VND)</th>
                        <th>Giảm giá (%)</th>
                        <th>Thành tiền (VND)</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map((order, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{order.name}</td>
                            <td>{order.amount}</td>
                            <td>{order.price.toLocaleString('vi-VN')} VND</td>
                            <td>{order.discount}</td>
                            <td>{(order.price - (order.price * (order.discount / 100))).toLocaleString('vi-VN')} VND</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="invoice-summary">
                <p><strong>Tổng giá trị trước giảm giá:</strong> {sumPrice.toLocaleString('vi-VN')} VND</p>
                <p><strong>Giảm giá:</strong> {sumDiscount.toLocaleString('vi-VN')} VND</p>
                <h2><strong>Tổng giá trị :</strong> {sumTotalCost.toLocaleString('vi-VN')} VND</h2>
                {/* Nếu bạn muốn thêm phí giao hàng, bạn có thể tính toán và hiển thị ở đây */}
                {/* <p className="total-amount"><strong>Tổng cộng:</strong> {sumTotalCost} VND</p> */}
            </div>
            <p className="invoice-footer">Cảm ơn quý khách đã mua sắm tại cửa hàng chúng tôi!</p>
        </div>
    );
};

export default Invoice;
