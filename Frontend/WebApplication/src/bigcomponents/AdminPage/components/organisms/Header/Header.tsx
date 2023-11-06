import { BsPersonCircle, BsJustify } from "react-icons/bs";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom';

import "./Header.scss";

interface HeaderProps {
  OpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ OpenSidebar }) => {
  const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('Thong-tin-ca-nhan');
  };

  const handleSetting = () => {
    navigate('/setting');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loginedUser');
    console.log('user:', user); 
    navigate('dang-nhap');
  };

  return (
    <div className="Header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left"></div>
      <div className="header-right">
        <Menu>
          <MenuButton border="none" padding="0" backgroundColor="#fff" as={Button} >
            <BsPersonCircle className="icon"/>
          </MenuButton>
          <MenuList>
            <MenuItem backgroundColor="#4292EB" textColor="#fff" onClick={handleProfile}>Hồ sơ cá nhân</MenuItem>
            <MenuItem backgroundColor="#4292EB" textColor="#fff" onClick={handleSetting}>Cài Đặt</MenuItem>
            <MenuItem backgroundColor="#4292EB" textColor="#fff" onClick={handleLogout}>Đăng xuất</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default Header;