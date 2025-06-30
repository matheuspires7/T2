import { Component, FormEvent } from "react";

type Cliente = {
  nome: string;
  cpf: string;
};

type Produto = {
  nome: string;
  preco: string;
  tipo: string;
};

type props = {
  tema: string;
  clientes: Cliente[];
  produtos: Produto[];
  aoRegistrar: (registro: {
    cliente: string;
    produto: string;
    quantidade: number;
  }) => void;
};

type state = {
  cliente: string;
  produto: string;
  quantidade: number;
};

export default class FormularioRegistroConsumo extends Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      cliente: "",
      produto: "",
      quantidade: 1
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
    this.setState({ [name]: name === "quantidade" ? Number(value) : value } as unknown as Pick<state, keyof state>);
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { cliente, produto, quantidade } = this.state;
    if (!cliente || !produto || quantidade < 1) {
      M.toast({ html: "Preencha todos os campos corretamente!" });
      return;
    }
    this.props.aoRegistrar({ cliente, produto, quantidade });
    M.toast({ html: "Consumo registrado com sucesso!" });
    // Resetar estado
    this.setState({ cliente: "", produto: "", quantidade: 1 });
  }

  render() {
    const botaoClasse = `btn waves-effect waves-light ${this.props.tema}`;

    return (
      <div className="container">
        <h5 className="center-align">Registro de Consumo</h5>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <select
                name="cliente"
                value={this.state.cliente}
                onChange={this.handleChange}
                className="browser-default"
              >
                <option value="">Selecione um cliente</option>
                {this.props.clientes.map((c, i) => (
                  <option key={i} value={c.nome}>
                    {c.nome} - {c.cpf}
                  </option>
                ))}
              </select>
              <label className="active">Cliente</label>
            </div>

            <div className="input-field col s6">
              <select
                name="produto"
                value={this.state.produto}
                onChange={this.handleChange}
                className="browser-default"
              >
                <option value="">Selecione um produto/serviço</option>
                {this.props.produtos.map((p, i) => (
                  <option key={i} value={p.nome}>
                    {p.nome} - R$ {p.preco}
                  </option>
                ))}
              </select>
              <label className="active">Produto/Serviço</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                name="quantidade"
                id="quantidade"
                type="number"
                min={1}
                value={this.state.quantidade}
                onChange={this.handleChange}
              />
              <label htmlFor="quantidade" className="active">
                Quantidade
              </label>
            </div>
          </div>

          <div className="row center-align">
            <button className={botaoClasse} type="submit">
              Registrar
              <i className="material-icons right">check</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
