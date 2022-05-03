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

type Collaborator = {
  name: string
  email: string
  password: string
}


const createCollaboratorSchema = yup.object().shape({
  name: yup.string().required('Nome Obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export const CreateCollaborators = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const createCollaborator = useMutation(async (collaborator: Collaborator) => {
    await api.post('/collaborators', collaborator)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('collaborators')
    }
  })

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(createCollaboratorSchema)
  })

  const handleCreateCollaborator: SubmitHandler<Collaborator> = async (values) => {
    await createCollaborator.mutateAsync(values)
    router.push('/collaborators')
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
          onSubmit={handleSubmit(handleCreateCollaborator)}
        >
          <Heading size='lg' fontWeight='normal'>Cadastrar Colaborador</Heading>

          <Divider my='6' borderColor='gray.500' />

          <VStack  spacing='8' >
            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
              <Input label='Nome completo' {...register('name')} error={errors.name} />
              <Input type='email' label='E-mail' {...register('email')} error={errors.email} />
              <Input type='password' label='Senha' {...register('password')} error={errors.password} />
            </SimpleGrid>
          </VStack>

          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4'>
              <Link href='/collaborators' passHref>
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

export default CreateCollaborators;
