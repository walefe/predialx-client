import { Box, Button, Flex, Heading, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

import { Header } from "../../components/Header"
import { SideBar } from "../../components/SideBar"
import { Pagination } from "../../components/Pagination"
import Link from "next/link"
import { useOrders } from "../../services/hooks/useOrders"
import { useMutation, useQueryClient } from "react-query"
import { api } from "../../services/api"

export const Customers = () => {
  const { data, isLoading, isFetching, error } = useOrders()
  const queryClient = useQueryClient()

  const deleteOrder = useMutation(async (id: string) => {
    await api.delete(`/orders/${id}`)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('orders')
    }
  })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const handleDeleteOrder = async (id: string) => {
    await deleteOrder.mutateAsync(id)
  }

  return (
    <Box>
      <Header />

      <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
        <SideBar />

        <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>
              Ordens
              {!isLoading && isFetching && <Spinner size='sm' color='gray.500' ml='4' />}
            </Heading>
            <Link href='orders/create' passHref>
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
                Falha ao obter dados das Ordens
              </Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme='whiteAlpha'>
                <Thead>
                  <Tr>
                    <Th>
                      Assunto
                    </Th>
                    <Th>Cliente</Th>
                    <Th>Collaborador</Th>
                    {isWideVersion && <Th>Data de Cadastro</Th>}
                    <Th width='8'></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map(order => (
                    <>
                      <Tr key={order.id}>
                        <Td >
                          <Text>{order.description}</Text>
                        </Td>
                        <Td>
                          <Text fontSize='sm' color='gray.300'>{order.customer.name}</Text>
                        </Td>
                        <Td>
                          <Text fontSize='sm' color='gray.300'>{order.collaborator.name}</Text>
                        </Td>
                        {isWideVersion && <Td>{order.createdAt}</Td>}
                        <Td>
                          <Button
                            as='a'
                            size='sm'
                            fontSize='sm'
                            colorScheme='red'
                            leftIcon={<DeleteIcon />}
                            onClick={() => handleDeleteOrder(order.id)}
                            cursor='pointer'
                          >
                            {isWideVersion ? 'Excluir' : ''}
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

export default Customers;
