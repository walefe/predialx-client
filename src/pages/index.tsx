import type { NextPage } from 'next'
import { Flex, Input, Button, Stack, FormLabel, FormControl } from '@chakra-ui/react'

const Home: NextPage = () => {
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
          <FormControl>
            <FormLabel htmlFor='email'>E-mail</FormLabel>
            <Input
              id='email'
              name='email'
              type='email'
              focusBorderColor='blue.500'
              bgColor='gray.800'
              variant='filled'
              _hover={{
                bgColor: 'gray.800'
              }}
              size='lg'
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor='password'>Senha</FormLabel>
            <Input
              id='password'
              name='password'
              type='password'
              focusBorderColor='blue.500'
              bgColor='gray.800'
              variant='filled'
              _hover={{
                bgColor: 'gray.800'
              }}
              size='lg'
            />
          </FormControl>
        </Stack>
        <Button type='submit' marginTop={6} colorScheme='blue'>Entrar</Button>
      </Flex>
    </Flex>
  )
}

export default Home
