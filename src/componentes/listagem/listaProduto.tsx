import { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";

type Produto = {
  nome: string;
  preco: string;
  tipo: string;
  descricao: string;
};

type props = {
  tema: string;
  produtos: Produto[];
  aoRemover: (index: number) => void;
  aoEditar: (index: number) => void;
};

type state = {
  termoBusca: string;
};

export default class ListaProduto extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      termoBusca: "",
    };
  }

  buscar = () => {
    const { termoBusca } = this.state;
    if (!termoBusca.trim()) {
      M.toast({ html: "Digite um nome para buscar." });
      return;
    }
    console.log("Buscando produto/serviço:", termoBusca);
    this.setState({ termoBusca: "" });
  };

  render() {
    const estilo = `collection-item ${this.props.tema}`;

    return (
      <div className="container">
        <h5 className="center-align">Lista de Produtos e Serviços</h5>

        {/* Campo de busca por  ID*/}
        <div className="row">
          <div className="input-field col s10">
            <input
              type="text"
              placeholder="Buscar produto/serviço por ID"
              value={this.state.termoBusca}
              onChange={(e) =>
                this.setState({ termoBusca: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") this.buscar();
              }}
            />
          </div>
          <div className="col s2">
            <button
              className="btn waves-effect waves-light"
              onClick={this.buscar}
              disabled={!this.state.termoBusca.trim()}
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Lista de produtos */}
        <div className="collection z-depth-1">
          {this.props.produtos.length === 0 ? (
            <div className={`${estilo} white-text`}>
              Nenhum produto ou serviço cadastrado.
            </div>
          ) : (
            this.props.produtos.map((p, index) => (
              <div key={index} className={`${estilo} white-text`}>
                <div className="row" style={{ marginBottom: 0 }}>
                  <div className="col s10">
                    <strong>{p.nome}</strong> ({p.tipo})<br />
                    Preço: R$ {p.preco}<br />
                    {p.descricao && <>Descrição: {p.descricao}</>}
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
