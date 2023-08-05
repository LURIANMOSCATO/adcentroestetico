import React, {useEffect, useState} from 'react'
import axios from 'axios'

import styles from './Caixa.module.css'
import {BsShop, BsFillTrash3Fill} from  'react-icons/bs'
import {IoBagHandle} from 'react-icons/io5'
import {LuPackageCheck} from 'react-icons/lu'
import {IoPricetagOutline} from 'react-icons/io5'
import {MdOutlineStickyNote2} from 'react-icons/md'
import {BiShoppingBag} from  'react-icons/bi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Caixa() {

  const [data, setData] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState([]); // Inicializa com null

  useEffect(()=>{
    axios
    .get('http://localhost:8081/product_list')
    .then((res) => {
      setData(res.data);
      setSelectedProducts([]); // Inicializa o estado com um array vazio aqui
    })
    .catch((err) => console.log(err));
    }, []);

    const addToSummary = (product) => {
      const productIndex = selectedProducts.findIndex((item) => item.idProduto === product.idProduto);
    
      if (productIndex !== -1) {
        // O produto já está no resumo, adicionar apenas uma unidade
        const updatedProducts = [...selectedProducts];
        updatedProducts[productIndex].quantidadeProduto += 1;
        setSelectedProducts(updatedProducts);
      } else {
        // O produto ainda não está no resumo, adicionar com quantidade 1
        setSelectedProducts((prevProducts) => [
          ...prevProducts,
          { ...product, quantidadeProduto: 1 },
        ]);
      }
    };
    
  const handleRemoveProduct = (indexToRemove) => {
    setSelectedProducts((prevProducts) => {
      // Crie uma nova lista de produtos excluindo o produto com o índice especificado
      const updatedProducts = prevProducts.filter((_, index) => index !== indexToRemove);
      return updatedProducts;
    });
  };

  const calculateTotalSum = (decimalPlaces) => {
    let totalSum = 0;
    selectedProducts.forEach((product) => {
    const quantity = parseFloat(product.quantidadeProduto);
      const value = parseFloat(product.valorProduto.replace(',', '.'));
  
      if (!isNaN(quantity) && !isNaN(value)) {
        totalSum += quantity * value;
      }
    });
    return totalSum.toFixed(decimalPlaces);
  };

  const handleIncrementQuantity = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantidadeProduto += 1;
    setSelectedProducts(updatedProducts);
  };

  const handleDecrementQuantity = (index) => {
    const updatedProducts = [...selectedProducts];
    if (updatedProducts[index].quantidadeProduto > 1) {
      updatedProducts[index].quantidadeProduto -= 1;
      setSelectedProducts(updatedProducts);
    }
  };

  const finalizarVenda = () => {
    // Crie um objeto com os dados dos produtos selecionados
    const productsData = selectedProducts.map((product) => {
      return {
        produto_id: product.idProduto,
        titulo: product.tituloProduto,
        quantidade: product.quantidadeProduto,
        valor: product.valorProduto,
        // Outros campos relevantes do produto, se necessário
      };
    });

    // Faça uma requisição para o backend para finalizar a venda
    axios.post('http://localhost:8081/finalizar_venda', {
        produtos: productsData,
        total: calculateTotalSum(2), // Total da venda com duas casas decimais
        // Outros dados da venda, se necessário
      })
      .then((res) => {
        // A resposta do backend após a inserção pode ser tratada aqui, se necessário
        console.log('Venda finalizada com sucesso:', res.data);
        toast.success('Venda Realizada!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        // Limpar os produtos selecionados após a venda
        setSelectedProducts([]);
      })
      .catch((err) => {
        // Tratar erros aqui, se necessário
        alert('Erro ao finalizar venda:', err);
      });
  };


  return (
    <div className={styles.container}>
    
      <div className={styles.products_list}>

        <div className={styles.fixed_title}>
          <h1>Produtos e Serviços <BsShop/></h1>
        </div>

        <div className={styles.cards}>
          
          {data.map((product, index) =>{
          return (
          <div className={styles.product_card} key={index}>

            <div className={styles.product_content}>

            <h1 className={styles.products_title}> <MdOutlineStickyNote2/> {product.tituloProduto}
            </h1>

            <p><LuPackageCheck/> Quant: {product.quantidadeProduto}</p>

            <span><IoPricetagOutline/> R$ {product.valorProduto}</span>

          <button className={styles.button_add}
           onClick={() => addToSummary(product)}
          ><IoBagHandle/> Adicionar </button>
          </div>
        </div>
        );
          })}
          
        </div>
        

      </div>

      <div className={styles.summary_container}>
        <h1 className={styles.fixed_title}>Sacola <BiShoppingBag/> </h1>
        <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        />
        <div >

        </div>
        <div className={styles.list_sales}>
          {selectedProducts.map((product, index) => (

            <li key={index} className={styles.li}>
              <div className={styles.cart_product}>

                <div className={styles.product_incart}>
                  <h3>
                  {product.tituloProduto}
                  </h3>
                
                </div>

                <div className={styles.product_incart}>
                  <button className={styles.quantityCart}
                  onClick={() => handleDecrementQuantity(index)}
                  >-</button>

                {product.quantidadeProduto}

                <button className={styles.quantityCart}
                onClick={() => handleIncrementQuantity(index)}
                >+</button>
                </div>

                <div className={styles.product_incart}>
                R$ {product.valorProduto}
                </div>

            <button
            className={styles.button_remove}
            onClick={() => handleRemoveProduct(index)}>
            <BsFillTrash3Fill/>
            </button>
          

            </div>
            </li>
          ))}
          </div>

          <div className={styles.calc_total}>

            <div className={styles.total_sum}>
              <span className={styles.value_pay}>R$ {calculateTotalSum(2)}</span>
            </div>
          
            <button className={styles.button_sell} 
            onClick={finalizarVenda}>
            Finalizar Venda
            </button>
            </div>
          </div>
        

      </div>
  )
}

export default Caixa