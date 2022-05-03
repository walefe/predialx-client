import { Box, Button, Checkbox, Flex, Heading, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react"
import { AddIcon, EditIcon } from '@chakra-ui/icons'

import { Header } from "../../components/Header"
import { SideBar } from "../../components/SideBar"
import { Pagination } from "../../components/Pagination"
import Link from "next/link"
import { useCollaborators } from "../../services/hooks/useCollaborators"
import { useMutation, useQueryClient } from "react-query"
import { api } from "../../services/api"

export const Collaborators = () => {
  const { data, isLoading, isFetching, error } = useCollaborators()

  const queryClient = useQueryClient()

  const deleteCollaborator = useMutation(async (id: string) => {
    await api.delete(`/collaborators/${id}`)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('collaborators')
    }
  })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const handleDeleteCollaborator = async (id: string) => {
    await deleteCollaborator.mutateAsync(id)
  }

  return (
    <Box>
      <Header />

      <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
        <SideBar />

        <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>
              Colaboradores
              {!isLoading && isFetching && <Spinner size='sm' color='gray.500' ml='4' />}
            </Heading>
            <Link href='collaborators/create' passHref>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                colorScheme='blue'
                leftIcon={<AddIcon />}
              >
                Cadastrar
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify='center'>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify='center'>
              <Text>
                Falha ao obter dados dos Clientes
              </Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme='whiteAlpha'>
                <Thead>
                  <Tr>
                    <Th>Colaborador</Th>
                    {isWideVersion && <Th>Data de Cadastro</Th>}
                    <Th width='8'></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map(collaborator => (
                    <>
                      <Tr key={collaborator.id}>
                        <Td>
                          <Box>
                            <Text fontWeight='bold'>{collaborator.name}</Text>
                            <Text fontSize='sm' color='gray.300'>{collaborator.email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{collaborator.createdAt}</Td>}
                        <Td>
                          <Button
                            as='a'
                            size='sm'
                            fontSize='sm'
                            colorScheme='red'
                            leftIcon={<EditIcon />}
                            cursor='pointer'
                            onClick={() => handleDeleteCollaborator(collaborator.id)}
                          >
                            {isWideVersion ? 'Editar' : ''}
                          </Button>
                        </Td>
                      </Tr>
                    </>
                  ))}
                </Tbody>
              </Table>
              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default Collaborators;
