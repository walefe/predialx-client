import { useQuery } from 'react-query'
import { api } from '../api'

type Collaborator = {
  id: string
  name: string
  email: string
}

type Customer = {
  id: string
  name: string
}

type Order = {
  id: string
  description: string
  createdAt: string
  customer: Customer
  collaborator: Collaborator
}

export const getOrders = async (): Promise<Order[]> => {

  const { data } = await api.get('orders')

  const orders = data.map(order => {
    return {
      ...order,
      createdAt: new Date(order.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })
  return orders
}

export const useOrders = () => {
  return useQuery('orders', getOrders, {
    staleTime: 1000 * 5,
  })
}
