export interface Post {
    id:         number;
    attributes: Attributes;
}


export interface Attributes {
    posted_on:   Date;
    title:       string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    content:     string;
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
