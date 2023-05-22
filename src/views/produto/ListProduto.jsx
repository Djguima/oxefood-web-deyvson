import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';
import { ENDERECO_API } from '../../views/util/Constantes';



import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


class ListProduto extends React.Component{

    state = {

       listaProdutos: []
      
    }

    componentDidMount = () => {
      
        this.carregarLista();
      
    }


    
deleteProduto = (id) => {
    Swal.fire({
      icon: 'question',
      title: 'Tem certeza?',
      text: 'Tem certeza de que deseja remover este produto?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(ENDERECO_API + 'api/produto/' + id)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'produto removido!',
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
              title: 'Erro ao remover produto',
              text: 'Ocorreu um erro ao remover o produto. Por favor, tente novamente.',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  }
  
    

    carregarLista = () => {

        axios.get(ENDERECO_API + "api/produto")
        .then((response) => {
          
            this.setState({
                listaProdutos: response.data
            })
        })

    };

    render(){
        return(
            <div>

                <div style={{marginTop: '3%'}}>

                    <Container textAlign='justified' >

                        <h2> Produto </h2>

                        <Divider />

                        <div style={{marginTop: '4%'}}>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                                floated='right'
                            >
                                <Icon name='clipboard outline' />
                                <Link to={'/form-produto'}>Novo</Link>
                            </Button>

                            <br/><br/><br/>
                      
                            <Table color='orange' sortable celled>

                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Código</Table.HeaderCell>
                                        <Table.HeaderCell>Título</Table.HeaderCell>
                                        <Table.HeaderCell>Descrição</Table.HeaderCell>
                                        <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
                                        <Table.HeaderCell>Tempo de Mínimo de Entrega</Table.HeaderCell>
                                        <Table.HeaderCell>Tempo de Máximo de Entrega</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                          
                                <Table.Body>

                                    { this.state.listaProdutos.map(p => (

                                        <Table.Row>
                                            <Table.Cell>{p.codigo}</Table.Cell>
                                            <Table.Cell>{p.titulo}</Table.Cell>
                                            <Table.Cell>{p.descricao}</Table.Cell>
                                            <Table.Cell>{p.valorUnitario}</Table.Cell>
                                            <Table.Cell>{p.tempoEntregaMinimo}</Table.Cell>
                                            <Table.Cell>{p.tempoEntregaMaximo}</Table.Cell>
                                            <Table.Cell textAlign='center'>
                                              


                                            <Button
         inverted
         circular
         color='blue'
         title='Clique aqui para editar os dados deste produto'
         icon>
            <Link to="/form-produto" state={{id: p.id}} style={{color: 'blue'}}> <Icon name='edit' /> </Link>
      </Button>&nbsp;




                                                <Button
                                                   inverted
                                                   circular
                                                   icon='trash'
                                                   color='red'
                                                   title='Clique aqui para remover este produto'
                                                   
                                                   onClick={() => this.deleteProduto(p.id)}
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

export default ListProduto;
