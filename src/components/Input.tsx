import { FormControl, FormErrorMessage, FormLabel, forwardRef, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

type InputProps = ChakraInputProps & {
  name: string
  label?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
  = ({ name, label, error = null, ...props }, ref ) => {
  return (
    <FormControl isInvalid={!!error}>
     {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}
        focusBorderColor='blue.500'
        bgColor='gray.800'
        variant='filled'
        _hover={{
          bgColor: 'gray.800'
        }}
        size='lg'
        ref={ref}
        {...props}
      />
      {!!error && <FormErrorMessage>{ error.message }</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
