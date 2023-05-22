import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';
import { ENDERECO_API } from '../../views/util/Constantes';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

class ListCliente extends React.Component {
  state = {
    listaClientes: []
  }

  componentDidMount = () => {
    this.carregarLista();
  }

  
deleteCliente = (id) => {
  Swal.fire({
    icon: 'question',
    title: 'Tem certeza?',
    text: 'Tem certeza de que deseja remover este cliente?',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(ENDERECO_API + 'api/cliente/' + id)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Cliente removido!',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.carregarLista();
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Erro ao remover cliente',
            text: 'Ocorreu um erro ao remover o cliente. Por favor, tente novamente.',
            confirmButtonText: 'OK'
          });
        });
    }
  });
}

  carregarLista = () => {
    axios.get(ENDERECO_API + "api/cliente")
      .then((response) => {
        this.setState({
          listaClientes: response.data
        })
      });
  };

  formatarData = (dataParam) => {
    if (dataParam == null || dataParam === '') {
      return ''
    }

    let dia = dataParam.substr(8, 2);
    let mes = dataParam.substr(5, 2);
    let ano = dataParam.substr(0, 4);
    let dataFormatada = dia + '/' + mes + '/' + ano;

    return dataFormatada
  };

  render() {
    return (
      <div>
        <div style={{ marginTop: '3%' }}>
          <Container textAlign='justified'>
            <h2> Cliente </h2>
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
                <Link to={'/form-cliente'}>Novo</Link>
              </Button>
              <br /><br /><br />
              <Table color='orange' sortable celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Nome</Table.HeaderCell>
                    <Table.HeaderCell>CPF</Table.HeaderCell>
                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                    <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.listaClientes.map(cliente => (
                    <Table.Row key={cliente.id}>
                      <Table.Cell>{cliente.nome}</Table.Cell>
                      <Table.Cell>{cliente.cpf}</Table.Cell>
                      <Table.Cell>{this.formatarData(cliente.dataNascimento)}</Table.Cell>
                      <Table.Cell>{cliente.foneCelular}</Table.Cell>
                      <Table.Cell>{cliente.foneFixo}</Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Button
                          inverted
                          circular
                          color='blue'
                          title='Clique aqui para editar os dados deste cliente'
                          icon>
                          <Link to="/form-cliente" state={{ id: cliente.id }} style={{ color: 'blue' }}> <Icon name='edit' /> </Link>
                        </Button> &nbsp;
                        <Button
                          inverted
                          circular
                          icon='trash'
                          color='red'
                          title='Clique aqui para remover este cliente'
                          onClick={() => this.deleteCliente(cliente.id)}
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
    )
  }
}

export default ListCliente;
