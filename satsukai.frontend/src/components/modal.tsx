import router from "next/router";
import { ICategory } from "../../types/ICategory";

interface ITuneModal{
    isOpen: boolean;
    onClose: () => void;
    categories: ICategory[];
  }
  
  const TuneModal = ({ isOpen, onClose, categories } : ITuneModal) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
  
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
  
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >  
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 align-center sm:pb-4">
              <div className="sm:flex sm:items-start align-center pad items-center" style={{alignItems: "center"}}>
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <span className="material-symbols-outlined">tune</span>
                </div>
                <div className="mt-3 text-center align-center justify-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 text-center align-center font-medium text-gray-900" id="modal-headline">
                    Tune Modal
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-opacity-100 rounded-md cursor-pointer transition-transform transform hover:bg-gray-100 p-3 w-full"
                onClick={() => router.replace(`/products/${category.attributes.endpoint}`)}
              >
                <div className="mt-2 text-center">
                  <h3 className="text-lg font-semibold">{category.attributes.name}</h3>
                </div>
              </div>
            ))}
          </div>



  
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  
  export default TuneModal;