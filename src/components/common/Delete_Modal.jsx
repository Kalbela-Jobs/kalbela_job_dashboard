const Delete_Modal = ({ title, set_modal, delete_function, modal }) => {
      return (
            <div>
                  <div class="bg-gray-100 h-96">
                        <div class={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${modal ? "block" : "hidden"
                              }`}>
                              <div class="w-full max-w-sm bg-white shadow-lg rounded-xl">
                                    <div class="px-4 py-5 sm:p-6">
                                          <svg class="text-gray-900 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>
                                          <p class="mt-5 text-xl font-bold text-gray-900">{title}</p>
                                          <p class="mt-3 text-sm font-medium text-gray-500">Are you wont to delete forever? </p>
                                          <div class="flex items-center mt-8 space-x-4">
                                                <button
                                                      onClick={() => set_modal(false)}
                                                      type="button"
                                                      class="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                                >
                                                      Cancel
                                                </button>

                                                <button
                                                      onClick={() => delete_function(modal)}
                                                      type="button"
                                                      class="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-red-500 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:bg-red-700"
                                                >
                                                      Delete
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

            </div >
      );
};

export default Delete_Modal;
