import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';

import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';
// import { initialData } from '../database/products';



const WomenPage: NextPage = () => {
  
  const { products, isLoading } = useProducts('/products?gender=women');


  return (
    <ShopLayout title={'Teslo-Shop - Women Items'} pageDescription={'Encuentra los mejores productos de Teslo para mujeres aquí'}>
        <Typography variant='h1' component='h1'>Mujeres</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Productos para mujeres</Typography>

        {
          isLoading
            ? <FullScreenLoading/>
            : <ProductList products={ products } />             
        }

    </ShopLayout>
  )
}

export default WomenPage