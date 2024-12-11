import { useQuery } from '@tanstack/react-query'
import { getProducts, getProductById, getProductByBrand } from '../services'

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })
}

export const useProduct = (id?: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id
  })
}

export const useProductsByBrand = (brand?: string) => {
  return useQuery({
    queryKey: ['products', brand],
    queryFn: () => getProductByBrand(brand),
    enabled: !!brand
  })
} 