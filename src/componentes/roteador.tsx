import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./formularios/formularioCadastroCliente";
import ListaCliente from "./listagem/listaCliente";
import FormularioCadastroProduto from "./formularios/formularioCadastroProduto";
import ListaProduto from "./listagem/listaProduto";
import FormularioRegistroConsumo from "./formularios/formularioRegistroConsumo";
import PaginaRelatorios from "./relatorios/paginaRelatorios";

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

type Produto = {
  nome: string;
  preco: string;
  tipo: string;
  descricao: string;
};

type Consumo = {
  cliente: string;
  produto: string;
  quantidade: number;
};

type state = {
  tela: string;
  clientes: Cliente[];
  produtos: Produto[];
  consumos: Consumo[];
  clienteEmEdicaoIndex: number | null;
  produtoEmEdicaoIndex: number | null;
};

export default class Roteador extends Component<{}, state> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tela: "Clientes",
      clientes: [
        {
          nome: "1 - Lucas Tavares",
          nomeSocial: "Tavares",
          genero: "M",
          cpf: "123.456.789-00",
          cpfData: "2010-01-10",
          rg: "12.345.678-9",
          rgData: "2008-05-15",
          telefone: "999999999",
          ddd: "11",
        },
        {
          nome: "2 - Ana Beatriz",
          nomeSocial: "Bia",
          genero: "F",
          cpf: "987.654.321-00",
          cpfData: "2012-03-12",
          rg: "98.765.432-1",
          rgData: "2010-07-22",
          telefone: "988888888",
          ddd: "21",
        },
        {
          nome: "3 - Carlos Henrique",
          nomeSocial: "Carlos",
          genero: "M",
          cpf: "111.222.333-44",
          cpfData: "2015-06-06",
          rg: "11.223.344-5",
          rgData: "2013-08-18",
          telefone: "977777777",
          ddd: "31",
        },
      ],
      produtos: [
        {
          nome: "1 - Corte de Cabelo",
          preco: "45.00",
          tipo: "Serviço",
          descricao: "Corte profissional com lavagem incluída",
        },
        {
          nome: "2 - Shampoo Anticaspa",
          preco: "25.90",
          tipo: "Produto",
          descricao: "Shampoo para tratamento intensivo de caspa",
        },
        {
          nome: "3 - Coloração",
          preco: "120.00",
          tipo: "Serviço",
          descricao: "Coloração permanente com escolha de tonalidade",
        },
        {
          nome: "4 - Pente",
          preco: "15.50",
          tipo: "Produto",
          descricao: "Pente de madeira para cuidados diários",
        },
      ],
      consumos: [],
      clienteEmEdicaoIndex: null,
      produtoEmEdicaoIndex: null,
    };

    this.selecionarView = this.selecionarView.bind(this);
    this.adicionarCliente = this.adicionarCliente.bind(this);
    this.removerCliente = this.removerCliente.bind(this);
    this.editarCliente = this.editarCliente.bind(this);
    this.atualizarCliente = this.atualizarCliente.bind(this);

    this.adicionarProduto = this.adicionarProduto.bind(this);
    this.removerProduto = this.removerProduto.bind(this);
    this.editarProduto = this.editarProduto.bind(this);
    this.atualizarProduto = this.atualizarProduto.bind(this);

    this.registrarConsumo = this.registrarConsumo.bind(this);
  }

  selecionarView(novaTela: string, evento?: Event) {
    if (evento) evento.preventDefault();
    this.setState({
      tela: novaTela,
      clienteEmEdicaoIndex: null,
      produtoEmEdicaoIndex: null,
    });
  }

  adicionarCliente(novo: Cliente) {
    const clientesAtualizados = [...this.state.clientes, novo];
    this.setState({ clientes: clientesAtualizados, tela: "Clientes" });
  }

  removerCliente(index: number) {
    const confirmacao = window.confirm("Deseja realmente remover este cliente?");
    if (!confirmacao) return;
    const clientesAtualizados = this.state.clientes.filter((_, i) => i !== index);
    this.setState({ clientes: clientesAtualizados });
  }

  editarCliente(index: number) {
    this.setState({ tela: "Editar Cliente", clienteEmEdicaoIndex: index });
  }

  atualizarCliente(index: number, clienteAtualizado: Cliente) {
    const clientesAtualizados = [...this.state.clientes];
    clientesAtualizados[index] = clienteAtualizado;
    this.setState({
      clientes: clientesAtualizados,
      tela: "Clientes",
      clienteEmEdicaoIndex: null,
    });
  }

  adicionarProduto(novo: Produto) {
    const produtosAtualizados = [...this.state.produtos, novo];
    this.setState({ produtos: produtosAtualizados, tela: "Produtos" });
  }

  removerProduto(index: number) {
    const confirmacao = window.confirm("Deseja realmente remover este produto?");
    if (!confirmacao) return;
    const produtosAtualizados = this.state.produtos.filter((_, i) => i !== index);
    this.setState({ produtos: produtosAtualizados });
  }

  editarProduto(index: number) {
    this.setState({ tela: "Editar Produto", produtoEmEdicaoIndex: index });
  }

  atualizarProduto(index: number, produtoAtualizado: Produto) {
    const produtosAtualizados = [...this.state.produtos];
    produtosAtualizados[index] = produtoAtualizado;
    this.setState({
      produtos: produtosAtualizados,
      tela: "Produtos",
      produtoEmEdicaoIndex: null,
    });
  }

  registrarConsumo(registro: Consumo) {
    const consumosAtualizados = [...this.state.consumos, registro];
    this.setState({ consumos: consumosAtualizados, tela: "Clientes" });
  }

  render() {
    const tema = "blue-grey darken-4";
    const botoes = [
      "Clientes",
      "Cadastro de Cliente",
      "Produtos",
      "Cadastro de Produto",
      "Registro de Consumo",
      "Relatórios",
    ];

    let componente;
    switch (this.state.tela) {
      case "Clientes":
        componente = (
          <ListaCliente
            tema={tema}
            clientes={this.state.clientes}
            aoRemover={this.removerCliente}
            aoEditar={this.editarCliente}
          />
        );
        break;
      case "Cadastro de Cliente":
        componente = (
          <FormularioCadastroCliente
            tema={tema}
            aoCadastrar={this.adicionarCliente}
          />
        );
        break;
      case "Editar Cliente":
        componente =
          this.state.clienteEmEdicaoIndex !== null ? (
            <FormularioCadastroCliente
              tema={tema}
              cliente={this.state.clientes[this.state.clienteEmEdicaoIndex]}
              aoAtualizar={(clienteAtualizado) =>
                this.atualizarCliente(this.state.clienteEmEdicaoIndex!, clienteAtualizado)
              }
            />
          ) : (
            <h5 className="center-align">Cliente não encontrado</h5>
          );
        break;
      case "Produtos":
        componente = (
          <ListaProduto
            tema={tema}
            produtos={this.state.produtos}
            aoRemover={this.removerProduto}
            aoEditar={this.editarProduto}
          />
        );
        break;
      case "Cadastro de Produto":
        componente = (
          <FormularioCadastroProduto
            tema={tema}
            aoCadastrar={this.adicionarProduto}
          />
        );
        break;
      case "Editar Produto":
        componente =
          this.state.produtoEmEdicaoIndex !== null ? (
            <FormularioCadastroProduto
              tema={tema}
              produto={this.state.produtos[this.state.produtoEmEdicaoIndex]}
              aoAtualizar={(produtoAtualizado) =>
                this.atualizarProduto(this.state.produtoEmEdicaoIndex!, produtoAtualizado)
              }
            />
          ) : (
            <h5 className="center-align">Produto não encontrado</h5>
          );
        break;
      case "Registro de Consumo":
        componente = (
          <FormularioRegistroConsumo
            tema={tema}
            clientes={this.state.clientes}
            produtos={this.state.produtos}
            aoRegistrar={this.registrarConsumo}
          />
        );
        break;
      case "Relatórios":
        componente = <PaginaRelatorios tema={tema} />;
        break;
      default:
        componente = <h5 className="center-align">Tela não encontrada</h5>;
        break;
    }

    return (
      <>
        <BarraNavegacao
          seletorView={this.selecionarView}
          tema={tema}
          botoes={botoes}
        />
        {componente}
      </>
    );
  }
}
