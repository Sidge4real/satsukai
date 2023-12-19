import Link from "next/link";
import { IShopItem } from "../../types/IShopItem"
  
  interface IItem{
    item: IShopItem
  }

  export default function Detail({item} : IItem) {
    console.log(item);

    const features = [
      { name: 'Origin', description: item.attributes.origin},
      { name: 'Category', description: item.attributes.category.data.attributes.name },
      { name: 'Dimensions', description: '6.25" x 3.55" x 1.15"' },
      { name: 'Temperatures', description: 'Hand sanded and finished with natural oil' },
      { name: 'Optional', description: item.attributes.including.data.attributes.info },
      { name: 'Considerations', description: 'Made from natural materials. Grain and color vary with each item.' },
    ]


    return (
      <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-6 sm:px-6 sm:py-8 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {item.attributes.name}
            </h2>
            <button>
              <p className="text-gray-400 transition duration-300 hover:text-gray-700">
              <span className="material-symbols-outlined">add_box</span>
              </p>
            </button>
          </div>
          <p className="mt-4 text-gray-500">{item.attributes.slogan}</p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
              src={item.attributes.image.data[0].attributes.url}
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              className="rounded-lg bg-gray-100"
            />
            <img
              src={item.attributes.including.data.attributes.images.data[0].attributes.url}
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              className="rounded-lg bg-gray-100 w-full"
            />
            <img
              src={item.attributes.including.data.attributes.images.data[1].attributes.url}
              alt="Side of walnut card tray with card groove and recessed card area."
              className="rounded-lg bg-gray-100 w-full"
            />
            <img
              src={item.attributes.including.data.attributes.images.data[2].attributes.url}
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100 w-full"
            />
          </div>
        </div>
          <Link href="/products">
            <p className="flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium">
              <span className="material-symbols-outlined">keyboard_return</span>
            </p>
          </Link>
      </div>
    )
  }
  