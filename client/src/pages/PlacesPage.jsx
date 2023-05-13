import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const PlacesPage = () => {
  const [addPlace, setAddPlace] = useState(true);

  return (
    <div>
      {addPlace && (
        <div className="text-center">
          <Link
            onClick={() => setAddPlace(false)}
            className="inline-flex gap-2 bg-primary text-white rounded-full px-5 py-2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clip-rule="evenodd"
              />
            </svg>
            Add new place
          </Link>
          <div>my places</div>
        </div>
      )}
      {!addPlace && (
        <div className="ml-auto mr-auto max-w-xl pl-4 pr-4">
          <form>
            <h2 className="text-xl mt-4">Title</h2>
            <p className="px-1 italic text-xs text-gray-500">
              title should be short and catchy as in advertisement
            </p>
            <input
              type="text"
              placeholder="Title, Eg. My beautiful apartment"
            />

            <h2 className="text-xl mt-4">Address</h2>
            <p className="px-1 italic text-xs text-gray-500">
              address to your place
            </p>
            <input type="text" placeholder="Address" />

            <h2 className="text-xl mt-4">Photos</h2>
            <p className="px-1 italic text-xs text-gray-500 mb-2">
              more=better
            </p>
            <div className="flex gap-2">
              <input type="text" placeholder="Add photo using a link..." />
              <button className="bg-gray-300 px-4 rounded-2xl text-xs font-bold">
                Add&nbsp;Photo
              </button>
            </div>
            <div className="mt-2 grid grid-cols md:grid-cols-4">
              <button className="border bg-transparent flex rounded-2xl text-gray-600 justify-center p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <p className="text-sm text-center p-2">Upload from device</p>
              </button>
            </div>
            <h2 className="text-xl mt-4">Description</h2>
            <p className="px-1 italic text-xs text-gray-500 mb-2">
              Description of the place
            </p>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <h2 className="text-xl mt-4">Perks</h2>
            <p className="px-1 italic text-xs text-gray-500 mb-2">
              Perks available at the place
            </p>
            <div className="grid grid-cols-2 md:grid-col-2 lg:grid-col-4 gap-1">
              <label className="border p-2 flex rounded-2xl items-center gap-1 cursor-pointer">
                <input type="checkbox" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                  />
                </svg>

                <span>Wifi</span>
              </label>
              <label className="border  gap-1 p-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>

                <span>Free parking</span>
              </label>

              <label className="border gap-1 p-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>

                <span>Pets</span>
              </label>
              <label className="border gap-1 p-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                  />
                </svg>

                <span>RO Drinking water</span>
              </label>
              <label className="border gap-1 p-2 flex rounded-2xl items-center cursor-pointer">
                <input type="checkbox" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>

                <span>First Aid</span>
              </label>
            </div>
            <div className="grid grid-cols-3">
              <div>
                <h2 className="text-md mt-4">Check-in time:</h2>
                <input type="text" placeholder="10:00" />
              </div>
              <div>
                <h2 className="text-md mt-4">Check-out time:</h2>
                <input type="text" placeholder="12:00" />
              </div>
              <div>
                <h2 className="text-md mt-4">Max Guests:</h2>
                <input type="text" placeholder="0" />
              </div>
            </div>
            <h2 className="text-xl mt-4">Extra Info</h2>
            <p className="px-1 italic text-xs text-gray-500 mb-2">
              house rules etc.
            </p>
            <textarea />
            <button className="primary mt-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
