import { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";

type Cliente = {
  nome: string;
  nomeSocial: string;
  genero: string;
  cpf: string;
  cpfData: string;
  rg: string;
  rgData: string;
  telefone: string;
  ddd: string;
};

type props = {
  tema: string;
  clientes: Cliente[];
  aoRemover: (index: number) => void;
  aoEditar: (index: number) => void;
};

type state = {
  idBusca: string;
};

export default class ListaCliente extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      idBusca: "",
    };
  }

  buscarPorId = () => {
    const { idBusca } = this.state;
    if (!idBusca.trim()) {
      M.toast({ html: "Digite um ID para buscar." });
      return;
    }
    console.log("ID buscado (mock):", idBusca);
    this.setState({ idBusca: "" });
  };

  render() {
    const estilo = `collection-item ${this.props.tema}`;

    return (
      <div className="container">
        <h5 className="center-align">Lista de Clientes</h5>

        {/* Campo de busca por ID */}
        <div className="row">
          <div className="input-field col s10">
            <input
              type="text"
              placeholder="Buscar cliente por ID"
              value={this.state.idBusca}
              onChange={(e) => this.setState({ idBusca: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") this.buscarPorId();
              }}
            />
          </div>
          <div className="col s2">
            <button
              className="btn waves-effect waves-light"
              onClick={this.buscarPorId}
              disabled={!this.state.idBusca.trim()}
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Lista de clientes */}
        <div className="collection z-depth-1">
          {this.props.clientes.length === 0 ? (
            <div className={`${estilo} white-text`}>
              Nenhum cliente cadastrado.
            </div>
          ) : (
            this.props.clientes.map((c, index) => (
              <div key={index} className={`${estilo} white-text`}>
                <div className="row" style={{ marginBottom: 0 }}>
                  <div className="col s10">
                    <strong>{c.nome}</strong> ({c.genero})<br />
                    Nome Social: {c.nomeSocial || "N/A"}
                    <br />
                    CPF: {c.cpf} - Emissão: {c.cpfData}
                    <br />
                    RG: {c.rg} - Emissão: {c.rgData}
                    <br />
                    Tel: ({c.ddd}) {c.telefone}
                  </div>
                  <div className="col s2 right-align">
                    <button
                      className="btn-small blue darken-2"
                      style={{ marginRight: "5px" }}
                      onClick={() => this.props.aoEditar(index)}
                    >
                      <i className="material-icons">edit</i>
                    </button>
                    <button
                      className="btn-small red darken-2"
                      onClick={() => this.props.aoRemover(index)}
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}
