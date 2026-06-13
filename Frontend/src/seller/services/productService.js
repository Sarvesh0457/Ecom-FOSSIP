import axiosInstance from '../api/axiosInstance';
import { mockProducts } from '../data/mockProducts';

const USE_MOCK = true;

// In-memory state for local mock database simulation
let localProducts = [...mockProducts];
let localCategories = [
  { _id: "cat_1", name: "Jackets", description: "Coats, blazers, puffer jackets, and windbreakers", itemCount: 6 },
  { _id: "cat_2", name: "Pants", description: "Jeans, chinos, cargo pants, and sweatpants", itemCount: 5 },
  { _id: "cat_3", name: "Shoes", description: "Sneakers, boots, running shoes, and canvas slip-ons", itemCount: 5 },
  { _id: "cat_4", name: "Dresses", description: "Cocktail dresses, sun dresses, and skirts", itemCount: 4 },
  { _id: "cat_5", name: "Accessories", description: "Bags, scarves, belts, watches, and beanies", itemCount: 6 },
  { _id: "cat_6", name: "Shirts", description: "T-shirts, hoodies, oxford shirts, and sweaters", itemCount: 4 }
];
let localBrands = [
  { _id: "brd_1", name: "Levi's", description: "American clothing company known worldwide for its Levi's brand of denim jeans", logo: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=100", status: "Active" },
  { _id: "brd_2", name: "Zara", description: "Spanish multi-national retail clothing chain specializing in fast fashion", logo: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100", status: "Active" },
  { _id: "brd_3", name: "Nike", description: "American multi-national corporation engaged in design and development of footwear and apparel", logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100", status: "Active" },
  { _id: "brd_4", name: "H&M", description: "Swedish multinational clothing-retail company known for its fast-fashion clothing", logo: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100", status: "Active" },
  { _id: "brd_5", name: "Adidas", description: "German multinational corporation that designs and manufactures shoes, clothing and accessories", logo: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100", status: "Active" },
  { _id: "brd_6", name: "Gucci", description: "Italian luxury fashion house based in Florence, Italy", logo: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100", status: "Active" },
  { _id: "brd_7", name: "Puma", description: "German multinational corporation that designs and manufactures athletic and casual footwear", logo: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=100", status: "Active" }
];

// Product Services
export const getProducts = async (params) => {
  if (USE_MOCK) {
    let result = [...localProducts];
    if (params) {
      if (params.search) {
        const query = params.search.toLowerCase();
        result = result.filter(p => p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query));
      }
      if (params.category) {
        result = result.filter(p => p.category === params.category);
      }
      if (params.brand) {
        result = result.filter(p => p.brand === params.brand);
      }
      if (params.status) {
        result = result.filter(p => p.status === params.status);
      }
      if (params.stockStatus) {
        if (params.stockStatus === 'Low Stock') {
          result = result.filter(p => p.stock > 0 && p.stock <= 10);
        } else if (params.stockStatus === 'Out of Stock') {
          result = result.filter(p => p.stock === 0);
        }
      }
    }
    return result;
  }
  const response = await axiosInstance.get('/products', { params });
  return response.data;
};

export const getProductById = async (id) => {
  if (USE_MOCK) return localProducts.find(p => p._id === id);
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (data) => {
  if (USE_MOCK) {
    const newProduct = {
      ...data,
      _id: "prod_" + Date.now().toString(),
      price: parseFloat(data.price),
      discountPrice: data.discountPrice ? parseFloat(data.discountPrice) : null,
      stock: parseInt(data.stock, 10),
      sizes: Array.isArray(data.sizes) ? data.sizes : [],
      colors: Array.isArray(data.colors) ? data.colors : [],
      images: Array.isArray(data.images) ? data.images : ["https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500"],
      status: data.status || "Active",
      isBestseller: !!data.isBestseller,
      createdAt: new Date().toISOString()
    };
    localProducts.unshift(newProduct);
    return newProduct;
  }
  const response = await axiosInstance.post('/products', data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  if (USE_MOCK) {
    const index = localProducts.findIndex(p => p._id === id);
    if (index !== -1) {
      localProducts[index] = {
        ...localProducts[index],
        ...data,
        price: data.price !== undefined ? parseFloat(data.price) : localProducts[index].price,
        discountPrice: data.discountPrice !== undefined ? (data.discountPrice ? parseFloat(data.discountPrice) : null) : localProducts[index].discountPrice,
        stock: data.stock !== undefined ? parseInt(data.stock, 10) : localProducts[index].stock
      };
      return localProducts[index];
    }
    throw new Error("Product not found");
  }
  const response = await axiosInstance.put(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  if (USE_MOCK) {
    localProducts = localProducts.filter(p => p._id !== id);
    return { success: true };
  }
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};

// Category Services
export const getCategories = async () => {
  if (USE_MOCK) return localCategories;
  const response = await axiosInstance.get('/categories');
  return response.data;
};

export const createCategory = async (data) => {
  if (USE_MOCK) {
    const newCategory = {
      ...data,
      _id: "cat_" + Date.now().toString(),
      itemCount: 0
    };
    localCategories.push(newCategory);
    return newCategory;
  }
  const response = await axiosInstance.post('/categories', data);
  return response.data;
};

export const updateCategory = async (id, data) => {
  if (USE_MOCK) {
    const index = localCategories.findIndex(c => c._id === id);
    if (index !== -1) {
      localCategories[index] = { ...localCategories[index], ...data };
      return localCategories[index];
    }
    throw new Error("Category not found");
  }
  const response = await axiosInstance.put(`/categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id) => {
  if (USE_MOCK) {
    localCategories = localCategories.filter(c => c._id !== id);
    return { success: true };
  }
  const response = await axiosInstance.delete(`/categories/${id}`);
  return response.data;
};

// Brand Services
export const getBrands = async () => {
  if (USE_MOCK) return localBrands;
  const response = await axiosInstance.get('/brands');
  return response.data;
};

export const createBrand = async (data) => {
  if (USE_MOCK) {
    const newBrand = {
      ...data,
      _id: "brd_" + Date.now().toString(),
      logo: data.logo || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100",
      status: data.status || "Active"
    };
    localBrands.push(newBrand);
    return newBrand;
  }
  const response = await axiosInstance.post('/brands', data);
  return response.data;
};

export const updateBrand = async (id, data) => {
  if (USE_MOCK) {
    const index = localBrands.findIndex(b => b._id === id);
    if (index !== -1) {
      localBrands[index] = { ...localBrands[index], ...data };
      return localBrands[index];
    }
    throw new Error("Brand not found");
  }
  const response = await axiosInstance.put(`/brands/${id}`, data);
  return response.data;
};

export const deleteBrand = async (id) => {
  if (USE_MOCK) {
    localBrands = localBrands.filter(b => b._id !== id);
    return { success: true };
  }
  const response = await axiosInstance.delete(`/brands/${id}`);
  return response.data;
};
