import type { Schema, Attribute } from '@strapi/strapi';

export interface AuthorAuthor extends Schema.Component {
  collectionName: 'components_author_authors';
  info: {
    displayName: 'person';
    icon: 'pencil';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    profile: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'author.author': AuthorAuthor;
    }
  }
}
