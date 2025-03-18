declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface Base {
  id?: number | string;
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
  banner: string;
  video: string;
  market: string;
  index_section: string;
  news: string;
  market_news: string;
  before_image: string;
  after_image: string;
  image: string;
  quotes_slider: string;
  slider: string;
}

interface IHomeState {
  homes: IHome[];
}

interface IFunding extends Base {
  map(arg0: (data: IFunding) => number): unknown;
  name: string;
  amount: number;
  image: string | string;
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
  svg: string;
}
interface IService extends Base {
  map(arg0: (data: IService) => number): unknown;
  title: string;
  description: string;
  quotes: null | string;
  video: string[];
  image: string[] | string;
  main_image: string[];
}
interface IJourney extends Base {
  map(arg0: (data: IJourney) => number): unknown;
  title: string;
  description: string;
}
interface ISector extends Base {
  map(arg0: (data: ISector) => number): unknown;
  title: string;
  image: string;
}
interface IPartner extends Base {
  map(arg0: (data: IPartner) => number): unknown;
  name: string;
  image: string;
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
  image: string;
  category: number;
  meta_key: string;
  meta_description: string;
}
interface ITestimonial extends Base {
  name: string;
  description: string;
  image: string;
}
interface IBanker extends Base {
  name: string;
  email: string;
  phone: string;
  image: string;
  text: string;
}
interface IBankerVideo extends Base {
  title: string;
  description: string;
  video: string;
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
  image?: string;
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
  cv: string;
  cover_letter: string;
}
interface IJoin extends Base {
  title: string;
  description: string;
  icon: string;
}
interface IContact extends Base {
  title: string;
  sub: string;
  email: string;
  contact: string;
  maps: string;
  image: string;
}
interface ISocial extends Base {
  icon: string;
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
  image: string;
}
interface IAdvantage extends Base {
  title: string;
  description: string;
}
interface ITeam extends Base {
  name: string;
  description: string;
  position: string;
  image: string;
}
