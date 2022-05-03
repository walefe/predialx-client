import type { NextPage } from 'next'
import { Flex, Button, Stack } from '@chakra-ui/react'
import { Input } from '../components/Input'

const SignIn: NextPage = () => {
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

      >
        <Stack spacing={4}>
          <Input name='email' type='email' label='E-mail' />
          <Input name='password' type='password' label='Senha' />
        </Stack>
        <Button type='submit' marginTop={6} colorScheme='blue'>Entrar</Button>
      </Flex>
    </Flex>
  )
}

export default SignIn
