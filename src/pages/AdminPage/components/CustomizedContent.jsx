import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const CustomizedContent = ({ data, colors, setKeySelected }) => {
  return (
    <div style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
      {Object.keys(data).map((item) => (
        <div
          key={item}
          style={{
            width: 300,
            background: `linear-gradient(${colors[item]?.[0] || '#000'}, ${colors[item]?.[1] || '#000'})`,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            cursor: 'pointer',
            padding: '20px',
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
          onClick={() => setKeySelected(item)}
        >
          {item === 'users' && <UserOutlined style={{ fontSize: 50 }} />}
          {item === 'products' && <AppstoreOutlined style={{ fontSize: 50 }} />}
          {item === 'orders' && <ShoppingCartOutlined style={{ fontSize: 50 }} />}
          <span>{item}</span>
          <span>{data[item]}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomizedContent;
