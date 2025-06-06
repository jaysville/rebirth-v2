import { Drawer } from "@mui/material";
import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Menu } from "antd";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useSelector } from "react-redux";
import { Logout, PermIdentity } from "@mui/icons-material";
import { useRouter } from "next/navigation";

import { collectionLinks } from "./index";
interface SideNavProps {
  opensidenav: boolean;
  closesidenav: () => void;
  //   openlogoutmodal: () => void;
}

const SideNav: React.FC<SideNavProps> = ({
  opensidenav,
  closesidenav,
  //   openlogoutmodal,
}) => {
  //   const totalQuantity = useSelector((state) => state.app.totalQuantity);
  //   const token = useSelector((state) => state.app.token);
  //   const isAdmin = useSelector((state) => state.app.isAdmin);

  const router = useRouter();
  return (
    <Drawer open={opensidenav} onClose={closesidenav}>
      <Container>
        <Close onClick={closesidenav} />

        <a href="/cart">
          <CartLink>
            <span>Cart 4 Item(s)</span> <ShoppingCartOutlinedIcon />
          </CartLink>
        </a>

        <ul>
          {collectionLinks.map(({ title, href }, i) => {
            return (
              <a href={href} key={i}>
                <li className="collections-link">{title} </li>
              </a>
            );
          })}
        </ul>
        {/* )}
        {token ? (
          <>
            {!isAdmin ? (
              <LinkContainer
                onClick={() => {
                  navigate("/account");
                  closesidenav();
                }}
              >
                <span>Account</span> <PermIdentity />
              </LinkContainer>
            ) : (
              <>
                <LinkContainer
                  onClick={() => {
                    navigate("/add-merch");
                    closesidenav();
                  }}
                >
                  <span>Add Merch</span>
                </LinkContainer>
                <LinkContainer
                  onClick={() => {
                    navigate("/orders");
                    closesidenav();
                  }}
                >
                  <span>Orders</span>
                </LinkContainer>
              </>
            )}

            <LinkContainer
              onClick={() => {
                closesidenav();
                openlogoutmodal();
              }}
            >
              <span>Logout</span> <Logout />
            </LinkContainer>
          </>
        ) : (
        
        )} */}
        <AuthLink
          onClick={() => {
            closesidenav();
            router.push("/login");
          }}
        >
          <PersonOutlineOutlinedIcon />
          <span>Login/Create Account</span>
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
const LinkContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 10px 0;
  padding-left: 30px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  svg {
    transform: scale(0.8) translateY(7px);
  }
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
