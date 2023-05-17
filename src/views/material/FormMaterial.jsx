import axios from "axios";
import React from "react";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { ENDERECO_API } from '../../views/util/Constantes';

class FormMaterial extends React.Component {
  state = {
    titulo: null,
    valor: null,
    resposavel: null,
    localizacao: null,
    peso: null,
    dataAquisicao: null,
    dataAquisicaoError: false
  };

  salvar = () => {
    const { titulo, valor, resposavel, localizacao, peso, dataAquisicao } = this.state;

    // Verificar se a data de aquisição foi fornecida
    if (!dataAquisicao) {
      this.setState({ dataAquisicaoError: true });
      return;
    }

    let materialRequest = {
      titulo,
      valor,
      resposavel,
      localizacao,
      peso,
      dataAquisicao
    };

    axios
      .post(ENDERECO_API + "api/material", materialRequest)
      .then((response) => {
        console.log("Material cadastrado com sucesso.");
      })
      .catch((error) => {
        console.log("Erro ao incluir um Material.");
      });
  };

  render() {
    const { dataAquisicao, dataAquisicaoError } = this.state;

    return (
      <div>
        <div style={{ marginTop: "3%" }}>
          <Container textAlign="justified">
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Material &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro{" "}
            </h2>
            <Divider />

            <div style={{ marginTop: "4%" }}>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    required
                    fluid
                    label="TITULO"
                    maxLength="100"
                    value={this.state.titulo}
                    onChange={(e) => this.setState({ titulo: e.target.value })}
                  />

                  <Form.Input
                    required
                    fluid
                    label="RESPOSAVEL"
                    maxLength="100"
                    value={this.state.resposavel}
                    onChange={(e) =>
                      this.setState({ resposavel: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Input
                    required
                    fluid
                    label="VALOR"
                    width={3}
                    maxLength="100"
                    value={this.state.valor}
                    onChange={(e) => this.setState({ valor: e.target.value })}
                  />

                  <Form.Input
                    required
                    fluid
                    label="LOCALIZAÇÃO"
                    maxLength="50"
                    width={7}
                    value={this.state.localizacao}
                    onChange={(e) =>
                      this.setState({ localizacao: e.target.value })
                    }
                  />

                  <Form.Input
                    required
                    fluid
                    label="PESO"
                    maxLength="100"
                    width={3}
                    value={this.state.peso}
                    onChange={(e) => this.setState({
						peso: e.target.value })}
						/>
	  
						<Form.Input
						  fluid
						  label="Data DA AQUISIÇÃO"
						  width={3}
						  error={dataAquisicaoError ? 'Por favor, informe a data de aquisição.' : false}
						>
						  <InputMask
							mask="99/99/9999"
							maskChar={null}
							placeholder="Ex: 20/03/2023"
							value={dataAquisicao}
							onChange={(e) => this.setState({ dataAquisicao: e.target.value })}
							required
						  />
						</Form.Input>
					  </Form.Group>
	  
					  <Form.Group widths="equal" style={{ marginTop: "4%" }} className="form--empresa-salvar">
						<Button
						  type="button"
						  inverted
						  circular
						  icon
						  labelPosition="left"
						  color="orange"
						>
						  <Icon name="reply" />
						  <Link to={"/list-material"}>Voltar</Link>
						</Button>
	  
						<Container textAlign="right">
						  <Button
							inverted
							circular
							icon
							labelPosition="left"
							color="blue"
							floated="right"
							onClick={this.salvar}
						  >
							<Icon name="save" />
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
	  }
	  
	  export default FormMaterial;
	  