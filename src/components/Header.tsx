import { Flex, Text } from "@chakra-ui/react"

export const Header = () => {
  return (
    <Flex
      as='header'
      w='100%'
      maxW={1480}
      h='20'
      mx='auto'
      mt='4'
      px='6'
      align='center'
    >
      <Text
        fontSize={['2xl', '3xl']}
        fontWeight='bold'
        letterSpacing='tight'
        w='64'
      >
        PredialX
        <Text as='span' ml='1' color='blue.500'>.</Text>
      </Text>
    </Flex>
  )
}
