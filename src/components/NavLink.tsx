import { Link as ChakraLink, Text, LinkProps } from "@chakra-ui/react"
import Link from "next/link"

type NavLinkProps = LinkProps & {
  title: string
  children: React.ReactNode
  href: string
}

export const NavLink = ({ title, children, href,...props }: NavLinkProps) => {
  return (
    <Link href={href} passHref>
      <ChakraLink display='flex' py='1' {...props}>
        {children}
        <Text ml='4' fontWeight='medium'>{title}</Text>
      </ChakraLink>
    </Link>
  )
}
