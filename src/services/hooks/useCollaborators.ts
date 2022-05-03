import { useQuery } from 'react-query'
import { api } from '../api'

type Collaborator = {
  id: string
  name: string
  email: string
  createdAt: string
}

export const getCollaborators = async (): Promise<Collaborator[]> => {

  const { data } = await api.get('collaborators')

  const collaborators = data.map(collaborator => {
    return {
     ...collaborator,
      createdAt: new Date(collaborator.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })
  return collaborators
}

export const useCollaborators = () => {
  return useQuery('collaborators', getCollaborators, {
    staleTime: 1000 * 5,
  })
}
