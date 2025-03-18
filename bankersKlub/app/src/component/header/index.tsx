"use client";
import Image from "next/image";
import React, { useState } from "react";
import style from "./header.module.css";
import { MdEmail, MdOutlineClose } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useBreakpoint from "@/hooks/useBreakPoints";
import { ImMenu } from "react-icons/im";
import SocialMedia from "../socialMedia";
import { useGetContactsQuery } from "@/services/contact.api";
import Button from "../animation/Button";
import Div from "../animation/Div";

export default function Header() {
  const router = usePathname();
  const isMobile = useBreakpoint("md");
  const { data } = useGetContactsQuery(undefined);
  const contactData = data?.data?.[0] || {};
  const [openMenu, setOpenMenu] = useState(false);
  const menu = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact Us", link: "/contact" },
    { name: "Career", link: "/career" },
    { name: "Blogs", link: "/blog" },
  ];
  const contact = (
    <div className={style.contact_bar}>
      <div className={style.contact_info}>
        <MdEmail className={style.icon} /> <span>{contactData.email}</span>
      </div>
      <hr className={style.vertical_bar} />
      <div className={style.contact_info}>
        <MdCall className={style.icon} /> <span>{contactData.contact}</span>
      </div>
      <hr className={style.vertical_bar} />
      <div className={style.contact_info}>
        <FaClock className={style.icon} /> <span>Mon-Fri 9am-5pm</span>
      </div>
    </div>
  );

  const link = (
    <ul className={style.link}>
      {menu.map((item) => (
        <li key={item.name}>
          <Link
            href={item.link}
            className={router === item.link ? style.active : ""}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
  const social = (
    <div>
      <SocialMedia size="small" />
    </div>
  );
  const desktop_view = (
    <div className={style.w_full}>
      <div className={style.upper_bar}>
        {contact}
        {social}
      </div>
      <div className={style.d_flex}>
        <div className={style.nav_bar}>{link}</div>
        <div className={style.btn}>
          <Button className="secondary">Get Started</Button>
        </div>
      </div>
    </div>
  );
  const mobile_view = (
    <div className={style.mobile_view}>
      <div>{link}</div>
      <div className={style.justify_center}>
        <Button className="secondary">Get Started</Button>
      </div>

      <div>
        {contact}
        <div className={style.justify_center}>{social}</div>
      </div>
    </div>
  );

  return (
    <Div delay={0}>
      <div className={style.fixed}>
        <div className={style.header}>
          <div className={style.logo}>
            <Image
              src="/bankerKlub-logo.svg"
              alt="logo"
              width={180}
              height={38}
              priority
            />
          </div>
          {isMobile &&
            (!openMenu ? (
              <ImMenu
                onClick={() => setOpenMenu(true)}
                className={style.bars}
              />
            ) : (
              <MdOutlineClose
                onClick={() => setOpenMenu(false)}
                className={style.bars}
              />
            ))}
          {!isMobile && desktop_view}
        </div>
        {openMenu && isMobile && mobile_view}
      </div>
    </Div>
  );
}
