import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link';

import { Chip, Grid, Link, Typography } from '@mui/material';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 100 },
    {field: 'fullName', headerName: 'Nombre Completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra infromación si está pagada la orden o no',
        width: 200,
        renderCell: (params ) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='Pagada' variant='outlined'/>
                    : <Chip color='error' label='No Pagada' variant='outlined'/>
            )
        }
    },    
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params ) => {
            return (
                <NextLink href={`/orders/${params.row.orderId}`} passHref >
                    <Link underline='always' >
                        Ver Orden
                    </Link>

                </NextLink>
                
            )
        }
    }    
];



interface Props {
    orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

    const rows = orders.map( (order, idx) => ({
        id: idx + 1,
        paid: order.isPaid,
        fullName: `${ order.shippingAddress.firstName } ${order.shippingAddress.lastName}`,
        orderId: order._id
    }))
    // {id: indice + 1, paid: true, paid: true, fullname: 'Fernando Herrera', orderId: id de mongo para redirect}

    
  return (
    <ShopLayout title={'Historial de compras'} pageDescription={'Historial de ordenes del cliente'}>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>
        
        <Grid container className='fadeIn' >
            <Grid item xs={12} sx={{height: 650, width: '100%'}}>
                <DataGrid  
                    rows={ rows }
                    columns={ columns}
                    pageSize={10}
                    rowsPerPageOptions={ [10] }
                />
            

            </Grid>
        </Grid>

    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({req}) => {


    const session: any = await getSession({req});

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser(session.user._id);
    

    return {
        props: {
            orders
        }
    }
}

export default HistoryPage