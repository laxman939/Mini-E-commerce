import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceRange {
  min: number;
  max: number;
}

interface FiltersState {
  category: string;
  priceRange: PriceRange;
  brands: string[];
  rating: number;
  inStock: boolean;
  sortBy: 'name' | 'price' | 'rating' | 'newest';
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
}

const initialState: FiltersState = {
  category: '',
  priceRange: { min: 0, max: 1000 },
  brands: [],
  rating: 0,
  inStock: false,
  sortBy: 'name',
  sortOrder: 'asc',
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<PriceRange>) => {
      state.priceRange = action.payload;
    },
    setBrands: (state, action: PayloadAction<string[]>) => {
      state.brands = action.payload;
    },
    addBrand: (state, action: PayloadAction<string>) => {
      if (!state.brands.includes(action.payload)) {
        state.brands.push(action.payload);
      }
    },
    removeBrand: (state, action: PayloadAction<string>) => {
      state.brands = state.brands.filter(brand => brand !== action.payload);
    },
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
    setInStock: (state, action: PayloadAction<boolean>) => {
      state.inStock = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'name' | 'price' | 'rating' | 'newest'>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const {
  setCategory,
  setPriceRange,
  setBrands,
  addBrand,
  removeBrand,
  setRating,
  setInStock,
  setSortBy,
  setSortOrder,
  setSearchQuery,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;