import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, List, Modal, Segment, Table } from 'semantic-ui-react';
import { ENDERECO_API } from '../../views/util/Constantes';



import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


class ListEntregador extends React.Component{

    state = {

       listaEntregadores: [],
       openModal: false,
       entregadorObj: {}
      
    }

    componentDidMount = () => {
      
        this.carregarLista();
      
    }

    
deleteEntregador = (id) => {
    Swal.fire({
      icon: 'question',
      title: 'Tem certeza?',
      text: 'Tem certeza de que deseja remover este entregador?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(ENDERECO_API + 'api/entregador/' + id)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Entregador removido!',
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
              title: 'Erro ao remover entregador',
              text: 'Ocorreu um erro ao remover o entregador. Por favor, tente novamente.',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  }
  

    carregarLista = () => {

        axios.get(ENDERECO_API + "api/entregador")
        .then((response) => {
          
            this.setState({
                listaEntregadores: response.data
            })
        })

    };

    formatarData = (dataParam) => {

        if (dataParam == null || dataParam == '') {
            return ''
        }
        
        let dia = dataParam.substr(8,2);
        let mes = dataParam.substr(5,2);
        let ano = dataParam.substr(0,4);
        let dataFormatada = dia + '/' + mes + '/' + ano;

        return dataFormatada
    };

    setOpenModal = (val) => {

        this.setState({ 
            openModal: val
        })
    };

    exibirDetalheEntregador = (id) => {

        axios.get(ENDERECO_API + "api/entregador/" + id)
        .then((response) => {
          
            this.setState({
                entregadorObj: response.data,
                openModal: true,
            })
        })

    };

    render(){
        return(
            <div>

                <div style={{marginTop: '3%'}}>

                    <Container textAlign='justified' >

                        <h2> Entregador </h2>

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
                                <Link to={'/form-entregador'}>Novo</Link>
                            </Button>

                            <br/><br/><br/>
                      
                            <Table color='orange' sortable celled>

                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Nome</Table.HeaderCell>
                                        <Table.HeaderCell>CPF</Table.HeaderCell>
                                        <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                        <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                        <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center' width={3}>Ações</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                          
                                <Table.Body>

                                    { this.state.listaEntregadores.map(entregador => (

                                        <Table.Row>
                                            <Table.Cell>{entregador.nome}</Table.Cell>
                                            <Table.Cell>{entregador.cpf}</Table.Cell>
                                            <Table.Cell>{this.formatarData(entregador.dataNascimento)}</Table.Cell>
                                            <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                            <Table.Cell>{entregador.foneFixo}</Table.Cell>
                                            <Table.Cell textAlign='center'>

                                                <Button
                                                   inverted
                                                   circular
                                                   icon='eye'
                                                   color='green'
                                                   title='Clique aqui para exibir este entregador' 
                                                   onClick={e => this.exibirDetalheEntregador(entregador.id)}
                                                />  &nbsp;
                                              

                                              <Button
         inverted
         circular
         color='blue'
         title='Clique aqui para editar os dados deste entregador'
         icon>
            <Link to="/form-entregador" state={{id: entregador.id}} style={{color: 'blue'}}> <Icon name='edit' /> </Link>
      </Button>&nbsp;

                                                <Button
                                                   inverted
                                                   circular
                                                   icon='trash'
                                                   color='red'
                                                   title='Clique aqui para remover este entregador' 
                                                   onClick={() => this.deleteEntregador(entregador.id)}
        
                                                   />

                                            </Table.Cell>
                                        </Table.Row>
                                    ))}

                                </Table.Body>
                            </Table>
                        </div>
                    </Container>
                </div>

                <Modal
                    basic
                    onClose={() => this.setOpenModal(false)}
                    onOpen={() => this.setOpenModal(true)}
                    open={this.state.openModal}
                >

                    <Modal.Header>Dados do Entregador</Modal.Header>
                
                    <Modal.Content>
                        <Modal.Description>

                            <Segment>
                                <List relaxed>
                                    <List.Item>
                                        <List.Icon name='angle right' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Description>
                                                <strong>Nome:</strong> &nbsp; &nbsp; 
                                                {this.state.entregadorObj.nome}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='angle right' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Description>
                                                <strong>CPF:</strong> &nbsp; &nbsp; 
                                                {this.state.entregadorObj.cpf}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='angle right' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Description>
                                                <strong>RG:</strong> &nbsp; &nbsp; 
                                                {this.state.entregadorObj.rg}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='angle right' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Description>
                                                <strong>Data de Nascimento:</strong> &nbsp; &nbsp; 
                                                {this.formatarData(this.state.entregadorObj.dataNascimento)}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='angle right' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Description>
                                                <strong>Celular:</strong> &nbsp; &nbsp; 
                                                {this.state.entregadorObj.foneCelular}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='angle right' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Description>
                                                <strong>Fixo:</strong> &nbsp; &nbsp; 
                                                {this.state.entregadorObj.foneFixo}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='angle right' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Description>
                                                <strong>Quantidade de Entregas Realizadas:</strong> &nbsp; &nbsp; 
                                                {this.state.entregadorObj.qtdEntregasRealizadas}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='angle right' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Description>
                                                <strong>Valor Frete:</strong> &nbsp; &nbsp; 
                                                {this.state.entregadorObj.valorFrete}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='angle right' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Description>
                                                <strong>Endereço:</strong> &nbsp; &nbsp; 
                                                {this.state.entregadorObj.enderecoRua}, {this.state.entregadorObj.enderecoNumero}, {this.state.entregadorObj.enderecoBairro}, {this.state.entregadorObj.enderecoComplemento}, {this.state.entregadorObj.enderecoCidade} - {this.state.entregadorObj.enderecoUf} - CEP: {this.state.entregadorObj.enderecoCep}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='angle right' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Description>
                                                <strong>Ativo:</strong> &nbsp; &nbsp; 
                                                { this.state.entregadorObj.ativo === true && 
                                                    <>Sim</>
                                                }
                                                { this.state.entregadorObj.ativo === false && 
                                                    <>Não</>
                                                }
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Segment>

                        </Modal.Description>
                    </Modal.Content>
                
                </Modal>

            </div>
        )
    }
}

export default ListEntregador;
