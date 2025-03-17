import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Basic from "./layouts/Basic";
import ProtectedRoute from "./component/protectedRoute";
import Loading from "./component/loading";
import Layout from "./layouts/layout";
import LazyComponent from "./component/LazyComponent";
import Funding from "./pages/funding";
import Workflow from "./pages/workflow";
import Service from "./pages/service";
import Sector from "./pages/sector";
import Journey from "./pages/journey";
import Partner from "./pages/partner";
import FundScheme from "./pages/fund_scheme";
import Faq from "./pages/faq";
import Category from "./pages/category";
import Company from "./pages/company";
import Banker from "./pages/banker";
import BankerVideo from "./pages/banker_video";
import Testimonial from "./pages/testimonial";
import Opportunity from "./pages/opportunity";
import User from "./pages/users";
import Blog from "./pages/blog";
import PageInfo from "./pages/pageInfo";
import Job from "./pages/job";
import Applicant from "./pages/applicant";
import Join from "./pages/join";
import Contact from "./pages/contact";
import Social from "./pages/social";
import Address from "./pages/address";
import About from "./pages/about";
import Advantage from "./pages/advantage";
import Team from "./pages/team";

const HomePage = React.lazy(() => import("./pages/homePage"));
const Authenticate = React.lazy(() => import("./pages/authenticate"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Basic />}>
          <Route path="/authenticate" element={<Authenticate />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route
            path="/home-page"
            element={
              <LazyComponent>
                <HomePage />
              </LazyComponent>
            }
          />
          <Route
            path="/fundings"
            element={
              <LazyComponent>
                <Funding />
              </LazyComponent>
            }
          />
          <Route
            path="/workflows"
            element={
              <LazyComponent>
                <Workflow />
              </LazyComponent>
            }
          />
          <Route
            path="/services"
            element={
              <LazyComponent>
                <Service />
              </LazyComponent>
            }
          />
          <Route
            path="/sectors"
            element={
              <LazyComponent>
                <Sector />
              </LazyComponent>
            }
          />
          <Route
            path="/journey"
            element={
              <LazyComponent>
                <Journey />
              </LazyComponent>
            }
          />
          <Route
            path="/partners"
            element={
              <LazyComponent>
                <Partner />
              </LazyComponent>
            }
          />
          <Route
            path="/fund-scheme"
            element={
              <LazyComponent>
                <FundScheme />
              </LazyComponent>
            }
          />
          <Route
            path="/faqs"
            element={
              <LazyComponent>
                <Faq />
              </LazyComponent>
            }
          />
          <Route
            path="/categories"
            element={
              <LazyComponent>
                <Category />
              </LazyComponent>
            }
          />
          <Route
            path="/companies"
            element={
              <LazyComponent>
                <Company />
              </LazyComponent>
            }
          />
          <Route
            path="/bankers"
            element={
              <LazyComponent>
                <Banker />
              </LazyComponent>
            }
          />
          <Route
            path="/banker-video"
            element={
              <LazyComponent>
                <BankerVideo />
              </LazyComponent>
            }
          />
          <Route
            path="/testimonial"
            element={
              <LazyComponent>
                <Testimonial />
              </LazyComponent>
            }
          />
          <Route
            path="/opportunity"
            element={
              <LazyComponent>
                <Opportunity />
              </LazyComponent>
            }
          />
          <Route
            path="/users"
            element={
              <LazyComponent>
                <User />
              </LazyComponent>
            }
          />
          <Route
            path="/blogs"
            element={
              <LazyComponent>
                <Blog />
              </LazyComponent>
            }
          />
          <Route
            path="/page-info"
            element={
              <LazyComponent>
                <PageInfo />
              </LazyComponent>
            }
          />
          <Route
            path="/jobs"
            element={
              <LazyComponent>
                <Job />
              </LazyComponent>
            }
          />
          <Route
            path="/applicants"
            element={
              <LazyComponent>
                <Applicant />
              </LazyComponent>
            }
          />
          <Route
            path="/joins"
            element={
              <LazyComponent>
                <Join />
              </LazyComponent>
            }
          />
          <Route
            path="/contacts"
            element={
              <LazyComponent>
                <Contact />
              </LazyComponent>
            }
          />
          <Route
            path="/social"
            element={
              <LazyComponent>
                <Social />
              </LazyComponent>
            }
          />
          <Route
            path="/address"
            element={
              <LazyComponent>
                <Address />
              </LazyComponent>
            }
          />
          <Route
            path="/about"
            element={
              <LazyComponent>
                <About />
              </LazyComponent>
            }
          />
          <Route
            path="/advantages"
            element={
              <LazyComponent>
                <Advantage />
              </LazyComponent>
            }
          />
          <Route
            path="/team"
            element={
              <LazyComponent>
                <Team />
              </LazyComponent>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
