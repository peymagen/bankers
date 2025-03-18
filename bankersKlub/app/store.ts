import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { apiHome } from "@/services/home.api";
import { apiAbout } from "@/services/about.api";
import { apiPageInfo } from "@/services/pageInfo.api";
import { apiJorney } from "@/services/journey.api";
import { apiFaq } from "@/services/faq.api";
import { apiContact } from "@/services/contact.api";
import { apiAddress } from "@/services/address.api";
import { apiSocial } from "@/services/social.api";
import { apiBlog } from "@/services/blog.api";
import { apiCategory } from "@/services/category.api";
import { apiJoin } from "@/services/join.api";
import { apiJob } from "@/services/job.api";
import { apiFunding } from "@/services/funding.api";
import { apiWorkflow } from "@/services/workflow.api";
import { apiPartner } from "@/services/partner.api";
import { apiFundScheme } from "@/services/fundScheme.api";
import { apiSector } from "@/services/sector.api";
import { apiTestimonial } from "@/services/testimonial.api";
import { apiBanker } from "@/services/banker.api";
import { apiOpportunity } from "@/services/opportunity.api";
import { apiBankerVideo } from "@/services/banker_video.api";
import { apiService } from "@/services/service.api";
import { apiAdvantage } from "@/services/advantage.api";
import { apiTeam } from "@/services/team.api";

export const store = configureStore({
  reducer: {
    [apiHome.reducerPath]: apiHome.reducer,
    [apiAbout.reducerPath]: apiAbout.reducer,
    [apiPageInfo.reducerPath]: apiPageInfo.reducer,
    [apiJorney.reducerPath]: apiJorney.reducer,
    [apiFaq.reducerPath]: apiFaq.reducer,
    [apiContact.reducerPath]: apiContact.reducer,
    [apiAddress.reducerPath]: apiAddress.reducer,
    [apiSocial.reducerPath]: apiSocial.reducer,
    [apiBlog.reducerPath]: apiBlog.reducer,
    [apiCategory.reducerPath]: apiCategory.reducer,
    [apiJoin.reducerPath]: apiJoin.reducer,
    [apiJob.reducerPath]: apiJob.reducer,
    [apiFunding.reducerPath]: apiFunding.reducer,
    [apiWorkflow.reducerPath]: apiWorkflow.reducer,
    [apiService.reducerPath]: apiService.reducer,
    [apiPartner.reducerPath]: apiPartner.reducer,
    [apiFundScheme.reducerPath]: apiFundScheme.reducer,
    [apiSector.reducerPath]: apiSector.reducer,
    [apiTestimonial.reducerPath]: apiTestimonial.reducer,
    [apiBanker.reducerPath]: apiBanker.reducer,
    [apiOpportunity.reducerPath]: apiOpportunity.reducer,
    [apiBankerVideo.reducerPath]: apiBankerVideo.reducer,
    [apiAdvantage.reducerPath]: apiAdvantage.reducer,
    [apiTeam.reducerPath]: apiTeam.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      apiHome.middleware,
      apiAbout.middleware,
      apiPageInfo.middleware,
      apiJorney.middleware,
      apiFaq.middleware,
      apiContact.middleware,
      apiAddress.middleware,
      apiSocial.middleware,
      apiBlog.middleware,
      apiCategory.middleware,
      apiJoin.middleware,
      apiJob.middleware,
      apiFunding.middleware,
      apiWorkflow.middleware,
      apiService.middleware,
      apiPartner.middleware,
      apiFundScheme.middleware,
      apiSector.middleware,
      apiTestimonial.middleware,
      apiBanker.middleware,
      apiOpportunity.middleware,
      apiBankerVideo.middleware,
      apiAdvantage.middleware,
      apiTeam.middleware
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
