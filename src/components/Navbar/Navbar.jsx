
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";


export default function AppNavbar() {
 const navigate = useNavigate()

const {token ,setToken  ,userData ,setUser}=useContext(AuthContext)

function handelLogout() {
  localStorage.removeItem('token')
  setToken(null)
   navigate('/login')
   setUser(null)
}

  return (
    <Navbar className="py-1" >
      <NavbarBrand as={Link} to={'/'}>
        <span className=" logo self-center whitespace-nowrap text-xl font-semibold dark:text-white">kudo </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown  classname='cursor-pointer'
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User  settings" img={userData?.photo ?
               userData.photo : "https://www.gravatar.com/avatar/?d=mp"} rounded />
          }
        >
          {token? <>
          <DropdownHeader>
            <span className="block text-sm">{userData?.name}</span>
            <span className="block truncate text-sm font-medium">{userData?.email}</span>
          </DropdownHeader>
          
          <DropdownItem as={NavLink} to={'/profile'}> profile</DropdownItem>
          <DropdownDivider />
          <DropdownItem as='button' onClick={handelLogout}> log out</DropdownItem>
          </>:
          <>
            <DropdownItem as={NavLink} to={'/login'}> login</DropdownItem>
          <DropdownItem as={NavLink} to={'/register'}> register</DropdownItem>
          </>}
          
        
        </Dropdown>
        {token && <NavbarToggle />}
      </div>
      {token && <NavbarCollapse>
        <NavbarLink as={NavLink} to={'/'} >
          Home
        </NavbarLink>
        
        <NavbarLink as={NavLink} to={'/profile'}>profile</NavbarLink>
      </NavbarCollapse>}
    </Navbar>
  );
}
