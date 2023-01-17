import NextLink from 'next/link'

import { Card, CardContent, Divider, Grid, Typography, Box, Link, Chip } from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import CreditScoreOutlined from '@mui/icons-material/CreditScoreOutlined';
import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined'


const OrderPage = () => {
  return (
    <ShopLayout title='Resumen de la orden ABC123' pageDescription={'Resumen de la orden'}>
    <Typography variant='h1' component='h1'>Orden: ABC123</Typography>

    {/* <Chip  
        sx={{ my: 2 }}
        label='Pendiente de pago'
        variant='outlined'
        color='error'
        icon={ <CreditCardOffOutlined/> }
    /> */}
    <Chip  
        sx={{ my: 2 }}
        label='Orden ya fue pagada'
        variant='outlined'
        color='success'
        icon={ <CreditScoreOutlined/> }
    />

    <Grid container>
        <Grid item xs={12} sm={7} >
            <CartList/>
        </Grid>
        <Grid item xs={12} sm={5} >
            <Card  className='summary-card' >
                <CardContent>
                    <Typography variant='h2'>Resumen(3 productos)</Typography>
                    <Divider sx={{ my:1 }} />

                    <Box display='flex' justifyContent='space-between' >
                        <Typography variant='subtitle1' >Dirección de entrega</Typography>
                        <NextLink href='/checkout/address' passHref >
                            <Link underline='always' >
                                Editar
                            </Link>
                        </NextLink>
                    </Box>
                    
                    
                    <Typography>Mateo Lemes</Typography>
                    <Typography>323 Algun lugar</Typography>
                    <Typography>Stittsville, HYA 23S</Typography>
                    <Typography>Canadá</Typography>
                    <Typography>+1 232135234</Typography>
                    <Divider sx={{ my:1 }} />

                    <OrderSummary/>

                    <Box display='flex' justifyContent='end' >
                        <NextLink href='/cart' passHref >
                            <Link underline='always' >
                                Editar
                            </Link>
                        </NextLink>
                    </Box>
                    
                    <Box sx={{ mt:3 }} >
                        {/* TODO */}
                        <h1>Pagar</h1>

                        <Chip  
                            label='Orden ya fue pagada'
                            variant='outlined'
                            color='success'
                            icon={ <CreditScoreOutlined/> }
                        />
                    </Box>

                </CardContent>
            </Card>

        </Grid>
    </Grid>

</ShopLayout>
  )
}

export default OrderPage