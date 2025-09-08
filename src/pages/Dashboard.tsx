import { useState } from 'react'
import DetailsModal from '../components/DetailsModal'
import './Dashboard.css'

interface Step {
  title: string
  description: string
  color: string
}

interface Guide {
  id: number
  type: string
  number: string
  date: string
  doctor: string
  hospital: string
  status: string
  steps: Step[]
}

const guides: Guide[] = [
  {
    id: 1,
    type: 'Internação',
    number: '123213246973',
    date: '28/09/2025',
    doctor: 'Dr. Carlos Eduardo Silva',
    hospital: 'Hospital Albert Einstein',
    status: 'Concluído',
    steps: [
      { title: 'Finalizado', description: 'Processo finalizado.', color: '#28a745' },
      { title: 'Aguardando profissional desempactador', description: 'Aguardando análise do profissional desempactador das últimas solicitações.', color: '#6c757d' },
      { title: 'Encaminhada para junta médica', description: 'Sua solicitação foi encaminhada para junta médica.', color: '#0d6efd' },
      { title: 'Tentativa de consenso', description: 'Tentativa de consenso com os profissionais médicos sobre as últimas solicitações.', color: '#ffc107' },
      { title: 'Análise de pertinência dos itens solicitados', description: 'Análise de pertinência dos itens solicitados.', color: '#6c757d' },
    ],
  },
  {
    id: 2,
    type: 'SADT',
    number: '123213246973',
    date: '28/09/2025',
    doctor: 'Dr. Carlos Eduardo Silva',
    hospital: 'Hospital Albert Einstein',
    status: 'Concluído',
    steps: [
      { title: 'Finalizado', description: 'Processo finalizado.', color: '#28a745' },
      { title: 'Aguardando profissional desempactador', description: 'Aguardando análise do profissional desempactador das últimas solicitações.', color: '#6c757d' },
      { title: 'Encaminhada para junta médica', description: 'Sua solicitação foi encaminhada para junta médica.', color: '#0d6efd' },
      { title: 'Tentativa de consenso', description: 'Tentativa de consenso com os profissionais médicos sobre as últimas solicitações.', color: '#ffc107' },
      { title: 'Análise de pertinência dos itens solicitados', description: 'Análise de pertinência dos itens solicitados.', color: '#6c757d' },
    ],
  },
]

export default function Dashboard() {
  const [selected, setSelected] = useState<Guide | null>(null)

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Portal do Beneficiário</h1>
        <div className="user-info">
          Olá, Ana Paula!<br />
          N° da carteirinha: 123456789<br />
          Operadora: FESUL
        </div>
      </header>
      <div className="dashboard-content">
        <aside className="beneficiary-card">
          <h2>Dados do Beneficiário</h2>
          <p>
            <strong>Nome</strong><br />
            Maria Oliveira Santos
          </p>
          <p>
            <strong>CPF</strong><br />
            000.000.000-00
          </p>
          <p>
            <strong>Telefone</strong><br />
            (99) 99999-0450
          </p>
          <a href="#">Telefone adicional</a>
          <p>
            <strong>Email</strong><br />
            email@email.com
          </p>
          <button>Atualizar dados do titular</button>
        </aside>
        <main className="guides">
          <h2>Acompanhe o status de autorização das guias médicas solicitadas para o seu titular.</h2>
          {guides.map((g) => (
            <div key={g.id} className="guide" onClick={() => setSelected(g)}>
              <div className="guide-header">
                <h3>{g.type}</h3>
                <span className="status">{g.status}</span>
              </div>
              <p>Guia {g.number}</p>
              <p>Data de atendimento: {g.date}</p>
              <p>{g.hospital}</p>
            </div>
          ))}
        </main>
      </div>
      {selected && <DetailsModal guide={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

