import { Button } from "@chakra-ui/react"

type PaginationItemProps = {
  number: number
  isCurrent?: boolean
}

export const PaginationItem = ({
  isCurrent = false,
  number
}: PaginationItemProps) => {
  if (isCurrent) {
    return (
      <Button
        size='sm'
        fontSize='xs'
        colorScheme='blue'
        disabled
        _disabled={{
          bg: 'blue.500',
          cursor: 'default'
        }}
      >
        {number}
      </Button>
    )
  }

  return (
    <Button
      size='sm'
      fontSize='xs'
      width='4'
      bg='gray.700'
      _hover={{
        bg: 'gray.500'
      }}
    >
    {number}
    </Button>
  )
}
