"use client";
import PageInfo from "@/component/pageInfo";
import style from "./contact.module.css";
import { useGetContactByIdQuery } from "@/services/contact.api";
import Image from "next/image";
import ContactForm from "@/component/contactForm";
import Location from "@/component/location";
import { useGetAddressQuery } from "@/services/address.api";
import SocialMedia from "@/component/socialMedia";
import Div from "@/component/animation/Div";

export default function ContactPage() {
  const { data: contact, isLoading } = useGetContactByIdQuery(1);
  const { data: address, isLoading: isLoad } = useGetAddressQuery(undefined);
  const contactInfo = contact?.data || [];
  let addressJSX;
  if (!isLoad) {
    const addressMain = address?.data[0];
    const addressBranch = address?.data[1];
    addressJSX = (
      <div>
        <h1>Our Offices</h1>
        <div className={style.address_block}>
          <Div direction="right" delay={0.1}>
            <div>
              <p>
                {addressMain.street} {addressMain.city}
              </p>
              <p>{addressMain.state}</p>
              <p>{addressMain.pincode}</p>
            </div>
          </Div>
          <Div direction="right" delay={0.3}>
            <div>
              <b>Branch Office:</b>
              <p>
                {addressBranch.street} {addressBranch.city}
              </p>
              <p>
                {addressBranch.state} {addressBranch.pincode}
              </p>
            </div>
          </Div>
        </div>
      </div>
    );
  }

  if (!isLoading)
    return (
      <>
        <Div>
          <PageInfo page="CONTACT" position="middle" />
        </Div>
        <Div direction="bottom" delay={0.5}>
          <div className={style.quotes}>
            <h2>Expertise Meets Vision at BankersKlub</h2>
          </div>
        </Div>
        <Div direction="bottom" delay={2}>
          <PageInfo page="CONTACTMID" position="middle_full" />
        </Div>
        <Div direction="bottom" delay={3}>
          <div className={style.middle_field}>
            <div>
              <Div direction="left" delay={0.5}>
                <Image
                  src={
                    process.env.NEXT_PUBLIC_BACKEND_API_URL + contactInfo?.image
                  }
                  alt={contactInfo?.sub}
                  height={500}
                  width={500}
                />
              </Div>
            </div>
            <Div direction="right">
              <div className={style.form}>
                <h1>{contactInfo?.title}</h1>
                <p>{contactInfo?.sub}</p>
                <Div>
                  <ContactForm />
                </Div>
              </div>
            </Div>
          </div>
        </Div>
        <Div>
          <div className={style.middle_field}>
            <Location />
            <div className={style.detail}>
              <Div direction="right">
                {addressJSX}
                <Div>
                  <h1>Customer Support</h1>
                  <p className={style.support_block}>
                    Our support team is available round the clock to address any
                    concerns or queries you may have. Please reach out to us at
                    - <b>{contactInfo?.email}</b> |{" "}
                    <b>{contactInfo?.contact}</b>
                  </p>
                </Div>

                <div className={style.social}>
                  <SocialMedia size="large" />
                </div>
              </Div>
            </div>
          </div>
        </Div>
      </>
    );
}
