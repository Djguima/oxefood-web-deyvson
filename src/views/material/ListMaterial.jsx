import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';
import { ENDERECO_API } from '../../views/util/Constantes';

function ListMaterial() {
  const [listaMateriais, setListaMateriais] = useState([]);
  


  useEffect(() => {
    carregarLista();
  }, []);

  const carregarLista = () => {
    axios.get(ENDERECO_API + "api/material").then((response) => {
      setListaMateriais(response.data);
    });
  };

  const formatarData = (dataParam) => {
    if (dataParam == null || dataParam === '') {
      return '';
    }

    let dia = dataParam.substr(8, 2);
    let mes = dataParam.substr(5, 2);
    let ano = dataParam.substr(0, 4);
    let dataFormatada = dia + '/' + mes + '/' + ano;

    return dataFormatada;
  };


  return (
    <div>
      <div style={{ marginTop: '3%' }}>
        <Container textAlign='justified'>
          <h2> Material </h2>
          <Divider />
          <div style={{ marginTop: '4%' }}>
            <Button
              inverted
              circular
              icon
              labelPosition='left'
              color='orange'
              floated='right'
            >
              <Icon name='clipboard outline' />
              <Link to={'/form-material'}>Novo</Link>
            </Button>
            <br /><br /><br />
            <Table color='orange' sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign='center' width={3}>Titulo</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center' width={1}>Valor</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center' width={3}>Responsavel</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center' width={3}>Localização</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center' width={1}>Peso</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center' width={2}>Data da Aquisição</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {listaMateriais.map(m => (
                  <Table.Row key={m.id}>
                    <Table.Cell>{m.titulo}</Table.Cell>
                    <Table.Cell>{m.valor}</Table.Cell>
                    <Table.Cell>{m.responsavel}</Table.Cell>
                    <Table.Cell>{m.localizacao}</Table.Cell>
                    <Table.Cell>{m.peso}</Table.Cell>
                    <Table.Cell>{formatarData(m.dataAquisicao)}</Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Button
                        inverted
                        circular
                        icon='edit'
                        color='blue'
                        title='Clique aqui para editar os dados deste Material'
                    />
                      &nbsp;
                      <Button
                        inverted
                        circular
                        icon='trash'
                        color='red'
                        title='Clique aqui para remover este Material'
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default ListMaterial;
