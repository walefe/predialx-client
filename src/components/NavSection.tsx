import { Box, Link, Stack, Text } from "@chakra-ui/react"

type NavSectionProps = {
  title: string
  children: React.ReactNode
}

export const NavSection = ({ title, children }: NavSectionProps) => {
  return (
    <Box as='aside' w='64' mr='8'>
      <Stack spacing='12' align='flex-start'>
        <Text fontWeight='bold' color='gray.400' fontSize='sm'>{title}</Text>
        <Stack spacing='4' mt='8' align='stretch'>
          {children}
        </Stack>
      </Stack>
    </Box>
  )
}
