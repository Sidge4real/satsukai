import { ICategory } from "./ICategory";

export interface IShopItem {
  id:         number;
  attributes: PurpleAttributes;
  amount_to_buy?: number | null;
  openDetails?: boolean;
}

export interface IBag {
  item: IShopItem;
  amount: number;
}

export interface PurpleAttributes {
  name:        string;
  price:       number;
  stock:       number;
  showroom:    boolean;
  description: string;
  createdAt:   Date;
  updatedAt:   Date;
  publishedAt: Date;
  origin:      string;
  slogan:      string;
  age:         number;
  color:       string;
  lifespan:    number;
  dimensions:  string;
  temperatures:string;
  image:       Image;
  category:    Category;
  including:   Including;
}

export interface Category {
  data: ICategory;
}

export interface Data {
  id:         number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  name:        Name;
  temperature: string;
  createdAt:   Date;
  updatedAt:   Date;
  publishedAt: Date;
}

export enum Name {
  BonsaiTrees = "Bonsai Trees",
}

export interface Image {
  data: ImageDatum[];
}

export interface ImageDatum {
  id:         number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  name:              string;
  alternativeText:   null;
  caption:           null;
  width:             number;
  height:            number;
  formats:           Formats;
  hash:              string;
  ext:               EXT;
  mime:              MIME;
  size:              number;
  url:               string;
  previewUrl:        null;
  provider:          Provider;
  provider_metadata: ProviderMetadata;
  createdAt:         Date;
  updatedAt:         Date;
}

export enum EXT {
  PNG = ".png",
}

export interface Formats {
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  name:              string;
  hash:              string;
  ext:               EXT;
  mime:              MIME;
  path:              null;
  width:             number;
  height:            number;
  size:              number;
  url:               string;
  provider_metadata: ProviderMetadata;
}

export enum MIME {
  ImagePNG = "image/png",
}

export interface ProviderMetadata {
  public_id:     string;
  resource_type: ResourceType;
}

export enum ResourceType {
  Image = "image",
}

export enum Provider {
  Cloudinary = "cloudinary",
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page:      number;
  pageSize:  number;
  pageCount: number;
  total:     number;
}

export interface Including {
  data: IncludingData;
}

export interface IncludingData {
  id:         number;
  attributes: StickyAttributes;
}

export interface StickyAttributes {
  info:        string;
  createdAt:   Date;
  updatedAt:   Date;
  publishedAt: Date;
  images:      Image; // plugin: strapi-plugin-populate-deep | fixes: (/populate=* has a official bug at strapi) // https://github.com/strapi/strapi/pull/2693 (deep nesting images)
}