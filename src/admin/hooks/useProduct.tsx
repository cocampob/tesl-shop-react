import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductByIdAction } from '../actions/get-product-by-id.action';
import type { Product } from '@/interfaces/product.interface';
import { createUpdatePoductAction } from '../actions/create-update-product.action';




export const useProduct = (id: string) => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', { id }], // el Id van entre {} por si necesitamos hacer otra convinacion.
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 min
        enabled: !!id, // espera hasta quye tenga in id y se lanza la peticion
    });

    //TODO: mutación
    const mutation = useMutation({
        mutationFn: createUpdatePoductAction,
        onSuccess: (product: Product) => {
            // Invalidar cache
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] });
            // Actualizar QueryData
            queryClient.setQueryData(['products', { id: product.id }], product);
        },
    });





    // const handleSubmitForm = async (productLike: Partial<Product>) => {
    //     console.log(productLike);
    // }


    return {
        ...query,
        mutation,
    }
}
