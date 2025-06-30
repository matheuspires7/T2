import { Component, FormEvent } from "react";

type Produto = {
  nome: string;
  preco: string;
  tipo: string;
  descricao: string;
};

type props = {
  tema: string;
  aoCadastrar?: (produto: Produto) => void;
  aoAtualizar?: (produto: Produto) => void;
  produto?: Produto;
};

type state = Produto;

export default class FormularioCadastroProduto extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      nome: props.produto?.nome || "",
      preco: props.produto?.preco || "",
      tipo: props.produto?.tipo || "Produto",
      descricao: props.produto?.descricao || "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    this.setState({ [name]: value } as unknown as Pick<state, keyof state>);
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    const produto = { ...this.state };

    if (this.props.aoAtualizar) {
      this.props.aoAtualizar(produto);
      M.toast({ html: "Produto atualizado com sucesso!" });
    } else if (this.props.aoCadastrar) {
      this.props.aoCadastrar(produto);
      M.toast({ html: "Produto cadastrado com sucesso!" });
    }
  }

  render() {
    const botaoClasse = `btn waves-effect waves-light ${this.props.tema}`;
    const ehEdicao = !!this.props.aoAtualizar;

    return (
      <div className="container">
        <h5 className="center-align">
          {ehEdicao ? "Editar Produto/Serviço" : "Cadastro de Produto/Serviço"}
        </h5>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input
                name="nome"
                id="nome"
                type="text"
                value={this.state.nome}
                onChange={this.handleChange}
                required
              />
              <label htmlFor="nome" className={this.state.nome ? "active" : ""}>
                Nome *
              </label>
            </div>
            <div className="input-field col s6">
              <input
                name="preco"
                id="preco"
                type="number"
                step="0.01"
                value={this.state.preco}
                onChange={this.handleChange}
                required
              />
              <label htmlFor="preco" className={this.state.preco ? "active" : ""}>
                Preço *
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <select
                name="tipo"
                value={this.state.tipo}
                onChange={this.handleChange}
                className="browser-default"
              >
                <option value="Produto">Produto</option>
                <option value="Serviço">Serviço</option>
              </select>
              <label className="active">Tipo</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                name="descricao"
                id="descricao"
                type="text"
                value={this.state.descricao}
                onChange={this.handleChange}
              />
              <label
                htmlFor="descricao"
                className={this.state.descricao ? "active" : ""}
              >
                Descrição
              </label>
            </div>
          </div>

          <div className="row center-align">
            <button className={botaoClasse} type="submit">
              {ehEdicao ? "Atualizar" : "Cadastrar"}
              <i className="material-icons right">
                {ehEdicao ? "edit" : "add_box"}
              </i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
