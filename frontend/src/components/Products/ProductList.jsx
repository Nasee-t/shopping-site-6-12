import products from './productsData';
import ProductItem from './ProductItem';

function ProductList() {
  return (
    <div>
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;