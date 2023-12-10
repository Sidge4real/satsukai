import type { Schema, Attribute } from '@strapi/strapi';

export interface ProductsOrigin extends Schema.Component {
  collectionName: 'components_products_origins';
  info: {
    displayName: 'origin';
    description: '';
  };
  attributes: {
    countries: Attribute.Enumeration<
      [
        'China',
        'Japan',
        'South Korea',
        'North Korea',
        'Mongolia',
        'Taiwan',
        'Hong Kong',
        'Macau',
        'Vietnam',
        'Laos',
        'Cambodia',
        'Thailand',
        'Myanmar (Burma)',
        'Malaysia',
        'Singapore',
        'Indonesia',
        'Brunei',
        'East Timor (Timor-Leste)'
      ]
    >;
  };
}

export interface ProductsSlogan extends Schema.Component {
  collectionName: 'components_products_slogans';
  info: {
    displayName: 'slogan';
  };
  attributes: {
    list: Attribute.Enumeration<
      [
        'Bringing the beauty of the East to your living space,',
        'Transform your home with the allure of East Asian greenery,',
        'Elevate your surroundings with the tranquility of Oost-Aziatische flora,',
        'Discover the serenity of East Asian plants, perfect for every room,',
        'Turn your space into an oasis with our exquisite East Asian plant collection,',
        'From Asia with love \u2013 adding a touch of nature to your home,',
        'Enhance your decor with the elegance of Oost-Aziatische botanicals,',
        'Experience the harmony of East Asian plants in your own sanctuary,',
        'Create a serene escape at home with our Oost-Aziatische plant varieties,',
        'Captivate your senses with the timeless allure of East Asian green companions,',
        'Asian greens for every corner of your life,',
        'Breathe in the essence of Asia with our lush plant collection,',
        'Transforming spaces with the grace of East Asian flora,',
        'Indulge in the serenity of Oost-Aziatische botanicals,',
        'Your journey to tranquility begins with our East Asian plants,',
        'Bringing a touch of the Orient to your everyday,',
        'Elevate your ambiance with the mystique of Asian greenery,',
        'Discover the Zen of East Asian plants in your home,',
        "Nature's harmony, now at your fingertips with Asian plants,",
        'Green companions inspired by the gardens of the Far East,',
        'Sow the seeds of peace with Oost-Aziatische planten,',
        'A touch of Asia, a breath of fresh air,',
        'Unveil the beauty of Asia in your living spaces,',
        'Cultivate peace and tranquility with our East Asian greens,',
        'Blossom into serenity with Oost-Aziatische flora,',
        'Revitalize your space with the elegance of Asian plant life,',
        "Nature's artistry, now available for your home,",
        'Embark on a botanical journey through East Asian beauty,',
        'Create an oasis of calm with our curated East Asian plants,',
        'Awaken your senses with the allure of Oost-Aziatische greenery,',
        'Infuse your surroundings with the spirit of the Orient,',
        'Elevate your living space with the magic of East Asian plants,',
        'Where tradition meets tranquility in every leaf,',
        'The art of Oost-Aziatische gardening, delivered to your door,',
        'Asian greens, a timeless addition to your home decor,',
        'Harmony in every leaf, elegance in every branch,',
        'Unlock the secrets of serenity with our East Asian plant varieties,',
        'Transforming homes into East Asian havens, one plant at a time,',
        'Incorporate the poetry of Asia into your daily life,',
        'Breathe life into your space with Oost-Aziatische botanical wonders,',
        'Oost-Aziatische plants: where tradition and modern living converge,',
        'Green elegance inspired by the gardens of the Far East,',
        'Cultivate an atmosphere of peace with our East Asian greens,',
        'Enhance your home, embrace the tranquility of Asia,',
        'Unveil the allure of East Asian plants for a harmonious living,',
        'Rooted in tradition, blossoming in your home,',
        'Where East meets West in the language of leaves,',
        'Revitalize your living space with the beauty of Oost-Aziatische flora,',
        'Sow the seeds of tranquility with our East Asian plant collection,',
        'Bring the Zen of Asia into your daily surroundings.'
      ]
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'products.origin': ProductsOrigin;
      'products.slogan': ProductsSlogan;
    }
  }
}
