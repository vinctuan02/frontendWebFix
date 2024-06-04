import { Menu } from 'antd';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderCompoent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import OrderAdmin from '../../components/OrderAdmin/OrderAmin';
import * as OrderService from '../../services/OrderService';
import * as ProductService from '../../services/ProductService';
import * as UserService from '../../services/UserService';
import CustomizedContent from './components/CustomizedContent';
import { useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';
import Loading from '../../components/LoadingComponent/Loading';

const getAllOrder = async (token) => {
  const res = await OrderService.getAllOrder(token);
  return { data: res?.data, key: 'orders' };
};

const getAllProducts = async () => {
  const res = await ProductService.getAllProduct();
  return { data: res?.data, key: 'products' };
};

const getAllUsers = async (token) => {
  const res = await UserService.getAllUser(token);
  return { data: res?.data, key: 'users' };
};

const AdminPage = () => {
  const user = useSelector((state) => state?.user);
  const [keySelected, setKeySelected] = useState('');

  const items = useMemo(() => [
    getItem('Người dùng', 'users', <UserOutlined />),
    getItem('Sản phẩm', 'products', <AppstoreOutlined />),
    getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />)
  ], []);

  const queries = useQueries({
    queries: [
      { queryKey: ['products'], queryFn: getAllProducts, staleTime: 1000 * 60 },
      { queryKey: ['users'], queryFn: () => getAllUsers(user?.access_token), staleTime: 1000 * 60 },
      { queryKey: ['orders'], queryFn: () => getAllOrder(user?.access_token), staleTime: 1000 * 60 }
    ]
  });

  const memoCount = useMemo(() => {
    const result = {};
    try {
      if (queries) {
        queries.forEach((query) => {
          result[query?.data?.key] = query?.data?.data?.length;
        });
      }
      return result;
    } catch (error) {
      return result;
    }
  }, [queries]);

  const COLORS = {
    users: ['#e66465', '#9198e5'],
    products: ['#a8c0ff', '#3f2b96'],
    orders: ['#11998e', '#38ef7d']
  };

  const renderPage = useCallback((key) => {
    switch (key) {
      case 'users':
        return <AdminUser />;
      case 'products':
        return <AdminProduct />;
      case 'orders':
        return <OrderAdmin />;
      default:
        return null;
    }
  }, []);

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: 'flex', overflowX: 'hidden' }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh'
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
          <Loading isLoading={!memoCount || Object.keys(memoCount).length !== 3}>
            {!keySelected && (
              <CustomizedContent data={memoCount} colors={COLORS} setKeySelected={setKeySelected} />
            )}
          </Loading>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
