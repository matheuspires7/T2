import { Component, FormEvent } from "react"

type Cliente = {
  nome: string
  nomeSocial: string
  genero: string
  cpf: string
  cpfData: string
  rg: string
  rgData: string
  ddd: string
  telefone: string
}

type props = {
  tema: string
  aoCadastrar?: (cliente: Cliente) => void
  aoAtualizar?: (cliente: Cliente) => void
  cliente?: Cliente
}

type state = Cliente

export default class FormularioCadastroCliente extends Component<props, state> {
  constructor(props: props) {
    super(props)
    this.state = {
      nome: props.cliente?.nome || "",
      nomeSocial: props.cliente?.nomeSocial || "",
      genero: props.cliente?.genero || "M",
      cpf: props.cliente?.cpf || "",
      cpfData: props.cliente?.cpfData || "",
      rg: props.cliente?.rg || "",
      rgData: props.cliente?.rgData || "",
      ddd: props.cliente?.ddd || "",
      telefone: props.cliente?.telefone || "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const elems = document.querySelectorAll('select')
    M.FormSelect.init(elems)
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    this.setState({ [name]: value } as unknown as Pick<state, keyof state>)
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault()
    const cliente = { ...this.state }

    if (this.props.aoAtualizar) {
      this.props.aoAtualizar(cliente)
      M.toast({ html: "Cliente atualizado com sucesso!" })
    } else if (this.props.aoCadastrar) {
      this.props.aoCadastrar(cliente)
      M.toast({ html: "Cliente cadastrado com sucesso!" })
    }
  }

  render() {
    const botaoClasse = `btn waves-effect waves-light ${this.props.tema}`
    const ehEdicao = !!this.props.aoAtualizar

    return (
      <div className="container">
        <h5 className="center-align">{ehEdicao ? "Editar Cliente" : "Cadastro de Cliente"}</h5>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input name="nome" id="nome" type="text" value={this.state.nome} onChange={this.handleChange} required />
              <label htmlFor="nome" className={this.state.nome ? "active" : ""}>Nome *</label>
            </div>
            <div className="input-field col s6">
              <input name="nomeSocial" id="nomeSocial" type="text" value={this.state.nomeSocial} onChange={this.handleChange} />
              <label htmlFor="nomeSocial" className={this.state.nomeSocial ? "active" : ""}>Nome Social</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <select name="genero" value={this.state.genero} onChange={this.handleChange} className="browser-default">
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
              </select>
              <label className="active">Gênero</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input name="cpf" id="cpf" type="text" value={this.state.cpf} onChange={this.handleChange} required />
              <label htmlFor="cpf" className={this.state.cpf ? "active" : ""}>CPF</label>
            </div>
            <div className="input-field col s6">
              <input name="cpfData" id="cpfData" type="date" value={this.state.cpfData} onChange={this.handleChange} required />
              <label htmlFor="cpfData" className={this.state.cpfData ? "active" : ""}>Data de emissão do CPF</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input name="rg" id="rg" type="text" value={this.state.rg} onChange={this.handleChange} />
              <label htmlFor="rg" className={this.state.rg ? "active" : ""}>RG</label>
            </div>
            <div className="input-field col s6">
              <input name="rgData" id="rgData" type="date" value={this.state.rgData} onChange={this.handleChange} />
              <label htmlFor="rgData" className={this.state.rgData ? "active" : ""}>Data de emissão do RG</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s4">
              <input name="ddd" id="ddd" type="text" value={this.state.ddd} onChange={this.handleChange} />
              <label htmlFor="ddd" className={this.state.ddd ? "active" : ""}>DDD</label>
            </div>
            <div className="input-field col s8">
              <input name="telefone" id="telefone" type="text" value={this.state.telefone} onChange={this.handleChange} />
              <label htmlFor="telefone" className={this.state.telefone ? "active" : ""}>Telefone</label>
            </div>
          </div>

          <div className="row center-align">
            <button className={botaoClasse} type="submit">
              {ehEdicao ? "Atualizar" : "Cadastrar"}
              <i className="material-icons right">{ehEdicao ? "edit" : "person_add"}</i>
            </button>
          </div>
        </form>
      </div>
    )
  }
}
