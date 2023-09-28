import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import styles from './Caixa.module.css'
import {HiOutlineBuildingStorefront,HiOutlinePlus, HiOutlineMinusSmall, 
HiOutlineTrash, HiOutlineXMark, HiMiniShoppingCart, 
HiOutlineShoppingBag} from 'react-icons/hi2'

import {LuPackageCheck} from 'react-icons/lu'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';


function Caixa() {

  const [ModalIsOpen, setIsOpen] = useState(false);


  function openModal() {
      setIsOpen(true);
  }

  function closeModal() {
      setIsOpen(false);
  }

  const [data, setData] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState([]); // Inicializa com null

  const [desconto, setDesconto] = useState(0);

  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState([]);
  const [name, setName] = useState([]);
  axios.defaults.withCredentials = true;
  
  useEffect(()=>{

    axios
    .get('http://node147829-login-adce.jelastic.saveincloud.net/product_list')
    .then((res) => {
      setData(res.data);
      setSelectedProducts([]); // Inicializa o estado com um array vazio aqui
    })
    .catch((err) => console.log(err));

    axios.get('http://node147829-login-adce.jelastic.saveincloud.net/verify')
      .then(res => {
          if(res.data.Status === "Success") {
            setAuth(true)
            setName(res.data.name)
          } else {
            setAuth(false)
            setMessage(res.data.Error);
            navigate('/login');
          }
      })
    
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
  

  const handleDescontoChange = (event) => {
      setDesconto(parseFloat(event.target.value.replace(',', '.')));
      
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

    let totalVenda = calculateTotalSum(2);
    if (!isNaN(desconto) && desconto > 0) {
      totalVenda = (parseFloat(totalVenda) - desconto).toFixed(2);
    }

    // Faça uma requisição para o backend para finalizar a venda
    axios.post('http://node147829-login-adce.jelastic.saveincloud.net/finalizar_venda', {
        produtos: productsData,
        total: totalVenda, // Total da venda com duas casas decimais
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
          }); setTimeout(()=>{
            window.location.reload();
        }, 2000);
        // Limpar os produtos selecionados após a venda
        setSelectedProducts([]);
      })
      .catch((err) => {
        // Tratar erros aqui, se necessário
        alert('Erro ao finalizar venda:', err);
      });
  };

  return (
    <div className="p-5 max-h-screen bg-gray-100 items-center justify-center flex">
      
    <button 
      onClick={openModal}
      className="md:hidden border-none float-right h-12 w-12 shadow-md
      rounded-full fixed top-[10px] right-1 z-50 text-center text-black border-gray-400 
      bg-white text-5xl font-semibold uppercase outline-none bg-white-600 cursor-pointer">
      <HiOutlineShoppingBag className='text-3xl'/>
    </button>
    
      <div className="h-[33rem] overflow-auto 
      shadow-lg w-[32rem] items-center mr-4 hidden md:block">

        <div className="items-center sticky top-0 p-0 shadow-md rounded bg-slate-400 h-12
        ">
        <h1 className="text-black  text-2xl text-center">
        Produtos & Serviços <HiOutlineBuildingStorefront className='inline'/>
        </h1>
        </div>

        <div className="grid grid-cols-3 items-center gap-2">
          
          {data.map((product, index) =>{
          return (
          <div className="p-5 shadow-md h-52 w-[95%] mt-2 rounded-lg border"
          key={index}>

            <div className="grid h-[100%]">

            <h1 className="text-gray-500 text-left text-sm">
            {product.tituloProduto}
            </h1>

            <p className="ml-2 float-right text-sm">
            <LuPackageCheck className='inline'/> QTD: {product.quantidadeProduto}
            </p>
            
            <span className="inline font-medium text-sm ">R$ {product.valorProduto}</span>

          <button className="w-full h-8 bg-blue-800 text-white font-bold 
          uppercase rounded  items-center text-sm mt-5"
          onClick={() => addToSummary(product)}
          > <HiMiniShoppingCart className='inline'/> Adicionar</button>
          </div>
        </div>
        );
          })}
          
        </div>
        

      </div>

      {/*responsive shop*/}
      <div className="h-[35rem] rounded-md overflow-auto
      items-center w-full md:hidden">

        <div className="items-center sticky top-0 p-0">
        <h1 className="text-gray-600 shadow-md text-2xl font-semibold text-left">
        Produtos & Serviços <HiOutlineBuildingStorefront className='inline'/>
        </h1>
        </div>

        <div className="grid grid-cols-2 items-center gap-2 h-[30rem] overflow-auto">
          
          {data.map((product, index) =>{
          return (
          <div className="p-5 shadow-md h-52 w-[95%] mt-2 rounded-lg border border-slate-200"
          key={index}>

            <div className={styles.product_content}>

            <h1 className={styles.products_title}>
            {product.tituloProduto}
            </h1>

            <p className="ml-2 float-right text-sm"><LuPackageCheck className='inline'/> QTD: {product.quantidadeProduto}</p>
            
            <span>R$ {product.valorProduto}</span>

          <button className="w-full h-8 bg-blue-800 text-white font-bold 
          uppercase rounded  items-center text-sm mt-5"
          onClick={() => addToSummary(product)}
          > Adicionar</button>
          </div>
        </div>
        );
          })}
          
        </div>
        

      </div>

      <div className="h-full w-[28rem] border-gray-200 border rounded ml-12 hidden md:block">

        <div className="shadow-md items-center sticky top-0">
        <h1 className="text-black bg-slate-100 text-2xl text-center p-2">
        Sacola <HiOutlineShoppingBag className='inline'/> </h1>
        </div>
        
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

            <li key={index} className="w-[95%] ml-3 mt-2 list-none ">
              <div className="shadow rounded-md bg-white flex h-14">

                <div className="grid w-full ml-3">
                <h3 className='inline w-full text-xs mt-1'>
                  {product.tituloProduto}
                </h3>
                
                <span className='font-bold inline ml-0'>R$ {product.valorProduto}</span> 
              
                </div>

                <div className={styles.product_incart}>
                  <button className="h-7 w-7 rounded-full border border-gray-600 
                  text-18 cursor-pointer mr-2 text-black font-normal items-center"
                  onClick={() => handleDecrementQuantity(index)}
                  >
                    <HiOutlineMinusSmall/>
                  </button>

                {product.quantidadeProduto}

                <button className="h-7 w-7 rounded-full border border-gray-600 
                  text-18 cursor-pointer ml-2 text-black font-normal items-center"
                onClick={() => handleIncrementQuantity(index)}
                >

                  <HiOutlinePlus/>
                </button>
                </div>


            <button
            className="mr-3 text-2xl text-red-500"
            onClick={() => handleRemoveProduct(index)}>
            <HiOutlineTrash/>
            </button>
            </div>
            </li>
          ))}
          </div>

        {/*Soma Total */}

        <div className="w-full grid shadow-lg border-t-2 border-gray-300"> 

        <div className="text-left w-full flex">

        <label htmlFor="descontoInput" 
        className='float-right ml-2 text-xl font-light'
        >Desconto:</label>

        <input className='text-right border bg-none w-5'
        id="descontoInput"
        type="number"
        value={desconto}
        onChange={handleDescontoChange}
        min={0}
        />
      </div>
      

            <div className="w-full text-right">
            <span className='text-left ml-2 text-xl float-left font-light'>Total</span>
            <span className="text-2xl text-right mr-2 font-bold">R$ {calculateTotalSum(2)}</span>
            </div>

            <div className='w-full text-center bottom-5 top-2 p-2'>
            <button className="w-4/5 h-[3rem] bg-blue-800 text-white font-bold 
            uppercase rounded-md shadow-md text-sm p-1" 
            onClick={finalizarVenda}>
            Finalizar Venda
            </button>
            </div>
          
            
            </div>

            {/*Soma Total */}

      </div>

                    <Modal
                    isOpen={ModalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Modal Overlay"
                    overlayClassName="backdrop-blur-5 fixed z-50 top-0 bottom-0 
                    right-0 left-0 flex items-center justify-center transition-all ease-in duration-100"
                    className="bg-white shadow-md outline-none h-full 
                    w-full md:h-[30rem] md:w-[30rem]">

                    <button
                    onClick={closeModal} 
                    className="h-8 w-8 text-1.5rem border-none z-1 
                    bg-none text-3xl mr-3 text-white bg-red-500 float-right mt-2 outline-none rounded-full">
                    <HiOutlineXMark/>
                    </button>  


                    <h1 className='font-bold text-2xl text-gray-600 text-left ml-2'>Carrinho</h1>

                    <div>
          {selectedProducts.map((product, index) => (

            <li key={index} className="w-[95%] ml-3 mt-3 list-none ">
              <div className="shadow rounded-md border border-gray-200 bg-white flex h-14">

                <div className="grid w-full ml-3">
                <h3 className='inline w-full text-xs mt-1'>
                  {product.tituloProduto}
                </h3>
                
                <span className='font-bold inline ml-0'>R$ {product.valorProduto}</span> 
              
                </div>

                <div className={styles.product_incart}>
                  <button className="h-8 w-8 rounded-full border border-gray-600 
                  text-18 cursor-pointer mr-3 text-black font-normal items-center"
                  onClick={() => handleDecrementQuantity(index)}
                  >
                    <HiOutlineMinusSmall/>
                  </button>

                {product.quantidadeProduto}

                <button className="h-8 w-8 rounded-full border border-gray-600 
                  text-18 cursor-pointer ml-3 text-black font-normal items-center"
                onClick={() => handleIncrementQuantity(index)}
                >

                  <HiOutlinePlus/>
                </button>
                </div>


            <button
            className="mr-3 text-3xl text-red-500"
            onClick={() => handleRemoveProduct(index)}>
            <HiOutlineTrash/>
            </button>
            </div>
            </li>
          ))}
          </div>

        {/*Soma Total */}

        <div className="w-full  fixed grid shadow-md  bottom-0 border-t-2 border-gray-300"> 

        <div className="text-left w-full h-12 flex ">

        <label htmlFor="descontoInput" 
        className='float-right ml-2 text-xl font-light'
        >Desconto:</label>

        <input
        className='text-right border bg-gray-300 shadow h-2 bg-none w-5'
        id="descontoInput"
        type="number"
        value={desconto}
        onChange={handleDescontoChange}
        min={0}
        />
      </div>
      

            <div className="w-full text-right h-12">
            <span className='text-left ml-2 text-xl float-left font-light'>Total:</span>
            <span className="text-2xl text-right mr-3 font-bold">R$ {calculateTotalSum(2)}</span>
            </div>

            <div className='w-full text-center bottom-5 top-2 p-2'>
            <button className="w-4/5 h-[3rem] bg-blue-800 text-white font-normal 
            uppercase rounded-md shadow-md text-xl p-1 tracking-wider" 
            onClick={finalizarVenda}>
            Finalizar Venda
            </button>
            </div>
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
            
            </div>
                    </Modal>
    
      </div>
  )
}

export default Caixa