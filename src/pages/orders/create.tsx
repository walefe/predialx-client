import Link from "next/link"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, Flex, Heading, HStack, Select, SimpleGrid, VStack } from "@chakra-ui/react"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { SideBar } from "../../components/SideBar"
import { useMutation, useQueryClient } from "react-query"
import { api } from "../../services/api"
import { useCollaborators } from "../../services/hooks/useCollaborators"
import { useCustomers } from "../../services/hooks/useCustomers"
import { useRouter } from "next/router"

type Order = {
  description: string
  customer_id: string
  collaborator_id: string
}

const createCustomerSchema = yup.object().shape({
  name: yup.string().required('Nome completo obrigatório'),
})

const CreateOrders = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: dataCollaborator } = useCollaborators()
  const { data: dataCustomer } = useCustomers()

  const createOrder = useMutation(async (customer: Order) => {
    await api.post('/orders', customer)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('orders')
    }
  })

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const handleCreateOrder: SubmitHandler<Order> = async (values) => {
    await createOrder.mutateAsync(values)
    router.push('/orders')
  }
  return (
    <Box>
      <Header />

      <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
        <SideBar />

        <Box
          as='form'
          flex='1'
          borderRadius={8}
          bg='gray.700'
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateOrder)}
        >
          <Heading size='lg' fontWeight='normal'>Cadastrar Ordens</Heading>

          <Divider my='6' borderColor='gray.500' />

          <VStack spacing='8'>
            <SimpleGrid columns={2} minChildWidth='240px' spacing={'10'} w='600px'>
              <Select
                placeholder="Colaborador"
                focusBorderColor='blue.500'
                bgColor='gray.800'
                variant='filled'
                _hover={{
                  bgColor: 'gray.800'
                }}
                size='lg'
                {...register('customer_id')}
              >
                {dataCustomer?.map(customer => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </Select>

              <Select
                focusBorderColor='blue.500'
                placeholder="Cliente"
                bgColor='gray.800'
                variant='filled'
                _hover={{
                  bgColor: 'gray.800'
                }}
                size='lg'
                {...register('collaborator_id')}
              >
                {dataCollaborator?.map(collaborator => (
                  <option key={collaborator.id} value={collaborator.id}>{collaborator.name}</option>
                ))}
              </Select>
              <Input width={600} as='textarea' label='Descrição' {...register('description')} error={errors.description} />
            </SimpleGrid>
          </VStack>

          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4'>
              <Link href='/orders' passHref>
                <Button colorScheme='whiteAlpha'>Cancelar</Button>
              </Link>
              <Button isLoading={isSubmitting} type='submit' colorScheme='blue'>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default CreateOrders;
