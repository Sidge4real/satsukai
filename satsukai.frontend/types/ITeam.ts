export interface ITeam {
    id:         number;
    attributes: DatumAttributes;
}

export interface DatumAttributes {
    name:        string;
    function:    string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    profile:     Profile;
}

export interface Profile {
    data: Data;
}

export interface Data {
    id:         number;
    attributes: DataAttributes;
}

export interface DataAttributes {
    name:              string;
    alternativeText:   null;
    caption:           null;
    width:             number;
    height:            number;
    formats:           Formats;
    hash:              string;
    ext:               string;
    mime:              string;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: ProviderMetadata;
    createdAt:         Date;
    updatedAt:         Date;
}

export interface Formats {
    thumbnail: Thumbnail;
}

export interface Thumbnail {
    name:              string;
    hash:              string;
    ext:               string;
    mime:              string;
    path:              null;
    width:             number;
    height:            number;
    size:              number;
    url:               string;
    provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
    public_id:     string;
    resource_type: ResourceType;
}

export enum ResourceType {
    Image = "image",
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
