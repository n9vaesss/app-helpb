import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import ModalSelecionarCliente from "../ModalSelecionarCliente/ModalSelecionarCliente";

const SimuladorResultados = () => {
  const [open, setOpen] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);

  const handleOpen = () => setOpen(true);

  const empresas = [
    {
      id: "00001",
      nome: "Caio Novaes de Lima",
      empresa: "Helpb",
      estado: "SP",
      status: "Ativo",
      contribuinte: "Caio Novaes de Lima",
      cpfcnpj: "49786489802",
      orcamento: 1000.0,
      receitaBruta: 150000,
      lucroBruto: 20000,
      grupoMarca: "Grupo Marca",
      item: "implanon",
      pf: 839.04,
      icms: 17,
      repasse: 13.54,
      desconto1: 6,
      icmsCompra: 4,
      trib: 4,
      quant: 1,
      desconto2: 3,
      impostos: 4,
      bf: 0
    },
    {
      id: "00002",
      nome: "Mariana Souza",
      empresa: "Tech Solutions LTDA",
      estado: "RJ",
      status: "Ativo",
      contribuinte: "Mariana Souza",
      cpfcnpj: "12345678901",
      orcamento: 5000.0,
      receitaBruta: 250000,
      lucroBruto: 35000,
      grupoMarca: "Grupo Tech",
      item: "servidor cloud",
      pf: 4599.99,
      icms: 18,
      repasse: 15.2,
      desconto1: 5,
      icmsCompra: 3,
      trib: 5,
      quant: 2,
      desconto2: 2,
      impostos: 6,
      bf: 1
    },
    {
      id: "00003",
      nome: "Roberto Lima",
      empresa: "Comercial Lima SA",
      estado: "MG",
      status: "Inativo",
      contribuinte: "Roberto Lima",
      cpfcnpj: "98765432100",
      orcamento: 2000.0,
      receitaBruta: 180000,
      lucroBruto: 25000,
      grupoMarca: "Grupo Comercial",
      item: "máquina industrial",
      pf: 12000.0,
      icms: 16,
      repasse: 14.5,
      desconto1: 7,
      icmsCompra: 5,
      trib: 6,
      quant: 1,
      desconto2: 4,
      impostos: 5,
      bf: 0
    },
    {
      id: "00004",
      nome: "Fernanda Alves",
      empresa: "Alves Importações ME",
      estado: "BA",
      status: "Ativo",
      contribuinte: "Fernanda Alves",
      cpfcnpj: "11223344556",
      orcamento: 3000.0,
      receitaBruta: 200000,
      lucroBruto: 28000,
      grupoMarca: "Grupo Import",
      item: "eletrônicos",
      pf: 3299.99,
      icms: 19,
      repasse: 12.8,
      desconto1: 4,
      icmsCompra: 3,
      trib: 5,
      quant: 3,
      desconto2: 3,
      impostos: 7,
      bf: 1
    }
  ];

  useEffect(() => {
    console.log(empresaSelecionada); 
  }, [empresaSelecionada]);



  const calcularPFAjustado = (pf18, icms) => (pf18 * 0.82) / (1 - icms / 100);
  const calcularPFRepasse = (pf18, repasse) => pf18 - (pf18 * repasse / 100);
  const calcularCustoFinal = (pfRepasse, desconto1) => pfRepasse - (pfRepasse * desconto1 / 100);
  const calcularCustoLiquido = (custoFinal, icmsCompra) => custoFinal * (1 - icmsCompra / 100);
  const calcularPreco = (pfAjustado, desconto2) => pfAjustado * (1 - desconto2 / 100);
  const calcularRB = (preco, quant) => preco * quant;
  const calcularRL = (rb, impostos) => rb * (1 - impostos / 100);
  const calcularMB = (lb, rl) => ((lb / rl) * 100).toFixed(2) + "%";
  const calcularLB = (rl, cmv, bf) => (rl - cmv) + (rl * bf);
  const calcularCMV = (custoLiquido, quant) => custoLiquido * quant;

  return (
    <Container sx={{ paddingY: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", marginBottom: 4 }}>
        Simulador de Resultados
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
        <Button variant="contained" color="primary" sx={{ fontWeight: "bold", fontSize: "12px" }} onClick={handleOpen}>
          Selecionar cliente
        </Button>
        <Button variant="contained" color="primary" sx={{ fontWeight: "bold", fontSize: "12px" }} onClick={() => setEmpresaSelecionada(null)}>
          Limpar
        </Button>
      </Box>
      <Card sx={{ marginTop: 2, padding: 2 }}>
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
          {["id", "nome", "empresa", "estado", "status", "contribuinte", "cpfcnpj", "orcamento"].map((key, index) => (
            <Box key={index}>
              <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "14px" }}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {empresaSelecionada?.[key] !== undefined ? empresaSelecionada[key] : "Selecionar cliente"}
              </Typography>
            </Box>
          ))}
        </Box>
      </Card>
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2} sx={{ marginTop: 2 }}>
        {[
          {
            label: "Receita Bruta (R$)",
            value: empresaSelecionada?.receitaBruta !== undefined ? `R$ ${empresaSelecionada.receitaBruta.toFixed(2)}` : "R$ 0,00"
          },
          {
            label: "Lucro Bruto (R$)",
            value: empresaSelecionada?.lucroBruto !== undefined ? `R$ ${empresaSelecionada.lucroBruto.toFixed(2)}` : "R$ 0,00"
          },
          {
            label: "Margem Bruta (%)",
            value: empresaSelecionada?.receitaBruta !== undefined || empresaSelecionada?.lucroBruto !== undefined ? `${((empresaSelecionada.lucroBruto / empresaSelecionada.receitaBruta) * 100).toFixed(2)}%` : "0,00%",
          },
          {
            label: "CMV (R$)",
            value: empresaSelecionada
              ? `R$ ${calcularCMV(
                calcularCustoLiquido(calcularCustoFinal(calcularPFRepasse(empresaSelecionada.pf, empresaSelecionada.repasse), empresaSelecionada.desconto1), empresaSelecionada.icmsCompra), empresaSelecionada.quant
              ).toFixed(2)}`
              : "R$ 0,00"
          }
        ].map((item, index) => (
          <Card key={index}>
            <CardContent>
              <Typography variant="h6">{item.value}</Typography>
              <Typography variant="body2" color="textSecondary">
                {item.label}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Card sx={{ marginTop: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography color="primary" sx={{ fontWeight: 700 }}>
              Novo Item
            </Typography>
          </Box>
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 1200 }}>
              <TableHead>
                <TableRow>
                  {[
                    "Empresa",
                    "Grupo Marca",
                    "Item",
                    "PF 18%",
                    "ICMS%",
                    "PF Ajustado",
                    "Repasse(%)",
                    "PF - Repasse",
                    "Desconto(%)",
                    "Custo Final",
                    "ICMS Compra (%)",
                    "Custo Líquido",
                    "Trib",
                    "Quant. (PF)",
                    "Preço",
                    "Desconto",
                    "RB",
                    "Impostos",
                    "RL",
                    "MB%",
                    "LB",
                    "BF",
                    "CMV",
                  ].map((header) => (
                    <TableCell key={header} sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>

                {empresaSelecionada &&
                  (Array.isArray(empresaSelecionada) ? empresaSelecionada : [empresaSelecionada]).map((empresa) => {
                    const pfAjustado = calcularPFAjustado(empresa.pf, empresa.icms);
                    const pfRepasse = calcularPFRepasse(empresa.pf, empresa.repasse);
                    const custoFinal = calcularCustoFinal(pfRepasse, empresa.desconto1);
                    const custoLiquido = calcularCustoLiquido(custoFinal, empresa.icmsCompra);
                    const preco = calcularPreco(pfAjustado, empresa.desconto2);
                    const rb = calcularRB(preco, empresa.quant);
                    const rl = calcularRL(rb, empresa.impostos);
                    const cmv = calcularCMV(custoLiquido, empresa.quant);
                    const lb = calcularLB(rl, cmv, empresa.bf);
                    const mb = calcularMB(lb, rl);

                    return (
                      <TableRow key={empresa.id}>
                        <TableCell>{empresa.empresa}</TableCell>
                        <TableCell>{empresa.grupoMarca}</TableCell>
                        <TableCell>{empresa.item}</TableCell>
                        <TableCell>{empresa.pf.toFixed(2)}</TableCell>
                        <TableCell>{empresa.icms + "%"}</TableCell>
                        <TableCell>{pfAjustado.toFixed(2)}</TableCell>
                        <TableCell>{empresa.repasse.toFixed(2) + "%"}</TableCell>
                        <TableCell>{pfRepasse.toFixed(2)}</TableCell>
                        <TableCell>{empresa.desconto1 + "%"}</TableCell>
                        <TableCell>{custoFinal.toFixed(2)}</TableCell>
                        <TableCell>{empresa.icmsCompra + "%"}</TableCell>
                        <TableCell>{custoLiquido.toFixed(2)}</TableCell>
                        <TableCell>{empresa.trib + "%"}</TableCell>
                        <TableCell>{empresa.quant}</TableCell>
                        <TableCell>{preco.toFixed(2)}</TableCell>
                        <TableCell>{empresa.desconto2 + "%"}</TableCell>
                        <TableCell>{rb.toFixed(2)}</TableCell>
                        <TableCell>{empresa.impostos + "%"}</TableCell>
                        <TableCell>{rl.toFixed(2)}</TableCell>
                        <TableCell>{mb}</TableCell>
                        <TableCell>{lb.toFixed(2)}</TableCell>
                        <TableCell>{empresa.bf + "%"}</TableCell>
                        <TableCell>{cmv.toFixed(2)}</TableCell>
                      </TableRow>
                    );
                  })}

              </TableBody>
            </Table>
          </Box>

        </CardContent>
      </Card>
      <ModalSelecionarCliente
        open={open}
        setOpen={setOpen}
        empresas={empresas}
        onSelectEmpresa={(empresa) => {
          setEmpresaSelecionada(empresa);
          setOpen(false);
        }}
      />
    </Container>
  );
};

export default SimuladorResultados;
