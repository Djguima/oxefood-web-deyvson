import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';


import { ENDERECO_API } from '../../views/util/Constantes';





function formatarData(data) {
	// Lógica para formatar a data no formato desejado (DD/MM/AAAA)
	const dataObj = new Date(data);
	const dia = String(dataObj.getDate()).padStart(2, '0');
	const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
	const ano = dataObj.getFullYear();
	return `${dia}/${mes}/${ano}`;
  }


  export default function FormProduto() {
	const { state } = useLocation();

	useEffect(() => {
		if (state != null && state.id != null) {
		  axios.get(ENDERECO_API + "api/produto/" + state.id)
			.then((response) => {
			  setIdProduto(response.data.id);
			  setCodigo(response.data.codigo);
			  setTitulo(response.data.titulo);
			  setDescricao(formatarData(response.data.descricao));
			  setValorUnitario(response.data.valorUnitario);
			  setTempoEntregaMinimo(response.data.tempoEntregaMinimo);
			  setTempoEntregaMaximo(response.data.tempoEntregaMaximo);
			})
			.catch((error) => {
			  console.log('Erro ao obter os dados do produto.');
			});
		}
	}, [state]);

	const [idProduto, setIdProduto] = useState();
	const [codigo, setCodigo] = useState();
	const [titulo, setTitulo] = useState();
	const [descricao, setDescricao] = useState();
	const [valorUnitario, setValorUnitario] = useState();
	const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();
	const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();

	function salvar() {
	  let produtoRequest = {
		codigo: codigo,
		titulo: titulo,
		descricao: descricao,
		valorUnitario: valorUnitario,
		tempoEntregaMinimo: tempoEntregaMinimo,
		tempoEntregaMaximo: tempoEntregaMaximo
	  }



	  

	  if (idProduto != null) { // Alteração
		axios.put(ENDERECO_API + "api/produto/" + idProduto, produtoRequest)
		  .then((response) => {
			console.log('Produto alterado com sucesso.');
		  })
		  .catch((error) => {
			console.log('Erro ao alterar um produto.');
		  });
	  } else { // Cadastro
		axios.post(ENDERECO_API + "api/produto", produtoRequest)
		  .then((response) => {
			console.log('Produto cadastrado com sucesso.');
		  })
		  .catch((error) => {
			console.log('Erro ao incluir o produto.');
		  });
	  }
	}
  

	return (
		<div>
		  <div style={{ marginTop: '3%' }}>
			<Container textAlign='justified'>
			  {idProduto === undefined &&
				<h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
			  }
			  {idProduto !== undefined &&
				<h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
			  }
			  <Divider />

                        <div style={{marginTop: '4%'}}>

							<Form>

								<Form.Group>
									<Form.Input
										required
										label='Título'
										placeholder='Informe o título do produto'
										tabIndex='1'
										width={11}
										maxLength="300"
										value={titulo}
										onChange={e => setTitulo(e.target.value)}
									/>

									<Form.Input
										required
										fluid
										label='Código do Produto'
										placeholder='Informe o código do produto'
										width={5}
										tabIndex='2'
										maxLength='10'
										value={codigo}
										onChange={e => setTitulo(e.target.value)}
									/>
								</Form.Group>

								<Form.TextArea
									label='Descrição'
									placeholder='Informe a descrição do produto'
									tabIndex='3'
									maxLength="100000"
									value={descricao}
									onChange={e => setDescricao( e.target.value)}
								/>

								<Form.Group>

									<Form.Input
										required
										fluid
										label='Valor Unitário'
										tabIndex='5'
										name='valorUnitario'
										width={6}
										value={valorUnitario}
										onChange={e => setValorUnitario(e.target.value)}
									/>
                                    
									<Form.Input
										fluid
										placeholder='30'
										label='Tempo de Entrega Mínimo em Minutos'
										width={5}
										maxLength="3"
										value={tempoEntregaMinimo}
										onChange={e => setTempoEntregaMinimo(e.target.value)}
									/>
                                    
									<Form.Input
										fluid
										placeholder='40'
										label='Tempo de Entrega Máximo em Minutos'
										width={5}
										maxLength="3"
										value={tempoEntregaMaximo}
										onChange={e => setTempoEntregaMaximo(e.target.value)}
									/>
								</Form.Group>

								<Form.Group widths='equal' style={{marginTop: '4%', justifyContent:'space-between'}}>

									<Button
										type="button"
										inverted
										circular
										icon
										labelPosition='left'
										color='orange'
									>
										<Icon name='reply' />
										<Link to={'/list-produto'}>Voltar</Link>
									</Button>

                                    <Button
                                        inverted
                                        circular
                                        icon
                                        labelPosition='left'
                                        primary
                                        floated='right'
                                        onClick={salvar}
                                        tabIndex='8'>
                                        <Icon name='save' />
                                        Salvar
                                    </Button>

                                </Form.Group>

							</Form>
						</div>
                    </Container>
                </div>
			</div>
		)
	}

