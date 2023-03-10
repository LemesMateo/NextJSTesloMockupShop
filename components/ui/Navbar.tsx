import { FC, useContext, useState } from "react"
import NextLink from 'next/link'

import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material"
//import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import ClearOutlined from '@mui/icons-material/ClearOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined'

import { useRouter } from "next/router"

import { CartContext, UiContext } from "../../context"
import Image from "next/image"
import shopLogo from '../../public/Mateo Shop Logo - Black.png';


export const Navbar: FC = () => {

    
    const {asPath, push} = useRouter();
    
    const {toggleSideMenu} = useContext(UiContext)
    const {numberOfItems} = useContext(CartContext)

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if(searchTerm.trim().length === 0) return;
        push(`/search/${searchTerm}`);
    }


  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display='flex' alignItems='center' >
                    <Image 
                        src={shopLogo} 
                        width={60} //56
                        height={30} //25
                        alt='Shop Logo'
                    />
                    <Typography variant="h6">  Mateo |</Typography>
                    <Typography sx={{ ml: 0.5 }} >Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={ 1 } />

            <Box sx={{ display: isSearchVisible ? 'none' :  { xs: 'none', sm: 'block' } }} 
                className='fadeIn'
            >           
                <NextLink href='/category/men' passHref>
                    <Link>
                        <Button color={ asPath === '/category/men' ? 'primary' : 'info' } >Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref>
                    <Link>
                        <Button color={ asPath === '/category/women' ? 'primary' : 'info' } >Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref>
                    <Link>
                        <Button color={ asPath === '/category/kid' ? 'primary' : 'info' } >Ni??os</Button>
                    </Link>
                </NextLink>
            </Box>
            

            <Box flex={ 1 } />

            {/* Pantallas grandes */}
            
            {
                isSearchVisible
                    ? (
                        <Input
                            sx={{ display: { xs: 'none', sm: 'flex' } }} 
                            className='fadeIn'
                            autoFocus
                            value={ searchTerm }
                            onChange={ (e) => setSearchTerm( e.target.value ) }
                            onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={ () => setIsSearchVisible(false) }
                                    >
                                        <ClearOutlined/>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />  
                    )
                    :
                    (
                        <IconButton
                            onClick={ () => setIsSearchVisible(true) }
                            className='fadeIn'
                            sx={{ display: {xs: 'none', sm: 'flex'} }}
                        >
                            <SearchOutlined/>
                        </IconButton>

                    )
            }

            {/* Pantallas peque??as */}
            <IconButton
                sx={{ display: {xs: 'flex', sm: 'none'} }}
                onClick={ toggleSideMenu }
            >
                <SearchOutlined/>
            </IconButton>

            <NextLink href="/cart" passHref >
                <Link>
                    <IconButton>
                        <Badge badgeContent={ numberOfItems > 9 ? '9+' : numberOfItems  } color="secondary" >
                            <ShoppingCartOutlined/>
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button onClick={ toggleSideMenu } >
                Men??
            </Button>

        </Toolbar>
    </AppBar>
    
  )
}
