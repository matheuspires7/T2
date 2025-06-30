import { Component } from "react";
import "./paginaRelatorios.css";

type props = {
  tema: string;
};

export default class PaginaRelatorios extends Component<props> {
  render() {
    const estiloCard = `card card-altura-fixa ${this.props.tema} white-text`;
    const estiloTitulo = "titulo-relatorio";

    // Dados organizados
    const topClientesQuantidade = [
      { nome: "Lucas", total: 18 },
      { nome: "Ana", total: 17 },
      { nome: "Carlos", total: 15 },
      { nome: "Matheus", total: 15 },
      { nome: "Rafael", total: 12 },
      { nome: "Clara", total: 11 },
      { nome: "Felipe", total: 10 },
      { nome: "Marina", total: 7 },
      { nome: "Roberto", total: 7 },
      { nome: "Sofia", total: 6 },
    ];

    const clientesPorGenero = [
      { genero: "Feminino", nomes: ["Ana", "Mariana", "Beatriz"] },
      { genero: "Masculino", nomes: ["Lucas", "Carlos", "Pedro"] },
      { genero: "Outro", nomes: ["Alex", "Sam"] },
    ];

    const produtosMaisConsumidos = [
      { nome: "Corte de cabelo", total: 20 },
      { nome: "Manicure", total: 18 },
      { nome: "Shampoo XYZ", total: 14 },
    ];

    const produtosPorGenero = [
      {
        genero: "Feminino",
        produtos: [
          { nome: "Manicure", total: 12 },
          { nome: "Corte de cabelo", total: 10 },
        ],
      },
      {
        genero: "Masculino",
        produtos: [
          { nome: "Barba", total: 8 },
          { nome: "Shampoo XYZ", total: 7 },
        ],
      },
    ];

    const clientesMenosConsumiram = [
      { nome: "Pedro", total: 1 },
      { nome: "Sam", total: 1 },
      { nome: "Beatriz", total: 2 },
      { nome: "Caio", total: 3 },
      { nome: "Gabriel", total: 3 },
      { nome: "Marcela", total: 4 },
      { nome: "Guilherme", total: 4 },
      { nome: "Gabriela", total: 4 },
      { nome: "Gustavo", total: 5 },
      { nome: "Yuri", total: 5 },
    ];

    const clientesMaisValor = [
      { nome: "Ana", valor: 1200.5 },
      { nome: "Lucas", valor: 980.0 },
      { nome: "Carlos", valor: 850.75 },
      { nome: "Clara", valor: 800.5 },
      { nome: "Matheus", valor: 760.0 },
    ];

    return (
      <div className="container">
        <h5 className="center-align">Relatórios do Sistema</h5>

        <div className="grid-relatorios">
          {/* Top Clientes por Quantidade */}
          <div className={estiloCard}>
            <div className="card-content">
              <h6 className={estiloTitulo}>
                Top10 clientes que mais consumiram em quantidade
              </h6>
              <ul>
                {topClientesQuantidade.map((c, i) => (
                  <li key={i}>
                    {c.nome}: {c.total} itens
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Clientes por Gênero */}
          <div className={estiloCard}>
            <div className="card-content">
              <h6 className={estiloTitulo}>Clientes por Gênero</h6>
              {clientesPorGenero.map((grupo, i) => (
                <div key={i}>
                  <strong>{grupo.genero}:</strong>
                  <ul>
                    {grupo.nomes.map((nome, j) => (
                      <li key={j}>{nome}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Produtos mais consumidos */}
          <div className={estiloCard}>
            <div className="card-content">
              <h6 className={estiloTitulo}>Produtos/Serviços Mais Consumidos</h6>
              <ul>
                {produtosMaisConsumidos.map((p, i) => (
                  <li key={i}>
                    {p.nome}: {p.total} vezes
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Produtos mais consumidos por gênero */}
          <div className={estiloCard}>
            <div className="card-content">
              <h6 className={estiloTitulo}>
                Serviços/Produtos mais consumidos por gênero
              </h6>
              {produtosPorGenero.map((grupo, i) => (
                <div key={i}>
                  <strong>{grupo.genero}:</strong>
                  <ul>
                    {grupo.produtos.map((p, j) => (
                      <li key={j}>
                        {p.nome}: {p.total} vezes
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Clientes que menos consumiram */}
          <div className={estiloCard}>
            <div className="card-content">
              <h6 className={estiloTitulo}>
                Top10 clientes que menos consumiram produtos/serviços
              </h6>
              <ul>
                {clientesMenosConsumiram.map((c, i) => (
                  <li key={i}>
                    {c.nome}: {c.total} item(ns)
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Clientes que mais consumiram em valor */}
          <div className={estiloCard}>
            <div className="card-content">
              <h6 className={estiloTitulo}>Top5 clientes que mais consumiram em valor</h6>
              <ul>
                {clientesMaisValor.map((c, i) => (
                  <li key={i}>
                    {c.nome}: R$ {c.valor.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
