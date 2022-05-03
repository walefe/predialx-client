import Link from "next/link"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { SideBar } from "../../components/SideBar"
import { useMutation, useQueryClient } from "react-query"
import { api } from "../../services/api"
import { useRouter } from "next/router"

type Customer = {
  name: string
}

const createCustomerSchema = yup.object().shape({
  name: yup.string().required('Nome completo obrigatório'),
})

export const CreateCustomers = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const createCustomer = useMutation(async (customer: Customer) => {
      await api.post('/customers', customer)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('customers')
    }
  })

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(createCustomerSchema)
  })

  const handleCreateCustomer: SubmitHandler<Customer> = async (values) => {
    await createCustomer.mutateAsync(values)
    router.push('/customers')
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
          onSubmit={handleSubmit(handleCreateCustomer)}
        >
          <Heading size='lg' fontWeight='normal'>Cadastrar Cliente</Heading>

          <Divider my='6' borderColor='gray.500' />

          <VStack spacing='8'>
            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
             <Input label='Nome completo' {...register('name')} error={errors.name} />
            </SimpleGrid>
          </VStack>

          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4'>
              <Link href='/customers' passHref>
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

export default CreateCustomers;
