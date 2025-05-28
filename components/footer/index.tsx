"use client";

import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <Style>
      <h5>Explore</h5>
      <ul>
        {Links.map(({ title, link }, i) => {
          return (
            <li key={i}>
              <a href={link}>{title}</a>
            </li>
          );
        })}
      </ul>

      <div>
        <small>©2025 Rebirth Island. All rights reserved</small>
      </div>
    </Style>
  );
};
export default Footer;

const Style = styled.footer`
  background-color: #251d25;
  margin-top: 30px;
  color: aliceblue;
  padding: 10px 20px;
  ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
  li {
    padding: 3px;
  }
  div {
    display: flex;
    justify-content: center;
    border-top: 1px solid aliceblue;
    padding-top: 10px;
  }
`;

const Links = [
  {
    title: "About Us",
    link: "/about-us",
  },
  {
    title: "Terms of use and conduct",
    link: "terms-of-use-and-conduct",
  },
  {
    title: "Return and Refund policy",
    link: "/refund-policy",
  },

  {
    title: "Get in Touch",
    link: "/contact",
  },
];
