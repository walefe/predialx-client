import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";

type InputProps = ChakraInputProps & {
  name: string
  label?: string
}

export const Input = ({ name , label, ...props }: InputProps) => {
  return (
    <FormControl>
     {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}
        type='email'
        focusBorderColor='blue.500'
        bgColor='gray.800'
        variant='filled'
        _hover={{
          bgColor: 'gray.800'
        }}
        size='lg'
        {...props}
      />
    </FormControl>
  )
}
