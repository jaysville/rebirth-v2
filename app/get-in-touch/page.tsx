"use client";

import { Instagram, Mail, Phone, Twitter } from "@mui/icons-material";
import styled from "styled-components";

const Contact: React.FC = () => {
  return (
    <Style>
      <h3>Get in Touch</h3>
      <div>
        We'd love to hear from you!
        <br /> <br /> <br />
        <div>
          <span>
            <Phone />
            <a href="tel:+2348148836074">+234-814-883-6074</a>
          </span>
          <span>
            <Mail />
            <a href="mailto:RebirthIsland7@gmail.com">
              RebirthIsland7@gmail.com
            </a>
          </span>
        </div>
      </div>
      <h3>Stay Connected</h3>
      <p>
        Follow us on social media to stay up-to-date on new releases,
        behind-the-scenes insights, and exclusive promotions:
        <br /> <br />{" "}
        <a
          href=" https://www.instagram.com/rebirth__island?igsh=YzZkbHZtNnpjMXkw"
          className="socials"
        >
          <Instagram />
        </a>
        <a
          href="https://x.com/rebirth__island?s=21&t=2xm9m8rR7myPff9rwWtlpg"
          className="socials"
        >
          <Twitter />
        </a>
      </p>
    </Style>
  );
};

export default Contact;

const Style = styled.div`
  padding: 50px;
  margin-bottom: 30px;
  @media (max-width: 900px) {
    padding: 50px 20px;
  }
  div {
    margin-bottom: 50px;
  }
  a.socials {
    margin-right: 20px;
  }
  h3 {
    color: #a55fa5;
    font-weight: 700;
    font-family: "open sans";
    margin: 10px 0;
  }
  span {
    display: inline-flex;
    margin-right: 30px;
    padding-right: 10px;
    padding-top: 10px;
    align-items: center;
    svg {
      margin-right: 3px;
    }
  }
`;
