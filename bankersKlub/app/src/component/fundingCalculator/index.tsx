"use client";

import Button from "../animation/Button";
import Div from "../animation/Div";
import styles from "./FundingCalculator.module.css";
import { useState } from "react";

interface FormData {
  revenue: string;
  growthRate: string;
  cashRunway: string;
  debt: string;
  sector: string;
  website: string;
  email: string;
  phone: string;
}

export default function FundingCalculator() {
  const [formData, setFormData] = useState<FormData>({
    revenue: "",
    growthRate: "",
    cashRunway: "",
    debt: "",
    sector: "",
    website: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <Div direction="left" duration={1} delay={0.5}>
        <div className={styles.leftPanel}>
          <h1>Estimate Your Funding</h1>
          <p>
            Simplifying Financial Solutions For Corporations And Bankers,
            Bridging Expertise With Tailored Opportunities.
          </p>
        </div>
      </Div>
      <Div direction="right" duration={1} delay={0.5}>
        <div className={styles.rightPanel}>
          <form className={styles.form}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Monthly Revenue</label>
                <input
                  type="text"
                  name="revenue"
                  placeholder="Select your revenue range"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Annual Growth Rate</label>
                <input
                  type="text"
                  name="growthRate"
                  placeholder="Select your growth rate"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Cash Runway</label>
                <input
                  type="text"
                  name="cashRunway"
                  placeholder="Select your Cash Runway"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Existing Debt</label>
                <input
                  type="text"
                  name="debt"
                  placeholder="Select your existing debt"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Sector</label>
                <input
                  type="text"
                  name="sector"
                  placeholder="Select your industry"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Company Website</label>
                <input
                  type="text"
                  name="website"
                  placeholder="Select your Company website"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Your Work Mail</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your work Email"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Select your Phone Number"
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button type="submit" className="secondary">
              Estimate Your Funding
            </Button>
          </form>
        </div>
      </Div>
    </div>
  );
}
