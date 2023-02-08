import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';

import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';
// import { initialData } from '../database/products';



const MenPage: NextPage = () => {
  
  const { products, isLoading } = useProducts('/products?gender=men');


  return (
    <ShopLayout title={'Matts-Shop - Men Items'} pageDescription={'Encuentra los mejores productos de Matts para hombres aquí'}>
        <Typography variant='h1' component='h1'>Hombres</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Productos para hombres</Typography>

        {
          isLoading
            ? <FullScreenLoading/>
            : <ProductList products={ products } />             
        }

    </ShopLayout>
  )
}

export default MenPage