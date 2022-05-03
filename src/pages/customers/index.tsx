import { Box, Button, Checkbox, Flex, Heading, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

import { Header } from "../../components/Header"
import { SideBar } from "../../components/SideBar"
import { Pagination } from "../../components/Pagination"
import Link from "next/link"
import { useCustomers } from "../../services/hooks/useCustomers"
import { useMutation, useQueryClient } from "react-query"
import { api } from "../../services/api"

export const Customers = () => {
  const { data, isLoading, isFetching, error } = useCustomers()

  const queryClient = useQueryClient()

  const deleteCurstomer = useMutation(async (id: string) => {
    await api.delete(`/customers/${id}`)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('customers')
    }
  })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const handleDeleteCustomer = async (id: string) => {
    await deleteCurstomer.mutateAsync(id)
  }

  return (
    <Box>
      <Header />

      <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
        <SideBar />

        <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
          <Flex mb='8'justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>
              Clientes
              {!isLoading && isFetching && <Spinner size='sm' color='gray.500' ml='4' />}
            </Heading>
            <Link href='customers/create' passHref>
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
                  <Th>Cliente</Th>
                  {isWideVersion && <Th>Data de Cadastro</Th>}
                  <Th width='8'></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map(customer => (
                  <>
                    <Tr key={customer.id}>
                      <Td>
                        <Box>
                          <Text fontWeight='bold'>{customer.name}</Text>
                          <Text fontSize='sm' color='gray.300'>walefedev@gmail.com</Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{customer.createdAt}</Td>}
                      <Td>
                        <Button
                          as='a'
                          size='sm'
                          fontSize='sm'
                          colorScheme='red'
                          leftIcon={<DeleteIcon />}
                          cursor='pointer'
                          onClick={() => handleDeleteCustomer(customer.id)}
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
