import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';
import { ENDERECO_API } from '../../views/util/Constantes';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function ListMaterial() {
  const [listaMateriais, setListaMateriais] = useState([]);

  useEffect(() => {
    carregarLista();
  }, []);

  const deleteMaterial = (id) => {
    Swal.fire({
      icon: 'question',
      title: 'Tem certeza?',
      text: 'Tem certeza de que deseja remover este material?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(ENDERECO_API + 'api/material/' + id)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Material removido!',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              carregarLista();
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Erro ao remover material',
              text: 'Ocorreu um erro ao remover o material. Por favor, tente novamente.',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  }

  const carregarLista = () => {
    axios.get(ENDERECO_API + "api/material")
      .then((response) => {
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
                  <Table.HeaderCell textAlign='center' >Responsavel</Table.HeaderCell>
<Table.HeaderCell textAlign='center' width={3}>Localização</Table.HeaderCell>
<Table.HeaderCell textAlign='center' width={1}>Peso</Table.HeaderCell>
<Table.HeaderCell textAlign='center' width={2}>Data da Aquisição</Table.HeaderCell>
<Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
</Table.Row>
</Table.Header>
<Table.Body>
{listaMateriais.map(material => (
<Table.Row key={material.id}>
  <Table.Cell>{material.titulo}</Table.Cell>
  <Table.Cell>{material.valor}</Table.Cell>
  <Table.Cell>{material.responsavel}</Table.Cell>
  <Table.Cell>{material.localizacao}</Table.Cell>
  <Table.Cell>{material.peso}</Table.Cell>
  <Table.Cell>{formatarData(material.dataAquisicao)}</Table.Cell>
  <Table.Cell textAlign='center'>
    
    
  <Button
         inverted
         circular
         color='blue'
         title='Clique aqui para editar os dados deste material'
         icon>
            <Link to="/form-material" state={{id: material.id}} style={{color: 'blue'}}> <Icon name='edit' /> </Link>
      </Button>&nbsp;



    &nbsp;
    <Button
      inverted
      circular
      icon='trash'
      color='red'
      title='Clique aqui para remover este Material'
      onClick={() => deleteMaterial(material.id)}
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
