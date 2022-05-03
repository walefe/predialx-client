import { SubmitHandler, useForm } from 'react-hook-form'
import type { NextPage } from 'next'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Flex, Button, Stack } from '@chakra-ui/react'
import { Input } from '../components/Input'
import Link from 'next/link'

type SignInFormData = {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

const SignIn: NextPage = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })
  const { errors, isSubmitting } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    console.log(values);

  }


  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      justify='center'
    >
      <Flex
        as='form'
        width='100%'
        maxWidth={360}
        bg='gray.700'
        p='8'
        borderRadius={8}
        flexDir='column'
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input
            type='email'
            label='E-mail'
            error={errors.email}
            {...register('email')} />
          <Input
            type='password'
            label='Senha'
            error={errors.password}
            {...register('password')} />
        </Stack>
        <Link href='/orders' passHref>
          <Button isLoading={isSubmitting} type='submit' marginTop={6} colorScheme='blue'>Entrar</Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default SignIn
