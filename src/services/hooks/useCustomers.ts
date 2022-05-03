import { useQuery } from 'react-query'
import { api } from '../api'

type Customer = {
  id: string
  name: string
  createdAt: string
}

export const getCustomers = async (): Promise<Customer[]> => {

    const { data } = await api.get('customers')

    const customers = data.map(customer => {
      return {
        id: customer.id,
        name: customer.name,
        createdAt: new Date(customer.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    })
    return customers
}

export const useCustomers = () => {
  return useQuery('customers', getCustomers, {
    staleTime: 1000 * 5,
  })
}
