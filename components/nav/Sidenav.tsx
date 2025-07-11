import { Drawer } from "@mui/material";
import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

import { collectionLinks } from "./index";

interface SideNavProps {
  opensidenav: boolean;
  closesidenav: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ opensidenav, closesidenav }) => {
  const token = useSelector((state: RootState) => state.app.token);
  const isAdmin = useSelector((state: RootState) => state.app.isAdmin);

  const router = useRouter();

  const totalQuantity = useSelector(
    (state: RootState) => state.app.totalQuantity
  );

  return (
    <Drawer open={opensidenav} onClose={closesidenav}>
      <Container>
        <Close onClick={closesidenav} />

        <a href="/cart">
          <CartLink>
            <span>
              Cart <b>{totalQuantity} Item(s)</b>
            </span>

            <ShoppingCartOutlinedIcon />
          </CartLink>
        </a>

        {!isAdmin && (
          <ul>
            {collectionLinks.map(({ title, href }, i) => {
              return (
                <a href={href} key={i}>
                  <li className="collections-link">{title} </li>
                </a>
              );
            })}
          </ul>
        )}
        {isAdmin && (
          <ul>
            {AdminLinks.map(({ title, href }, i) => {
              return (
                <a href={href} key={i}>
                  <li className="collections-link">{title} </li>
                </a>
              );
            })}
          </ul>
        )}

        <AuthLink
          onClick={() => {
            closesidenav();
            router.push(token ? "/account" : "/login");
          }}
        >
          <PersonOutlineOutlinedIcon />
          <span>{token ? "Account" : "Login/Create Account"}</span>
        </AuthLink>
      </Container>
    </Drawer>
  );
};

export default SideNav;

const Container = styled.div`
  padding: 20px;
  width: 350px;
  font-size: 13px;
  li {
    margin: 10px 0;
    border-radius: 0;
  }

  .collections-link {
    border-bottom: 1px solid grey;
    padding: 10px;
    padding-left: 28px;
  }
`;

const Close = styled(CloseOutlined)`
  cursor: pointer;
`;

const CartLink = styled.div`
  border: 1px solid grey;
  padding: 10px 30px;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  margin: 50px 0;
  svg {
    transform: scale(0.8);
  }
  span {
    transform: translateY(3px);
  }
`;

const AuthLink = styled.div`
  border-bottom: 1px solid grey;
  padding: 10px 0;
  padding-left: 20px;
  cursor: pointer;
  svg {
    transform: scale(0.8) translateY(8px);
  }
`;

const AdminLinks = [
  { title: "Shop", href: "/admin/shop" },
  { title: "Orders", href: "/admin/orders" },
];
