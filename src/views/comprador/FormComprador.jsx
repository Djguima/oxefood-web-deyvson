import axios from "axios";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';

import { ENDERECO_API } from '../../views/util/Constantes';

// Função para formatar a data
function formatarData(data) {
  const dataObj = new Date(data);
  const dia = String(dataObj.getDate()).padStart(2, '0');
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
  const ano = dataObj.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export default function FormComprador() {
  const { state } = useLocation();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios.get(ENDERECO_API + "api/comprador/" + state.id)
        .then((response) => {
          setIdComprador(response.data.id);
          setNome(response.data.nome);
          setEnderecoComercial(response.data.enderecoComercial);
          setEnderecoResidencial(response.data.enderecoResidencial);
          setComissao(response.data.comissao);
          setTrabahoHomeOffice(response.data.trabahoHomeOffice);
          setQtdComprasMediasMes(response.data.qtdComprasMediasMes);
          setContratadoEm(formatarData(response.data.contratadoEm));
        })
        .catch((error) => {
          console.log('Erro ao obter os dados do comprador.');
        });
    }
  }, [state]);

  const [idComprador, setIdComprador] = useState();
  const [nome, setNome] = useState();
  const [enderecoComercial, setEnderecoComercial] = useState();
  const [enderecoResidencial, setEnderecoResidencial] = useState();
  const [comissao, setComissao] = useState();
  const [trabahoHomeOffice, setTrabahoHomeOffice] = useState(false);
  const [qtdComprasMediasMes, setQtdComprasMediasMes] = useState();
  const [contratadoEm, setContratadoEm] = useState();

  function salvar() {
    let compradorRequest = {
      nome: nome,
      enderecoComercial: enderecoComercial,
      enderecoResidencial: enderecoResidencial,
     
      comissao: comissao,
      trabahoHomeOffice: trabahoHomeOffice,
      qtdComprasMediasMes: qtdComprasMediasMes,
      contratadoEm: contratadoEm
    }

    if (idComprador != null) { // Alteração
      axios.put(ENDERECO_API + "api/comprador/" + idComprador, compradorRequest)
        .then((response) => {
          console.log('Comprador alterado com sucesso.');
        })
        .catch((error) => {
          console.log('Erro ao alterar um comprador.');
        });
    } else { // Cadastro
      axios.post(ENDERECO_API + "api/comprador", compradorRequest)
        .then((response) => {
          console.log('Comprador cadastrado com sucesso.');
        })
        .catch((error) => {
          console.log('Erro ao incluir o comprador.');
        });
    }
  }

  return (
    <div>
      <div style={{ marginTop: '3%' }}>
        <Container textAlign='justified'>
          {idComprador === undefined &&
            <h2> <span style={{ color: 'darkgray' }}> Comprador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
          }
          {idComprador !== undefined &&
            <h2> <span style={{ color: 'darkgray' }}> Comprador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
          }
          <Divider />

          <div style={{ marginTop: '4%' }}>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                  required
                  fluid
                  label='Nome'
                  maxLength="100"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Input
                  required
                  fluid
                  label='Endereço Comercial'
                  maxLength="100"
                  value={enderecoComercial}
                  onChange={e => setEnderecoComercial(e.target.value)}
                />
                <Form.Input
                  required
                  fluid
                  label='Endereço Residencial'
                  maxLength="100"
                  value={enderecoResidencial}
                  onChange={e => setEnderecoResidencial(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  required
                  fluid
                  label='Comissao'
                  maxLength="100"
                  value={comissao}
                  onChange={e => setComissao(e.target.value)}
                />
                <Form.Input
                  required
                  fluid
                  label='Quantidade de Compras por Mes'
                  maxLength="100"
                  value={qtdComprasMediasMes}
                  onChange={e => setQtdComprasMediasMes(e.target.value)}
                />
                <Form.Input
                  fluid
                  label='Contratado Em'
                  width={6}
                >
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/2023"
                    value={contratadoEm}
                    onChange={e => setContratadoEm(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

			  <Form.Group inline>
  <label>Trabaha Home Office </label>
  <Form.Radio
    label='Sim'
    checked={trabahoHomeOffice === true}
    value="true"
    onChange={() => setTrabahoHomeOffice(true)}
  />
  <Form.Radio
    label='Não'
    checked={trabahoHomeOffice === false}
    value="false"
    onChange={() => setTrabahoHomeOffice(false)}
  />
</Form.Group>



	


              <Form.Group widths='equal' style={{ marginTop: '4%' }} className='form--empresa-salvar'>
                <Button
                  type="button"
                  inverted
                  circular
                  icon
                  labelPosition='left'
                  color='orange'
                >
                  <Icon name='reply' />
                  <Link to={'/list-comprador'}>Voltar</Link>
                </Button>

                <Container textAlign='right'>
                  <Button
                    inverted
                    circular
                    icon
                    labelPosition='left'
                    color='blue'
                    floated='right'
                    onClick={salvar}
                  >
                    <Icon name='save' />
                    Salvar
                  </Button>
                </Container>
              </Form.Group>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
}
