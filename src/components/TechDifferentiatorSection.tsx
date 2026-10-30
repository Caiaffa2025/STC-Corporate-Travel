import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  History, 
  FolderLock, 
  BarChart, 
  UserCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const TechDifferentiatorSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'status' | 'receipts' | 'reports'>('form');

  const differentials = [
    {
      icon: FileText,
      title: 'Formulário padronizado de solicitação',
      desc: 'Campos específicos de centro de custo, datas, motivo e restrições, eliminando pedidos incompletos.',
    },
    {
      icon: Clock,
      title: 'Acompanhamento do status de cada pedido',
      desc: 'Visibilidade transparente: em cotação, aguardando aprovação, emitido ou concluído.',
    },
    {
      icon: History,
      title: 'Histórico de solicitações',
      desc: 'Registro unificado de todos os trechos, hospedagens e custos passados da sua organização.',
    },
    {
      icon: FolderLock,
      title: 'Organização de documentos e comprovantes',
      desc: 'Vouchers, faturas e bilhetes arquivados de forma acessível para auditoria e fiscalização.',
    },
    {
      icon: BarChart,
      title: 'Relatórios de despesas',
      desc: 'Dados consolidados por departamento e período, adaptáveis conforme os requisitos contratados.',
    },
    {
      icon: UserCheck,
      title: 'Comunicação com responsáveis por aprovação',
      desc: 'Encaminhamento rápido de solicitações aos gestores autorizados antes de qualquer desembolso.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">
            Processos & Tecnologia Aplicada
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Gestão inteligente, com processos organizados e tecnologia.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Assumimos a gestão das viagens corporativas da sua empresa, desde a solicitação até a reserva, administração e controle financeiro. <strong className="text-slate-950 font-bold">Tudo centralizado em uma plataforma exclusiva PARA CADA EMPRESA</strong>, com acompanhamento e transparência.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-5 sm:p-6 rounded-xl border border-slate-200/90 bg-slate-50/40 hover:bg-white hover:border-slate-300 transition-colors flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 shrink-0 shadow-2xs">
                  <Icon className="w-5 h-5 text-sky-800" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Preview Mockup of Digital Workflow */}
        <div className="mt-14 rounded-xl border border-slate-200 bg-slate-950 text-white overflow-hidden shadow-xl">
          <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-900/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-700 inline-block" />
              <span className="w-3 h-3 rounded-full bg-slate-700 inline-block" />
              <span className="w-3 h-3 rounded-full bg-slate-700 inline-block" />
              <span className="text-xs font-mono text-amber-300 ml-2 font-semibold">
                Plataforma Exclusiva STC Corporate Travel · Acesso do Cliente
              </span>
            </div>

            {/* Interactive Tabs with smooth mobile horizontal scroll */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'form'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Solicitação
              </button>
              <button
                onClick={() => setActiveTab('status')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'status'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Status & Aprovação
              </button>
              <button
                onClick={() => setActiveTab('receipts')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'receipts'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                3. Comprovantes
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'reports'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                4. Relatório
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'form' && (
              <div className="space-y-4 max-w-2xl">
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Formulário Padronizado para os Colaboradores
                </div>
                <h4 className="text-lg font-bold text-white">
                  Coleta precisa de dados desde o primeiro clique
                </h4>
                <p className="text-sm text-slate-300">
                  Os colaboradores ou assistentes preenchem um formulário rápido com origem, destino, janela de horário preferida, centro de custo e justificativa da viagem.
                </p>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 space-y-2">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-500">Viajante:</span>
                    <span>Mariana Costa (Diretoria Comercial)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-500">Trecho:</span>
                    <span>São Paulo (CGH) ⇄ Curitiba (CWB)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-500">Centro de Custo:</span>
                    <span>CC-104 (Expansão Regional Sul)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Política Aplicável:</span>
                    <span className="text-emerald-400">Em conformidade com política PME</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'status' && (
              <div className="space-y-4 max-w-2xl">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Acompanhamento de Status e Alçada de Aprovação
                </div>
                <h4 className="text-lg font-bold text-white">
                  Controle antes de qualquer emissão
                </h4>
                <p className="text-sm text-slate-300">
                  A cotação é apresentada com as melhores alternativas compatíveis e enviada ao gestor responsável para aprovação formal com 1 clique antes da emissão.
                </p>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Protocolo #V-2026-88</span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Aprovado pela Gerência Financeira
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-white">
                    2 opções cotadas · Opção Econômica confirmada dentro da antecedência
                  </div>
                  <div className="text-xs text-slate-400">
                    Vouchers emitidos e encaminhados para o viajante via e-mail e WhatsApp.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'receipts' && (
              <div className="space-y-4 max-w-2xl">
                <div className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                  Armazenamento e Organização de Comprovantes
                </div>
                <h4 className="text-lg font-bold text-white">
                  Documentação fiscal e faturas sem extravio
                </h4>
                <p className="text-sm text-slate-300">
                  Todos os bilhetes, vouchers hoteleiros e notas fiscais das viagens organizadas ficam arquivados e conciliados para envio ao setor contábil.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-500 block">Bilhete Eletrônico / e-Ticket:</span>
                    <span className="text-white font-mono">LATAM_TKT_0442398.pdf</span>
                  </div>
                  <div className="p-3 rounded bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-500 block">Voucher Hospedagem:</span>
                    <span className="text-white font-mono">HOTEL_CURITIBA_CONF.pdf</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-4 max-w-2xl">
                <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                  Relatórios Gerenciais Periódicos
                </div>
                <h4 className="text-lg font-bold text-white">
                  Visibilidade executiva para a diretoria
                </h4>
                <p className="text-sm text-slate-300">
                  Consolidação dos dados de viagens por período, centro de custo ou colaborador, conforme o escopo contratado para o projeto da sua empresa.
                </p>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 space-y-1.5">
                  <div className="text-slate-400 uppercase text-[10px] tracking-wider mb-2">
                    Resumo Consolidado Mensal (Exemplo)
                  </div>
                  <div className="flex justify-between">
                    <span>Viagens realizadas:</span>
                    <span className="text-white font-bold">14 deslocamentos</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Antecedência média de solicitação:</span>
                    <span className="text-emerald-400 font-bold">11 dias</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aderência às políticas internas:</span>
                    <span className="text-white font-bold">100%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-400">
            * Recursos e painéis podem ser personalizados de acordo com os serviços contratados e o volume operacional da sua empresa.
          </div>
        </div>
      </div>
    </section>
  );
};
