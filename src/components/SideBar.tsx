import { StarIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'
import { NavSection } from "./NavSection"
import { NavLink } from "./NavLink"

export const SideBar = () => {
  return (
    <NavSection title="Geral">
      <NavLink href='/orders' title="Ordens">
        <StarIcon fontSize='20' />
      </NavLink>
      <NavLink href='/customers' title="Clientes">
        <MoonIcon fontSize='20' />
      </NavLink>
      <NavLink href='/collaborators' title="Colaboradores">
        <SunIcon fontSize='20' />
      </NavLink>
    </NavSection>
  )
}
