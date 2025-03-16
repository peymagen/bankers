import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/authReducer";
import homeReducer from "./reducers/homeReducer";
import fundingReducer from "./reducers/fundingReducer";
import { apiUser } from "../services/user.api";
import { apiHome } from "../services/home.api";
import { apiFunding } from "../services/funding.api";
import { apiWorkflow } from "../services/workflow.api";
import { apiService } from "../services/service.api";
import { apiSector } from "../services/sector.api";
import { apiJourney } from "../services/journey.api";
import { apiPartner } from "../services/partner.api";
import { apiFundScheme } from "../services/fund_scheme.api";
import { apiFaq } from "../services/faq.api";
import { apiBlog } from "../services/blog.api";
import { apiTestimonial } from "../services/testimonial.api";
import { apiBanker } from "../services/bankers.api";
import { apiBankerVideo } from "../services/banker_video.api";
import { apiCategory } from "../services/category.api";
import { apiCompany } from "../services/company.api";
import { apiOpportunity } from "../services/opportunity.api";
import { apiPageInfo } from "../services/pageInfo.api";
import { apiJob } from "../services/job.api";
import { apiApplicant } from "../services/applicant.api";
import { apiJoin } from "../services/join.api";
import { apiContact } from "../services/contact.api";
import { apiSocial } from "../services/social.api";
import { apiAddress } from "../services/address.api";
import { apiAbout } from "../services/about.api";
import { apiAdvantage } from "../services/advantage.api";
import { apiTeam } from "../services/team.api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiUser.reducerPath]: apiUser.reducer,
    home: homeReducer,
    [apiHome.reducerPath]: apiHome.reducer,
    funding: fundingReducer,
    [apiFunding.reducerPath]: apiFunding.reducer,
    [apiWorkflow.reducerPath]: apiWorkflow.reducer,
    [apiService.reducerPath]: apiService.reducer,
    [apiSector.reducerPath]: apiSector.reducer,
    [apiJourney.reducerPath]: apiJourney.reducer,
    [apiPartner.reducerPath]: apiPartner.reducer,
    [apiFundScheme.reducerPath]: apiFundScheme.reducer,
    [apiFaq.reducerPath]: apiFaq.reducer,
    [apiBlog.reducerPath]: apiBlog.reducer,
    [apiTestimonial.reducerPath]: apiTestimonial.reducer,
    [apiBanker.reducerPath]: apiBanker.reducer,
    [apiBankerVideo.reducerPath]: apiBankerVideo.reducer,
    [apiCategory.reducerPath]: apiCategory.reducer,
    [apiCompany.reducerPath]: apiCompany.reducer,
    [apiOpportunity.reducerPath]: apiOpportunity.reducer,
    [apiPageInfo.reducerPath]: apiPageInfo.reducer,
    [apiJob.reducerPath]: apiJob.reducer,
    [apiApplicant.reducerPath]: apiApplicant.reducer,
    [apiJoin.reducerPath]: apiJoin.reducer,
    [apiContact.reducerPath]: apiContact.reducer,
    [apiSocial.reducerPath]: apiSocial.reducer,
    [apiAddress.reducerPath]: apiAddress.reducer,
    [apiAbout.reducerPath]: apiAbout.reducer,
    [apiAdvantage.reducerPath]: apiAdvantage.reducer,
    [apiTeam.reducerPath]: apiTeam.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiUser.middleware)
      .concat(apiHome.middleware)
      .concat(apiFunding.middleware)
      .concat(apiWorkflow.middleware)
      .concat(apiService.middleware)
      .concat(apiSector.middleware)
      .concat(apiJourney.middleware)
      .concat(apiPartner.middleware)
      .concat(apiFundScheme.middleware)
      .concat(apiFaq.middleware)
      .concat(apiBlog.middleware)
      .concat(apiTestimonial.middleware)
      .concat(apiBanker.middleware)
      .concat(apiBankerVideo.middleware)
      .concat(apiCategory.middleware)
      .concat(apiCompany.middleware)
      .concat(apiOpportunity.middleware)
      .concat(apiPageInfo.middleware)
      .concat(apiJob.middleware)
      .concat(apiApplicant.middleware)
      .concat(apiJoin.middleware)
      .concat(apiContact.middleware)
      .concat(apiSocial.middleware)
      .concat(apiAddress.middleware)
      .concat(apiAbout.middleware)
      .concat(apiAdvantage.middleware)
      .concat(apiTeam.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
