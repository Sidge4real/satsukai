export interface CommonAttributes {
  title: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  image: Image;
}

export interface Image {
  data: ImageDatum[];
}

export interface ImageDatum {
  id: number;
  attributes: ImageAttributes;
}

export interface ImageAttributes {
  name: string;
  alternativeText: null | string;
  caption: null | string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null | string;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface Formats {
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null | string;
  width: number;
  height: number;
  size: number;
  url: string;
  provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: ResourceType;
}

export enum ResourceType {
  Image = "image",
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface BlogPost extends CommonAttributes {
  id: number;
  attributes: {
    posted_on: string;
    text: string;
    Author: string;
    image: Image;
  };
}

export interface ShopItem extends CommonAttributes {
  id: number;
  attributes: {
    info: string;
    amount_of_items: number;
    price: number;
    origin: string;
    indoor: boolean;
    min_temp: number;
    max_temp: number;
    age: number | null;
    max_age: number | null;
    image: Image;
    title: string;
  };
}

export interface Shop {
  data: ShopItem[];
  meta: Meta;
}

export default interface ISort{
  name: string;
  selected: boolean;
}