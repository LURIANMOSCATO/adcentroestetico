import React, {useEffect, useState} from 'react'
import styles from './Form.module.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewProduct() {

  const {id} = useParams();

  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState([]);
  const [name, setName] = useState([]);
  axios.defaults.withCredentials = true;

  const [values, setValues] = useState({
    tituloProduto:'',
    quantidadeProduto:'',
    valorProduto:''
    });

    useEffect(() =>{
      axios.get('http://localhost:8081/viewproduct/'+id)
      .then(res => {
          setValues({...values, 
            tituloProduto: res.data[0].tituloProduto,
            quantidadeProduto: res.data[0].quantidadeProduto,
            valorProduto: res.data[0].valorProduto
          })
      })
      .catch(err => alert('falha ao resgatar valores!'));

      axios.get('http://localhost:8081/verify')
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
  }, [id])

  const handleUpdate = (event) =>{
    event.preventDefault();
    axios.put('http://localhost:8081/updatep/'+id, values)
    .then(res => {
        console.log(res)
        toast.success('Produto Atualizado!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setTimeout(()=>{
                navigate('/configurar');
            }, 3000);
    }).catch(err => console.log(err));
}

  return (

    <div className={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        />
        <form onSubmit={handleUpdate} className={styles.editview}>
        <Link to={'/configurar'}>
        <button className={styles.button_back}>Voltar</button>
        </Link>
            <h1 className={styles.titleview}>Visualize ou Edite</h1>
            
            <div className={styles.user_details}>

                <label htmlFor=''>Título</label>

                <div className={styles.box}>
                    <input type="text" placeholder='Digite o Produto'
                    className={styles.input_field}
                    value={values.tituloProduto}
                    onChange={e => setValues({...values, tituloProduto: e.target.value})}
                    />
                </div>
                
                
                

                <label htmlFor=''>Quantidade</label>
                <div className={styles.box}>

                <input type="number" className={styles.input_field}
                placeholder='Quantidade do Produto'
                value={values.quantidadeProduto}
                min={0}
                onChange={e => setValues({...values, quantidadeProduto: e.target.value})}
                />

                </div>
                <label htmlFor=''>Valor</label>
                <div className={styles.box}>

                <input type="text" placeholder='Valor do Produto'
                step="0.01"
                className={styles.input_field}
                value={values.valorProduto}
                onChange={e => setValues({...values, valorProduto: e.target.value})}
                />

                </div>
                </div>
            <div className={styles.buttonview}>
            <button className={styles.button_action}>Atualizar </button>
            </div>
        </form>
    </div>
  )
}

export default ViewProduct