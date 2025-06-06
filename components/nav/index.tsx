"use client";
import styled from "styled-components";
import PermIdentityIcon from "@mui/icons-material/PermIdentityOutlined";
import Icon, {
  MenuOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { Logout, ShoppingBag } from "@mui/icons-material";
import Link from "next/link";
import SideNav from "./Sidenav";

const NavBar: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [mobileView, setMobileView] = useState(false);
  const [openSideNav, setOpenSideNav] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    if (windowWidth <= 650) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  const toggleSideNav = (newState: boolean) => {
    setOpenSideNav(newState);
  };
  return (
    <>
      <Style>
        {/* {mobileview && !onCheckoutPage && <Hamburger onClick={opensidenav} />}
      <a href="/">
        <Logo
          src={`${process.env.PUBLIC_URL}/images/Logo.png`}
          alt="logo"
          mobileview={mobileview}
          isAdmin={isAdmin}
        />
      </a>
      {!isAdmin && !mobileview && (
        <CollectionsList>
          {!onCheckoutPage &&
            collectionLinks.map(({ title, href, items }, i) => {
              return (
                <li key={i}>
                  {items ? (
                    <Dropdown
                      menu={{
                        items,
                      }}
                    >
                      <a>
                        <Space>
                          {title} <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  ) : (
                    <a href={href}> {title}</a>
                  )}
                </li>
              );
            })}
        </CollectionsList>
      )}
      {isAdmin && !mobileview && (
        <AdminContainer
          onClick={() => {
            navigate("/add-merch");
          }}
        >
          <span>Add Merch</span>
        </AdminContainer>
      )}
      {isAdmin && !mobileview && (
        <AdminContainer
          onClick={() => {
            navigate("/orders");
          }}
        >
          <span>Orders</span>
        </AdminContainer>
      )}
      <OtherLists mobileview={mobileview}>
        {otherLinks.map(({ title, icon, onClick }, i) => {
          const indicesToExclude = [0, 1];

          if ((mobileview || onCheckoutPage) && indicesToExclude.includes(i)) {
            return null;
          }
          if (!token && i === 1) {
            return null;
          }

          if (isAdmin & (i === 2 || i === 0)) {
            return null;
          }
          return (
            <li key={i} onClick={onClick}>
              <div>
                <span className="title">{title}</span>
              </div>
              <i>{icon}</i>
            </li>
          );
        })}
      </OtherLists> */}
        {mobileView && (
          <MenuOutlined
            onClick={() => {
              toggleSideNav(true);
            }}
          />
        )}
        <a href="/">
          <h1>Rebirth Island</h1>
        </a>

        {!mobileView && (
          <CollectionsList>
            {collectionLinks.map(({ title, href }, i) => {
              return (
                <li key={i}>
                  <Link href={href}>{title}</Link>
                </li>
              );
            })}
          </CollectionsList>
        )}
        <div className="icons">
          <ShoppingOutlined />
          <UserOutlined />
        </div>
      </Style>
      <SideNav
        opensidenav={openSideNav && mobileView}
        closesidenav={() => {
          toggleSideNav(false);
        }}
      />
    </>
  );
};
export default NavBar;

const Style = styled.nav`
  height: 80px;
  width: 100%;
  padding: 30px 20px;
  background-color: #fffffffa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 999;
  backdrop-filter: blur(8px);
  h1 {
    font-weight: 600;
    cursor: pointer;
    color: #552c36;
  }
  ul {
    display: flex;
  }
  li {
    margin: 15px;
    cursor: pointer;
  }
  svg {
    transform: scale(1.3);
    margin: 0 5px;
    cursor: pointer;
  }
`;

const Logo = styled.img`
  width: 100px;
  transform: scale(1.5) translateX(20px);
  cursor: pointer;
`;
const AdminContainer = styled.div`
  font-weight: 500;
  /* transform: translateY(9px); */
  display: grid;
  place-items: center;
  cursor: pointer;
`;
const CollectionsList = styled.ul`
  font-weight: 500;
  svg {
    transform: scale(0.6) translateX(-18px) translateY(3px);
  }
`;

const OtherLists = styled.ul`
  svg {
    fill: rgba(0, 0, 0, 0.7);
    font-size: 22px;
    /* transform: scale(0.8); */
  }

  transform: translateX(-30px);
  li {
    display: flex;
    align-items: center;
    transform: translateY(5px);
    @media (max-width: 800px) {
      transform: translateY(15px);
    }
  }
`;

const AccountIcon = styled(PermIdentityIcon)`
  transform: translateY(3px);
`;

const Hamburger = styled(MenuIcon)`
  transform: scale(1.5) translateY(38px) translateX(10px);
  cursor: pointer;
`;

const LogoutIcon = styled(Logout)`
  transform: scale(0.9) translateY(3px) translateX(2px);
`;

export const collectionLinks = [
  {
    title: "Male",
    href: "/collections/male",
  },
  {
    title: "Female",
    href: "/collections/female",
  },
  {
    title: "Accessories",
    href: "/collections/accessories",
  },
];
