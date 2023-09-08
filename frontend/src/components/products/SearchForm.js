import React from 'react'
import { useGlobalContext } from '../../pages/products/context'
import './component.css'

const SearchForm = () => {
  const { setSearchTerm, setSearchCat } = useGlobalContext()
  const searchValue = React.useRef('')
  const searchCatVal = React.useRef('')

  React.useEffect(() => {
    searchValue.current.focus()
  }, [])

  React.useEffect(() => {
    searchCatVal.current.focus()
  }, [])

  const searchProduct = () => {
    setSearchTerm(searchValue.current.value)
  }

  const searchCat = () => {
    setSearchCat(searchCatVal.current.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section class="flex justify-center items-center">
      <form class="w-[500px]" onSubmit={handleSubmit}>
        <div class="flex">
          <label
            for="name"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Category
          </label>
          <select
            id="dropdown-button"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
            ref={searchCatVal}
            onChange={searchCat}
          >
            <option value="">All Categories</option>
            <option value="Supplements and Herbs">Men</option>
            <option value="Sports Nutrition">Women</option>
            <option value="Beauty">Kids & Baby</option>
            <option value="Bath and Personal Care">Home & Living</option>
          </select>
          <div class="relative w-full">
            <input
              type="search"
              id="name"
              ref={searchValue}
              onChange={searchProduct}
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-[rgb(33,190,33)] focus:border-[rgb(33,190,33)] dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-[rgb(33,190,33)]"
              placeholder="Search Products..."
              required
            ></input>
            <button
              type="submit"
              class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-[rgb(33,190,33)] rounded-r-lg border border-[rgb(33,190,33)] hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-[rgb(33,190,33)] dark:hover:bg-green-700 dark:focus:ring-[rgb(33,190,33)]"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default SearchForm
