"use client";
import styled from "styled-components";
import PermIdentityIcon from "@mui/icons-material/PermIdentityOutlined";
import Icon, {
  MenuOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useSelector } from "react-redux";
import { Badge } from "@mui/material";
import { useEffect, useState } from "react";

import Link from "next/link";
import SideNav from "./Sidenav";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const NavBar: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [mobileView, setMobileView] = useState(false);
  const [openSideNav, setOpenSideNav] = useState(false);

  const router = useRouter();
  const totalQuantity = useSelector(
    (state: RootState) => state.app.totalQuantity
  );

  const isAdmin = useSelector((state: RootState) => state.app.isAdmin);
  const token = useSelector((state: RootState) => state.app.token);

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

        {isAdmin && !mobileView && (
          <AdminContainer
            onClick={() => {
              router.push("/admin/shop");
            }}
          >
            <span>Shop</span>
          </AdminContainer>
        )}
        {isAdmin && !mobileView && (
          <AdminContainer
            onClick={() => {
              router.push("/admin/orders");
            }}
          >
            <span>Orders</span>
          </AdminContainer>
        )}
        {!mobileView && !isAdmin && (
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
          <Badge
            badgeContent={totalQuantity}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#552c36",
                color: "aliceblue",
                fontStyle: "normal",
              },
            }}
          >
            <ShoppingOutlined
              onClick={() => {
                router.push("/cart");
              }}
            />
          </Badge>

          <UserOutlined
            onClick={() => {
              router.push(token ? "/account" : "/login");
            }}
          />
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
  .icons {
    display: flex;
    gap: 5px;
  }
  h1 {
    font-weight: 600;
    margin-top: 11px;
    cursor: pointer;
    color: #2e2e2e;
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
