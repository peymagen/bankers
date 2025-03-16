declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface Base {
  id?: string;
  created_at?: string;
  updated_at?: string;
}
interface User extends Base {
  name: string;
  email: string;
  role: string;
  password: string;
}

interface IHome extends Base {
  map(arg0: (data: IHome) => number): unknown;
  title: string;
  description: string;
  banner: null | File;
  video: null | File;
  market: string;
  index_section: string;
  news: string;
  market_news: string;
  before_image: null | File;
  after_image: null | File;
  image: null | File;
  quotes_slider: string;
  slider: null | File;
}

interface IHomeState {
  homes: IHome[];
}

interface IFunding extends Base {
  map(arg0: (data: IFunding) => number): unknown;
  name: string;
  amount: number;
  image: null | File | string;
}
interface IColumn {
  field: string;
  label: string;
  type?: "text" | "image" | "video" | "audio" | "file" | "richText";
}
interface FundingState {
  fundings: IFunding[];
}

interface IWorkflow extends Base {
  map(arg0: (data: IWorkflow) => number): unknown;
  name: string;
  description: string;
  type: string;
  svg: null | File;
}
interface IService extends Base {
  map(arg0: (data: IService) => number): unknown;
  title: string;
  description: string;
  quotes: null | string;
  video: null | File[];
  image: null | File[] | string;
  main_image: null | File[];
}
interface IJourney extends Base {
  map(arg0: (data: IJourney) => number): unknown;
  title: string;
  description: string;
}
interface ISector extends Base {
  map(arg0: (data: ISector) => number): unknown;
  title: string;
  image: null | File;
}
interface IPartner extends Base {
  map(arg0: (data: IPartner) => number): unknown;
  name: string;
  image: null | File;
}
interface IFundScheme extends Base {
  min: string;
  max: string;
  profit: string;
}
interface IFaq extends Base {
  ques: string;
  ans: string;
  type: string;
}
interface ICategory extends Base {
  title: string;
}
interface IBlog extends Base {
  title: string;
  description: string;
  body: string;
  content: string;
  image: null | File;
  category: number;
  meta_key: string;
  meta_description: string;
}
interface ITestimonial extends Base {
  name: string;
  description: string;
  image: null | File;
}
interface IBanker extends Base {
  name: string;
  email: string;
  phone: string;
  image: null | File;
  text: string;
}
interface IBankerVideo extends Base {
  title: string;
  description: string;
  video: null | File;
}
interface ICompany extends Base {
  name: string;
  email: string;
  phone: string;
  turnaround: string;
  grid: string;
}
interface IOpportunity extends Base {
  title: string;
  description: string;
}
interface IPageInfo extends Base {
  title: string;
  description?: string;
  image?: File | null;
  key_value?: string;
}
interface IJob extends Base {
  title: string;
  description?: string;
  experience?: string;
  end?: string;
}
interface IApplicant extends Base {
  name: string;
  phone: string;
  email: string;
  cv: File | null;
  cover_letter: File | null;
}
interface IJoin extends Base {
  title: string;
  description: string;
  icon: File | null;
}
interface IContact extends Base {
  title: string;
  sub: string;
  email: string;
  contact: string;
  maps: string;
  image: File | null;
}
interface ISocial extends Base {
  icon: File | null;
  link: string;
}
interface IAddress extends Base {
  street: string;
  city: string;
  state?: string;
  pincode?: string;
}
interface IAbout extends Base {
  description: string;
  title1?: string;
  title2?: string;
  title3?: string;
  image: File | null;
}
interface IAdvantage extends Base {
  title: string;
  description: string;
}
interface ITeam extends Base {
  name: string;
  description: string;
  position: string;
  image: File | null;
}
interface PostRes {
  success: boolean;
  data: {
    total: number;
    data: {
      [key: string]: string | {};
    };
  };
}
interface LoginFormInputs {
  email: string;
  password: string;
}
interface RegisterFormInputs {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}
interface IResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: {};
  };
  message: string;
  success: boolean;
}
